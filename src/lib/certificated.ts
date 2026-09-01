import "server-only";
import fs from "node:fs";
import path from "node:path";
import { parseCsv } from "@/lib/csv";

export interface CertifiedDeveloper {
  fileName: string;
  recipientName: string;
  credentialId: string;
  issueDate: string;
  program: string;
  documentTitle: string;
  instructor: string;
  instructorGithub: string;
  instructorLinkedin: string;
  verifyUrl: string;
  issuer: string;
}

const LOCAL_DIR = path.join(process.cwd(), "certificated-developers");
const GITHUB_REPO =
  process.env.CERTIFICATED_GITHUB_REPO ?? "masterfabric/agentic-ai-developer";
const GITHUB_BRANCH = process.env.CERTIFICATED_GITHUB_BRANCH ?? "main";
const GITHUB_DIR = "certificated-developers";
const REVALIDATE_SECONDS = 300;

type GithubContentItem = {
  name: string;
  type: string;
  download_url: string | null;
};

function parseDeveloperCsv(
  raw: string,
  fallbackFileName: string,
): CertifiedDeveloper | null {
  const rows = parseCsv(raw);
  if (rows.length < 2) return null;

  const header = rows[0].map((h) => h.trim());
  const values = rows[1];
  const get = (key: string) => {
    const idx = header.indexOf(key);
    return idx === -1 ? "" : (values[idx] ?? "").trim();
  };

  const credentialId = get("credentialId");
  if (!credentialId) return null;

  return {
    fileName: get("fileName") || fallbackFileName.replace(/\.csv$/i, ".pdf"),
    recipientName: get("recipientName"),
    credentialId,
    issueDate: get("issueDate"),
    program: get("program"),
    documentTitle: get("documentTitle"),
    instructor: get("instructor"),
    instructorGithub: get("instructorGithub"),
    instructorLinkedin: get("instructorLinkedin"),
    verifyUrl: get("verifyUrl"),
    issuer: get("issuer"),
  };
}

function sortDevelopers(developers: CertifiedDeveloper[]) {
  developers.sort((a, b) => b.credentialId.localeCompare(a.credentialId));
  return developers;
}

function readLocalDevelopers(): CertifiedDeveloper[] {
  let files: string[];
  try {
    files = fs
      .readdirSync(LOCAL_DIR)
      .filter((f) => f.toLowerCase().endsWith(".csv"));
  } catch {
    return [];
  }

  return sortDevelopers(
    files
      .map((file) => {
        const raw = fs.readFileSync(path.join(LOCAL_DIR, file), "utf8");
        return parseDeveloperCsv(raw, file);
      })
      .filter((d): d is CertifiedDeveloper => d !== null),
  );
}

async function fetchGithubDevelopers(): Promise<CertifiedDeveloper[]> {
  const listUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_DIR}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "masterfabric-academy",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const listRes = await fetch(listUrl, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!listRes.ok) {
    throw new Error(
      `GitHub list failed (${listRes.status}) for ${GITHUB_REPO}/${GITHUB_DIR}`,
    );
  }

  const items = (await listRes.json()) as GithubContentItem[];
  if (!Array.isArray(items)) {
    throw new Error("Unexpected GitHub contents response");
  }

  const csvItems = items.filter(
    (item) =>
      item.type === "file" &&
      item.name.toLowerCase().endsWith(".csv") &&
      item.download_url,
  );

  const developers = (
    await Promise.all(
      csvItems.map(async (item) => {
        const csvRes = await fetch(item.download_url!, {
          headers,
          next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!csvRes.ok) return null;
        const raw = await csvRes.text();
        return parseDeveloperCsv(raw, item.name);
      }),
    )
  ).filter((d): d is CertifiedDeveloper => d !== null);

  return sortDevelopers(developers);
}

/**
 * Credential metadata comes from GitHub (`certificated-developers/*.csv`).
 * PDFs stay on GitHub and are linked via raw/blob URLs — they are not
 * bundled into the Vercel deployment. Local folder is used for offline/dev.
 */
export async function getCertifiedDevelopers(): Promise<CertifiedDeveloper[]> {
  const preferLocal = !process.env.VERCEL;

  if (preferLocal) {
    const local = readLocalDevelopers();
    if (local.length > 0) return local;
  }

  try {
    return await fetchGithubDevelopers();
  } catch (error) {
    console.warn(
      "[certificated] GitHub fetch failed, falling back to local folder:",
      error,
    );
    return readLocalDevelopers();
  }
}

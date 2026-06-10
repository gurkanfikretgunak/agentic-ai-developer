import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";

/**
 * All curriculum content lives in /content/{locale}/*.md and is read from
 * disk on every request (pages using this module are force-dynamic), so
 * editing a markdown file is reflected immediately without a rebuild.
 */

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface DocMeta {
  slug: string;
  order: number;
  title: string;
  section: string;
  badge?: string;
  weight?: number;
  infrastructure?: string;
}

export interface Doc extends DocMeta {
  body: string;
}

function parseDoc(slug: string, raw: string): Doc {
  const { data, content } = matter(raw);
  return {
    slug,
    order: Number(data.order ?? 999),
    title: String(data.title ?? slug),
    section: String(data.section ?? ""),
    badge: data.badge ? String(data.badge) : undefined,
    weight: data.weight !== undefined ? Number(data.weight) : undefined,
    infrastructure: data.infrastructure ? String(data.infrastructure) : undefined,
    body: content.trim(),
  };
}

export async function getDocs(locale: Locale): Promise<Doc[]> {
  const dir = path.join(CONTENT_ROOT, locale);
  const entries = await fs.readdir(dir);
  const docs = await Promise.all(
    entries
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf-8");
        return parseDoc(file.replace(/\.md$/, ""), raw);
      }),
  );
  return docs.sort((a, b) => a.order - b.order);
}

export async function getDomainWeights(
  locale: Locale,
): Promise<{ label: string; weight: number }[]> {
  const docs = await getDocs(locale);
  return docs
    .filter((doc) => doc.weight !== undefined)
    .map((doc) => ({ label: doc.title, weight: doc.weight as number }));
}

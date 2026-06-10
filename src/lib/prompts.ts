import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

/**
 * Application prompt templates live in /prompts (reference folder) and are
 * read from disk per request, like the rest of the content. The Apply section
 * fills the {{placeholders}} client-side from the form input.
 */
export async function getApplicationPromptTemplate(
  locale: Locale,
): Promise<string> {
  const file = path.join(process.cwd(), "prompts", `application.${locale}.md`);
  return fs.readFile(file, "utf-8");
}

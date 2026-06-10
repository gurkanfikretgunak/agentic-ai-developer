"use client";

import type { ReactNode } from "react";
import { CursorIcon } from "@/components/brand/AiProviderIcons";

interface IconProps {
  className?: string;
}

/* Official brand marks (simple-icons path data), rendered with currentColor. */

function NextJsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
    </svg>
  );
}

function GoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.77.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35.152-.362.432-.97.596-1.274a.315.315 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a4.983 4.983 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 0 1-1.262-2.255c-.21-1.32.152-2.489.946-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.63.07-.933.106zm2.78-4.72c-.011-.153-.011-.27-.034-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788.935-2.045 2.033-.21.912.234 1.835 1.075 2.21.643.28 1.285.244 1.905-.07.923-.48 1.425-1.228 1.484-2.233z" />
    </svg>
  );
}

function SwiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M13.543 3.41c4.114 2.47 6.545 7.162 5.549 11.131-.024.092-.05.18-.076.27l.002.001c2.062 2.538 1.5 5.258 1.236 4.745-1.072-2.086-3.066-1.568-4.088-1.043a6.803 6.803 0 0 1-.281.158l-.02.012-.002.002a8.83 8.83 0 0 1-4.087 1.021C8.219 19.707 4.077 16.97 1.6 13.103c1.301 1.093 2.97 2.04 4.653 2.601 2.182.728 4.387.674 6.026-.097C9.95 13.418 7.927 11.43 6.4 9.83c-.764-.755-1.475-1.575-2.13-2.443 4.069 3.738 7.064 5.226 8.42 5.815-2.846-3.041-5.249-6.755-5.149-6.655 4.42 4.474 8.498 6.806 8.498 6.806.165.092.286.165.378.228.077-.214.146-.435.205-.665.65-2.397-.07-5.236-1.79-7.553Z" />
    </svg>
  );
}

function KotlinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 24H0V0h24L12 12Z" />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function TerminalIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="3" width="20" height="18" rx="1" />
      <path d="m7 9 4 3-4 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

interface TechInfo {
  /** Exact substrings to match inside the lead text. */
  match: string[];
  name: string;
  desc: { en: string; tr: string };
  url: string;
  urlLabel: string;
  Icon: (props: IconProps) => ReactNode;
}

const TECHS: TechInfo[] = [
  {
    match: ["Next.js 15"],
    name: "Next.js",
    desc: {
      en: "The React framework for the web, built and maintained by Vercel. Powers full-stack apps with App Router, Server Components and Turbopack.",
      tr: "Vercel tarafından geliştirilen web için React framework'ü. App Router, Server Components ve Turbopack ile tam yığın uygulamalar sunar.",
    },
    url: "https://nextjs.org",
    urlLabel: "nextjs.org",
    Icon: NextJsIcon,
  },
  {
    match: ["Go (Golang)"],
    name: "Go",
    desc: {
      en: "An open-source programming language supported by Google. Built for simplicity, concurrency and fast, reliable backend services.",
      tr: "Google destekli açık kaynak programlama dili. Sadelik, eşzamanlılık ve hızlı, güvenilir backend servisleri için tasarlandı.",
    },
    url: "https://go.dev",
    urlLabel: "go.dev",
    Icon: GoIcon,
  },
  {
    match: ["iOS (Swift)"],
    name: "Swift",
    desc: {
      en: "Apple's powerful and intuitive programming language for iOS, macOS, watchOS and beyond — safe, fast and expressive.",
      tr: "Apple'ın iOS, macOS, watchOS ve ötesi için güçlü ve sezgisel programlama dili — güvenli, hızlı ve ifade gücü yüksek.",
    },
    url: "https://www.swift.org",
    urlLabel: "swift.org",
    Icon: SwiftIcon,
  },
  {
    match: ["Android (Kotlin)"],
    name: "Kotlin",
    desc: {
      en: "A modern language by JetBrains and Google's official choice for Android development — concise, safe and multiplatform.",
      tr: "JetBrains imzalı modern dil ve Google'ın Android geliştirme için resmi tercihi — kısa, güvenli ve çok platformlu.",
    },
    url: "https://kotlinlang.org",
    urlLabel: "kotlinlang.org",
    Icon: KotlinIcon,
  },
  {
    match: ["Cursor IDE", "Cursor"],
    name: "Cursor",
    desc: {
      en: "The AI code editor by Anysphere. Agentic coding with frontier models, deeply integrated into the editor workflow.",
      tr: "Anysphere'in yapay zeka kod editörü. Sınır modellerle ajan tabanlı kodlama, editör iş akışına derinlemesine entegre.",
    },
    url: "https://cursor.com",
    urlLabel: "cursor.com",
    Icon: CursorIcon,
  },
  {
    match: ["OpenCode"],
    name: "OpenCode",
    desc: {
      en: "An open-source AI coding agent that lives in your terminal — model-agnostic, scriptable and built for autonomous workflows.",
      tr: "Terminalde çalışan açık kaynak yapay zeka kodlama ajanı — model bağımsız, betiklenebilir ve otonom iş akışları için tasarlandı.",
    },
    url: "https://opencode.ai",
    urlLabel: "opencode.ai",
    Icon: TerminalIcon,
  },
  {
    match: ["GitHub Copilot"],
    name: "GitHub Copilot",
    desc: {
      en: "GitHub's AI pair programmer. Code completions, chat and agentic coding across the IDE, terminal and github.com.",
      tr: "GitHub'ın yapay zeka eş programcısı. IDE, terminal ve github.com genelinde kod tamamlama, sohbet ve ajan tabanlı kodlama.",
    },
    url: "https://github.com/features/copilot",
    urlLabel: "github.com/features/copilot",
    Icon: GitHubIcon,
  },
];

/** Splits the lead text and wraps known technology terms with hover cards. */
function renderLead(text: string, locale: "en" | "tr") {
  const patterns = TECHS.flatMap((tech) =>
    tech.match.map((m) => ({ term: m, tech })),
  ).sort((a, b) => b.term.length - a.term.length);

  const nodes: ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (rest.length > 0) {
    let earliest: { index: number; term: string; tech: TechInfo } | null = null;
    for (const { term, tech } of patterns) {
      const index = rest.indexOf(term);
      if (index !== -1 && (earliest === null || index < earliest.index)) {
        earliest = { index, term, tech };
      }
    }

    if (!earliest) {
      nodes.push(rest);
      break;
    }

    if (earliest.index > 0) nodes.push(rest.slice(0, earliest.index));

    const { tech, term } = earliest;
    const { Icon } = tech;
    nodes.push(
      <span key={key++} className="tech-term">
        <span className="tech-term-label">{term}</span>
        <span className="tech-tip" role="tooltip">
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/25 text-white">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-bold text-white">{tech.name}</span>
          </span>
          <span className="mt-2.5 block text-xs leading-relaxed text-white/65">
            {tech.desc[locale]}
          </span>
          <a
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-fit border-b border-white/30 pb-px font-mono text-[10px] uppercase tracking-widest text-white/55 transition hover:border-white hover:text-white"
          >
            {tech.urlLabel} →
          </a>
        </span>
      </span>,
    );

    rest = rest.slice(earliest.index + term.length);
  }

  return nodes;
}

export function TechLead({ text, locale }: { text: string; locale: "en" | "tr" }) {
  return (
    <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55">
      {renderLead(text, locale)}
    </p>
  );
}

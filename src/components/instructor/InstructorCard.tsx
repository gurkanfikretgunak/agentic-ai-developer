import Image from "next/image";

const GITHUB_LOGIN = "gurkanfikretgunak";
const LINKEDIN_URL = "https://www.linkedin.com/in/gurkanfikretgunak/";

/* Fallback so the card never breaks if the GitHub API is unreachable. */
const FALLBACK_PROFILE = {
  name: "Gürkan Fikret Günak",
  login: GITHUB_LOGIN,
  bio: "AI | Mobile Team Lead | Cursor Ambassador",
  avatarUrl: `https://avatars.githubusercontent.com/u/52853374?v=4`,
  htmlUrl: `https://github.com/${GITHUB_LOGIN}`,
  followers: 219,
  publicRepos: 54,
};

interface GitHubUser {
  name: string | null;
  login: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
}

async function getProfile() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_LOGIN}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_PROFILE;
    const user = (await res.json()) as GitHubUser;
    return {
      name: user.name ?? FALLBACK_PROFILE.name,
      login: user.login,
      bio: user.bio ?? FALLBACK_PROFILE.bio,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      followers: user.followers,
      publicRepos: user.public_repos,
    };
  } catch {
    return FALLBACK_PROFILE;
  }
}

export interface InstructorCopy {
  kicker: string;
  role: string;
  followers: string;
  repos: string;
  becomePrefix: string;
  becomeLink: string;
  becomeSubject: string;
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/**
 * Monochrome instructor card driven by live GitHub profile data,
 * shown in the hero section.
 */
export async function InstructorCard({ copy }: { copy: InstructorCopy }) {
  const profile = await getProfile();

  return (
    <div className="mt-8 max-w-2xl">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
        {copy.kicker}
      </span>
      <div className="instructor-card group mt-3 flex items-center gap-5 border border-white/15 bg-white/[0.03] p-5">
        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 rounded-full border border-white/25 grayscale transition duration-500 group-hover:border-white/60 group-hover:grayscale-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-base font-bold text-white">{profile.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              {copy.role}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-white/55">{profile.bio}</p>
          <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <span>
              <span className="font-bold text-white/70">{profile.followers}</span>{" "}
              {copy.followers}
            </span>
            <span>
              <span className="font-bold text-white/70">{profile.publicRepos}</span>{" "}
              {copy.repos}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub — Gürkan Fikret Günak"
            className="flex h-10 w-10 items-center justify-center border border-white/25 text-white/60 transition hover:border-white hover:bg-white hover:text-black"
          >
            <GitHubMark className="h-4 w-4" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn — Gürkan Fikret Günak"
            className="flex h-10 w-10 items-center justify-center border border-white/25 text-white/60 transition hover:border-white hover:bg-white hover:text-black"
          >
            <LinkedInMark className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mt-2 font-mono text-[10px] tracking-wide text-white/35">
        {copy.becomePrefix}{" "}
        <a
          href={`mailto:academy@masterfabric.co?subject=${encodeURIComponent(copy.becomeSubject)}`}
          className="text-white/60 underline decoration-white/25 underline-offset-2 transition hover:text-white hover:decoration-white"
        >
          {copy.becomeLink}
        </a>
      </p>
    </div>
  );
}

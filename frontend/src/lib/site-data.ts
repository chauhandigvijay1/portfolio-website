import portfolioFallbackJson from "@/data/portfolio-fallback.json";
import type { GithubSummary, PortfolioContent } from "@/types/portfolio";

const portfolioFallback = portfolioFallbackJson as PortfolioContent;

const defaultGithubSummary: GithubSummary = {
  user: {
    login: portfolioFallback.profile.githubUsername,
    name: portfolioFallback.profile.name,
    publicRepos: 0,
    profileUrl: portfolioFallback.profile.github,
  },
  topRepos: [],
  recentEvents: [],
};

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(
  /\/$/,
  "",
);

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

async function fetchJson<T>(pathname: string, fallback: T, revalidate = 3600): Promise<T> {
  try {
    const url = `${apiBaseUrl}${pathname}`;
    const response = await fetch(url, {
      next: { revalidate },
    });

    if (!response.ok) {
      console.error(`API request failed: ${url} - Status: ${response.status}`);
      throw new Error(`Failed to fetch ${pathname}: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error fetching ${pathname}:`, error);
    return fallback;
  }
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  return fetchJson<PortfolioContent>("/api/content/site", portfolioFallback, 3600);
}

export async function getGithubSummary(): Promise<GithubSummary> {
  return fetchJson<GithubSummary>(
    "/api/github/summary",
    defaultGithubSummary,
    1800
  );
}

export { portfolioFallback };

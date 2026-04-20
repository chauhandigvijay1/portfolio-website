import { PortfolioShell } from "@/components/site/portfolio-shell";
import { getGithubSummary, getPortfolioContent } from "@/lib/site-data";

export const revalidate = 1800;

export default async function Home() {
  const [content, github] = await Promise.all([getPortfolioContent(), getGithubSummary()]);

  return <PortfolioShell content={content} github={github} />;
}

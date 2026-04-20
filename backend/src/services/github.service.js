const axios = require("axios");
const { env } = require("../config/env");
const { logger } = require("../config/logger");

const githubRestClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "digvijay-portfolio-api",
    ...(env.githubToken ? { Authorization: `Bearer ${env.githubToken}` } : {})
  },
  timeout: 10000
});

function formatEvent(event) {
  const base = {
    id: event.id,
    type: event.type,
    repo: event.repo?.name || "",
    createdAt: event.created_at
  };

  if (event.type === "PushEvent") {
    return {
      ...base,
      action: "pushed commits",
      detail:
        event.payload?.commits?.[0]?.message || `${event.payload?.size || 0} commit activity recorded`
    };
  }

  if (event.type === "CreateEvent") {
    return {
      ...base,
      action: `created ${event.payload?.ref_type || "resource"}`,
      detail: event.payload?.ref || "new repository activity"
    };
  }

  if (event.type === "WatchEvent") {
    return {
      ...base,
      action: "starred repository",
      detail: event.repo?.name || ""
    };
  }

  return {
    ...base,
    action: event.type.replace("Event", "").toLowerCase(),
    detail: event.repo?.name || ""
  };
}

async function getGithubSummary() {
  try {
    const [userResponse, reposResponse, eventsResponse] = await Promise.all([
      githubRestClient.get(`/users/${env.githubUsername}`),
      githubRestClient.get(`/users/${env.githubUsername}/repos`, {
        params: {
          per_page: 100,
          sort: "updated"
        }
      }),
      githubRestClient.get(`/users/${env.githubUsername}/events/public`, {
        params: {
          per_page: 10
        }
      })
    ]);

    const repos = reposResponse.data.filter((repo) => !repo.fork);
    const topRepos = [...repos]
      .sort((left, right) => new Date(right.pushed_at) - new Date(left.pushed_at))
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        url: repo.html_url
      }));

    return {
      user: {
        login: userResponse.data.login,
        name: userResponse.data.name,
        publicRepos: userResponse.data.public_repos,
        profileUrl: userResponse.data.html_url
      },
      topRepos,
      recentEvents: eventsResponse.data.slice(0, 8).map(formatEvent)
    };
  } catch (error) {
    logger.error({ err: error }, "Failed to fetch GitHub summary.");
    return {
      user: null,
      topRepos: [],
      recentEvents: []
    };
  }
}

module.exports = {
  getGithubSummary
};

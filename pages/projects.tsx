import { Octokit } from '@octokit/core';
import Projects from '../components/Projects';

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface ProjectsPageProps {
  repositories: Repository[];
}

export async function getStaticProps() {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const response = await octokit.request('GET /users/{username}/repos', {
      username: 'kylepeeler',
      type: 'owner',
      sort: 'updated',
      per_page: 100
    });

    // Filter out forks and sort by stars
    const repositories = response.data
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12) // Show top 12 projects
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updated_at: repo.updated_at
      }));

    return {
      props: {
        repositories
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return {
      props: {
        repositories: []
      },
      revalidate: 3600
    };
  }
}

export default function ProjectsPage({ repositories }: ProjectsPageProps) {
  return <Projects repositories={repositories} />;
}

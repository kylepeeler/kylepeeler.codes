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

export interface ProjectsProps {
  repositories?: Repository[];
}

const Projects = ({ repositories }: ProjectsProps) => {
  // If no repositories provided, show the under construction message
  if (!repositories || repositories.length === 0) {
    return (
      <div className="text-gray-700 w-full flex flex-col my-16 dark:text-white">
        <h2 className="block mb-4 text-3xl font-bold tracking-tight">
          Projects
        </h2>
        <div className="block">
          🚧👷‍♂️ This section is under construction, but for now, check them out
          on my&nbsp;
          <a className="underline" href="https://github.com/kylepeeler">
            GitHub
          </a>
          !
        </div>
        <a className="block" href="https://github.com/kylepeeler">
          <button className="my-8">View GitHub Profile 🔗 →</button>
        </a>
      </div>
    );
  }

  return (
    <div className="text-gray-700 w-full flex flex-col my-16 dark:text-white">
      <h2 className="block mb-4 text-3xl font-bold tracking-tight">Projects</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A collection of open source projects and experiments I&apos;ve been
        working on.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {repositories.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-200 hover:border-gray-300 dark:hover:border-gray-600"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {repo.name}
              </h3>
              {repo.language && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {repo.language}
                </span>
              )}
            </div>

            {repo.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                ⭐ {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                🍴 {repo.forks_count}
              </span>
            </div>

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {repo.topics.slice(0, 5).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      <a
        className="block text-center"
        href="https://github.com/kylepeeler"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="my-4">View More on GitHub 🔗 →</button>
      </a>
    </div>
  );
};

export default Projects;

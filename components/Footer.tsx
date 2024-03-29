import Link from 'next/link';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

const Footer: React.FC = () => (
  <footer className="flex flex-col justify-center items-start max-w-4xl mx-auto w-full my-8">
    <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    {/* <NowPlaying /> */}
    <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
      <div className="flex flex-col space-y-4">
        <Link href="/">
          <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
        </Link>
        <Link href="/about">
          <a className="text-gray-500 hover:text-gray-600 transition">About</a>
        </Link>
        <Link href="/blog">
          <a className="text-gray-500 hover:text-gray-600 transition">Blog</a>
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        <ExternalLink href="https://twitter.com/_kylepeeler">
          Twitter
        </ExternalLink>
        <ExternalLink href="https://github.com/kylepeeler">GitHub</ExternalLink>
        <ExternalLink href="https://linkedin.com/in/kylepeeler">
          LinkedIn
        </ExternalLink>
      </div>
      <div className="flex flex-col space-y-4">
        <Link href="/uses">
          <a className="text-gray-500 hover:text-gray-600 transition">Uses</a>
        </Link>
        <ExternalLink href="https://kylepeeler.io/resume.pdf">
          Resume
        </ExternalLink>
      </div>
    </div>
  </footer>
);

export default Footer;

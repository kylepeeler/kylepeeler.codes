const PageContentLayout: React.FC<{
  title: string;
  subtitle: string;
  children: any;
}> = ({ title, subtitle, children }) => (
  <>
    <h1 className="text-gray-700 block mb-4 text-3xl tracking-tight font-bold dark:text-white">
      {title}
    </h1>
    <span className="text-gray-500">{subtitle}</span>
    <br />
    {children}
  </>
);

export default PageContentLayout;

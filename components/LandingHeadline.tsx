import GradientText from './gradients/GradientText';
const LandingHeadline = () => {
  return (
    <div className="flex flex-col justify-start items-start max-w-2xl my-12">
      <div className="font-medium text-3xl md:text-5xl tracking-tight mb-4 ">
        <h1 className="flex leading-snug text-gray-700 dark:text-white">
          Hey 👋, I'm
          <GradientText>&nbsp;Kyle Peeler</GradientText>
        </h1>
      </div>
      <span className="text-gray-700 dark:text-white leading-relaxed">
        I am front-end software engineer living in Carmel, IN, and am currently
        working for PactSafe. I love building intuitive and beautiful user
        experiences for the web, and helping to teach other engineers to learn
        and grow along the way. Welcome to my playground!
      </span>
    </div>
  );
};

export default LandingHeadline;

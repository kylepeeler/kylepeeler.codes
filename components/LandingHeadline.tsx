import GradientText from './GradientText';
const LandingHeadline = () => {
  return (
    <div className="flex flex-col justify-start items-start max-w-2xl mb-16">
      <div className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
        <h1 className="flex">
          Hey 👋, I'm
          <GradientText>&nbsp;Kyle Peeler</GradientText>
        </h1>
      </div>
      <div className="block text-gray-500 dark:text-gray-400">
        I am front-end software engineer living in Carmel, IN. I love building
        intuitive and beautiful user experiences for the web. I mostly work with
        Javascript & React. Welcome to my playground.
      </div>
    </div>
  );
};

export default LandingHeadline;

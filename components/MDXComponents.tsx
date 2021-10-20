import Image from 'next/image';

const RoundedImage = (props) => {
  return <Image src={props.src} className="rounded-lg" {...props} />;
};

const MDXComponents = {
  Image,
  RoundedImage
};

export default MDXComponents;

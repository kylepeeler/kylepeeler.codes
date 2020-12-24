import joinClasses from 'classnames';
import { THEME_GRADIENT } from './GradientLine';

const GradientText = ({ as, children, className }) => {
  const Element = as;
  return (
    <Element
      className={joinClasses(
        'bg-clip-text text-transparent text-filter-shadow font-black overflow-visible',
        THEME_GRADIENT,
        className
      )}
    >
      {children}
    </Element>
  );
};

GradientText.defaultProps = {
  as: 'h1',
  className: null
};

export default GradientText;

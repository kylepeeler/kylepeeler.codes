import styled from '@emotion/styled';

// Original CSS designed by Benjamin Réthoré, slightly tweaked by myself
// Found here: https://codemyui.com/pure-css-ampm-toggle-switch/
type StyledDarkModeToggleWrapperProps = { height: number };

const StyledDarkModeToggleWrapper = styled.div<StyledDarkModeToggleWrapperProps>`
  display: inline-flex;
  margin-left: 12px;

  --scale: ${({ height }) => height / 50};

  input {
    display: none;
  }

  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;

    /* Toggle labels */

    /* &:before {
      content: 'Light';
      position: absolute;
      left: -32px;
      top: 12px;
      font-size: 18px;
    } */

    /* &:after {
      content: 'Dark';
      position: absolute;
      right: -48px;
      top: 15px;
      font-size: 18px;
      color: #749ed7;
    } */

    /* @FUTURE: find better way to scale while rounding pixels... repeating calc(var(--scale) * X) is ugly af */
    width: calc(var(--scale) * 90px);
    height: calc(var(--scale) * 50px);
    background-color: #83d8ff;
    border-radius: calc(var(--scale) * 84px);
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .toggle__handler {
    display: inline-block;
    position: relative;
    z-index: 1;
    top: calc(var(--scale) * 3px);
    left: calc(var(--scale) * 3px);
    width: calc(var(--scale) * 44px);
    height: calc(var(--scale) * 44px);
    background-color: #ffcf96;
    border-radius: calc(var(--scale) * 50px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);

    .crater {
      position: absolute;
      background-color: #e8cda5;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      border-radius: 100%;
    }

    .crater--1 {
      top: calc(var(--scale) * 18px);
      left: calc(var(--scale) * 10px);
      width: calc(var(--scale) * 5px);
      height: calc(var(--scale) * 4px);
    }

    .crater--2 {
      top: calc(var(--scale) * 28px);
      left: calc(var(--scale) * 22px);
      width: calc(var(--scale) * 6px);
      height: calc(var(--scale) * 6px);
    }

    .crater--3 {
      top: calc(var(--scale) * 10px);
      left: calc(var(--scale) * 25px);
      width: calc(var(--scale) * 8px);
      height: calc(var(--scale) * 8px);
    }
  }

  .star {
    position: absolute;
    background-color: #fff;
    transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    border-radius: 50%;
  }

  .star--1 {
    top: calc(var(--scale) * 10px);
    left: calc(var(--scale) * 35px);
    z-index: 0;
    width: calc(var(--scale) * 30px);
    height: calc(var(--scale) * 3px);
  }

  .star--2 {
    top: calc(var(--scale) * 18px);
    left: calc(var(--scale) * 28px);
    z-index: 1;
    width: calc(var(--scale) * 30px);
    height: calc(var(--scale) * 3px);
  }

  .star--3 {
    top: calc(var(--scale) * 27px);
    left: calc(var(--scale) * 40px);
    z-index: 0;
    width: calc(var(--scale) * 30px);
    height: calc(var(--scale) * 3px);
  }

  .star--4,
  .star--5,
  .star--6 {
    opacity: 0;
    transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transform: translate3d(calc(var(--scale) * 3px), 0, 0);
    z-index: 0;
  }

  .star--4 {
    top: calc(var(--scale) * 16px);
    left: calc(var(--scale) * 11px);
    width: calc(var(--scale) * 2px);
    height: calc(var(--scale) * 2px);
  }

  .star--5 {
    top: calc(var(--scale) * 32px);
    left: calc(var(--scale) * 17px);
    width: calc(var(--scale) * 3px);
    height: calc(var(--scale) * 3px);
  }

  .star--6 {
    top: calc(var(--scale) * 36px);
    left: calc(var(--scale) * 28px);
    width: calc(var(--scale) * 2px);
    height: calc(var(--scale) * 2px);
  }

  input:checked {
    + .toggle {
      background-color: #749dd6;

      &::before {
        color: #749ed7;
      }

      &::after {
        color: #fff;
      }

      .toggle__handler {
        background-color: #ffe5b5;
        transform: translate3d(calc(var(--scale) * 40px), 0, 0) rotate(0);

        .crater {
          opacity: 1;
        }
      }

      .star--1 {
        width: calc(var(--scale) * 2px);
        height: calc(var(--scale) * 2px);
      }

      .star--2 {
        width: calc(var(--scale) * 4px);
        height: calc(var(--scale) * 4px);
        transform: translate3d(calc(var(--scale) * 5px), 0, 0);
      }

      .star--3 {
        width: calc(var(--scale) * 2px);
        height: calc(var(--scale) * 2px);
        transform: translate3d(calc(var(--scale) * 7px), 0, 0);
      }

      .star--4,
      .star--5,
      .star--6 {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
    }
  }
`;
export const DarkModeToggle = ({
  height,
  checked,
  onChange
}: {
  checked: boolean;
  height: number;
  onChange: () => void;
}) => {
  return (
    <StyledDarkModeToggleWrapper height={height}>
      <input
        type="checkbox"
        className="darkmode-toggle"
        id="darkmode-toggle"
        aria-label="Toggle Dark Mode"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="darkmode-toggle" className="toggle">
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </StyledDarkModeToggleWrapper>
  );
};

DarkModeToggle.defaultProps = {
  height: 32
};

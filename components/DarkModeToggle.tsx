// Designed by Benjamin Réthoré

import styled from '@emotion/styled';

const StyledDarkModeToggleWrapper = styled.div`
  input {
    display: none;
  }
  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 64px;
    height: 40px;
    background-color: #83d8ff;
    border-radius: 84px;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);

    &:before {
      content: '';
      position: absolute;
      left: -40px;
      top: 15px;
      font-size: 18px;
    }

    &:after {
      content: '';
      position: absolute;
      right: -48px;
      top: 15px;
      font-size: 18px;
      color: #749ed7;
    }
  }

  .toggle__handler {
    display: inline-block;
    position: relative;
    z-index: 1;
    top: 3px;
    left: 3px;
    width: 34px;
    height: 34px;
    background-color: #ffcf96;
    border-radius: 40px;
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
      top: 14px;
      left: 8px;
      width: 3px;
      height: 3px;
    }

    .crater--2 {
      top: 22px;
      left: 18px;
      width: 5px;
      height: 5px;
    }

    .crater--3 {
      top: 8px;
      left: 20px;
      width: 7px;
      height: 7px;
    }
  }

  .star {
    position: absolute;
    background-color: #ffffff;
    transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    border-radius: 50%;
  }

  .star--1 {
    top: 8px;
    left: 28px;
    z-index: 0;
    width: 24px;
    height: 2px;
  }

  .star--2 {
    top: 14px;
    left: 23px;
    z-index: 1;
    width: 24px;
    height: 2px;
  }

  .star--3 {
    top: 22px;
    left: 32px;
    z-index: 0;
    width: 24px;
    height: 2px;
  }

  .star--4,
  .star--5,
  .star--6 {
    opacity: 0;
    transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .star--4 {
    top: 13px;
    left: 8.8px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--5 {
    top: 24px;
    left: 14px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--6 {
    top: 29px;
    left: 23px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  input:checked {
    + .toggle {
      background-color: #749dd6;

      &:before {
        color: #749ed7;
      }

      &:after {
        color: #ffffff;
      }

      .toggle__handler {
        background-color: #ffe5b5;
        transform: translate3d(25px, 0, 0) rotate(0);
        .crater {
          opacity: 1;
        }
      }

      .star--1 {
        width: 2px;
        height: 2px;
      }

      .star--2 {
        width: 4px;
        height: 4px;
        transform: translate3d(-5px, 0, 0);
      }

      .star--3 {
        width: 2px;
        height: 2px;
        transform: translate3d(-7px, 0, 0);
      }

      .star--4,
      .star--5,
      .star--6 {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .star--4 {
        transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
      .star--5 {
        transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
      .star--6 {
        transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
    }
  }
`;
export const DarkModeToggle = ({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <StyledDarkModeToggleWrapper>
      <input
        type="checkbox"
        className="dn"
        id="dn"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="dn" className="toggle">
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

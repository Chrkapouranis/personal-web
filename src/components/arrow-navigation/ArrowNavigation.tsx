import React from "react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

interface ArrowNavigationProps {
  pagesLength: number;
  currentPage: number;
  turnToPrev: () => void;
  turnToNext: () => void;
  flipToPrev: () => void;
  flipToNext: () => void;
  portraitMode: boolean;
}

interface ButtonPatternProps {
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactElement;
}

const ArrowNavigation: React.FC<ArrowNavigationProps> = ({
  pagesLength,
  currentPage,
  turnToPrev,
  turnToNext,
  flipToPrev,
  flipToNext,
  portraitMode,
}) => {
  const ButtonPattern: React.FC<ButtonPatternProps> = ({ disabled, onClick, icon }) => {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          onClick();
        }}
        className={`${!disabled && "hover:scale-125"}active:scale-100 rounded-2xl bg-white`}
      >
        {icon}
      </button>
    );
  };

  return (
    <div className="w-24 justify-between flex ">
      <ButtonPattern
        disabled={currentPage <= 0}
        onClick={portraitMode ? turnToPrev : flipToPrev}
        icon={<FiArrowLeftCircle size={34} opacity={currentPage <= 0 ? 0.3 : 1} />}
      />

      <ButtonPattern
        disabled={currentPage >= pagesLength}
        onClick={portraitMode ? turnToNext : flipToNext}
        icon={<FiArrowRightCircle size={34} opacity={currentPage >= pagesLength ? 0.3 : 1} />}
      />
    </div>
  );
};

export default ArrowNavigation;

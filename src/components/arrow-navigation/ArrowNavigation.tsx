import React, { memo } from "react";
import { GiBroadsword } from "react-icons/gi";

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

const ButtonPattern: React.FC<ButtonPatternProps> = memo(({ disabled, onClick, icon }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${
        !disabled && "hover:scale-125"
      } active:scale-100 rounded-2xl transition-all duration-100`}
    >
      {icon}
    </button>
  );
});

const ArrowNavigation: React.FC<ArrowNavigationProps> = ({
  pagesLength,
  currentPage,
  turnToPrev,
  turnToNext,
  flipToPrev,
  flipToNext,
  portraitMode,
}) => {
  return (
    <div className="w-48 justify-between flex px-2">
      <ButtonPattern
        disabled={currentPage <= 0}
        onClick={portraitMode ? turnToPrev : flipToPrev}
        icon={<GiBroadsword size={60} opacity={currentPage <= 0 ? 0.3 : 1} className="rotate-[-135deg]"/>}
      />

      <ButtonPattern
        disabled={currentPage >= pagesLength}
        onClick={portraitMode ? turnToNext : flipToNext}
        icon={<GiBroadsword size={60} opacity={currentPage >= pagesLength ? 0.3 : 1} className="rotate-[45deg]"/>}
      />
    </div>
  );
};

export default memo(ArrowNavigation);

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
      className={`rounded-2xl transition-transform duration-100 ${
        !disabled ? "hover:scale-125" : ""
      } active:scale-100`}
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
  const isPrevDisabled = currentPage <= 0;
  const isNextDisabled = currentPage >= pagesLength;

  const buttons = [
    {
      disabled: isPrevDisabled,
      onClick: portraitMode ? turnToPrev : flipToPrev,
      icon: (
        <GiBroadsword size={60} opacity={isPrevDisabled ? 0.3 : 1} className="rotate-[-135deg]" />
      ),
    },
    {
      disabled: isNextDisabled,
      onClick: portraitMode ? turnToNext : flipToNext,
      icon: (
        <GiBroadsword size={60} opacity={isNextDisabled ? 0.3 : 1} className="rotate-[45deg]" />
      ),
    },
  ];

  return (
    <div className="w-48 flex justify-between px-2">
      {buttons.map((btn, idx) => (
        <ButtonPattern key={idx} {...btn} />
      ))}
    </div>
  );
};

export default memo(ArrowNavigation);

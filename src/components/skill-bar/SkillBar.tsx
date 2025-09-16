import React from "react";

interface SkillBarProps {
  skillNumber: number;
  title: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ skillNumber, title }) => {
  const colors = ["bg-orange-200", "bg-orange-300", "bg-orange-400", "bg-orange-500", "bg-orange-600"];

  return (
    <div className="w-[100%] flex flex-row mt-[0.5%]  items-center justify-between pl-[5%] pr-[5%]">
      <span className={`${title === "C#" && "font-serif"} truncate max-w-[40%] text-md`}>{title}</span>
      <div className="w-[60%] flex flex-row justify-between">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div
              key={index}
              className={`w-[17.5%] h-2 rounded-lg ${index + 1 <= skillNumber ? colors[index] : "bg-white"}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SkillBar;

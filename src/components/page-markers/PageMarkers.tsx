import React from "react";

interface PageMarkersProps {
  pagesLength: number;
  pageNumber: number;
  isFocused: boolean;
  currentPage: number;
  flipTo: (page: number) => void;
}

const colorMap: Record<string, string> = {
  pink: "bg-pink-400",
  red: "bg-red-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
};

const PageMarkers: React.FC<PageMarkersProps> = ({ pagesLength, pageNumber, isFocused, currentPage, flipTo }) => {
  const pages = [
    { color: "pink", icon: 1 },
    { color: "red", icon: 2 },
    { color: "green", icon: 3 },
    { color: "yellow", icon: 4 },
    { color: "blue", icon: 5 },
  ];

  const isOdd = (num: number) => num % 2 !== 0;

  const markers = isOdd(pageNumber)
    ? Array.from({ length: pageNumber }, (_, index) => {
        const { color, icon } = pages[index % pages.length];
        return (
          <div
            key={index}
            className={`h-[100%] w-7 ${colorMap[color]} flex items-center justify-center rounded hover:cursor-pointer ${
              isFocused && index === pageNumber - 1 ? "font-bold" : ""
            } ${!isFocused && index < pageNumber - 2 ? "opacity-0" : ""}`}
            onClick={() => {
              flipTo(icon);
            }}
          >
            {icon}
          </div>
        );
      })
    : Array.from({ length: pagesLength - pageNumber }, (_, index) => {
        const { color, icon } = pages[(index + pageNumber - 1) % pages.length];
        return (
          <div
            key={index}
            className={` h-[100%] w-7 ${colorMap[color]} flex items-center justify-center rounded hover:cursor-pointer ${
              isFocused && index === 0 ? "font-bold" : ""
            } ${!isFocused && index > pageNumber - 1 && currentPage > 0 ? "opacity-0" : ""}`}
            onClick={() => {
              flipTo(icon);
            }}
          >
            {icon}
          </div>
        );
      });

  return (
    <div
      className={`h-14 px-4 flex gap-2 ${
        !isOdd(pageNumber) && "justify-end"
      } bg-gray-300 transition-all duration-[0ms] absolute -top-0 w-[100%]`}
    >
      {markers}
    </div>
  );
};

export default PageMarkers;

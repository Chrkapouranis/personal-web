import React, { useState, useEffect } from "react";
import { FiUser, FiTrendingUp, FiBookOpen, FiCrosshair } from "react-icons/fi";
import bookmark from "../../Bookmark.png";

interface PageMarkersProps {
  pagesLength: number;
  pageNumber: number;
  isFocused: boolean;
  currentPage: number;
  flipTo: (page: number) => void;
}

const PageMarkers: React.FC<PageMarkersProps> = ({
  pagesLength,
  pageNumber,
  isFocused,
  currentPage,
  flipTo,
}) => {
  const pages = [
    { page: 1, icon: <FiUser size={pageNumber === 1 ? 30 : 20} /> },
    { page: 2, icon: <FiTrendingUp size={pageNumber === 2 ? 30 : 20} /> },
    { page: 3, icon: <FiBookOpen size={pageNumber === 3 ? 30 : 20} /> },
    { page: 4, icon: <FiCrosshair size={pageNumber === 4 ? 30 : 20} /> },
  ];

  const isOdd = (num: number) => num % 2 !== 0;
  const commonParentClsName =
    "scale-x-115 w-10 h-16 relative flex items-center justify-center overflow-hidden";

  const renderMarker = (page: number, icon: React.ReactElement, index: number, showBookmark: boolean, opacityClass?: string) => (
    <div
      key={index}
      className={`${commonParentClsName} ${opacityClass || ""} ${
        currentPage === page ? "hover:cursor-auto" : "hover:cursor-pointer"
      }`}
      onClick={() => flipTo(page)}
    >
      {showBookmark && <img src={bookmark} alt="bookmark" className="absolute z-0 w-10 h-32" />}
      <span className="z-10 mt-2">{icon}</span>
    </div>
  );

  const markers = (() => {
    if (pageNumber === 0) {
      return Array.from({ length: pagesLength - 1 }, (_, index) => {
        const { page, icon } = pages[index % pages.length];
        let opacityClass = "";
        if (!isFocused) {
          if (pageNumber < currentPage && index < currentPage - pageNumber - 2) opacityClass = "opacity-0";
          if (pageNumber > currentPage && index < pageNumber - 2) opacityClass = "opacity-0";
        }
        return renderMarker(page, icon, index, false, opacityClass);
      });
    }

    if (isOdd(pageNumber)) {
      const length = pageNumber === pagesLength ? pageNumber - 1 : pageNumber;
      return Array.from({ length }, (_, index) => {
        const { page, icon } = pages[index % pages.length];
        let opacityClass = "";
        if (!isFocused) {
          if (pageNumber < currentPage && index < currentPage - pageNumber - 2) opacityClass = "opacity-0";
          if (pageNumber > currentPage && index < pageNumber - 2) opacityClass = "opacity-0";
        }
        return renderMarker(page, icon, index, true, opacityClass);
      });
    }

    // even pageNumber
    return Array.from({ length: pagesLength - pageNumber }, (_, index) => {
      const { page, icon } = pages[(index + pageNumber - 1) % pages.length];
      let opacityClass = "";
      if (!isFocused && index > pageNumber - 1 && currentPage > 0) opacityClass = "opacity-0";
      return renderMarker(page, icon, index, true, opacityClass);
    });
  })();

  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentPage > 0 && currentPage < pagesLength) {
      timer = setTimeout(() => setShowBg(true), 750);
    } else {
      setShowBg(false);
    }
    return () => clearTimeout(timer);
  }, [currentPage, pagesLength]);

  return (
    <div
      className={`h-16 px-4 flex gap-2 ${
        !isOdd(pageNumber) ? "justify-end" : ""
      } transition-all duration-[0ms] absolute top-4 w-full ${showBg ? "bg-[#b88457]" : ""}`}
    >
      {markers}
    </div>
  );
};

export default PageMarkers;

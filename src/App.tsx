import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import cover from "./cover.jpg";
import PageMarkers from "./components/page-markers/PageMarkers";
import ArrowNavigation from "./components/arrow-navigation/ArrowNavigation";

type PageFlipBook = {
  pageFlip: () => {
    getCurrentPageIndex: () => number;
    flipNext: (corner: string) => void;
    flipPrev: (corner: string) => void;
    flip: (page: number, corner: string) => void;
    turnToPage: (page: number) => void;
    turnToPrevPage: () => void;
    turnToNextPage: () => void;
  };
};

const pagesLength = 5;

const App = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const portraitMode = windowSize.width < 860;
  const animationPadding = windowSize.width * 0.35;

  const bookRef = useRef<PageFlipBook | null>(null);

  const [bookRightPadding, setBookRightPadding] = useState(animationPadding);
  const [bookLeftPadding, setBookLeftPadding] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onInit = () => {
    if (currentPage === 0) {
      setTimeout(() => {
        setBookRightPadding(0);
        if (!portraitMode) {
          bookRef?.current?.pageFlip()?.flip(1, "bottom");
        }
      }, 1250);
    }
  };

  const onFlip = () => {
    const index = bookRef?.current?.pageFlip()?.getCurrentPageIndex();
    if (index === 0) {
      setBookRightPadding(animationPadding);
      setBookLeftPadding(0);
    } else if (index === pagesLength) {
      setBookRightPadding(0);
      setBookLeftPadding(animationPadding);
    } else {
      setBookRightPadding(0);
      setBookLeftPadding(0);
    }

    if (index !== undefined) {
      setCurrentPage(index);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth > 360 ? window.innerWidth : 360,
          height: window.innerHeight > 360 ? window.innerHeight : 360,
        });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-svh h-svh bg-gray-300 flex justify-center items-center overflow-auto min-h-[360px] min-w-360[px]">
      <div className="absolute z-10" style={{ top: (windowSize.height - windowSize.height * 0.8) / 2 }}>
        <ArrowNavigation
          pagesLength={pagesLength}
          currentPage={currentPage}
          turnToPrev={() => bookRef.current?.pageFlip().turnToPrevPage()}
          turnToNext={() => bookRef.current?.pageFlip().turnToNextPage()}
          flipToPrev={() => bookRef.current?.pageFlip().flipPrev("bottom")}
          flipToNext={() => bookRef.current?.pageFlip().flipNext("bottom")}
          portraitMode={portraitMode}
        />
      </div>

      <div
        className={`bg-gray-300 flex justify-center items-center ${
          !portraitMode && "transition-[padding] duration-[1000ms]"
        }  overflow-hidden relative`}
        style={{ paddingRight: portraitMode ? 0 : bookRightPadding, paddingLeft: portraitMode ? 0 : bookLeftPadding }}
      >
        <HTMLFlipBook
          key={windowSize.width}
          style={{}}
          startPage={currentPage}
          size="fixed"
          width={portraitMode ? windowSize.width * 0.85 : windowSize.width * 0.35}
          height={windowSize.height * 0.8}
          minWidth={0}
          maxWidth={0}
          minHeight={0}
          maxHeight={0}
          drawShadow={false}
          flippingTime={1000}
          usePortrait={portraitMode}
          startZIndex={1}
          autoSize={false}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={false}
          clickEventForward={false}
          useMouseEvents={false}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={true}
          ref={bookRef}
          onInit={onInit}
          onFlip={onFlip}
          className=""
        >
          <div className="bg-gray-300 pt-14">
            <img src={cover} alt="cover" className="h-[100%] w-[100%] border-solid border-black border-2" />
          </div>

          <div className="pt-14">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={1}
                isFocused={currentPage === 1}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip()?.flip(page, "bottom")}
              />
            )}

            <div className="h-[100%]  border-2 border-solid border-black bg-orange-100 font-serif text-lg p-[2.5%] justify-center z-10">
              <p className=" text-center font-bold h-[5%] flex justify-center items-center">About me</p>
              <p className="text-center mt-[5%] text-wrap overflow-y-auto h-[90%] my-scrollbar ">
                I’m Christos Kapouranis, a software developer from Greece with a background in Automation Engineering and a
                passion for building user-focused applications. I specialize in React and React Native with experience across
                the full development lifecycle, from designing intuitive interfaces to deploying scalable solutions. My
                projects range from smart home applications to mobile apps like my personal project Limpid, a hydration
                tracker available on the Play Store. I enjoy exploring new technologies, solving real-world problems through
                code and continuously expanding my skills in modern software development.
              </p>
            </div>
          </div>

          <div className="pt-14">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={2}
                isFocused={currentPage + 1 === 2}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className="h-[100%]  border-2 border-solid border-black bg-orange-100 font-serif text-lg p-[2.5%] justify-center z-10">
              <p className=" text-center font-bold h-[5%] flex justify-center items-center">About me</p>
              <p className="text-center mt-[5%] text-wrap overflow-y-auto h-[90%] my-scrollbar ">bbb</p>
            </div>
          </div>

          <div className="pt-14">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={3}
                isFocused={currentPage === 3}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className="h-[100%]  border-2 border-solid border-black bg-orange-100 font-serif text-lg p-[2.5%] justify-center z-10">
              <p className=" text-center font-bold h-[5%] flex justify-center items-center">About me</p>
              <p className="text-center mt-[5%] text-wrap overflow-y-auto h-[90%] my-scrollbar ">ccc</p>
            </div>
          </div>

          <div className="pt-14">
            {portraitMode ? null : (
              <PageMarkers
                pagesLength={pagesLength}
                pageNumber={4}
                isFocused={currentPage + 1 === 4}
                currentPage={currentPage}
                flipTo={(page) => bookRef.current?.pageFlip().flip(page, "bottom")}
              />
            )}

            <div className="h-[100%]  border-2 border-solid border-black bg-orange-100 font-serif text-lg p-[2.5%] justify-center z-10">
              <p className=" text-center font-bold h-[5%] flex justify-center items-center">About me</p>
              <p className="text-center mt-[5%] text-wrap overflow-y-auto h-[90%] my-scrollbar ">ddd</p>
            </div>
          </div>

          <div className="pt-14">
            <p className="bg-black h-[100%]"></p>
          </div>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default App;

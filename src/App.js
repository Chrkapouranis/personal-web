import HTMLFlipBook from "react-pageflip";
import logo from "./logo.svg";
import cover from "./cover.jpg";

const App = () => {
  const heightPx = window.innerHeight;

  return (
    <div className="w-lvw h-lvh bg-gray-300 flex justify-center items-center">
      <HTMLFlipBook width={(heightPx * 80) / 100 / 1.25} height={(heightPx * 80) / 100} size="fixed" drawShadow={true} showCover={true} maxShadowOpacity={0.3}>
        <div className="border-solid border-black border-2 bg-red-500">
          <img src={cover} alt="logo" style={{ height: "100%", width: "100%" }} />
        </div>
        <div className="border-solid border-black border-2 bg-green-500">
          <img src={logo} alt="logo" />
        </div>
        <div className="border-solid border-black border-2 bg-yellow-500">
          <img src={logo} alt="logo" />
        </div>
        <div className="border-solid border-black border-2 bg-blue-500">
          <img src={logo} alt="logo" />
        </div>
        <div className="border-solid border-black border-2 bg-pink-500">
          <img src={logo} alt="logo" />
        </div>
        <div className="border-solid border-black border-2 bg-black">
          <img src={logo} alt="logo" />
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default App;

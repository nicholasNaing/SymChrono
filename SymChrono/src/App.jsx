import Calander from "./Components/Calander";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import { AnimatePresence } from "framer-motion";
import Testing from "./Components/Testing";
import Canvas from "./Components/Canvas";
import JournalLog from "./Components/JournalLog";

function App() {
  const location = useLocation();
  return (
    <>
      <div
        className={`w-[100dvw] h-[100dvh] flex flex-col justify-center items-center bg-cover bg-top
          `}
        style={{
          backgroundImage: `url('assets/ghibiliNight.png')`,
        }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="calander" element={<Calander />} />
            <Route path="personal" element={<Canvas />} />
            <Route path="journal-log" element={<JournalLog />} />
            <Route path="*" element={<Testing />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;

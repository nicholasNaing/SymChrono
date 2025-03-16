import { usePersonalData } from "../Contexts/DataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCalander } from "../Contexts/GeoTimeProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useSwitchSection } from "../Contexts/SwitchSection";

function Testing() {
  const { calanderDate } = useCalander();

  console.log(calanderDate);
  const navigate = useNavigate();
  const {
    diary,
    setDiary,
    flashCards,
    setFlashCards,
    reflectData,
    setReflectData,
    emotionData,
    setEmotionData,
    dayRatingData,
    setDayRatingData,
    spendingData,
    setSpendingData,
  } = usePersonalData();

  useEffect(() => {
    try {
      const [
        // diaryDataResponse,
        // flashcardDataResponse,
        selfanalysisDataResponse,
      ] = Promise.all([
        axios.post(`http://127.0.0.1:8000/api/flashcard`, {
          flashcardPostData: flashCards,
        }),
        axios.post(`http://127.0.0.1:8000/api/diary`, diary),
        axios.post("http://127.0.0.1:8000/api/self-analysis", {
          reflectPostData: reflectData,
          emotionPostData: emotionData,
          ratingPostData: dayRatingData,
          expensePostData: spendingData,
        }),
        axios.post(`http://127.0.0.1:8000/api/finished-journal`, {
          currentMonth: calanderDate.getMonth() + 1,
          calanderDate: calanderDate.getDate(),
          hasJournal: 1,
        }),
      ]).then(
        ([
          // diaryDataResponse,
          // flashcardDataResponse,
          selfanalysisDataResponse,
        ]) => {
          // console.log(diaryDataResponse.data);
          // console.log(flashcardDataResponse.data);
          console.log(selfanalysisDataResponse.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const { section, setSection } = useSwitchSection();
  const [toggle, setToggle] = useState(true);

  const [rating, setRating] = useState();

  const starVariant = {
    hidden: {
      y: -700,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
    closed: {
      y: 700,
      opacity: 0,
    },
  };

  return (
    <div>
      {/* AnimatePresence allows for exit animations */}
      {/* <AnimatePresence mode="wait">
        {toggle ? (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: "-100vh" }}
          >
            <div>This content will disappear with an exit animation</div>
          </motion.div>
        ) : (
          <motion.div
            key="alternate"
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: "100vh" }}
          >
            <div>This is the alternate content</div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Button to toggle between the content */}
      {/* <div
        onClick={() => setToggle(!toggle)}
        className="text-slate-100 shadow-bottom-left-inset shadow-slate-200 p-3"
      >
        Toggle
      </div> */}

      <motion.div
        onHoverStart={() => {
          console.log("hi");
        }}
        whileHover={{ scale: 1.3 }}
      >
        Hover me
      </motion.div>
      <div>{section}</div>
      <div
        className="border-2 border-slate-100 p-3 text-slate-200 w-[50%] mx-auto"
        onClick={() => {
          setSection(0);
          navigate("/");
        }}
      >
        Home
      </div>
    </div>
  );
}

export default Testing;

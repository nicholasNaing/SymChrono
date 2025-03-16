import React, { useState, useEffect } from "react";
import { TextareaAutosize } from "@mui/base";
import { useCalander } from "../Contexts/GeoTimeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { TextField } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { usePersonalData } from "../Contexts/DataContext";
import { useNavigate } from "react-router-dom";

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

const reflectionVariant = {
  hidden: {
    opacity: 0,
    zIndex: 1,
  },
  visible: {
    opacity: 1,
    zIndex: 1,
    transition: { duration: 0.7, delay: 0.3 },
  },
  closed: { opacity: 0, zIndex: 0, transition: { duration: 0.3 } },
};

function SelfAnalysis() {
  const { specificDate } = useCalander();
  const [showReflection, setShowReflection] = useState(true); //this is to toogle between reflections and last page
  const [showRate, setShowRate] = useState(false); //this is the booleon value to show the rating feature after the spending
  const [showFinishedButton, setShowFinishedButton] = useState(false); //after finishing the rating, the final finished button will shown
  const { setSection } = useSwitchSection(); //switch section with context
  const {
    reflectData,
    emotionData,
    dayRatingData,
    spendingData,
    setReflectData,
    setEmotionData,
    setDayRatingData,
    setSpendingData,
    flashCards,
  } = usePersonalData();
  const navigate = useNavigate();

  const handleFinish = () => {
    const userConfirmed = confirm("Have you finished filling your journal?");
    if (userConfirmed) {
      const hasEmptyKey = flashCards.some(
        (obj) => obj.content === "" || obj.subject === ""
      );
      if (hasEmptyKey) {
        alert(
          "You have empty content or subject in flashcard section. Can't prodeed"
        );
      } else {
        setSection(0);
        navigate("/testing");
      }
    }
  };

  const handleReflectionSubmit = () => {
    setShowReflection(false);
  };

  return (
    <motion.div
      className={`w-[100%] landscape:h-[100%] flex-grow flex flex-col justify-start gap-3 items-center landscape:pl-2 overflow-y-auto lg:overflow-hidden`}
    >
      <div
        className={`w-[100%] py-2 border-slate-100 border-opacity-15 border-b-2 flex justify-center items-center bg-[#ffffff00] text-lg tracking-wider font-bold font-patrick`}
      >
        Self Analysis For
        <span className={`ml-3 underline text-shadow-custom `}>
          {specificDate.month} {specificDate.date} {specificDate.year}
        </span>
      </div>
      <div className={`w-[100%]`}>
        <form className={`w-[100%]  flex flex-col items-center justify-center`}>
          <TextareaAutosize
            value={emotionData}
            onChange={(e) => setEmotionData(e.target.value)}
            minRows={3} // Start with a minimum of 3 visible lines
            maxRows={5} // Limit to 3 visible lines (will not grow beyond this)
            maxLength={300} // Limit to 150 characters
            placeholder="How do you feel today..."
            className={`w-[100%] resize-none p-[10px] bg-[#00000033] text-slate-50 focus:bg-slate-100 focus:text-slate-900 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-slate-300 rounded-xl`}
          ></TextareaAutosize>
        </form>
      </div>
      {/* here i have to use the AnimatePrsence to wrap both the branches or else lets say if the result is false, it wont go to the motion element and wont fire the exit animation */}
      <AnimatePresence mode="wait">
        {!showReflection ? (
          <motion.div
            variants={reflectionVariant}
            key="alternate"
            initial="hidden"
            animate="visible"
            exit="closed"
            className={`w-[100%] flex flex-col justify-evenly items-center flex-grow`}
          >
            <div
              onClick={() => setShowReflection(true)}
              className={`w-[50%] sm:w-[20%] cursor-pointer border-b-2 border-opacity-20 font-patrick  shadow-inbox shadow-slate-100 py-[0.25rem] text-slate-200 bg-[#00000033] rounded-md`}
            >
              go back
            </div>
            <div className={`w-[80%]`}>
              <TextField
                autoComplete="off"
                value={spendingData}
                onChange={(e) => setSpendingData(e.target.value)}
                variant="standard"
                label="How much did you spend today?"
                className={`w-[100%]`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowRate(true);
                    e.target.blur();
                  }
                }}
                sx={{
                  "& .MuiFormLabel-root, .MuiInputBase-root.MuiInput-root": {
                    color: "white",
                    letterSpacing: "0.125rem",
                    fontFamily: "Patrick Hand, mono",
                  },
                  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
                    color: "white",
                  },

                  "& .MuiInputBase-root.MuiInput-root:after": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInputBase-root.MuiInput-root:before": {
                    borderBottomColor: "#ffffff33",
                  },
                  "&:hover .MuiInputBase-input.MuiInput-input:before": {
                    borderBottomColor: "#ffffff4d",
                  },
                }}
              />
            </div>
            {showRate && (
              <div className={`flex flex-col items-center gap-3`}>
                <motion.div
                  variants={reflectionVariant}
                  className={`font-bold text-slate-100 font-patrick text-lg tracking-wider`}
                >
                  Rate your day
                </motion.div>
                <motion.div variants={starVariant} className="rate flex  ">
                  {Array.from({ length: 10 }).map((_, index) =>
                    dayRatingData > index ? (
                      <motion.div variants={starVariant} id={index} key={index}>
                        <StarRateIcon
                          style={{ fontSize: "1.8rem" }} // Responsive size based on viewport width
                          className={`star text-slate-100`}
                          onClick={() => {
                            setDayRatingData(index + 1);
                            setShowFinishedButton(true);
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div variants={starVariant} id={index} key={index}>
                        <StarRateIcon
                          style={{ fontSize: "1.8rem" }}
                          className={`star`}
                          onClick={() => {
                            setDayRatingData(index + 1);
                            setShowFinishedButton(true);
                          }}
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>
              </div>
            )}
            {showFinishedButton && (
              <motion.div
                variants={reflectionVariant}
                className={`sm:w-[30%] cursor-pointer border-2 border-opacity-10 font-patrick shadow-inbox shadow-slate-100 px-3 py-2 text-slate-200 bg-[#00000033] rounded-md`}
                onClick={handleFinish}
              >
                finished
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={reflectionVariant}
            key="modal"
            initial="hidden"
            animate="visible"
            exit="closed"
            className={`w-[100%] flex flex-col flex-grow gap-7 p-3 bg-[#00000033] rounded-md overflow-y-auto`}
          >
            <div
              className={`text-slate-200 text-left max-h-[20%] font-patrick leading-5`}
            >
              Reflect yourself and count your blessings
            </div>
            <form
              className={`flex flex-col flex-grow gap-3 overflow-y-auto`}
              onSubmit={handleReflectionSubmit}
            >
              <div>
                <TextareaAutosize
                  value={reflectData.blue}
                  onChange={(e) =>
                    setReflectData({ ...reflectData, blue: e.target.value })
                  }
                  minRows={1}
                  maxRows={2}
                  maxLength={150}
                  placeholder="What good quality did you show today?"
                  className={`w-[100%] resize-none p-2 bg-[#00000033] text-slate-50 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-blue-400 rounded-md`}
                />
              </div>
              <div>
                <TextareaAutosize
                  value={reflectData.green}
                  onChange={(e) =>
                    setReflectData({ ...reflectData, green: e.target.value })
                  }
                  minRows={1}
                  maxRows={2}
                  maxLength={150}
                  placeholder="What did you do today to build yourself?"
                  className={`w-[100%] resize-none p-2 bg-[#00000033] text-slate-50 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-green-400 rounded-md`}
                />
              </div>
              <div>
                <TextareaAutosize
                  value={reflectData.orange}
                  onChange={(e) =>
                    setReflectData({ ...reflectData, orange: e.target.value })
                  }
                  minRows={1}
                  maxRows={2}
                  maxLength={150}
                  placeholder="In what aspect do you think you can get better?"
                  className={`w-[100%] resize-none p-2 bg-[#00000033] text-slate-50 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-orange-400 rounded-md`}
                />
              </div>
              <div>
                <TextareaAutosize
                  value={reflectData.red}
                  onChange={(e) =>
                    setReflectData({ ...reflectData, red: e.target.value })
                  }
                  minRows={1}
                  maxRows={2}
                  maxLength={150}
                  placeholder="Did you hurt someone today?"
                  className={`w-[100%] resize-none p-2 bg-[#00000033] text-slate-50 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-red-400 rounded-md`}
                />
              </div>
              <div>
                <TextareaAutosize
                  value={reflectData.yellow}
                  onChange={(e) =>
                    setReflectData({ ...reflectData, yellow: e.target.value })
                  }
                  minRows={1}
                  maxRows={2}
                  maxLength={150}
                  placeholder="What one blessing you appreciate today?"
                  className={`w-[100%] resize-none p-2 bg-[#00000033] text-slate-50 focus:placeholder:text-slate-400 placeholder:text-slate-400 outline-none font-patrick tracking-wider shadow-bottom-left-inset shadow-yellow-400 rounded-md`}
                />
              </div>
              <div className={`flex justify-evenly`}>
                <div
                  onClick={() => {
                    handleReflectionSubmit();
                    setSection((prevState) => prevState - 1);
                  }}
                  className={`w-[30%] cursor-pointer font-patrick shadow-top-right-inset shadow-slate-300 p-[0.3rem] text-slate-200 bg-[#00000033] rounded-md`}
                >
                  back
                </div>
                <div
                  onClick={handleReflectionSubmit}
                  className={`w-[30%] cursor-pointer font-patrick shadow-top-right-inset shadow-slate-300 p-[0.3rem] text-slate-200 bg-[#00000033] rounded-md`}
                >
                  continue
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SelfAnalysis;

import React, { useState, useReducer, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useCalander } from "../Contexts/GeoTimeProvider";
import TextField from "@mui/material/TextField";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { useSwitchSection } from "../Contexts/SwitchSection";
import { usePersonalData } from "../Contexts/DataContext";
import { FlashCardsReducer } from "../Reducers/FlashCardsReducer";

const slideDownInVariant = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: {
    opacity: 1,
    y: 0,
  },

  closed: {},
};

function FlashCards() {
  const initialState = {
    cardContent: [],
  };
  const [state, dispatch] = useReducer(FlashCardsReducer, initialState);
  const [provideId, setProvideId] = useState(0);

  const { setSection } = useSwitchSection();

  const { specificDate } = useCalander();

  const { flashCards, setFlashCards } = usePersonalData();

  const cardSubRef = useRef();

  const cardContentRef = useRef();

  const newCardRef = useRef();

  const handleCardFormSubmit = (e, passedCardId) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cardSubject = formData.get("subject").trim(); //used trim to remove white spaces
    const cardContent = formData.get("content").trim();
    const editMode = false;
    if (cardSubject || cardContent) {
      dispatch({
        type: "updateCardContent",
        payload: { passedCardId, cardSubject, cardContent, editMode },
      });
    }
  };

  const handleNewCards = (e) => {
    const editModeOrNot = state.cardContent.some(
      (card) => card.cardEditMode === true
    );
    if (!editModeOrNot) {
      const newId = provideId + 1;
      setProvideId(newId);
      dispatch({
        type: "storeCardContent",
        payload: {
          subject: "",
          content: "",
          cardId: newId,
          cardEditMode: true,
        },
      });
    } else {
      alert("You already have unsaved card!");
    }
  };

  const closingEditModeBeforeLeavingPage = () => {
    const editModeOrNot = state.cardContent.some(
      (card) => card.cardEditMode === true
    ); //this will check if there is no saved cards in the flashcard list
    console.log(editModeOrNot);
    if (editModeOrNot) {
      //if so, below will get the value of the sub and cont form the text field of unsaved
      const residualCardSub = cardSubRef.current.querySelector("input").value;

      const residualCardCont =
        cardContentRef.current.querySelector("#content").value;

      const checkTheUnsavedValues = !!(residualCardSub || residualCardCont);

      console.log("This sheck", checkTheUnsavedValues);

      //below will check if the text field got the value or not if so, it will update the flashcard list

      if (checkTheUnsavedValues) {
        const closedEditModeArray = state.cardContent.map((cardData) => {
          if (cardData.subject !== "" || cardData.content !== "") {
            return {
              subject: cardData.subject,
              content: cardData.content,
              cardId: cardData.cardId,
              cardEditMode: false,
            };
          } else {
            console.log(residualCardSub, residualCardCont);
            return {
              subject: residualCardSub,
              content: residualCardCont,
              cardId: cardData.cardId,
              cardEditMode: false,
            };
          }
        });
        if (closedEditModeArray.length > 0) {
          dispatch({ type: "cleanList" });
          setFlashCards(closedEditModeArray);
          // ? logic here is if there is unsaved card list, first of all, it will clean the list. Now the list is empty.
          // ? this way we can substitute the whole list.
          // ? using dispatch didnt work as it's quite complex with the state update and stuff, so i add the array to the setFlashCards.
          // ? flashCard is already declared in the useEffect, so it works as intended
        }
      } else {
        console.log("This is called or not?");
        dispatch({ type: "cleanEditTrueList" });
      }
    } else {
      console.log("All of them are not in edit mode");
    }
  };

  useEffect(() => {
    console.log("ran after the card insertion");
    console.log(state.cardContent);
    if (newCardRef.current) {
      newCardRef.current.focus();
    }
    // const refLength = newCardRef.current.length;
    // if (refLength > 0) {
    //   newCardRef.current[refLength - 1].focus();
    //   console.log(newCardRef);
    // }
  }, [state.cardContent.length]);

  useEffect(() => {
    if (flashCards.length > 0) {
      dispatch({
        type: "storeCardContent",
        payload: flashCards,
      });
    }
  }, [flashCards.length]);

  return (
    <motion.div
      className={`w-[100%] lg:h-[100%] flex-grow flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden landscape:pl-2`}
    >
      {!state.cardContent.length > 0 ? (
        <motion.div
          //by adding key with cardContent length, animation object will be remounted
          //this is crucial to get the expected results for other components(<divs>) too as if this component dead or treated as mounted, it will stuck in initial which will never show on screen
          key={state.cardContent.length}
          variants={slideDownInVariant}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.2,
            type: "spring",
            bounce: 0.4,
          }}
          className={`text-slate-100 text-shadow-custom text-lg font-patrick tracking-wider font-semibold flex flex-col justify-center items-center  `}
        >
          <p className={`leading-6 mb-3`}>
            {" "}
            Did you learn something new{" "}
            <span className={`text-green-500`}>today?</span>
          </p>
          <p className={`leading-6 mb-3`}>Wann share with us?</p>
          <p className={`leading-6 mb-3`}>
            <span className={`text-blue-400`}>Make cards </span>to share what
            you learned today
          </p>
          <AddIcon
            fontSize="medium"
            className={`box-content mt-5 p-3 text-slate-100 border-2 border-slate-100 rounded-[30%] cursor-pointer shadow-slate-100 hover:shadow-inbox`}
            onClick={handleNewCards}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`w-[100%] h-[100%] flex flex-col overflow-hidden`}
        >
          <div
            className={`text-slate-100 text-shadow-custom text-lg font-patrick border-b-2 w-[100%] h-[30%] border-slate-50 border-opacity-50 flex flex-col justify-evenly items-center`}
          >
            <p>
              Things you have learned on{" "}
              <span>
                {specificDate.month} {specificDate.date} {specificDate.year}
              </span>
            </p>
            <AddIcon
              fontSize="medium"
              className={`box-content p-3 text-slate-100 border-2 border-slate-100 rounded-[30%] cursor-pointer shadow-slate-100 hover:shadow-inbox`}
              onClick={(e) => handleNewCards(e)}
            />
          </div>
          <div
            className={`flashcards-container w-[100%] flex flex-nowrap gap-3 items-center flex-grow overflow-x-auto lg:py-3`}
          >
            <AnimatePresence mode="popLayout">
              {state.cardContent.map((card, index) => {
                //whats happening with this map function and dom is that
                //first if we ever use array with ref.current, and if we add dom elements,
                //it will add the element it self but what i did here is that, with map, dom element doesnt change
                //but i only populate with new datas from the useReducer.
                //For eg, for each, render with added items, it will keep adding new dom element but old ones are still there
                //so what i did is that by setting it to index 0 for ref, it will keep pointing to oldest element with newest data from useReducer

                //good way to think about this is react virtual dom and js dom
                // when we use map, yes it added new elements and it seems like we are created all the elements from the start
                // again and again with each render, but the thing is
                // lets say, in first render, there is one item in map and it added to the virtual dom and then js dom
                // in second render, it creates a new item then map would re populate it with virtual doms
                // then with reconcilation, virtual dom update the js dom with just the changed part which in this case would be newly added one item while old one is still there
                if (card.cardEditMode) {
                  return (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7 }}
                      key={card.subject ? card.subject : card.content}
                      className="bg-[#00003866] p-2 shadow-inbox shadow-slate-50 w-[calc(80%)] lg:w-[calc(50%)] max-h-[100%] lg:h-[calc(90%)] flex-shrink-0 rounded-md flex flex-col items-center"
                      onSubmit={(e) => handleCardFormSubmit(e, card.cardId)}
                    >
                      <TextField
                        defaultValue={card.subject ? card.subject : ""}
                        autoComplete="off"
                        name="subject"
                        placeholder={`subject`}
                        variant="standard"
                        ref={cardSubRef}
                        className={`w-[100%] flex justify-center items-center border-b-2 border-slate-100 border-opacity-50  h-[30%] focus:bg-black`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // prevent form submission

                            e.target.form[1].focus(); // move focus to next TextareaAutosize
                          }
                        }}
                        inputRef={index === 0 ? newCardRef : null}
                        // inputRef={(el) => (newCardRef.current[index] = el)} //el here is a dom element pass to the current array
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white",
                            fontSize: "1.1rem",
                            fontFamily: "Patrick Hand, mono",
                            fontWeight: "bold",
                            padding: "1.1rem",
                            letterSpacing: "0.1rem",
                            textAlign: "center", // Center the text while typing
                          },
                          "& .MuiInputBase-input:focus": {
                            outlineColor: "transparent",
                          },
                        }}
                      />
                      <TextField
                        defaultValue={card.content ? card.content : ""}
                        autoComplete="off"
                        name="content"
                        placeholder={"your content goes here..."}
                        className={`w-[100%] border-2 border-slate-100 border-opacity-50 max-h-[90%] mt-2`}
                        variant="standard"
                        ref={cardContentRef}
                        id="content"
                        minRows={4}
                        maxRows={5}
                        multiline
                        sx={{
                          "& .MuiInputBase-input": {
                            color: "white",
                            lineHeight: "1.5",
                            padding: "1.1rem",
                            overflowY: "auto",
                            fontFamily: "Patrick Hand, mono",
                            fontWeight: "bold",
                            letterSpacing: "0.1rem",
                          },
                          "& .MuiInputBase-input:focus": {
                            outlineColor: "transparent",
                          },
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            console.log("Next line");
                            console.log(e);
                          }
                        }}
                      ></TextField>
                      <div
                        className={`w-[100%] flex justify-center items-center flex-grow`}
                      >
                        <button
                          type="submit"
                          className={`w-[40%] text-sm shadow-inbox shadow-slate-100 py-[0.125rem] lg:p-2 text-slate-100`}
                        >
                          save
                        </button>
                      </div>
                    </motion.form>
                  );
                } else {
                  const splitedContent = card.content.split("\n");
                  console.log(card.cardId);
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: "100vh" }}
                      transition={{ duration: 0.3 }}
                      key={card.cardId}
                      className="bg-[#00003866] text-slate-50 p-2 shadow-inbox shadow-slate-50 w-[calc(80%)] lg:w-[calc(50%)] max-h-[calc(90%)] h-[calc(60%)] flex-shrink-0 rounded-md flex flex-col"
                    >
                      <div
                        className={`w-[100%] flex items-center border-b-2 border-slate-100 border-opacity-50  h-[30%] focus:bg-black justify-evenly relative`}
                      >
                        <DeleteOutline
                          className="cursor-pointer text-red-800 shadow-red-600 hover:text-shadow-custom rounded-md absolute top-1 right-1"
                          onClick={() =>
                            dispatch({
                              type: "deleteCard",
                              payload: {
                                deleteCardId: card.cardId,
                              },
                            })
                          }
                        />
                        <div className={`font-patrick`}>{card.subject}</div>

                        <EditNoteOutlinedIcon
                          onClick={() => {
                            dispatch({
                              type: "updateCardContent",
                              payload: {
                                passedCardId: card.cardId,
                                cardSubject: card.subject,
                                cardContent: card.content,
                                editMode: true,
                              },
                            });
                          }}
                          className={`cursor-pointer text-orange-400 absolute top-1 left-1`}
                        />
                      </div>
                      <div
                        className={`w-[100%] border-2 border-slate-100 border-opacity-20 flex-grow max-h-[70%] mt-2 flex flex-col p-[0.25 rem] font-patrick overflow-y-auto`}
                      >
                        {splitedContent.map((contentSentence, index) => {
                          return (
                            <div
                              key={index}
                              className={`flex py-2 border-opacity-10  border-b-2 border-slate-100`}
                            >
                              <div className={`w-2/12`}> =&gt; </div>
                              <div
                                className={`w-11/12 text-left tracking-wide`}
                              >
                                {contentSentence}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                }
              })}
            </AnimatePresence>
          </div>
          <div className="flex w-[100%] justify-evenly items-center">
            <div
              onClick={() => {
                setSection((prevState) => prevState - 1);
                setFlashCards(state.cardContent); //here before user leaves the page, it will saved the data into the context
                closingEditModeBeforeLeavingPage();
              }}
              className="cursor-pointer border-slate-50 border-2 px-3 text-slate-200 shadow-top-right-inset shadow-slate-100 rounded-sm  flex justify-center items-center"
            >
              back
            </div>
            <div
              onClick={() => {
                setSection((prevState) => prevState + 1);
                setFlashCards(state.cardContent); //here before user leaves the page, it will saved the data into the context
                closingEditModeBeforeLeavingPage();
              }}
              className="cursor-pointer border-slate-50 border-2 px-3 text-slate-200 shadow-top-right-inset shadow-slate-100 rounded-sm flex justify-center items-center"
            >
              next
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default FlashCards;

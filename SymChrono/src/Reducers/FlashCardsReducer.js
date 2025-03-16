export const FlashCardsReducer = (state, action) => {
  switch (action.type) {
    case "typeCardSubInput":
      return {
        ...state,
        cardSubInput: action.payload,
      };
    case "typeCardContentInput":
      return {
        ...state,
        cardContentInput: action.payload,
      };
    case "clearInput":
      return {
        ...state,
        cardSubInput: "",
        cardContentInput: "",
      };
    case "storeCardContent":
      if (Array.isArray(action.payload)) {
        console.log(action.payload);

        return {
          ...state,
          cardContent: [...state.cardContent, ...action.payload],
        };
      }
      return { cardContent: [action.payload, ...state.cardContent] };
    case "updateCardContent":
      const passedData = action.payload;
      if (passedData.cardSubject || passedData.cardContent) {
        const updatedArray = state.cardContent.map((cardData, index) => {
          if (passedData.passedCardId === cardData.cardId) {
            if (!cardData.cardEditMode) {
              //this mean card is about to save using save button. That's why cardEditMode is false which is the before state of card item
              return {
                subject: passedData.cardSubject,
                content: passedData.cardContent,
                cardId: passedData.passedCardId,
                cardEditMode: passedData.editMode,
              };
            } else {
              return {
                subject: passedData.cardSubject,
                content: passedData.cardContent,
                cardId: passedData.passedCardId,
                cardEditMode: passedData.editMode,
              };
            }
          }
          return cardData;
        });

        return {
          ...state,
          cardContent: updatedArray,
        };
      }
    case "cleanList":
      console.log("Cleaning the list");
      return {
        ...state,
        cardContent: [],
      };

    case "deleteCard":
      const deletedItemArray = state.cardContent.filter(
        (card) => card.cardId !== action.payload.deleteCardId
      );
      return {
        ...state,
        cardContent: deletedItemArray,
      };
    case "cleanEditTrueList":
      //this list will clean out the item which edit mode is true.
      // the point is there would be only one edit mode true possible theoretically, and this will be called if content and subject is both empty

      const updatedAllFilledList = state.cardContent.filter(
        (card) => card.cardEditMode === false
      );
      console.log(updatedAllFilledList);
      return {
        ...state,
        cardContent: updatedAllFilledList,
      };

    default:
      return state;
  }
};

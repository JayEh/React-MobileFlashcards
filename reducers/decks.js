import { ADD_DECK, ADD_CARD_TO_DECK, DELETE_DECK } from '../actions/decks'
import { DEFAULT_DECKS } from '../utils/helper'

// copy the value of property param into ignoreMe, and the rest of the object into ...state, and return it
const deleteProperty = ({[property]: ignoreMe, ...state}, property) => state

export default function decks(state = DEFAULT_DECKS, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,   // spread the state
                [action.deck.id]: {...action.deck} // add key (deckid) to state and spread deck properties
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,   // spread the state
                [action.deckId]: {  // access the deck id property for the deck
                    ...state[action.deckId],  // spread the deck 
                    questions: state[action.deckId].questions.concat([action.question]) //add a question
                }
            }
        case DELETE_DECK:
            return Object.assign({}, deleteProperty(state, action.deckId))
        default:
            return state
    }
}
import { ADD_QUESTION_ANSWER, DELETE_ANSWERS } from '../actions/user'
import { ADD_DECK, DELETE_DECK } from '../actions/decks'
import { DEFAULT_ANSWERS } from '../utils/helper'

// copy the value of property param into ignoreMe, and the rest of the object into ...state, and return it
const deleteProperty = ({[property]: ignoreMe, ...state}, property) => state

export default function questionAnswers(state = DEFAULT_ANSWERS, action) {
    switch (action.type) {
        case ADD_QUESTION_ANSWER:
            return {
                ...state, // spread the provided state
                [action.deckId]: {  // select the deck
                    ...state[action.deckId], // spread the state of the deck
                    questions: state[action.deckId].questions.concat([{ // concat the new answer to the list
                        questionId: action.questionId,
                        selectedOption: action.selectedOption
                    }])
                }
            }
        // when a quiz is reset, delete the answers so the quiz can be taken again
        case DELETE_ANSWERS: 
            return {
                ...state, // spread the provided state
                [action.deckId]: {  // select the deck
                    ...state[action.deckId], // spread the state of the deck
                    questions: []  // clear out the questions 
                }
            }
        // when a deck is added, make a place for its answers
        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]: {
                    ...state[action.deck.id],
                    questions: []
                }
            }
        case DELETE_DECK:
            return Object.assign({}, deleteProperty(state, action.deckId))
        default:
            return state
    }
}
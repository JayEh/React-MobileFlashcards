import { combineReducers } from 'redux'
import decks from './decks'
import questionAnswers from './user' 

export default combineReducers({
    questionAnswers,
    decks
})
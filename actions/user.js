export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const DELETE_ANSWERS = 'DELETE_ANSWERS'

export function addQuestionAnswer({ deckId, questionId, selectedOption }) {
    return {
        type: ADD_QUESTION_ANSWER,
        deckId,
        questionId,
        selectedOption
    }
}

export function deleteAnswers({ deckId }) {
    return {
        type: DELETE_ANSWERS,
        deckId
    }
}
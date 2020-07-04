export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCardToDeck(deckId, question) {
    return {
        type: ADD_CARD_TO_DECK,
        deckId,
        question
    }
}
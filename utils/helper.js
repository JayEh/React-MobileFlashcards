import AsyncStorage from '@react-native-community/async-storage'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

export async function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(async () => await Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    // raise a notification tomorrow at 7 pm if no quizzes have been answered
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() +1)
    tomorrow.setHours(19)
    tomorrow.setMinutes(0)
    
    return {
        content: {
            title: 'Take a quiz!',
            body: 'Have you considered taking a quiz today?'
        },
        trigger: tomorrow
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.getAsync(Permissions.NOTIFICATIONS)
                    .then( async ({ status }) => {
                        if (status === 'granted') {
                            await Notifications.cancelAllScheduledNotificationsAsync()
                            await Notifications.scheduleNotificationAsync(createNotification())
                            // the handler decides if the user will actually see the notification
                            // after it's been triggered
                            Notifications.setNotificationHandler({
                                handleNotification: async () => ({
                                    shouldShowAlert: true,
                                    shouldPlaySound: true,
                                    shouldSetBadge: true,
                                }),
                            })

                            await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
                    .catch((err) => console.log(err))
            }
        })
}


export const DEFAULT_DECKS = {
    0: {
        id: 0,
        name: 'Outer Space',
        questions: [{
            id: 0,
            question: 'Space is so vast because someone with long arms stretched it.',
            answer: 'Whoever said that, sorry, that\'s not how space works!'
        }, {
            id: 1,
            question: 'Sunsets on Mars are blue.',
            answer: 'That\'s right! The light is filtered through fine dust in the Mars atmosphere.'
        }]
    },
    1: {
        id: 1,
        name: 'Computing',
        questions: [{
            id: 0,
            question: 'The abacus is the oldest known computing device.',
            answer: 'Correct! The abacus was invented over 5000 years ago.'
        }, {
            id: 1,
            question: 'ENIAC was the first electronic, programmable computer.',
            answer: 'It was! The ENIAC was completed in 1945 and was the first programmable computer.'
        }]
    },
    2: {
        id: 2,
        name: 'Fungus',
        questions: [{
            id: 0,
            question: 'Human beings are a distant relative of fungus.',
            answer: 'Correct! In evolutionary terms, the organism that lead to modern humans split from fungus around 600 million years ago.',
        }, {
            id: 1,
            question: 'All mushrooms are edible as food.',
            answer: 'Many types of mushroom should not be eaten and are dangerous to consume.',
        }, {
            id: 2,
            question: 'As a member of the plant kingdom, fungus plays an important role in the ecosystem.',
            answer: 'Fungus is actually in the kingom Fungi! Fungus is not a plant.',
        }]
    }
}

export const DEFAULT_ANSWERS = {
    0: {
        questions: [
            {
                questionId: 0,
                selectedOption: ''
            },
            {
                questionId: 1,
                selectedOption: ''
            }
        ]
    },

    1: {
        questions: [
            {
                questionId: 0,
                selectedOption: ''
            },
            {
                questionId: 1,
                selectedOption: ''
            }
        ]
    },
    2: {
        questions: []
    }
}

export const getRandomId = () => {
    // it's a fairly big number that will suffice for a random unique id
    return Math.floor(Math.random() * 10000000000)
}

const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY'
const USER_STORAGE_KEY = 'USER_STORAGE_KEY'

export async function createAsyncStore() {
    // create a user object that tracks what decks and what quizzes have been completed
    // and what the user's answers were

    try {
        const storedData = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
        if (!storedData)
            await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(DEFAULT_DECKS))
    } catch (e) {
        console.log(e)
    }
}

export async function getDecks() {
    try {
        return await AsyncStorage.getItem(DECKS_STORAGE_KEY).then(res => JSON.parse(res))
    } catch (e) {
        console.log(e)
    }
}

export async function saveDecks(decks) {
    try {
        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    } catch (e) {
        console.log(e)
    }
}

export async function getDeck(deckId) {
    return await getDecks().then(decks => decks[deckId])
}

export async function saveCardToDeck(deckId, question, answer) {
    // load decks
    const decks = await getDecks().then(decks => decks)
    const id = this.getRandomId()
    decks[deckId].questions.push({ id, question, answer })
    // save decks

    await saveDecks(decks)
}

export async function saveDeckTitle(deckTitle) {
    // load decks
    let decks = await getDecks().then(decks => decks)

    // add to decks
    let id = Math.max(Object.keys(decks)) + 1
    decks[id] = {
        id,
        name: deckTitle,
        questions: []
    }
    // save decks
    await saveDecks(decks)
}
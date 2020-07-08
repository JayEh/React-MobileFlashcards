import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addQuestionAnswer, deleteAnswers } from '../actions/user'
import { setLocalNotification } from '../utils/helper'

const Stack = createStackNavigator()

const SHOW_QUESTION = 'SHOW_QUESTION'
const SHOW_ANSWER = 'SHOW_ANSWER'

class Quiz extends Component {
    state = {
        activeBody: SHOW_QUESTION
    }

    anyCardsInDeck = () => {
        return this.props.deck.questions.length > 0
    }

    allQuestionsAnswered = () => {
        // if there are no answers, then they can't be all answered
        if(Object.keys(this.props.questionAnswers).length === 0) 
            return false
        
        return this.props.deck.questions.length === this.props.questionAnswers.questions.length
    }

    noCardsView = () => {
        return (
            <Text style={styles.text}>This deck has no cards in it! Please add a few.</Text>
        )
    }

    resetQuiz = () => {
        const { dispatch, deck } = this.props
        dispatch(deleteAnswers({ deckId: deck.id }))
    }

    finalScoreView = () => {
        const { deck, questionAnswers } = this.props
        const totalQuestions = deck.questions.length
        let correctAnswers = questionAnswers.questions.filter(q => q.selectedOption === "Correct").length
        const percentCorrect = Math.round(correctAnswers / totalQuestions * 100)


        return (
            <View style={styles.finalScore}>
                <Text style={styles.textHeader}>Nice work!</Text>
                <Text style={styles.text}>You completed the {deck.name} quiz and scored</Text>
                <Text style={styles.text}>{correctAnswers} / {totalQuestions}</Text>
                <Text style={styles.text}>{percentCorrect}%</Text>
                <TouchableOpacity onPress={() => this.resetQuiz()}>
                    <Text style={styles.reset}>Reset the Quiz</Text>  
                </TouchableOpacity>
            </View>
        )
    }

    getUnansweredQuestion = () => {
        // this method is assuming that the deck already has cards in it
        const { deck, questionAnswers } = this.props
        const deckQuestionIds = deck.questions.map(q => q.id)
        const answeredQuestionIds = questionAnswers.questions.map ? questionAnswers.questions.map(q => q.questionId) : []
        const unansweredQuestionIds = deckQuestionIds.filter(q => !answeredQuestionIds.includes(q))
        return deck.questions.filter(d => d.id === unansweredQuestionIds[0])[0]
    }

    toggleAnswer = () => {
        this.setState((prevState) => ({
            activeBody: prevState.activeBody === SHOW_ANSWER ? SHOW_QUESTION : SHOW_ANSWER
        }))
    }

    answerQuestion = (questionId, selectedOption) => {
        const { dispatch, deck } = this.props
        dispatch(addQuestionAnswer({
            deckId: deck.id,
            questionId,
            selectedOption
        }))

        // this function will reset the daily notification when the user takes a quiz
        // it will delete today's notification and add another for tomorrow
        setLocalNotification()
    }

    goBack = () => {
        const { navigation } = this.props
        navigation.navigate('Deck', { deckId: this.props.deck.id })
    }

    render() {
        // have any cards been added to this deck? 
        if (!this.anyCardsInDeck()) 
            return this.noCardsView()

        // are all the questions already answered?
        if (this.allQuestionsAnswered())
            return this.finalScoreView()

        // get an unanswered question to render
        const { deck, questionAnswers } = this.props
        const unansweredQuestion = this.getUnansweredQuestion()

        // let the user know how many questions there are to go
        const totalQuestions = deck.questions.length
        const currentQuestionNumber = questionAnswers.questions.length +1

        // make the main page! 
        return (
            <View style={styles.container}>
                {this.state.activeBody === SHOW_QUESTION && (
                    <Fragment>
                        <Text style={styles.textHeader}>You're answering the {deck.name} quiz.</Text>  
                        <Text>Question {currentQuestionNumber} of {totalQuestions}.</Text>  
                        <Text style={[styles.text, styles.question]}>Your next question:</Text>

                        <Text style={styles.text}>{unansweredQuestion.question}</Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={[styles.button, styles.correctNotSelected]} onPress={() => this.answerQuestion(unansweredQuestion.id, 'Correct')}>
                                <Text>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.incorrectNotSelected]} onPress={() => this.answerQuestion(unansweredQuestion.id, 'Incorrect')}>
                                <Text>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.showAnswer} onPress={() => this.toggleAnswer()}>
                            Show the Answer
                        </Text>

                        <TouchableOpacity onPress={() => this.goBack()}>
                            <Text style={styles.goBack}>Go Back to Deck</Text>
                        </TouchableOpacity>
                        
                    </Fragment>
                )}

                {this.state.activeBody === SHOW_ANSWER && (
                    <Fragment>
                        <Text style={[styles.text, styles.question]}>Answer:</Text>
                        <Text style={styles.text}>{unansweredQuestion.answer}</Text>
                        <Text style={[styles.text, styles.goBack]} onPress={() => this.toggleAnswer()}>Go back to the question.</Text>
                    </Fragment>
                )}
            </View>
        )
    }
}

function mapStateToProps({ decks, questionAnswers }, props) {
    const { deckId } = props.route.params
    return {
        deck: decks[deckId],
        questionAnswers: questionAnswers[deckId]
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    goBack: {
        marginTop:200,
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    question: {
        fontWeight: 'bold'
    },
    buttonRow: {
        flexDirection: 'row',
        marginLeft:25,
        marginTop:55
    },
    button: {
        margin: 15,
        padding: 20,
    },
    correctNotSelected:{
        backgroundColor: '#c2e2c6'
    },
    correctSelected:{
        backgroundColor: '#29da3d'
    },
    incorrectNotSelected:{
        backgroundColor: '#e2c2c2'
    },
    incorrectSelected:{
        backgroundColor: '#da2929'
    },
    finalScore: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 25,
        color: 'black'
    },
    text: {
        fontSize: 20,
        margin: 20
    },
    showAnswer: {
        marginTop:100,
        color: 'darkred'
    }
})

export default connect(mapStateToProps)(Quiz)
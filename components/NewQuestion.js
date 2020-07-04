import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from '../actions/decks'
import { getRandomId } from '../utils/helper'

class NewQuestion extends Component {
    state = {
        question: '',
        answer: '',
        correctOption: ''
    }

    inputChanged = (field, value) => {
        this.setState({ [field]: value })
    }

    handleSubmit = () => {
        // get some initial details
        const { deckId } = this.props.route.params
        const { navigation, dispatch, decks } = this.props
        const { question, answer, correctOption } = this.state

        // make a new object that is the new question
        const questionId = getRandomId()
        const newQuestion = {
            id: questionId,
            question,
            answer,
            correctOption
        }

        // add the new card to the deck
        dispatch(addCardToDeck(
            deckId,
            newQuestion
        ))

        // navigate back with the updated deck object
        navigation.navigate('Deck', { deckId })
    }


    render() {
        const correctButtonStyle = this.state.correctOption === 'Correct' ? styles.correctSelected :  styles.correctNotSelected
        const incorrectButtonStyle = this.state.correctOption === 'Incorrect' ? styles.incorrectSelected : styles.incorrectNotSelected
        const submitDisabled = this.state.question.length === 0 || this.state.answer.length === 0 || this.state.correctOption.length === 0

        return (
            <View>
                <Text style={styles.title}>Create a new question and add the card to the deck!</Text>

                <Text style={styles.subtitle}>What's the new question / statement?</Text>
                <TextInput 
                    placeholder={'Ex. The sky is green.'}
                    style={styles.textInput} 
                    value={this.state.question} 
                    onChangeText={text => this.inputChanged('question', text)}>
                </TextInput>

                <Text style={styles.subtitle}>What's the correct option?</Text>
                
                <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => this.inputChanged('correctOption', 'Correct')} style={[styles.button, correctButtonStyle]}>
                        <Text>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.inputChanged('correctOption', 'Incorrect')} style={[styles.button, incorrectButtonStyle]}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>What's the answer to your question?</Text>
                <TextInput 
                    placeholder={'Ex. The sky is not green, it\'s blue.'}
                    style={styles.textInput} 
                    value={this.state.answer} 
                    onChangeText={text => this.inputChanged('answer', text)}>
                </TextInput>
                
                <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()} disabled={submitDisabled}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        marginLeft:25,
        marginBottom:25
        
    },
    button: {
        margin: 15,
        marginBottom: 25,
        padding: 20
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
    textInput: {
        backgroundColor: 'white',
        margin: 15,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        color: 'black',
        padding: 25

    },
    subtitle: {
        fontSize: 15,
        padding: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 25
    }
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(NewQuestion)
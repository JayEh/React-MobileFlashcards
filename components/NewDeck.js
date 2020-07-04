import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions/decks'
import { getRandomId } from '../utils/helper'

class DeckList extends Component {
    state = {
        text: ''
    }

    inputChanged = (field, value) => {
        this.setState({ [field]: value })
    }

    addNewDeck = () => {
        // gather some initial data
        const { navigation, dispatch, decks } = this.props
        const name = this.state.text.trim()
        const id = getRandomId()
        const newDeck = {
            id,
            name,
            questions: []
        }

        // reset the text field
        this.setState({text: ''})

        // add the new deck
        dispatch(addDeck(newDeck))

        // navigate to this new deck
        navigation.navigate('Deck', { deckId: id })
    }

    render() {
        const submitDisabled = this.state.text.length === 0

        return (
            <View>
                <Text style={styles.title}>What is the name of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'Name of the new deck'}
                    value={this.state.text}
                    onChangeText={text => this.inputChanged('text', text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.addNewDeck()} disabled={submitDisabled}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(DeckList)
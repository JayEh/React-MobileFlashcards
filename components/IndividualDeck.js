import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deleteDeck } from '../actions/decks'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    countContainer: {
        alignItems: "center",
        padding: 10
    },
    deleteText: {
        color: 'darkred'
    },
    textHeader: {
        fontSize: 25,
        color: 'black'
    },
    text: {
        fontSize: 15,
        margin: 10
    },
})

class IndividualDeck extends Component {
    handleDeleteDeck = () => {
        const { deckId } = this.props.route.params
        const { dispatch, navigation } = this.props
        dispatch(deleteDeck(deckId))
        navigation.navigate('home')
    }

    render() {
        const { deckId } = this.props.route.params
        const { navigation, decks } = this.props
        const deck = decks[deckId]
        if (!deck) return null

        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Take the {deck.name} quiz!</Text>
                <Text style={styles.text}>{deck.questions.length} cards.</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz', { deckId })} >
                    <Text>Start the Quiz</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('New Question', { deckId })} >
                    <Text>Add a Card</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handleDeleteDeck()}>
                    <Text style={styles.deleteText}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(IndividualDeck)
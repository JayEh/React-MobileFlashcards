import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getDecks, saveCardToDeck } from '../utils/helper'
import { connect } from 'react-redux'

class DeckList extends Component {
    addCardToDeck = (deckId, question, answer) => {
        this.setState((prevState) => ({
            ...prevState,
            [deckId]: {
                id: deckId,
                question,
                answer
            }
        }))

        saveCardToDeck(deckId, question, answer)
        alert('hello!')
    }
    
    render() {
        const { navigation, decks } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Choose a deck to begin the quiz!</Text>
                {Object.keys(decks).map((id) => (
                    <View key={id}>
                        <Text style={styles.text} onPress={() => navigation.navigate('Deck', { deckId: id })}>{ decks[id].name }</Text>
                        <Text style={styles.cardCount}> {decks[id].questions.length} cards.</Text>
                    </View>
                ))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textHeader: {
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
        paddingBottom: 20
    },
    cardCount: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)
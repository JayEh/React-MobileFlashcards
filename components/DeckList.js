import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { saveCardToDeck } from '../utils/helper'
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
    }
    
    render() {
        const { navigation, decks } = this.props

        return (
            <View style={styles.container}>
                <Text style={styles.textHeader}>Choose a deck to begin the quiz!</Text>
                
                <ScrollView style={styles.scroll}>
                    {Object.keys(decks).map((id) => (
                        <View key={id}>
                            <Text style={styles.text} onPress={() => navigation.navigate('Deck', { deckId: id })}>{ decks[id].name }</Text>
                            <Text style={styles.cardCount}> {decks[id].questions.length} cards.</Text>
                        </View>
                    ))}
                </ScrollView>
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
    scroll: {
        paddingHorizontal: 75
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
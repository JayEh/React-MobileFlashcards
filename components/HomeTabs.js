import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const Tab = createMaterialTopTabNavigator()

export default class HomeTabs extends Component {
    
    render() {
        return (
            <Tab.Navigator initialRouteName="Deck List">
                <Tab.Screen name="Deck List" component={ DeckList } />
                <Tab.Screen name="New Deck" component={ NewDeck } />
            </Tab.Navigator>
        )
    }
}
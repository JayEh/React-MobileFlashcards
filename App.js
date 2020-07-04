import 'react-native-gesture-handler'; // this import needs to be first!
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import IndividualDeck from './components/IndividualDeck'
import NewQuestion from './components/NewQuestion'
import HomeTabs from './components/HomeTabs'
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helper'
// redux related imports
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import and setup redux-persist to save state in AsyncStorage
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// AsyncStorage.clear()  //for debugging, enable to start fresh with every app start
// for an explanation of redux-persist i read: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
// code here modeled after: https://github.com/rt2zz/redux-persist#basic-usage
const persistConfig = {
    key: 'app',
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
const Stack = createStackNavigator()

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="home" options={{ headerShown: false }} component={HomeTabs} />
                            <Stack.Screen name="Deck" component={IndividualDeck} />
                            <Stack.Screen name="New Question" component={NewQuestion} />  
                            <Stack.Screen name="Quiz" component={Quiz} />   
                        </Stack.Navigator>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        )
    }
}
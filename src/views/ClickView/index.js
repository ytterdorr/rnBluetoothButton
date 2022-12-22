import React, { useState, useEffect, Component } from "react"
import { View, Text, Button, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from "react-native";
import Colors from "../../assets/Colors";
import KeyEvent from 'react-native-keyevent';
import ItemsCounter from "../../components/ItemsCounter";
import { Realm } from 'realm';
import { sessionSchema } from "../../realm";
let realm

class ClickView extends Component {
    constructor(props) {
        super(props)
        // TODO get items from profile data or props
        let items = ["nicotine", "plastic", "other"]
        let itemCounts = {}
        for (let item of items) {
            itemCounts[item] = 0;
        }

        this.state = {
            multiClickTimer: null,
            timerRunning: false,
            count: 0,
            multiClickCount: 0,
            keyCode: null,
            items: items,
            itemCounts: itemCounts,
            sessionId: 0
        }
        realm = new Realm({
            path: 'GeoTrashDatabase.realm',
            schema: [
                sessionSchema
            ]
        })

    }

    createSessionInRealm = () => {
        // Create session add to realm
        let id = realm.objects('session_details').sorted('session_id', true).length > 0
            ? realm.objects('session_details').sorted('session_id', true)[0].id + 1
            : 0

        this.setState({ sessionId: id });
        realm.create('session_details', {
            session_id: id,
            items: []
        });
        Alert.alert('Success', `New session with id: ${this.state.sessionId}`, [
            {
                text: 'Ok',
            }
        ],
            { cancelable: true });
    }

    addItemInRealm = () => {
        // Update session, add item
        // get session by id
        let session = realm.objects('session_details').sorted('session_id')
        // Append to item array

    }



    componentDidMount() {
        KeyEvent.onKeyUpListener((keyEvent) => {
            console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
            console.log("KeyUpTimerRunning?", this.state.timerRunning)
            this.onPress()
        })

        KeyEvent.onKeyDownListener((keyEvent) => {
            console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
            console.log(`Action: ${keyEvent.action}`);
            console.log(`Key: ${keyEvent.pressedKey}`);
        });
        // this.createSessionInRealm();
    }

    componentWillUnmount() {
        // if you are listening to keyDown
        KeyEvent.removeKeyDownListener();

        // if you are listening to keyUp
        KeyEvent.removeKeyUpListener();

        //     // if you are listening to keyMultiple
        //    KeyEvent.removeKeyMultipleListener();
    }

    updateItemCount = (multiClickCount) => {
        if (multiClickCount > this.state.items.length) {
            multiClickCount = this.state.items.length
        }

        let index = multiClickCount - 1;
        let selectedItem = this.state.items[index];
        let itemCounts = this.state.itemCounts;
        itemCounts[selectedItem] += 1;
        console.log("ItemCounts in updateItemCount: ", itemCounts)
        this.setState({ itemCounts: itemCounts })
    }

    onTimeOut = () => {
        console.log("Time's up")
        console.log("timer: " + this.state.multiClickTimer);
        this.updateItemCount(this.state.multiClickCount)
        // Reset counters
        this.setState({
            timerRunning: false,
            count: this.state.count + 1,
            multiClickCount: 0
        });


    }



    onPress = (event) => {
        console.log("timerRunning?", this.state.timerRunning);
        if (this.state.timerRunning) {
            clearTimeout(this.state.multiClickTimer);
            this.setState({ multiClickTimer: null })
        }

        this.setState({
            multiClickCount: this.state.multiClickCount + 1,
            multiClickTimer: setTimeout(this.onTimeOut, 500),
            timerRunning: true
        })
        console.log("Pressed Button")
    }

    render() {
        return (

            <SafeAreaView>
                <View style={styles.body}>
                    <Button title="Fake" />
                    <Text style={styles.welcomeText}>Clicker</Text>
                    <Text>{"Multiclick: " + this.state.multiClickCount}</Text>
                    <Text>{"Count: " + this.state.count}</Text>
                    <Text>{"TimerRunning:" + this.state.timerRunning}</Text>
                    <ItemsCounter
                        itemList={this.state.items}
                        itemCounts={this.state.itemCounts} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Start')}
                    >
                        <Text style={styles.buttonText}>
                            Go to start
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onPress}
                    >
                        <Text style={styles.buttonText}>
                            Count some pushes
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: "white",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        color: Colors.primary
    },
    button: {
        backgroundColor: Colors.green,
        color: "white",
        borderRadius: 5,
        padding: 10
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    }

});


export default ClickView;
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Colors from "../../assets/Colors";
import KeyEvent from 'react-native-keyevent';

const StartView = () => {
    const [keyText, setKeyText] = useState("Hellu");

    useEffect(() => {
        KeyEvent.onKeyUpListener((keyEvent) => {
            console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
            setKeyText("Key: " + keyEvent.keyCode);
        })
    }, [])

    return (
        <View style={styles.body}>
            <Text style={styles.welcomeText}>{keyText}</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Go somewhere
                </Text>
            </TouchableOpacity>
        </View>
    )
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

export default StartView;
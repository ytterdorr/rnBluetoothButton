import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../assets/Colors";
import KeyEvent from 'react-native-keyevent';




const ClickView = ({ navigation }) => {
    const [keyText, setKeyText] = useState("Hellu");

    useEffect(() => {
        KeyEvent.onKeyUpListener((keyEvent) => {
            console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
            setKeyText("Key: " + keyEvent.keyCode);
        })
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.welcomeText}>{keyText}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Start')}
                >
                    <Text style={styles.buttonText}>
                        Go to start
                </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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


export default ClickView;
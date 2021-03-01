import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import Colors from "../../assets/Colors";

const StartView = ({ navigation }) => {


    return (
        <SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.welcomeText} >Start View</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Clicker")}
                >
                    <Text style={styles.buttonText}>
                        Go to clicker
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

export default StartView;
import React from "react"
import { View, Text, TouchableOpacity } from "react-native";



const ClickView = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.welcomeText}>Hellu</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Go somewhere
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default ClickView;
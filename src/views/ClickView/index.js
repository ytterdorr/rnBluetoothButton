import React, { useState, useEffect, Component } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Colors from "../../assets/Colors";
import KeyEvent from 'react-native-keyevent';




// const ClickView = ({ navigation }) => {
//     const [keyText, setKeyText] = useState("Hellu");

//     const [count, setCount] = useState(0);
//     const [multiClickTimer, setMultiClickTimer] = useState();
//     const [multiClickCount, setMultiClickCount] = useState(1);
//     const [timerRunning, setTimerRunning] = useState("False");
//     const [testText, setTestText] = useState();

//     const onTimeUp = () => {
//         console.log("Timeout");
//         setTestText("Time up: multiclicks " + multiClickCount);
//         setCount(count => count + 1);
//         setMultiClickCount(1);
//         setTimerRunning(false);
//     }

//     const onPress = (event) => {
//         console.log("timerRunning?", timerRunning);
//         if (multiClickTimer) {
//             clearTimeout(multiClickTimer);
//             console.log("Cleared multiclicktimer?");
//             console.log(multiClickTimer);
//         }
//         setMultiClickCount(multiClickCount => multiClickCount + 1);
//         setMultiClickTimer(setTimeout(onTimeUp, 1000));
//         setTimerRunning("True");
//         console.log(multiClickCount);
//         console.log("timerRunning2?", timerRunning)
//     }

//     useEffect(() => {
//         KeyEvent.onKeyUpListener((keyEvent) => {
//             console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
//             setKeyText("Key: " + keyEvent.keyCode);
//             setTimerRunning("True");
//             console.log("KeyUpTimerRunning?", timerRunning)
//             onPress()
//         })

//         KeyEvent.onKeyDownListener((keyEvent) => {
//             console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
//             console.log(`Action: ${keyEvent.action}`);
//             console.log(`Key: ${keyEvent.pressedKey}`);
//         });

//     }, [])

//     return (
//         <SafeAreaView>
//             <View style={styles.body}>
//                 <Text style={styles.welcomeText}>{keyText}</Text>
//                 <Text>{testText}</Text>
//                 <Text>{"Count: " + count}</Text>
//                 <Text>{timerRunning}</Text>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('Start')}
//                 >
//                     <Text style={styles.buttonText}>
//                         Go to start
//                 </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={onPress}
//                 >
//                     <Text style={styles.buttonText}>
//                         Count some pushes
//                 </Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }


// Click view as a stateful component?

class ClickView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            multiClickTimer: null,
            timerRunning: false,
            count: 0,
            multiClickCount: 0,
            keyCode: null,
        }
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        KeyEvent.onKeyUpListener((keyEvent) => {
            console.log(`onKeyUp keyCode: ${keyEvent.keyCode}`)
            // setKeyText("Key: " + keyEvent.keyCode);
            // setTimerRunning("True");
            console.log("KeyUpTimerRunning?", this.state.timerRunning)
            this.onPress()
        })

        KeyEvent.onKeyDownListener((keyEvent) => {
            console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
            console.log(`Action: ${keyEvent.action}`);
            console.log(`Key: ${keyEvent.pressedKey}`);
        });
    }

    componentWillUnmount() {
        // if you are listening to keyDown
        KeyEvent.removeKeyDownListener();

        // if you are listening to keyUp
        KeyEvent.removeKeyUpListener();

        //     // if you are listening to keyMultiple
        //    KeyEvent.removeKeyMultipleListener();

    }

    onTimeOut = () => {
        console.log("Time's up")
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
            console.log("Cleared multiclicktimer?");
            console.log(this.state.multiClickTimer);
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
                    <Text style={styles.welcomeText}>Clicker</Text>
                    <Text>{"Multiclick: " + this.state.multiClickCount}</Text>
                    <Text>{"Count: " + this.state.count}</Text>
                    <Text>{"TimerRunning:" + this.state.timerRunning}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Start')}
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
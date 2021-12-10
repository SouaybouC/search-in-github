import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView,TextInput, Button } from "react-native";

export default function Home({navigation}) {

    const [input, setInput] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <TextInput value={input} onChangeText={setInput} />
            <Button title= 'validate'  onPress={() => { 
                navigation.navigate('User', {
                    login: input,
                  });
                console.log(input);
            } }/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },

});
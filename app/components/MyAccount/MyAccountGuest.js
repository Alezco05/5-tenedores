import React,{Component} from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native';
import {Button,Image} from 'react-native-elements';

export default class MyAccountGuess extends Component{
    render(){
        return(
            <View>
                <Text>
                    My Account Guess
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
})
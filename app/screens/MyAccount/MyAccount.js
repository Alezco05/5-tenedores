import React,{Component} from 'react';
import {StyleSheet,View,Text} from "react-native";

import * as firebase from  'firebase';
import Toast, {DURATION} from 'react-native-easy-toast';
import MyAccountGuess from '../../components/MyAccount/MyAccountGuest';

import MyAccountUser from '../../components/MyAccount/MyAccountUser'

export default class MyAccount extends Component {
    constructor(){
        super();
        this.state = { login: false }
    }
    async componentDidMount(){
        await firebase.auth().onAuthStateChanged(user => {
            if(user) this.setState ({login: true})
            else this.setState ({login: false})
        });
    }
    goToScreen = nameScreen => this.props.navigation.navigate(nameScreen);
    //
    logout = () => firebase.auth().signOut();   
    //
    render(){
        const {login} = this.state;
        if(login)return <MyAccountUser logout={(this.logout)}/>
        else return  <MyAccountGuess goToScreen={(this.goToScreen)}/>             
    }
}



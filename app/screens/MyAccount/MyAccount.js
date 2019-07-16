import React,{Component} from 'react';
import {StyleSheet,View,Text} from "react-native";
import {Button} from 'react-native-elements';
import * as firebase from  'firebase';

import MyAccountGuess from '../../components/MyAccount/MyAccountGuest';

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
    goToScreen = nameScreen => {
        this.props.navigation.navigate(nameScreen);
    };
    logout = () => firebase.auth().signOut();   
    
    render(){
        const {login} = this.state;
       if(login){
           return (
           <View style={styles.viewBody}>
           <Text>Bienvenido</Text>
           <Button title="Cerrar Sesion" onPress={()=> this.logout()}></Button>
           </View>
           );
        }else{
            return(
               <View style={styles.viewBody}>
                  <Text>MyAccount Screen ...</Text>
                  <Button title="Registro" onPress={()=>this.goToScreen('Register')}/>
                  <Button title="Login" onPress={()=>this.goToScreen('Login')}/>
                </View> 
                //<MyAccountGuess/>
            );
        }
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});


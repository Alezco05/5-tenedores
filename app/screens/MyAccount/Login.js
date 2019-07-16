import React, {Component} from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native'
import t from 'tcomb-form-native';
import {Image, Button } from 'react-native-elements';

import {LoginStruck,LoginOptions} from '../../forms/Login';

const Form = t.form.Form;
const url = "../../../assets/img/5-tenedores-letras-icono-logo.png";
export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginOptions: LoginOptions,
            loginStruck: LoginStruck,
            formErrorMessage: "",
            formData:{
                email : "",
                password : ""
            }
        }
    }
    render(){
        const {loginStruck,loginOptions,formErrorMessage} = this.state;
        return(
            <View style={styles.viewBody}>
                <Image style={styles.logo}
                    source={require(url)}
                    containerStyle={styles.containerLogo}
                    resizeMode= "contain"
                    PlaceholderContent={<ActivityIndicator/>}
                />
                <View style={styles.viewFrom}>
                <Form style={styles.FormStyle}
                  ref="loginForm"
                  type={loginStruck}
                  options = {loginOptions}
                  value={this.state.formData}
              />             
                  
                  <Button title="login" buttonStyle={styles.buttonLoginContainer} />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex:1,   
        marginLeft: 40,
        marginRight:40,
        marginTop: 40,
    },
    containerLogo:{
        alignItems: "center"
    },
    logo:{
        width: 300, 
        height: 150,
     
    },
    viewFrom: {
        marginTop: 50
    },
    buttonLoginContainer: {
        backgroundColor: "#00a680",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    }
});
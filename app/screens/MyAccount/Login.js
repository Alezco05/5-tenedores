import React, {Component} from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native'
import t from 'tcomb-form-native';
import {Image, Button, SocialIcon, Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from  'firebase';
import * as Facebook from 'expo';


import {LoginStruck,LoginOptions} from '../../forms/Login';
const Form = t.form.Form;
const url = "../../../assets/img/5-tenedores-letras-icono-logo.png";
export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginOptions: LoginOptions,
            loginStruck: LoginStruck,
            loginErrorMessage: "",
            loginData:{
                email : "",
                password : ""
            }
        }
    }
    login = () =>{
        const validate = this.refs.loginForm.getValue();
        if (!validate) this.setState({loginErrorMessage: "Los datos del formulario erroneos"});
        else  {
            this.setState({loginErrorMessage: ""});
            firebase.auth().signInWithEmailAndPassword(validate.email,validate.password)
            .then(()=>this.refs.toast.show('Login Correcto ', 500,()=>{
                this.props.navigation.goBack();
            }))
            .catch(error=> this.refs.toast.show('Login incorrecto revise sus datos', 2500))
        }
    };

    onChangeFormLogin = (formValue) => {
        this.setState({loginData:formValue});
    }
    render(){
        const {loginStruck,loginOptions,loginErrorMessage} = this.state;
        return(
            <View style={styles.viewBody}>
                <Image style={styles.logo}
                    source={require(url)}
                    containerStyle={styles.containerLogo}
                    resizeMode= "contain"
                />
                <View style={styles.viewFrom}>
                <Form style={styles.FormStyle}
                  ref="loginForm"
                  type={loginStruck}
                  options = {loginOptions}
                  value={this.state.loginData}
                  onChange = {(formValue) => this.onChangeFormLogin(formValue)}
              />                   
              <Button title="login" buttonStyle={styles.buttonLoginContainer} 
                onPress={()=>this.login()}
                />
                <Text style={styles.textRegister}>¿Aun no tienes cuenta? {" "}
                </Text>
                <Text style={styles.btnRegister} onPress={()=>this.props.navigation.navigate("Register")}>Regístrate</Text>
                <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text> 

                {/* <Divider style= {styles.divider} /> */}
                </View>
                <Toast
                    ref="toast"
                    position='bottom'
                    positionValue={250}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex:1,   
        marginLeft: 40,
        marginRight:40,
        marginTop: 40
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
    },
    loginErrorMessage: {
        color:"#f00",
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    textRegister: {
        marginTop:20,
        textAlign:  "center"       
    },
    btnRegister:{
        color: "#00a680",
        fontWeight: 'bold',
        textAlign:  "center"
    }
});
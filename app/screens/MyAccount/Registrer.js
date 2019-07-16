import React,{Component} from 'react';
import {StyleSheet,View} from "react-native";

import t from 'tcomb-form-native';
import {Button, Text} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as firebase from  'firebase';

import {RegisterOptions,RegisterStruct} from '../../forms/Register'; 



const Form = t.form.Form;

export default class MyAccount extends Component {
    constructor(){
        super();
        this.state = {
            registerStruct:RegisterStruct,
            registerOptions:RegisterOptions,
            formData: {
                name: "",
                lastname:"",
                email: "",
                password: "",
                passwordConfirmation:""
            },
            formErrorMessage: ""
        }
    }
    register = () =>{
        const {password,passwordConfirmation,formErrorMessage} = this.state.formData;
        if(password === passwordConfirmation){
            const validate = this.refs.registerForm.getValue();
            if(validate) {
                this.setState({formErrorMessage:""});
                firebase.auth().createUserWithEmailAndPassword(validate.email,validate.password)
                .then(resolve =>{
                    this.refs.toast.show('Registro correcto!', 200, () => {
                        this.props.navigation.navigate('MyAccount');
                    });
                }).catch(error => this.refs.toast.show('El email ya esta en uso', 2500))
            }
            else {this.setState({formErrorMessage:"Fromulario invalido"});}
        }
        else {this.setState({formErrorMessage:"Las contraseñas no son iguales"});}

        
    }
    onChangeFormRegister = (formValue) => {
        this.setState({formData:formValue});
    }
    render(){
        const {registerStruct,registerOptions,formErrorMessage} = this.state;
        return(
            <View style={styles.viewBody}>
              <Form 
                  ref="registerForm"
                  type={registerStruct}
                  options = {registerOptions}
                  value={this.state.formData}
                  onChange={(formValue)=>this.onChangeFormRegister(formValue)}
              />
              <Button buttonStyle={styles.buttonRegisterContainer} title="Registrarte" onPress={()=>this.register()}/>
              <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
              <Toast
                    ref="toast"
                    position='bottom'
                    positionValue={150}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#fff'}}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        justifyContent: "center",
        marginLeft: 40,
        marginRight: 40
    },
    buttonRegisterContainer: {
        backgroundColor: "#00a680",
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    formErrorMessage: {
        color:"#f00",
        textAlign: "center",
        marginTop: 30
    }
});
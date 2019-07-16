import React from 'react';
import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import InputsTemplate from './templates/Inputs';



export const LoginStruck = t.struct({
    email: formValidation.email,
    password: formValidation.password
});

export const LoginOptions = {
    fields: {
        email: {
            template: InputsTemplate,
            config: {
                placeholder: "Digite su email",
                iconType: "material-community",
                iconName: "at"     
            }      
        },
        password: {
            template: InputsTemplate,
            config: {
                password: true,
                secureTextEntry: true,
                placeholder: "Digite su contraseña",
                iconType: "material-community",
                iconName: "key-variant"     
            }
        }
    }
}
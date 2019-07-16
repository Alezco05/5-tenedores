import React from 'react';
import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import InputsTemplate from './templates/Inputs';


export const RegisterStruct = t.struct({
    name: t.String,
    lastName: t.String,
    email: formValidation.email,
    password: formValidation.password,
    passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
    fields: {
        name: {
            template: InputsTemplate,
            config: {
                placeholder: "Digite su nombre",
                iconType: "material-community",
                iconName: "account-outline"              
            }
        },
        lastName: {
            template: InputsTemplate,
            config: {
                placeholder: "Digite su Apellido",
                iconType: "material-community",
                iconName: "account"     
            }
        },
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
        },
        passwordConfirmation: {
           template: InputsTemplate,
           config: {
               password: true,
               secureTextEntry: true,
               placeholder: "Repita la contraseña",
               iconType: "material-community",
               iconName: "lock"     
            }
        }
    }
}
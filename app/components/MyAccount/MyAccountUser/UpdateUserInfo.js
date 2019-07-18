import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'

//import menuConfig from './menuConfig';
import OverLayOnInput from '../../Elements/OverLayOnInput';
export default class UpdateUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            overlayComponent: null,
            menuConfig:[{
                title: "Cambiar Nombre",
                iconType: "material-community",
                iconNameLeft: "account-circle",
                iconNameRight: "chevron-right",
                color: "#ccc",
                onPress: () => this.openOverLay("Nombre",this.updateUserDisplayName, props.userInfo.displayName)
            }, 
            {
                title: "Cambiar Apellido",
                iconType: "material-community",
                iconNameLeft: "account",
                iconNameRight: "chevron-right",
                color: "#ccc",
                onPress: () => console.log("Haz realizado click en cambiar Apellidos")
            },
            {
                title: "Cambiar Email",
                iconType: "material-community",
                iconNameLeft: "at",
                iconNameRight: "chevron-right",
                color: "#ccc",
                onPress: () => console.log("Haz realizado click en cambiar Email")
            },
            {
                title: "Cambiar Contraseña",
                iconType: "material-community",
                iconNameLeft: "lock-reset",
                iconNameRight: "chevron-right",
                color: "#ccc",
                onPress: () => console.log("Haz realizado click en cambiar Contraseña")
            }
        ]
    } 
    console.log(props.userInfo);
    
    }
    updateUserDisplayName = async (newDisplayName) =>{
        if(newDisplayName) this.state.updateUserDisplayName(newDisplayName)
      
        this.setState({
            overlayComponent: null
        }) 
    }
    openOverLay = (placeholder,updateFunction,inputValue ) =>{ 
        this.setState({
            overlayComponent: <OverLayOnInput 
            isVisibleOverlay={true}
             placeholder={placeholder} 
             updateFunction={updateFunction}
             inputValue = {inputValue}
             value={this.state.userInfo.displayName}
            />
        });
    }

    render() {
        const {menuConfig, overlayComponent} = this.state;
        return (
            <View>
            {menuConfig.map((item,index) => (
            <ListItem key={index}
             title={item.title}
             leftIcon={{type:item.iconType, name: item.iconNameLeft, color: item.color }}
             rightIcon={{type:item.iconType, name: item.iconNameRight, color: item.color }}
             onPress={item.onPress}
             containerStyle = {styles.contentCoontainerStyle}
             />
            ))}
            {overlayComponent}
            </View>
        )

    }
}

const styles = StyleSheet.create({ 
    contentCoontainerStyle:{
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3d3" 
    }
})
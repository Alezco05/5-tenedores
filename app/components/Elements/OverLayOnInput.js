import React, {Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Overlay, Input,Button} from 'react-native-elements';
let a = true
export default class OverLayOnInput extends Component {
    constructor(){
        super();
      
    }

    componentDidMount(){
    }

    render(){
        return(

           <Overlay isVisible ={false} overlayBackgroundColor="transparent" overlayStyle={styles.overlayStyle}>
               <View style={styles.viewOverlay}>
                   <Input containerStyle={styles.inputContainer} placeholder="testx" onChangeText=""/>
                   <Button buttonStyle={styles.buttonUpdate} title="Actualizar"/>
               </View>
           </Overlay>
        )
    }
}


const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
     viewOverlay:{
        width: "100%",
        backgroundColor: "#fff",
        padding: 40,
        borderColor: "#00a680",
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    inputContainer:{
        marginBottom: 20
    },
    buttonUpdate: {
        backgroundColor: "#00a680"
    }
})
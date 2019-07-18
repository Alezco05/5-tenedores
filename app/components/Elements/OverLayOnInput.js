import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Overlay, Input,Button, Icon} from 'react-native-elements';
let a = true
export default class OverLayOnInput extends Component {
    constructor(props){
        super(props);
        this.state={
            ...props
        }
    }

    componentDidMount(){
    }
    onChangeInput = inputData => {
        this.setState({
            inputValue: inputData
        })
    }
    update = () =>{
       const newValue = this.state.inputValue;

       this.state.updateFunction(newValue);
       this.setState({
           isVisibleOverlay:false
       });
    }
    close = () =>{
        this.setState({
            isVisibleOverlay:false
        });
        this.state.updateFunction(null);
    }
    render(){
        const {isVisibleOverlay,placeholder,inputValue} = this.state;
        return(
           <Overlay isVisible ={isVisibleOverlay} overlayBackgroundColor="none" overlayStyle={styles.overlayStyle}>
               <View style={styles.viewOverlay}>
                   <Input containerStyle={styles.inputContainer} 
                   placeholder={placeholder} 
                   onChangeText = {value => this.onChangeInput(value) }
                   value={inputValue}
                   />
                   <Button buttonStyle={styles.buttonUpdate} title="Actualizar" onPress={()=>this.update()}/>
                   <Icon type="material-community"
                       name="close-circle-outline"
                       containerStyle={styles.containerIconClose}
                       size={30}
                       color="green"
                       onPress={()=>this.close()}
                   />
               </View>
           </Overlay>
        )
    }
}
//

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
     viewOverlay:{
        width: "120%",
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
    },
    containerIconClose:{
        position: "absolute",
        right:-1,
        top:-1,
    }
})
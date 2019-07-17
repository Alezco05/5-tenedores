import React,{Component} from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native';

import UserInfo from './UserInfo';
export default class MyAccountUser extends Component{
    constructor(props){
        super(props);
    }
    render(){
        //const {logout} = this.props;
        return(
            <View>
            <UserInfo/>
            {/*  <Button title="Cerrar Sesión" buttonStyle={styles.btnViewProfile} onPress={()=> logout()}></Button>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody:{
        
        
    }
})

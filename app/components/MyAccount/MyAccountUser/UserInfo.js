import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Button,Avatar,ListItem } from 'react-native-elements';
import UpdateUserInfo from './UpdateUserInfo';
import * as firebase from 'firebase';
const uri = "../../../../assets/img/5-tenedores-letras-logo.png";
export default class UserInfo extends Component{
    constructor(state){
        super(state);
        this.state = {
            userInfo:{
                displayName: "",
                email: "",
                photoURL: ""
            }
        };
    }
    
    componentDidMount = async () => {
        await this.getUserInfo();
    }

    getUserInfo =  () => {
        const user = firebase.auth().currentUser;
         user.providerData.forEach(userInfo => {
            this.setState({userInfo})
        });
    };

    checkUserAvatar = photoURL =>{
        return photoURL ? photoURL : uri;

    };
    updateUserDisplayName = (newDisplayName) => {
        console.log(newDisplayName)
    };
    returnUpdateUserInfoComponent = userInfoData => {
        if (userInfoData.hasOwnProperty("uid")){
            return (
                <UpdateUserInfo userInfo={this.state.userInfo} 
                updateUserDisplayName={this.updateUserDisplayName} />
             
            )
        }
        console.log("returnUpdateUserInfoComponent");
        console.log(userInfoData);

    };
    
    render(){
        const {displayName,email,photoURL} = this.state.userInfo;
        return(
            <View>
            <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                source={{uri:
                this.checkUserAvatar(photoURL)}}
                containerStyle={styles.userInfoAvatar}
                
            />
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>            
            
            </View>
            {this.returnUpdateUserInfoComponent(this.state.userInfo)}
           
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#f2f2f2"
    },
    userInfoAvatar: {
        marginRight: 20
        
    },
    displayName: {
        fontWeight: "bold"        
    }
});
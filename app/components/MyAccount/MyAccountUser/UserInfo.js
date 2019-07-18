import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Button,Avatar,ListItem } from 'react-native-elements';
import UpdateUserInfo from './UpdateUserInfo';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast';
const uri = "../../../../assets/img/5-tenedores-letras-logo.png";
export default class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...props,
            userInfo:{
                displayName: "",
                displayLastName: "",
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
    reautenticate = currentPassword =>{
        const user = firebase.auth().currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
        return user.reauthenticateWithCredential(credentials);
    };

    checkUserAvatar = photoURL =>{
        return photoURL ? photoURL : uri;
    };
    updateUserEmail = async (newEmail,password) =>{
        this.reautenticate(password).then(() => {
            const user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(() =>{
                console.log('Email Cambiado Correctamente');
                this.refs.toast.show("Email Cambiado Correctamente Vuelve a Iniciar sesion", 1500);
                firebase.auth().signOut();
            }).catch(err =>{
                this.refs.toast.show(err, 1500);
            })  
        }).catch(err =>{
            console.log('Tu password no es correcto');
            this.refs.toast.show("Tu password no es correcto", 1500);
        })
        
        console.log("Estmaos es unser info, ortografia wey")
        console.log("newEmail:",newEmail);
        console.log("newPassword:",password);
    };
    updateUserDisplayName = async (newDisplayName) => {
        const update = {
            displayName: newDisplayName
        };
        await firebase.auth().currentUser.updateProfile(update);
        this.getUserInfo();
    };
    returnUpdateUserInfoComponent = userInfoData => {
        if (userInfoData.hasOwnProperty("uid")){
            return (
                <UpdateUserInfo userInfo={this.state.userInfo} 
                updateUserDisplayName={this.updateUserDisplayName}
                updateUserEmail ={this.updateUserEmail} 

                />
             
            )
        }
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
            <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>            
            </View>
            </View>
            {this.returnUpdateUserInfoComponent(this.state.userInfo)}
           <Toast
               ref="toast"
               position="bottom"
               positionValue={250}
               fadeInDuration={1000}
               fadeOutDuration={1000}
               opacity={0.8}
               textStyle={{color: "#fff"}}
           />
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
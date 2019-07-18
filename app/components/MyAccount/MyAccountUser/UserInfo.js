import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//
import { StyleSheet, View, Text, CameraRoll } from "react-native";
import { Avatar, Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
//
import * as firebase from "firebase";
//
import UpdateUserInfo from "./UpdateUserInfo";
//
const uri = "../../../../assets/img/5-tenedores-letras-logo.png";
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      userInfo: {
        displayName: "",
        displayLastName: "",
        email: "",
        photoURL: ""
      }
    };
  }
  componentDidMount = async () => await this.getUserInfo();
  getUserInfo = () => {
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({ userInfo });
    });
  };
  reautenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  checkUserAvatar = photoURL => {
    return photoURL ? photoURL : uri;
  };
  updateUserEmail = async (newEmail, password) => {
    this.reautenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toast.show(
              "Email Cambiado Correctamente Vuelve a Iniciar sesion",
              1500
            );
            firebase.auth().signOut();
          })
          .catch(err => {
            this.refs.toast.show(err, 1500);
          });
      })
      .catch(() => {
        console.log("Tu password no es correcto");
        this.refs.toast.show("Tu password no es correcto", 1500);
      });
  };
  updateUserDisplayName = async newDisplayName => {
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };
  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
        />
      );
    }
  };
  changeAvatarUser = async () => {
    const resultPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied")
      this.refs.toast.show("Es necesario aceptar los permisos!", 1500);
    else {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspects: [4, 3]
      });
      console.log(resultado);
      if (resultado.cancelled)
        this.refs.toast.show("Haz cerrado la galeria", 1500);
      else console.log("Haz seleccionado una imagen");
    }
  };
  takePicture = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied")
      this.refs.toast.show("Es necesario aceptar los permisos!", 1500);
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });
    if (!result.cancelled) {
      this.setState({ photoURL: result.uri });
    }
    CameraRoll.saveToCameraRoll(this.state.photoURL);
  };

  render() {
    const { displayName, email, photoURL } = this.state.userInfo;
    return (
      <View>
        <View style={styles.viewUserInfo}>
          <Avatar
            rounded
            size="large"
            source={{ uri: this.checkUserAvatar(photoURL) }}
            containerStyle={styles.userInfoAvatar}
            showEditButton
            onEditPress={() => this.changeAvatarUser()}
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
          textStyle={{ color: "#fff" }}
        />
        <Button buttonStyle={styles.iconCamera}
          icon={
            <Icon
              iconStyle={styles}
              name="camera-iris"
              type="material-community"
              size={60}
            />
          }
          iconRight={true}
          onPress={() => this.takePicture()}
          type="clear"
        />
      </View>
    );
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
  },
   iconCamera: {
    position: "absolute",
    bottom:-215,
    right:0
  } 
});

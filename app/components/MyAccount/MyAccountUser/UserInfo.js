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
  updateUserPhotoUrl = async photoUri => {
    const update = {
      photoURL: photoUri
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };
  updateUserPassword = async (currentPassword, newpassword) => {
    console.log('currentPassword', currentPassword);
    console.log('newPassword', newPassword);
  };
  returnUpdateUserInfoComponent = userInfoData => {
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <UpdateUserInfo
          userInfo={this.state.userInfo}
          updateUserDisplayName={this.updateUserDisplayName}
          updateUserEmail={this.updateUserEmail}
          updateUserPassword={this.updateUserPassword}
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
      if (resultado.cancelled)
        this.refs.toast.show("Haz cerrado la galeria", 1500);
      else {
        const { uid } = this.state.userInfo;
        this.updateImage(resultado.uri, uid)
          .then(resolve => {
            this.refs.toast.show("Avatar actualizado correctamente", 1500);
            firebase.storage().ref("avatar/"+uid).getDownloadURL()
            .then(resolve => this.updateUserPhotoUrl(resolve))
            .catch(error=>this.refs.toast.show("Error al recuperar el avatar del servidor", 1500))
          })
          .catch(error => {
            this.refs.toast.show("Error al actualizar", 2500);
          });
      }
    }
  };
  

  takePicture = async () => {
    const resultPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied")
      this.refs.toast.show("Es necesario aceptar los permisos!", 1500);
    else {
      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspects: [4, 3]
      });
      if (resultado.cancelled)
        this.refs.toast.show("Haz cerrado la galeria", 1500);
      else {
        const { uid } = this.state.userInfo;
        this.updateCamera(resultado.uri, uid)
          .then(resolve => {
            this.refs.toast.show("Foto actualizado correctamente", 2500);
          })
          .catch(error => {
            this.refs.toast.show("Error al actualizar", 2500);
          });
      }
    }
  };

  updateImage = (async = (uri, nameImage) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then(async resolve => {
        let ref = firebase
          .storage()
          .ref()
          .child("avatar/" + nameImage);
        return await ref.put(resolve);
      })
      .catch(error => {
        this.ref.toast.show(
          "Error al subir la mimagen al servidor, intentelo mas tarde",
          1500
        );
      });
  });

  updateCamera = (async = (uri, nameImage) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then(async resolve => {
        let ref = firebase
          .storage()
          .ref()
          .child("camera/" + nameImage);
        return await ref.put(resolve);
      })
      .catch(error => {
        this.ref.toast.show(
          "Error al subir la mimagen al servidor, intentelo mas tarde",
          1500
        );
      });
  });
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
        <Button
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="camera-iris" type="material-community" size={60} />}
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
  buttonStyle: {
    position: "absolute",
    bottom: -215,
    right: 0
  }
});

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";

//import menuConfig from './menuConfig';
import OverLayOnInput from "../../Elements/OverLayOnInput";
import OverLayTwoInputs from "../../Elements/OverLayTwoInputs";
import OverLayThreeInputs from "../../Elements/OverLayThreeInputs";


export default class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      overlayComponent: null,
      menuConfig: [
        {
          title: "Cambiar Nombre",
          iconType: "material-community",
          iconNameLeft: "account-circle",
          iconNameRight: "chevron-right",
          color: "#ccc",
          onPress: () =>
            this.openOverLay(
              "Nombre",
              this.updateUserDisplayName,
              props.userInfo.displayName
            )
        },
        {
          title: "Cambiar Apellido",
          iconType: "material-community",
          iconNameLeft: "account",
          iconNameRight: "chevron-right",
          color: "#ccc",
          onPress: () => console.log("Cambiar apellido")
        },
        {
          title: "Cambiar Email",
          iconType: "material-community",
          iconNameLeft: "at",
          iconNameRight: "chevron-right",
          color: "#ccc",
          onPress: () =>
            this.openOverLayTwoInputs(
              "Email",
              "Password",
              props.userInfo.email,
              this.updateUserEmail
            )
        },
        {
          title: "Cambiar Contraseña",
          iconType: "material-community",
          iconNameLeft: "lock-reset",
          iconNameRight: "chevron-right",
          color: "#ccc",
          onPress: () =>
            this.openOverLayThreeInputs("Tu contraseña", "nueva contraseña", "repetir nueva contraseña", this.updateUserPassword)
        }
      ]
    };
  }
  updateUserDisplayName = async newDisplayName => {
    if (newDisplayName) this.state.updateUserDisplayName(newDisplayName);
    this.setState({
      overlayComponent: null
    });
  };
  updateUserEmail = async (newEmail, password) => {
    const emailOld = this.props.userInfo.email;
    if (emailOld != newEmail) this.state.updateUserEmail(newEmail, password);
    this.setState({
      overlayComponent: null
    });
  };
  openOverLay = (placeholder, updateFunction, inputValue) => {
    this.setState({
      overlayComponent: (
        <OverLayOnInput
          isVisibleOverlay={true}
          placeholder={placeholder}
          updateFunction={updateFunction}
          inputValue={inputValue}
          value={this.state.userInfo.displayName}
        />
      )
    });
  };
  openOverLayTwoInputs = (
    placeholderOne,
    placeholderTwo,
    inputValueOne,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverLayTwoInputs
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          updateFunction={updateFunction}
          inputValueOne={inputValueOne}
          isPassword={true}
          value={this.state.userInfo.email}
        />
      )
    });
  };
  updateUserPassword = async (currentPassword, newPassword, repeatPassword) => {
    console.log('currentPassword', currentPassword);
    console.log('newPassword', newPassword);
    console.log('repeatPassword', repeatPassword);
    
  };
  openOverLayThreeInputs = (placeholderOne, placeholderTwo, placeholderThree, updateFunction)=>{
    this.setState ({
      overlayComponent:(

      <OverLayThreeInputs
        isVisibleOverlay={true}
        placeholderOne={placeholderOne}
        placeholderTwo={placeholderTwo}
        placeholderThree={placeholderThree}
        inputValueOne=""
        inputValueTwo=""
        inputValueThree=""
        isPassword={true}
        updateFunction={updateFunction}
        
      />
        )
    })
  }

  render() {
    const { menuConfig, overlayComponent } = this.state;
    return (
      <View>
        {menuConfig.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            leftIcon={{
              type: item.iconType,
              name: item.iconNameLeft,
              color: item.color
            }}
            rightIcon={{
              type: item.iconType,
              name: item.iconNameRight,
              color: item.color
            }}
            onPress={item.onPress}
            containerStyle={styles.contentCoontainerStyle}
          />
        ))}
        {overlayComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentCoontainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3d3"
  }
});

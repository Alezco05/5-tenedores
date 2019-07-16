import React from 'react';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
//Screens
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import TopFiveScreen from '../screens/TopFive';
//Screen Home
import MyAccountScreen from '../screens/MyAccount/MyAccount';
import RegistrerScreen from '../screens/MyAccount/Registrer';
import LoginScreen from '../screens/MyAccount/Login';
//Stacks
const HomeScreenStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            title: "Home"
        })
    }
  
});
const TopFiveScreenStack = createStackNavigator({
    TopFive: {
        screen: TopFiveScreen,
        navigationOptions: ({navigation}) => ({
            title: "Home"
        })
    }
});
const SearchScreenStack = createStackNavigator({
    Search:{
        screen: SearchScreen,
        navigationOptions: ({navigation})=>({
            title: "Buscar"
        })
    }
});
const MyAccountScreenStack = createStackNavigator({
    MyAccount:{
        screen: MyAccountScreen,
        navigationOptions: ({navigation})=>({
            title: "Mi cuenta"
        })
    },
    Register:{
        screen: RegistrerScreen,
        navigationOptions: ({navigation}) =>({
            title: "Registro"
        })
    },
    Login:{
        screen: LoginScreen,
        navigationOptions: ({navigation}) =>({
            title: "Login"
        })
    }
});
const RootStack = createBottomTabNavigator({
    Home: {
        screen: HomeScreenStack,
        navigationOptions: ({navigation}) =>({
            tabBarLabel: "Home",
            tabBarIcon: ({tintColor}) => <Icon name="compass-outline" type="material-community" size={22} color={tintColor}/>
            
        })
    },
    TopFive: {
        screen: TopFiveScreenStack,
        navigationOptions: ({navigation}) =>({
            tabBarLabel: "Top 5",
            tabBarIcon: ({tintColor}) => <Icon name="star-outline" type="material-community" size={22} color={tintColor}/>
            
        })
    },
    Search: {
        screen: SearchScreenStack,
        navigationOptions: ({navigation}) =>({
            tabBarLabel: "Buscar",
            tabBarIcon: ({tintColor}) => <Icon name="magnify" type="material-community" size={22} color={tintColor}/>
            
        })
    },
    MyAccount: {
        screen: MyAccountScreenStack,
        navigationOptions: ({navigation}) =>({
            tabBarLabel: "Mi cuenta",
            tabBarIcon: ({tintColor}) => <Icon name="home-outline" type="material-community" size={22} color={tintColor}/>
            
        })
    }
},
    {
    initialRouteName: 'MyAccount',
    order: ["Home","Search","TopFive","MyAccount"],
    tabBarOptions: {
        activeTintColor: '#e91e63',
        inactiveTintColor: '#646464'
    }
    });

export default createAppContainer(RootStack);


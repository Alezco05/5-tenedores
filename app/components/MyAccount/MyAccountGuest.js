import React,{Component} from 'react';
import {StyleSheet,View,Text,ActivityIndicator} from 'react-native';
import {Button,Image} from 'react-native-elements';

const url = "../../../assets/img/background.jpg";
export default class MyAccountGuess extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {goToScreen} = this.props;
        return(
            <View style={styles.viewBody}>
                <Image
                    source={require(url)}
                    style= {styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
                <Text style={styles.text}>¿Como describirias tu mejor restaurante? 
                Busca y vizualiza los mejores restaurantes de una forma sencilla, 
                votal cual te ha gustado más y comenta como ha sido tu experiencia.</Text>
                <Button title="Ver tu perfil" buttonStyle={styles.btnViewProfile} onPress={()=> goToScreen("Login")}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight:30
    },
    image: {
        height: 300,
        marginBottom: 40,

    },
    title: {
        fontWeight: 'bold',
        fontSize:19,
        marginBottom: 10
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    btnViewProfile: {
        backgroundColor: '#00a680',
    }
})
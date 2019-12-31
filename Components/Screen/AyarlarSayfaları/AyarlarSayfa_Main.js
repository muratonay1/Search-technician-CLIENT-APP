import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, Modal, TouchableHighlight, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';



export default class AyarlarSayfa_Main extends Component {


  render() {
    return (
      <ImageBackground source={require('../../Picture/ayarlar_backimage.jpg')} style={{width:width,height:height}} bac>
        <View style={styles.kayit_giris_button_view}>
          <TouchableOpacity style={styles.kayit_giris_button}>
            <Text style={styles.button_text}>Kayıt Ol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.kayit_giris_button} onPress={()=>Actions.GirisPage()}>
            <Text style={styles.button_text}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    )
  }
}

const styles=StyleSheet.create({
  kayit_giris_button:{
    width: 150, 
    backgroundColor: '#252A34', 
    height: 150, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom:75,
    borderRadius:70,
    opacity:0.6,
    marginLeft:3
  },
  kayit_giris_button_view:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection:'row'
  },
  button_text:{
    color:'#88cc00',
    fontFamily:'Rajdhani-Regular',
    fontSize:20,
    textAlign:'center'
  }
})
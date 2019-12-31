import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User';

var Response_UyeGirisi;
var glb_email="";
var glb_sifre="";
function GirisYapService() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Uye_Girisi", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            mail: glb_email,
            sifre: glb_sifre
        })
    })
        .then(res => res.json())
        .then((result) => {
            if(result.d != null)
            {
                Response_UyeGirisi = JSON.parse(result.d)
                User.User_Id=[Response_UyeGirisi[0].Uye_Id];
                User.User_Isim=[Response_UyeGirisi[0].Uye_Ad];
                User.User_Soyisim=[Response_UyeGirisi[0].Uye_Soyad];
                User.User_Telefon=[Response_UyeGirisi[0].Uye_Telefon];
                User.User_Email=[Response_UyeGirisi[0].Uye_Email];
                User.User_Sehir_ismi=[Response_UyeGirisi[0].Name];
                User.User_Ilce_ismi=[Response_UyeGirisi[0].isim];
                User.User_Sifre=[Response_UyeGirisi[0].Uye_Sifre];
                
                Actions.ProfilPage();

            }
            if(result.d==null)
            {
                Alert.alert("Bir Sorun Oluştu","Kullanıcı adı ve sifrenizi dogru girin.");
            }
            

        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}
function Engel_Kontrol() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Mobil_Ban_Sorgula", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            email: glb_email           
        })
    })
        .then(res => res.json())
        .then((result) => {
            if(result.d != null)
            {
               
                Alert.alert("HELPAS","Hesabınız Engellendi.");

            }
            if(result.d==null)
            {
                GirisYapService();
            }
            

        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

export default class GirisPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text_mail: '',
            text_sifre: ''
        }
    }
    Giris_Yap=async()=>
    {
        if(this.state.text_mail != null && this.state.text_sifre != null)
        {
            glb_email=this.state.text_mail;
            glb_sifre=this.state.text_sifre;
            await
            Engel_Kontrol();
        }
        else{
            Alert.alert("Dur","Boş alanlar mevcut");
        }
        
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.logo_view}>
                    <Image
                        source={require('../../Picture/logo.png')}
                        style={{ width: 150, height: 150 }}
                    />
                </View>

                <View style={styles.posta_sifre_view}>
                    <TextInput
                        placeholder="E-Posta Adresinizi Girin"
                        label="Açıklama"
                        multiline={false}
                        onChangeText={(text_mail) => this.setState({ text_mail })}
                        placeholderTextColor="snow"
                        style={styles.posta_sifre}
                    />
                    <TextInput
                        placeholder="Parolanızı Girin"
                        label="Açıklama"
                        multiline={false}
                        onChangeText={(text_sifre) => this.setState({ text_sifre })}
                        placeholderTextColor="snow"
                        secureTextEntry={true}
                        style={styles.posta_sifre}
                    />
                </View>


                <View style={styles.giris_button_view}>
                    <TouchableOpacity style={styles.giris_button} onPress={()=>this.Giris_Yap()}>
                        <Text style={styles.giris_button_text}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.anasayfa_button} onPress={()=>this.Giris_Yap()}>
                        <Text style={styles.giris_button_text}>AnaSayfa</Text>
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    giris_button: {
        width: width - 150,
        backgroundColor: 'gray',
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 30
    },
    posta_sifre: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'Rajdhani-Regular',
        color: 'white',
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'yellow',
        width: width * 0.8
    },
    posta_sifre_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    giris_button_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        alignItems: 'center'
    },
    giris_button_text: {
        fontSize: 16,
        fontFamily: 'Rajdhani-Regular',
        color: 'yellow'
    },
    anasayfa_button:{
        width: width - 200,
        backgroundColor: '#263859',
        height: height * 0.05,
        marginTop:35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'white',
        borderWidth:1,
        borderRadius: 5
    }
})
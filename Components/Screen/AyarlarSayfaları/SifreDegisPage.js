import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Linking,
    ScrollView,
    ImageBackground,
    Image,
    FlatList,
    TouchableHighlight,
    TextInput,
    Alert
} from 'react-native';
import { Avatar, Tooltip, Button, Input, Tile, PricingCard } from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { Actions } from 'react-native-router-flux';
import User from '../../Settings/User';
import IpChange from '../../Settings/IpChange';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
function Uye_Guncelle() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Uye_Guncelle", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            uye_id: _uye_id,
            uye_ad: _uye_ad.toString(),
            uye_soyad: _uye_soyad.toString(),
            uye_tel: _uye_tel.toString(),
            uye_mail: _uye_mail.toString(),
            sehir_ismi: _sehir_ismi.toString(),
            ilce_ismi: _ilce_ismi.toString(),
            sifre: _sifre.toString()
        })
    })
        .then(res => res.json())
        .then((result) => {
            cevap = result.d;
            if (cevap == "ok") {
                Alert.alert("HELPAS", "Güncelleme Başarılı");
                User.User_Sifre = _sifre;
                Alert.alert(
                    'HelpAs',
                    'Şifre Değiştirme işlemi gerçekleştirildi.\nYeniden giriş yapmalısınız. Giriş sayfasına yönlendirileceksiniz.',
                    [
                        { text: 'Tamam', onPress: () => Actions.GirisPage() },
                    ],
                    { cancelable: false },
                );
            }
            else {
                Alert.alert("alert", "");
            }
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}
var _uye_id;
var _uye_ad;
var _uye_soyad;
var _uye_tel;
var _uye_mail;
var _sehir_ismi;
var _ilce_ismi;
var _sifre;
var cevap;
export default class AdSoyadPage extends Component {

    componentDidMount() {
        //this.setState({eski_sifre:User.User_Sifre});
    }
    SifreDegis() {
        if (this.state.eski_sifre != "" || this.state.yeni_sifre1 != "" || this.state.yeni_sifre2 != "") {
            if ((this.state.eski_sifre == User.User_Sifre) && (this.state.yeni_sifre1 == this.state.yeni_sifre2) && (this.state.yeni_sifre1 != "" || this.state.yeni_sifre2 != "")) {
                _uye_ad = User.User_Isim;
                _uye_soyad = User.User_Soyisim;
                _uye_id = parseInt(User.User_Id);
                _uye_mail = User.User_Email;
                _uye_tel = User.User_Telefon;
                _sehir_ismi = User.User_Sehir_ismi;
                _ilce_ismi = User.User_Ilce_ismi;
                _sifre = this.state.yeni_sifre2;
                Uye_Guncelle();
            }
            else {
                Alert.alert("HELPAS", "Şifreler Uyuşmuyor!")
            }
        }
        else {
            Alert.alert("HELPAS", "Boş alanlar mevcut!")
        }


    }
    constructor(props) {
        super(props)
        this.state = {
            text_geri_bildirim: '',
            eski_sifre: '',
            yeni_sifre1: '',
            yeni_sifre2: ''
        }
    }
    render() {

        const header = {
            fontSize: 18,
            textAlign: 'center',
            width: '80%',
            color: 'snow',
            fontFamily: 'Rajdhani-Regular',
            marginRight: 29
        };

        return (
            <ScrollView style={{ backgroundColor: '#2d2d2d' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', backgroundColor: 'gray', alignItems: 'center', height: height * 0.1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column', marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => Actions.ProfilPage()}>
                                <Icon1 name="leftcircleo" size={35} color="#25D366" />
                            </TouchableOpacity>

                        </View>

                        <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={header}>Hesap Bilgileri</Text>
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="vpn-key" size={25} color="#25D366" />
                        </View>

                        <View style={{ flex: 4, marginRight: 15 }}>
                            <TextInput
                                multiline={false}
                                editable={true}
                                defaultValue=""
                                clearTextOnFocus={true}
                                onChangeText={(eski_sifre) => this.setState({ eski_sifre })}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                secureTextEntry={true}
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="vpn-key" size={25} color="#25D366" />
                        </View>

                        <View style={{ flex: 4, marginRight: 15 }}>
                            <TextInput
                                multiline={false}
                                editable={true}
                                defaultValue=""
                                clearTextOnFocus={true}
                                onChangeText={(yeni_sifre1) => this.setState({ yeni_sifre1 })}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                secureTextEntry={true}
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="vpn-key" size={25} color="#25D366" />
                        </View>

                        <View style={{ flex: 4, marginRight: 15 }}>
                            <TextInput
                                multiline={false}
                                editable={true}
                                defaultValue=""
                                clearTextOnFocus={true}
                                onChangeText={(yeni_sifre2) => this.setState({ yeni_sifre2 })}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                secureTextEntry={true}
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.55, height: height * 0.07, backgroundColor: '#4285F4', borderRadius: 11 }}
                            onPress={() => this.SifreDegis()}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon1 name="save" size={25} color="white" />
                                </View>
                                <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Rajdhani-Regular', fontWeight: 'bold', marginRight: 13 }}>Kaydet</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        )
    }
}
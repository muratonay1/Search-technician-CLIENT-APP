import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import User from '../../Settings/User';
import IpChange from '../../Settings/IpChange';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
var _uye_id;
var _uye_ad;
var _uye_soyad;
var _uye_tel;
var _uye_mail;
var _sehir_ismi;
var _ilce_ismi;
var _sifre;
var cevap;
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
                User.User_Isim = _uye_ad;
                User.User_Soyisim = _uye_soyad;
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
export default class AdSoyadPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ad_degis: '',
            soyad_degis: ''
        }
    }
    componentDidMount() {
        this.setState({ ad_degis: User.User_Isim, soyad_degis: User.User_Soyisim });

    }
    AdSoyadDegis() {

        _uye_ad = this.state.ad_degis;
        _uye_soyad = this.state.soyad_degis;
        _uye_id = parseInt(User.User_Id);
        _uye_mail = User.User_Email;
        _uye_tel = User.User_Soyisim;
        _sehir_ismi = User.User_Sehir_ismi;
        _ilce_ismi = User.User_Ilce_ismi;
        _sifre = User.User_Sifre;
        Uye_Guncelle();
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
                            <Icon name="people" size={25} color="#25D366" />
                        </View>

                        <View style={{ flex: 4, marginRight: 15 }}>
                            <TextInput
                                multiline={false}
                                editable={true}
                                defaultValue={"" + User.User_Isim}
                                clearTextOnFocus={true}
                                onChangeText={(ad_degis) => this.setState({ ad_degis })}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow', textAlignVertical: 'center' }}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="people" size={25} color="#25D366" />
                        </View>

                        <View style={{ flex: 4, marginRight: 15 }}>
                            <TextInput
                                multiline={false}
                                editable={true}
                                defaultValue={"" + User.User_Soyisim}
                                clearTextOnFocus={true}
                                onChangeText={(soyad_degis) => this.setState({ soyad_degis })}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.55, height: height * 0.07, backgroundColor: '#4285F4', borderRadius: 11 }}
                            onPress={() => this.AdSoyadDegis()}
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
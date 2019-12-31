import React, { Component, useReducer } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User';
import { Avatar } from "react-native-elements";
import TextAvatar from 'react-native-text-avatar';
var Response_UyeGirisi;
const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

var bildirim = "";
let id = User.User_Id;
var trh = "";
var cevap;
function GeriBildirimGonderService() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Geri_Bildirim_Gonder", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            uye_id: parseInt(id),
            tarih: trh,
            bildirim: bildirim
        })
    })
        .then(res => res.json())
        .then((result) => {
            cevap = result.d;
            if (cevap == "ok") {
                Alert.alert("HELPAS", "Geri Bildiriminiz Oluşturuldu.")
            }
            else {
                Alert.alert("Hata ile karşılaşıldı.", "userid:" + User_Id.toString() + "tarih:" + trh.toString() + "bild: " + bildirim);
            }
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

export default class ProfilPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarText: '',
            text_geri_bildirim: ''
        }
    }

    componentDidMount() {
        //Alert.alert(new Date().getDate().toString()+"-"+AYLAR[new Date().getMonth()]+"-"+new Date().getFullYear().toString());
        this.setState({ avatarText: User.User_Isim + " " + User.User_Soyisim })
    }
    CikisYap=()=> {
        User.User_Id = null;
        User.User_Ilce_id = null;
        User.User_Alan = null;
        User.User_Altalan = null;
        User.User_Email = null;
        User.User_Ilce_ismi = null;
        User.User_Isim = null;
        User.User_Sehir_id = null;
        User.User_Sehir_ismi = null;
        User.User_Sifre = null;
        User.User_Soyisim = null;
        User.User_Telefon = null;
        Actions.GirisPage();
    }
    BildirimGonder =  async() => {
        Alert.alert(User.User_Id.toString()+this.state.text_geri_bildirim);
        bildirim = this.state.text_geri_bildirim;
        trh = new Date().getDate().toString() + "-" + AYLAR[new Date().getMonth()] + "-" + new Date().getFullYear().toString();
        id=User.User_Id;
        await GeriBildirimGonderService();
        this.setState({ text_geri_bildirim: '' })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#2d2d2d' }}>
                <View style={{ flex: 1 }}>

                    <View style={styles.logo_view}>
                        <TextAvatar
                            backgroundColor={'green'}
                            textColor={'white'}
                            size={150}
                            type={'circle'} // optional
                        >
                            {this.state.avatarText}
                        </TextAvatar>
                    </View>

                    <View style={styles.posta_sifre_view}>
                        <Text style={{ color: '#25D366', fontSize: 16, textDecorationLine: 'underline' }}>Hesap Bilgileri</Text>
                        <TouchableOpacity style={styles.bilgiler_button_design} onPress={() => Actions.AdSoyadPage()}>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>

                                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Isim}</Text>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Soyisim}</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Icon2 name="people" size={35} color="#25D366" />
                                </View>
                            </View>



                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bilgiler_button_design} onPress={() => Actions.MailTelefonPage()}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>

                                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Email}</Text>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Telefon}</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Icon2 name="contacts" size={35} color="#25D366" />
                                </View>
                            </View>

                        </TouchableOpacity>
                        <Text style={{ color: '#25D366', fontSize: 16, marginTop: 15, textDecorationLine: 'underline' }}>Sifre Bilgisi</Text>
                        <TouchableOpacity style={styles.sifredegis_button_design} onPress={() => Actions.SifreDegisPage()}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>

                                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>

                                    <Text style={styles.bilgiler_button_text}>ŞifreDeğiş</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Icon1 name="key" size={35} color="#25D366" />
                                </View>
                            </View>

                        </TouchableOpacity>

                        <Text style={{ color: '#25D366', fontSize: 16, marginTop: 15, textDecorationLine: 'underline' }}>Lokasyon Bilgileri</Text>
                        <TouchableOpacity style={styles.bilgiler_button_design} onPress={() => Actions.LokasyonDegisPage()}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>

                                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Sehir_ismi}</Text>
                                    <Text style={styles.bilgiler_button_text}>{User.User_Ilce_ismi}</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Icon2 name="gps-fixed" size={35} color="#25D366" />
                                </View>
                            </View>

                        </TouchableOpacity>
                        <Text style={{ color: '#25D366', fontSize: 16, marginTop: 15, textDecorationLine: 'underline' }}>HELPAS TEKNİK</Text>
                        <TouchableOpacity style={styles.setting_button_design} onPress={()=>Actions.TeknisyenRaporPage()}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                </View>

                                <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.bilgiler_button_text}>Teknisyen Raporu</Text>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Icon1 name="setting" size={35} color="#25D366" />
                                </View>
                            </View>

                        </TouchableOpacity>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#25D366', fontSize: 16, marginTop: 15, textDecorationLine: 'underline' }}>Geri Bildirim Gönder</Text>
                            <Text style={{ color: 'snow', fontSize: 12, marginTop: 2, fontFamily: 'Rajdhani-Regular' }}>Görüşleriniz bizim için çok önemli</Text>
                            <View style={{ flex: 1, marginTop: 20 }}>
                                <TextInput
                                    multiline={true}
                                    placeholder="Yorum Yaz..."
                                    placeholderTextColor="black"
                                    onChangeText={(text_geri_bildirim) => this.setState({ text_geri_bildirim })}
                                    backgroundColor="#D3D3D3"
                                    style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Rajdhani-Regular' }}
                                    width={width * 4 / 5}
                                    height={150}
                                />
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={styles.yorum_gonder_button} onPress={() => this.BildirimGonder()}>
                                        <Icon3 name="send" size={15} color="#25D366" />
                                        <Text style={{ color: 'white', marginLeft: 5 }}>Yorumu Gönder</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                        </View>
                        <View style={{ flex: 1 }}>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={styles.setting_button_design} onPress={() => this.CikisYap()}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                    </View>

                                    <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.bilgiler_button_text}>Çıkış Yap</Text>
                                    </View>

                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Icon1 name="close" size={35} color="red" />
                                    </View>
                                </View>

                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text></Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
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
        paddingTop: 40,
        alignItems: 'center'
    },
    logo_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
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
    bilgiler_button_design: {
        width: width * 0.8,
        height: height * 0.1,
        backgroundColor: '#696969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    bilgiler_button_text: {
        color: '#e5e5e5',
        fontFamily: 'Rajdhani-Regular',
        fontSize: 18,

    },
    setting_button_design: {
        width: width * 0.8,
        height: height * 0.1,
        backgroundColor: '#696969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    sifredegis_button_design: {
        width: width * 0.8,
        height: height * 0.06,
        backgroundColor: '#696969',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    yorum_gonder_button: {
        width: width * 2 / 5,
        height: 33,
        backgroundColor: '#414141',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15
    }

})
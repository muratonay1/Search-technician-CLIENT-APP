import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Image, StyleSheet, Alert, ScrollView,TouchableHighlight,Modal,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User';

var Response_UyeGirisi;
var glb_email = "";
var glb_sifre = "";
var gelen_ilce;
var kayit_sorgula_text;
var Ad;
var Soyad;
var Telefon;
var Mail;
var Sehir;
var Ilce;
var Sifre;
function GetSehir_Isimleri() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "SehirListesi", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then((result) => {
            ss = JSON.parse(result.d)
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function GetIlce_Isimleri() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "IlceListesi", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            Sehir_Ismi: gelen_sehir
        })
    })
        .then(res => res.json())
        .then((result) => {
            sx = JSON.parse(result.d)
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function Kayıt_Sorgula_Service() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Mobil_Kayıt_Sorgula", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            email: Mail
        })
    })
        .then(res => res.json())
        .then((result) => {
            if (result != null) {
                kayit_sorgula_text="error"
            }
            if (result == null) {
                kayit_sorgula_text="ok"
            }
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function Kayıt_Ol_Service() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Mobil_Kayıt_Ol", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            ad: Ad,
            soyad:Soyad,
            tel:Telefon,
            mail:Mail,
            sehir:Sehir,
            ilce:Ilce,
            sifre:Sifre
        })
    })
        .then(res => res.json())
        .then((result) => {
            Response_UyeGirisi=JSON.parse(result.d)
            if(Response_UyeGirisi[0].Sonuc=="ok")
            {
                Alert.alert("HELPAS","Kayıt Tamamlandı.\n\nHesabınız giriş yapmak için hazır");
            }
            if(Response_UyeGirisi[0].Sonuc=="error")
            {
                Alert.alert("HELPAS","E-posta adresiniz zaten kayıtlı");
            }
            
            
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

export default class KayitPage extends Component {
    constructor(props) {
        super(props)
        this.sehir_dizi = [];
        this.ilce_dizi = [];
        this.state = {
            text_mail: '',
            text_sifre: '',
            sehir_dizi: [],
            sehirler: [],
            modalSehirVisible: false,
            ilce_dizi: [],
            ilceler: [],
            modalIlceVisible: false,
            sehir: '',
            ilce: '',
            text_ad: '',
            text_soyad:'',
            text_tel:'',
            text_mail:'',
            text_sifre:'',
            text_sifre_yeniden:'',
            text_sehir:'',
            text_ilce:''

        }
    }
    async componentDidMount()
    {
        GetSehir_Isimleri();
    }
    
    SehirListModal() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalSehirVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Sansation-Light', textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Sehir Sec</Text>
                            </View>
                            <FlatList
                                style={{ width: width * 0.7, marginTop: 15 }}
                                data={this.state.sehirler}

                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.SehirFlatlistOnPress(item.sehir_ismi)}>
                                            <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }}></View>
                                            <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Sansation-Light', textAlign: 'center', marginBottom: 5, marginTop: 5 }}>
                                                {item.sehir_ismi}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                            <TouchableHighlight
                                onPress={() => {
                                    this.setSehirModalVisible(!this.state.modalSehirVisible);
                                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.09, backgroundColor: '#585858', borderRadius: 11, marginBottom: 15 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight onPress={() => {
                   
                    this.sehirAktar();
                    this.setSehirModalVisible(true);

                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, top: 10 }}>
                    <Icon1 name="retweet" size={30} color="#25D366" />
                </TouchableHighlight>
            </View>
        )
    }

    IlceListModal() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalIlceVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Sansation-Light', textAlign: 'center', marginBottom: 5, marginTop: 5 }}>Ilce Sec</Text>
                            </View>
                            <FlatList
                                style={{ width: width * 0.7 }}
                                data={this.state.ilceler}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.IlceFlatlistOnPress(item.ilce_ismi)}>
                                            <View style={{ flex: 1, backgroundColor: 'white', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8' }}></View>
                                            <Text style={{ color: 'black', fontSize: 12, fontFamily: 'Sansation-Light', textAlign: 'center', marginBottom: 5, marginTop: 5 }}>
                                                {item.ilce_ismi}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                            <TouchableHighlight
                                onPress={() => {
                                    this.setIlceModalVisible(!this.state.modalIlceVisible);
                                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.09, backgroundColor: '#585858', borderRadius: 11, marginBottom: 15 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight onPress={() => {
                    this.ilceAktar();
                    this.setIlceModalVisible(true);

                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.05, top: 10 }}>
                    <Icon1 name="retweet" size={30} color="#25D366" />
                </TouchableHighlight>
            </View>
        )
    }
    sehirAktar = async () => {
        this.setState({ ilce: '' })
        if (this.state.sehirler.length == 0 || this.state.sehirler == null) {
            for (let i = 0; i < ss.length; i++) {
                this.sehir_dizi.push({ sehir_id: [ss[i].Id], sehir_ismi: [ss[i].Name] })
            }
            this.setState({ sehirler: [...this.sehir_dizi] })
        }
        if (this.state.sehirler.length != 0) {
        }
    }
    ilceAktar = async () => {
        if ((this.state.ilceler.length == 0 || this.state.ilce_dizi.length == 0) || this.state.ilceler == null || this.state.ilce_dizi == null) {
            for (let i = 0; i < sx.length; i++) {
                this.ilce_dizi.push({ ilce_no: [sx[i].ilce_no], ilce_ismi: [sx[i].isim] })
            }
            this.setState({ ilceler: [...this.ilce_dizi] })
        }
        if (this.state.ilceler.length != 0) {
            this.setState({ ilceler: [] });
            this.ilce_dizi = [];
            for (let i = 0; i < sx.length; i++) {
                this.ilce_dizi.push({ ilce_no: [sx[i].ilce_no], ilce_ismi: [sx[i].isim] })
            }
            this.setState({ ilceler: [...this.ilce_dizi] })
        }
    }
    SehirFlatlistOnPress = (Sehir_ismi) => {
        gelen_sehir = Sehir_ismi.toString();
        this.setState({ sehir: gelen_sehir })

        GetIlce_Isimleri();
        this.setSehirModalVisible(false);
    }
    IlceFlatlistOnPress = (Ilce_ismi) => {
        gelen_ilce = Ilce_ismi.toString();
        this.setState({ ilce: gelen_ilce })

        this.setIlceModalVisible(false);
    }
    setSehirModalVisible(visible) {
        this.setState({ modalSehirVisible: visible });
    }

    setIlceModalVisible(visible) {
        this.setState({ modalIlceVisible: visible });
    }
    Kayit_Ol=async()=>{
        if(this.state.text_sifre == this.state.text_sifre_yeniden)
        {
            
            Ad=this.state.text_ad;
            Soyad=this.state.text_soyad;
            Telefon=this.state.text_tel;
            Mail=this.state.text_mail;
            Sehir=this.state.sehir;
            Ilce=this.state.ilce;
            Sifre=this.state.text_sifre;
            Kayıt_Ol_Service();
        }
        else
        {
            Alert.alert("HELPAS","Girilen şifreler uyuşmuyor.");
        }
        
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#2d2d2d' }} scrollEnabled={true}>
                <View style={{ flex: 1 }}>

                    <View style={styles.logo_view}>
                        <Image
                            source={require('../../Picture/logo.png')}
                            style={{ width: 120, height: 120 }}
                        />
                    </View>

                    <View style={styles.posta_sifre_view}>
                        <TextInput
                            placeholder="Ad"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_ad) => this.setState({ text_ad })}
                            placeholderTextColor="snow"
                            style={styles.Kayit_TextInput}
                        />
                        <TextInput
                            placeholder="Soyad"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_soyad) => this.setState({ text_soyad })}
                            placeholderTextColor="snow"                           
                            style={styles.Kayit_TextInput}
                        />
                        <TextInput
                            placeholder="Telefon Numarası"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_tel) => this.setState({ text_tel })}
                            placeholderTextColor="snow"
                            style={styles.Kayit_TextInput}
                        />
                        <TextInput
                            placeholder="E-Mail"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_mail) => this.setState({ text_mail })}
                            placeholderTextColor="snow"
                            style={styles.Kayit_TextInput}
                        />
                        <TextInput
                            placeholder="Şifre"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_sifre) => this.setState({ text_sifre })}
                            placeholderTextColor="snow"
                            secureTextEntry={true}
                            style={styles.Kayit_TextInput}
                        />
                        <TextInput
                            placeholder="Şifre Yeniden"
                            label="Açıklama"
                            multiline={false}
                            onChangeText={(text_sifre_yeniden) => this.setState({ text_sifre_yeniden })}
                            placeholderTextColor="snow"
                            secureTextEntry={true}
                            style={styles.Kayit_TextInput}
                        />
                        <View style={{ flexDirection: 'row', width: width, height: height * 0.09}}>
                            <View style={{ flex: 2,justifyContent:'center',alignItems:'center'}}>
                                <TextInput
                                    placeholder="Şehir Seç"
                                    editable={false}
                                    label="Açıklama"
                                    multiline={false}
                                    onChangeText={(text_sehir) => this.setState({ text_sehir })}
                                    placeholderTextColor="snow"
                                    value={this.state.sehir}
                                    style={styles.sehir_sec}
                                />
                            </View>

                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                {this.SehirListModal()}
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', width: width, height: height * 0.09}}>
                            <View style={{ flex: 2,justifyContent:'center',alignItems:'center'}}>
                                <TextInput
                                    placeholder="İlçe Seç"
                                    editable={false}
                                    label="Açıklama"
                                    multiline={false}
                                    onChangeText={(text_ilce) => this.setState({ text_ilce })}
                                    placeholderTextColor="snow"
                                    value={this.state.ilce}
                                    style={styles.sehir_sec}
                                />
                            </View>

                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                {this.IlceListModal()}
                            </View>

                        </View>



                    </View>


                    <View style={styles.giris_button_view}>
                        <TouchableOpacity style={styles.giris_button} onPress={() => this.Kayit_Ol()}>
                            <Text style={styles.giris_button_text}>Kayıt Ol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.anasayfa_button} onPress={() => Actions.GirisPage()}>
                            <Text style={styles.giris_button_text}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text> </Text>
                        <Text></Text>

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
    Kayit_TextInput: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Rajdhani-Regular',
        color: 'white',
        marginLeft: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'yellow',
        width: width * 0.8
    },
    posta_sifre_view: {
        flex: 2,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    giris_button_view: {
        flex: 1,
        backgroundColor: '#2d2d2d',
        alignItems: 'center',
        marginTop: 30
    },
    giris_button_text: {
        fontSize: 16,
        fontFamily: 'Rajdhani-Regular',
        color: 'yellow',
        fontWeight: 'bold'
    },
    anasayfa_button: {
        width: width - 200,
        backgroundColor: '#2638',
        height: height * 0.05,
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5
    },
    sehir_sec: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: 'Rajdhani-Regular',
        color: 'white',
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'yellow',
        width: width * 0.5
    }
})
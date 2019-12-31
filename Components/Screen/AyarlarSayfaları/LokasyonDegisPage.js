import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    TouchableHighlight,
    TextInput,
    Picker,
    Alert,
    Modal
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
var ss;
var sx;
var gelen_sehir = User.Sehir_ismi;
var gelen_ilce = User.Ilce_ismi;
var sehir;
var ilce;
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
            if (cevap == "ok") 
            {
                User.User_Sehir_ismi = _sehir_ismi;
                User.User_Ilce_ismi = _ilce_ismi;
                Alert.alert(
                    'HelpAs',
                    'Lokasyon bilgileriniz güncellendi.',
                    [
                        { text: 'Tamam' },
                    ],
                    { cancelable: false },
                );
            }
            else 
            {
                Alert.alert("Servis Hatası", "Sunucu ile bağlantı kurulamıyor.");
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
export default class LokasyonDegisPage extends Component {
    constructor(props) {
        super(props)
        this.sehir_dizi = [];
        this.ilce_dizi = [];
        this.state = {
            sehir_dizi: [],
            sehirler: [],
            modalSehirVisible: false,
            ilce_dizi: [],
            ilceler: [],
            modalIlceVisible: false,
            sehir: '',
            ilce: ''
        }
    }
    setSehirModalVisible(visible) {
        this.setState({ modalSehirVisible: visible });
    }

    setIlceModalVisible(visible) {
        this.setState({ modalIlceVisible: visible });
    }

    componentDidMount() {
        GetSehir_Isimleri();
        this.setState({ sehir: User.User_Sehir_ismi, ilce: User.User_Ilce_ismi });
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
    SehirIlceGuncelle() {
        if (this.state.ilce != "") {
            _uye_ad = User.User_Isim;
            _uye_soyad = User.User_Soyisim;
            _uye_id = parseInt(User.User_Id);
            _uye_mail = User.User_Email;
            _uye_tel = User.User_Telefon;
            _sehir_ismi = this.state.sehir;
            _ilce_ismi = this.state.ilce;
            _sifre = User.User_Sifre;
            Uye_Guncelle();
        }
        else {
            Alert.alert("HELPAS", "İlçe Seçmelisiniz.");
        }
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
                    <Icon1 name="retweet" size={25} color="#25D366" />
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
                    <Icon1 name="retweet" size={25} color="#25D366" />
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

    render() {
        const inputStyle = {
            fontSize: 14,
            textAlign: 'center',
            width: '80%',
            marginRight: 20
        };
        const header = {
            fontSize: 18,
            textAlign: 'center',
            width: '80%',
            color: 'snow',
            fontFamily: 'Rajdhani-Regular',
            marginRight: 29
        };
        var sehir = this.state.sehir;
        var ilce = this.state.ilce;

        return (

            <View style={{ flex: 1, backgroundColor: '#2d2d2d' }}>
                <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', backgroundColor: 'gray', alignItems: 'center', height: height * 0.1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => Actions.ProfilPage()}>
                            <Icon1 name="leftcircleo" size={35} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={header}>Adres Bilgileri</Text>
                    </View>
                </View>
                <View style={{ flex: 8 }}>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={false}
                                editable={false}
                                defaultValue={"" + this.state.sehir}
                                clearTextOnFocus={true}
                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {this.SehirListModal()}
                        </View>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={false}
                                editable={false}
                                defaultValue={"" + this.state.ilce}
                                clearTextOnFocus={true}

                                placeholderTextColor="snow"
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 16, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'snow' }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {this.IlceListModal()}
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.55, height: height * 0.07, backgroundColor: '#4285F4', borderRadius: 11 }}
                            onPress={() => this.SehirIlceGuncelle()}
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
            </View>
        )
    }
}
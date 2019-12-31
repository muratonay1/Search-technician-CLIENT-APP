import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
    TouchableHighlight,
    TextInput,
    Alert,
    Modal,
    ScrollView
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User';
import Hizmet from '../../Settings/Hizmetler';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
var ss;
var sx;
var hss;
var gelen_sehir = User.Sehir_ismi;
var gelen_ilce = User.Ilce_ismi;
var sehir;
var ilce;
var gelen_alan;
var gelen_dal;
var Hizmet_Mesaj="";
var user_id;
var _h_aciklama;
var _h_tarih;
const AYLAR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];
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

function Hizmet_Sorgula_Service() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Hizmet_Sorgula", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            _alan_ismi: gelen_alan,
            _altalan_ismi: gelen_dal.toString(),
            _sehir_ismi: gelen_sehir,
            _ilce_ismi: gelen_ilce
        })
    })
        .then(res => res.json())
        .then((result) => {

            cevap = result.d;
            if (cevap == "ok") {
                Alert.alert(
                    'HELPAS',
                    'Hizmet Sağlanabilir.',
                    [
                        { text: 'İptal'},
                        {
                            text: 'Hizmeti İstiyorum',
                            onPress: () => Hizmet_Mesaj="ok",
                            style: 'default',
                        },

                    ],
                    { cancelable: false },
                );
                //Alert.alert("HELPAS","Hizmet Mevcut  "+gelen_alan+","+gelen_dal+","+gelen_sehir+","+gelen_ilce);
            }
            else if (cevap == "no") {

                Hizmet_Mesaj="no";
                Alert.alert("HELPAS", "Hizmet Mevcut degil");
            }
            else if (cevap == "error") {
                Hizmet_Mesaj="no";
                Alert.alert("Exception", "Servis Hatası-Hizmet_Sorgula_Service");
            }
            else{
                Alert.alert("ne bu");
            }


        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function Hizmet_Olustur_Service() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Istek_Olustur", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            alan_ismi: gelen_alan,
            dal_ismi: gelen_dal.toString(),
            uye_id: user_id,
            sehir_ismi:gelen_sehir,
            ilce_ismi: gelen_ilce,
            aciklama: _h_aciklama,
            tarih: _h_tarih
        })
    })
        .then(res => res.json())
        .then((result) => {

            cevap = result.d;
            if (cevap == "ok") {
                Alert.alert('HELPAS','İsteğini aldık. Profilinden hizmet ayrıntılarını öğrenebilirsin.');               
            }           
            else if (cevap == "error") {                
                Alert.alert("Exception", "Servis Hatası-Hizmet_Olustur_Service");
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
const modalstyle={
    justifyContent: 'center',
    alignItems: 'center',
};
export default class SehirIlceSec extends Component {
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
            ilce: '',
            Hizmet_Mesaj: '',
            ilanver_modal_visible:false,
            hizmet_aciklama:''
        }
    }
    setIlanVerModalVisible(visible) 
    {   
        this.setState({ilanver_modal_visible: visible});
    }
    IlanVerModal = () => {
        return (
            <Modal
                animationType="slide"
                style={modalstyle}
                transparent={true}
                visible={this.state.ilanver_modal_visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 60, width: width * 0.95, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2d2d2d', opacity: 1, marginBottom: height * 0.15, borderRadius: 15, marginLeft: 10 }}>
                    <View style={{ flex: 1, marginTop: 40 }}>
                        <Text style={{ color: '#25D366', fontSize: 24, fontFamily: 'Rajdhani-Regular', textAlign: 'center', marginBottom: 5, marginTop: 5, textDecorationLine: 'underline' }}>Hizmet Oluştur</Text>
                    </View>
                    <View>
                        <ScrollView style={{marginTop:25}}>
                            <View style={{ flex: 0.6, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>

                                <TextInput
                                    
                                    label="Açıklama"
                                    multiline={true}
                                    editable={false}
                                    value={gelen_alan}
                                    placeholderTextColor="snow"
                                    style={{ marginTop: 5, fontSize: 18, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8 }}
                                />

                            </View>
                            <View style={{ flex: 0.6, marginTop: 1, flexDirection: 'row', justifyContent: 'center' }}>

                                <TextInput
                                    
                                    
                                    multiline={true}
                                    value={""+gelen_dal}
                                    placeholderTextColor="snow"
                                    style={{ fontSize: 18, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8 }}
                                />

                            </View>
                            <View style={{ flex: 0.6, marginTop: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <TextInput
                                    
                                    multiline={true}
                                    value={gelen_sehir}
                                    placeholderTextColor="snow"
                                    style={{ fontSize: 18, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8 }}
                                />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                        
                                    multiline={true}
                                    value={gelen_ilce}
                                    placeholderTextColor="snow"
                                    style={{ fontSize: 18, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8 }}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                            
                                    multiline={true}
                                    value={new Date().getDate().toString() + "-" + AYLAR[new Date().getMonth()] + "-" + new Date().getFullYear().toString()}
                                    placeholderTextColor="snow"
                                    style={{ fontSize: 18, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8 }}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TextInput
                                    multiline={true}
                                    placeholder="Almak istediğiniz hizmeti kısaca açıklayın"
                                    onChangeText={(hizmet_aciklama) => this.setState({ hizmet_aciklama })}
                                    placeholderTextColor="orange"
                                    style={{ fontSize: 16, fontFamily: 'Rajdhani-Regular', color: 'white', marginLeft: 5, borderBottomWidth: 1, borderBottomColor: 'aqua', width: width * 0.8,height:height*0.2,textAlign:'center' }}
                                />
                            </View>

                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, marginBottom: 40 }}>
                        <TouchableHighlight
                            onPress={()=>this.HizmetOlustur()}
                             style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.08, backgroundColor: '#25D366', borderRadius: 11, width: width * 0.4, top: -75 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow',fontSize:20,fontWeight:'bold' }}>Oluştur</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this.setIlanVerModalVisible(!this.state.ilanver_modal_visible);

                            }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.08, backgroundColor: 'orange', borderRadius: 11, marginBottom: height * 0.04, width: width * 0.4, top: -75 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow',fontSize:20,fontWeight:'bold' }}>İptal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
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
        sehir = this.state.sehir;
        ilce = this.state.ilce;
        gelen_alan = this.props.alan;
        gelen_dal = this.props.dal;
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
                    Hizmet_Mesaj="no";
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
                    Hizmet_Mesaj="no";
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

    HizmetleriSorgula = () => {
        Hizmet_Sorgula_Service();
    }
    HizmetAl=async()=>{
        if(Hizmet_Mesaj=="ok")
        {
            //await Alert.alert(gelen_dal.toString());
            this.setIlanVerModalVisible(true);
        }
        else if(Hizmet_Mesaj=="no")
        {
            Alert.alert("HELPAS","Öncelikle hizmeti sorgulayın.");
        }
    }
    HizmetOlustur()
    {
        if(this.state.hizmet_aciklama != "")
        {
            user_id=parseInt(User.User_Id);
            _h_aciklama=this.state.hizmet_aciklama;
            _h_tarih=new Date().getDate().toString() + "-" + AYLAR[new Date().getMonth()] + "-" + new Date().getFullYear().toString();
            Hizmet_Olustur_Service();
            Actions.reset("SehirIlceSec");
        }
        else{
            Alert.alert("HELPAS","Lütfen bilgilerinizi kontrol edin");
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
                        <TouchableOpacity onPress={() => Actions.AltAlanSec()}>
                            <Icon1 name="leftcircleo" size={35} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={header}>Bölgenizde mevcut olup olmadığını kontrol edin</Text>
                    </View>
                </View>
                <View style={{ flex: 8 }}>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <View style={{ flex: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                multiline={false}
                                editable={false}
                                value={this.state.sehir}
                                clearTextOnFocus={true}
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 17, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'yellow' }}
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
                                value={this.state.ilce}
                                clearTextOnFocus={true}
                                backgroundColor="transparent"
                                style={{ textAlign: 'center', fontSize: 17, fontFamily: 'Rajdhani-Regular', width: width * 0.8, borderRadius: 10, color: 'yellow' }}
                            />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {this.IlceListModal()}
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 35 }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: width * 0.45, height: height * 0.07, backgroundColor: '#585858', borderRadius: 11 }}
                            onPress={() => this.HizmetleriSorgula()}
                            
                            
                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon1 name="search1" size={25} color="#25D366" />
                                </View>
                                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontFamily: 'Rajdhani-Regular', fontWeight: 'bold', marginRight: 13 }}>Hizmeti Sorgula</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{flex:1}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity style={{width:width*0.8,height:height*0.15,borderRadius:10,backgroundColor:'#dfdfe5',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontFamily:'Rajdhani-Regular',fontSize:16}}>{gelen_alan}</Text>
                                <Text style={{fontFamily:'Rajdhani-Regular',fontSize:16}}>{gelen_dal}</Text>
                                <Text style={{fontFamily:'Rajdhani-Regular',fontSize:16}}>{gelen_sehir}</Text>
                                <Text style={{fontFamily:'Rajdhani-Regular',fontSize:16}}>{gelen_ilce}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{ color: 'yellow', fontFamily: 'Rajdhani-Regular', fontWeight: 'bold' }}>Hizmeti Al</Text>
                            <TouchableOpacity onPress={()=>this.HizmetAl()}>
                                <Icon1 name="pluscircle" size={45} color="#25D366" />
                            </TouchableOpacity>
                            
                            {this.IlanVerModal()}
                        </View>
                    </View>
                    
                </View>
                
            </View>
        )
    }
}
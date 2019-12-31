import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Alert, StyleSheet, Modal, TouchableHighlight, TextInput, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon11 from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User'
import Hizmet from '../../Settings/Hizmetler';
import call from 'react-native-phone-call';
var ss;
var usr_id
var Response_UstaBilgileri;
var Response_UstaYorumlar;
var USTA_ADSOYAD;
var USTA_TEL;
var _USTA_ID;
var _ISTEK_ID;
var ustasız_cevap;
var ustalı_cevap;
const SAYILAR = ["1", "2", "3", "4", "5", "6",
    "7", "8", "9", "0"
];
let kontrol;
function UstaBilgileri_Service(string_id) {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Usta_Goruntule", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            id: string_id
        })
    })
        .then(res => res.json())
        .then((result) => {
            Promise.all
            Response_UstaBilgileri = JSON.parse(result.d)
            USTA_ADSOYAD = Response_UstaBilgileri[0].Usta_Isim + " " + Response_UstaBilgileri[0].Usta_SoyIsim;
            USTA_TEL = Response_UstaBilgileri[0].Usta_Telefon;

        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function UstaYorumları_Service() {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Usta_Yorumlari_Mobil", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            usta_id: _USTA_ID
        })
    })
        .then(res => res.json())
        .then((result) => {
            Promise.all
            Response_UstaYorumlar = JSON.parse(result.d)


        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function Hizmet_Sonlandir_Service(hzmt_id,ust_id) {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Hizmet_Sonlandir", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            usta_id: parseInt(hzmt_id),
            istek_id:parseInt(ust_id)
        })
    })
        .then(res => res.json())
        .then((result) => {
            Promise.all
            ustalı_cevap=result.d;
            if(ustalı_cevap=="ok")
            {
                Alert.alert("ustalı kaldırıldı");
            }
            if(ustalı_cevap=="error")
            {
                Alert.alert("ustalı kaldırılmadı");
            }
            


        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}

function Hizmet_Sonlandir_Ustasiz_Service(istk_id) {
    /**-------------------------------------------------------------------------------FETCH */
    fetch(IpChange.GetIp + "Hizmet_Sonlandir_Ustasız", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({           
            istek_id:parseInt(istk_id)
        })
    })
        .then(res => res.json())
        .then((result) => {
            Promise.all
            ustasız_cevap=result.d;
            if(ustasız_cevap=="ok")
            {
                Alert.alert("Hizmet Kaldırıldı.","HELPAS");
            }
            if(ustasız_cevap=="error")
            {
                Alert.alert("Hizmet kaldırılmadı","HELPAS");
            }


        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
}
export default class TeknisyenRaporPage extends Component {

    Kisisel_Hizmet_Sonlandir=(hizmet_id,usta_id)=>{
        if(usta_id=="")
        {
            Alert.alert(
                'HELPAS',
                'Hizmeti sonlandırmak üzeresiniz!',
                [
                    { text: 'Geri'},
                    {
                        text: 'Hizmeti İptal Et',
                        onPress: () => Hizmet_Sonlandir_Ustasiz_Service(hizmet_id),
                        style: 'default',
                    },
    
                ],
                { cancelable: false },
            );
        }
        else{
            Alert.alert(
                'HELPAS',
                'Hizmeti sonlandırmak üzeresiniz!',
                [
                    { text: 'Geri'},
                    {
                        text: 'Hizmeti İptal Et',
                        onPress: () => Hizmet_Sonlandir_Service(usta_id,hizmet_id),
                        style: 'default',
                    },
    
                ],
                { cancelable: false },
            );
        }

        
    }

    async componentWillMount() {
        usr_id = User.User_Id;
        fetch(IpChange.GetIp + "Uye_Kisisel_Istek_Listesi", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                UYE_ID: parseInt(usr_id)
            })
        })
            .then(res => res.json())
            .then((result) => {
                ss = JSON.parse(result.d);
                this.AlanAktar();
            })
    }
    call = () => {
        const args = {
            number: this.state.ustatelefon.toString(),
            prompt: false,
        };
        call(args).catch(console.error);
    }
    Usta_Yonlendirme = async () => {


        for (let i = 0; i < SAYILAR.length; i++) {
            if (SAYILAR[i] == this.state.usta[0]) {
                kontrol = 1;
                break;
            }
        }
        if (kontrol == 1) {
            kontrol = 0;
            var str = this.state.usta
            var array = str.split("-");
            _USTA_ID = array[0];
            UstaBilgileri_Service(array[0]);
            this.setState({ ustaadsoyad: USTA_ADSOYAD, ustatelefon: USTA_TEL, yorum_usta_id: array[0] });
            await
                this.setUstaModalVisible(true);
            //Alert.alert(usta_number);
        }
        else {

        }

    }
    YorumAktar =  () => {
        if(this.state.yorumlar == 0 || this.state.yorumlar == null)
        {
            for (let i = 0; i < Response_UstaYorumlar.length; i++) {
                this.yorumlar_dizi.push({ Uye_Ad: [Response_UstaYorumlar[i].Uye_Ad], Uye_Soyad: [Response_UstaYorumlar[i].Uye_Soyad], Yorum_Tarihi: [Response_UstaYorumlar[i].Yorum_Tarih], Yorum_Icerik: [Response_UstaYorumlar[i].Yorum_İcerik] });
            }
            this.setState({ yorumlar: [...this.yorumlar_dizi] })
        }
        else{}
        
        

    }
    Usta_Yorumlar = async() => {
        UstaYorumları_Service();
        await
        console.log(Response_UstaYorumlar);
        this.YorumAktar();
        this.setUstaYorumModalVisible(true);
    }
    Usta_Yorum_Modal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.usta_yorum_modal_visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>

                <View style={{ marginTop: height * 0.4, width: width * 0.95, justifyContent: 'center', alignItems: 'center', backgroundColor: '#17223b', opacity: 1, marginBottom: height * 0.05, borderRadius: 15, marginLeft: 10 }}>
                    <View>
                        <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',color:'snow',fontWeight:'bold'}}>USTA YORUMLARI</Text>
                        <View style={{ flex: 6, marginTop: 15, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: width * 0.8}}>                       
                            <FlatList
                                
                                data={this.state.yorumlar}
                                renderItem={
                                    ({ item }) => {
                                        return (
                                            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'gray',marginTop:20,borderRadius:15}}>
                                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',fontWeight:'bold',fontSize:14}}>{item.Uye_Ad} {item.Uye_Soyad}</Text>
                                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',textDecorationLine:'underline'}}>{item.Yorum_Tarihi}</Text>
                                                <Text style={{textAlign:'center',fontFamily:'Rajdhani-Regular',fontSize:18}}>{item.Yorum_Icerik}</Text>
                                            </View>

                                        )
                                    }
                                }
                            />
                            <Text style={{textAlign:'center'}}></Text>
                            <Text style={{textAlign:'center'}}></Text>
                            
                            

                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setUstaYorumModalVisible(!this.state.usta_yorum_modal_visible);

                                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.1, backgroundColor: 'green', borderRadius: 11, marginBottom: height * 0.04, width: width * 0.4, top: -5 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>

            </Modal>
        )


    }
   
    Usta_Modal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.usta_modal_visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>

                <View style={{ marginTop: height * 0.4, width: width * 0.95, justifyContent: 'center', alignItems: 'center', backgroundColor: '#17223b', opacity: 1, marginBottom: height * 0.3, borderRadius: 15, marginLeft: 10 }}>
                    <View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#25D366', fontSize: 13, fontFamily: 'Sansation-Light', textAlign: 'center', marginBottom: 5, marginTop: 5, textDecorationLine: 'underline', fontWeight: 'bold' }}>Usta Adı-Soyadı: {this.state.ustaadsoyad}</Text>
                        </View>
                        <View style={{ flex: 6, marginTop: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>


                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginRight: 30, marginBottom: 45 }}
                                onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=90' + this.state.ustatelefon)}>
                                <Icon name="whatsapp" size={65} color="#25D366" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.call() }} style={{ marginLeft: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 45 }}>
                                <Icon name="phone" size={65} color="#4285F4" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.Usta_Yorumlar() }} style={{ marginLeft: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 45 }}>
                                <Icon11 name="comment-alt" size={60} color="snow" />
                                {this.Usta_Yorum_Modal()}
                            </TouchableOpacity>


                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setUstaModalVisible(!this.state.usta_modal_visible);

                                }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.1, backgroundColor: 'green', borderRadius: 11, marginBottom: height * 0.04, width: width * 0.4, top: -10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>

            </Modal>
        )


    }
    HizmetModal() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalHizmetVisible}
                    onRequestClose={() => {

                    }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada' }}>
                        <View style={{ marginTop: 50 ,flexDirection:'row'}}>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Rajdhani-Regular', textShadowColor: 'blue', textShadowRadius: 20}}>İSTEK TALEBİ</Text>                    
                        </View>
                        <View style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 30, justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Rajdhani-Regular', fontSize: 16 }}>HİZMET TALEBİN ŞU AÇIKLAMA İLE OLUŞTURULDU</Text>
                            <Icon name="arrow-circle-o-down" size={50} color="#88cc00" />
                            <Text style={styles.istekTextStyle}>
                                {this.state.istek_aciklama}
                            </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#dadada' }}>
                        <TouchableOpacity style={{ marginTop: 5 }} onPress={() => this.Usta_Yonlendirme()}>
                            <Text style={styles.ustaOnayText, { color: this.state.ustaOnayTextColor, fontSize: 28 }}>{this.state.usta}</Text>
                            
                            {this.Usta_Modal()}
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#dadada' }}>
                        <TouchableHighlight
                            onPress={() => {
                                this.setHizmetModalVisible(false);
                            }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.09, width: width * 0.7, backgroundColor: '#585858', borderRadius: 11, marginBottom: 50 }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

            </View>
        )
    }
    setHizmetModalVisible(visible, ISTEK_ID, ISTEK_TARIH, ALAN_ISMI, DAL_ISMI, SEHIR_ISMI, ILCE_ISMI, ISTEK_ACIKLAMA, USTA) {
        if (USTA == "") {

            USTA = "ONAYLANMADI"
            this.setState({ modalHizmetVisible: visible, istek_id: ISTEK_ID, istek_tarih: ISTEK_TARIH, alan_ismi: ALAN_ISMI, dal_ismi: DAL_ISMI, ilce_ismi: ILCE_ISMI, istek_aciklama: ISTEK_ACIKLAMA, usta: USTA, ustaOnayTextColor: 'red' });
           
        }
        else {
            USTA = USTA + "-HİZMET ONAYLANDI"
            this.setState({ modalHizmetVisible: visible, istek_id: ISTEK_ID, istek_tarih: ISTEK_TARIH, alan_ismi: ALAN_ISMI, dal_ismi: DAL_ISMI, ilce_ismi: ILCE_ISMI, istek_aciklama: ISTEK_ACIKLAMA, usta: USTA, ustaOnayTextColor: '#25D366' });
        }

    }
    setUstaModalVisible(visible) {
        this.setState({ usta_modal_visible: visible });
    }
    setUstaYorumModalVisible(visible) {
        this.setState({ usta_yorum_modal_visible: visible });
    }
    AlanAktar = () => {
        if (ss.length > 0) {
            this.setState({ Soru: 'Hangi Alanda Hizmet Almak İstersin?' })
            if (this.state.Alanlar == "" || this.state.Alanlar == null) {
                for (let i = 0; i < ss.length; i++) {
                    this.Alanlar_Dizisi.push({ Istek_Aciklama: [ss[i].Istek_Aciklama], Istek_Id: [ss[i].Istek_Id], Alan_Ismi: [ss[i].Alan_Ismi], Dal_Ismi: [ss[i].Dal_Ismi], Sehir_Ismi: [ss[i].Sehir_Ismi], Ilce_Ismi: [ss[i].Ilce_Ismi], Istek_Tarih: [ss[i].Istek_Tarih], Usta: [ss[i].Usta] })
                }
                this.setState({ Alanlar: [...this.Alanlar_Dizisi] })
            }
        }
        else {
            Alert.alert(
                'HelpAs',
                'Çok kısa sürecek üyelik formuna yönlendirileceksiniz.',
                [
                    {
                        text: 'Hayır',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Tamam' },
                ],
                { cancelable: false },
            );
        }
    }
    

    constructor(props) {
        super(props)
        this.Alanlar_Dizisi = [];
        this.yorumlar_dizi = [];
        this.state = {
            Alanlar_Dizisi: [],
            Alanlar: [],
            Soru: '',
            click_alan: '',
            istek_id: 0,
            istek_tarih: 'muratttt',
            alan_ismi: '',
            dal_ismi: '',
            sehir_ismi: '',
            ilce_ismi: '',
            istek_aciklama: 'denemeeeee',
            usta: 0,
            modalHizmetVisible: false,
            ustaOnayTextColor: '#25D366',
            kontrol: 0,
            usta_modal_visible: false,
            ustaadsoyad: '',
            ustatelefon: '',
            yorum_usta_id: '',
            yorumlar: [],
            yorumlar_dizi: [],
            usta_yorum_modal_visible: false
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#d1d8e0' }}>

                <View style={{ flex: 4, backgroundColor: '#252A34' }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow', marginTop: 30, fontSize: 16, fontWeight: 'bold' }}>HİZMET TALEPLERİ</Text>
                    <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'green', marginTop: 2, fontSize: 10, fontWeight: 'bold' }}>Talebi Görüntülemek için üzerine tıklayın</Text>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <FlatList
                            style={{ width: width, height: height * 0.07, marginTop: 20 }}
                            data={this.state.Alanlar}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 5 }}>

                                            <TouchableOpacity style={{ width: width * 0.8, height: height * 0.3 }}
                                                onPress={() => this.setHizmetModalVisible(true, '' + item.Istek_Id, '' + item.Istek_Tarih, '' + item.Alan_Ismi, '' + item.Dal_Ismi, '' + item.Sehir_Ismi, '' + item.Ilce_Ismi, '' + item.Istek_Aciklama, '' + item.Usta)}
                                                onLongPress={()=>this.Kisisel_Hizmet_Sonlandir(''+item.Istek_Id,''+item.Usta)}
                                            >
                                                <View style={styles.MainView}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={styles.textBaslik}>Istek Numarası</Text>
                                                        <Text style={styles.textBaslik}>Istek Tarihi</Text>
                                                        <Text style={styles.textBaslik}>Alan</Text>
                                                        <Text style={styles.textBaslik}>Brans</Text>
                                                        <Text style={styles.textBaslik}>Sehir</Text>
                                                        <Text style={styles.textBaslik}>Ilce</Text>
                                                    </View>

                                                    <View style={{ flex: 1 }}>
                                                        <Text style={styles.textIcerik}>{item.Istek_Id}</Text>
                                                        <Text style={styles.textIcerik}>{item.Istek_Tarih}</Text>
                                                        <Text style={styles.textIcerik}>{item.Alan_Ismi}</Text>
                                                        <Text style={styles.textIcerik}>{item.Dal_Ismi}</Text>
                                                        <Text style={styles.textIcerik}>{item.Sehir_Ismi}</Text>
                                                        <Text style={styles.textIcerik}>{item.Ilce_Ismi}</Text>
                                                    </View>

                                                </View>
                                                <View>
                                                    {this.HizmetModal()}
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            }
                        />
                    </View>

                </View>
                <View>

                </View>

            </View>


        )
    }
}

const styles = StyleSheet.create({
    MainView: {
        flex: 1,
        backgroundColor: '#263859',
        marginBottom: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#C8C8C8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    },
    textBaslik: {
        color: '#8A949B',
        fontSize: 11,
        fontFamily: 'Rajdhani-Regular',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    textIcerik: {
        color: '#F9C134',
        fontSize: 11,
        fontFamily: 'Rajdhani-Regular',
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 5,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    istekTextStyle: {
        textAlign: 'justify',
        textDecorationStyle: 'solid',
        textAlignVertical: 'center',
        textShadowColor: 'white',
        textShadowRadius: 5,
        lineHeight: 30,
        fontFamily: 'Rajdhani-Regular',
        fontSize: 18, fontWeight: 'bold',

        marginTop: 40, backgroundColor: 'snow',
        borderRadius: 15,
        textAlign: 'center',
        color: 'gray',
        height: height * 0.2,
        width: width * 0.9
    },
    ustaOnayText: {
        fontSize: 28,
        fontFamily: 'Rajdhani-Regular',
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textAlignVertical: 'center',
        textShadowColor: 'white',
        textShadowRadius: 5,
        lineHeight: 30
    }
   
})
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import Hizmet from '../../Settings/Hizmetler';

var gelen;
var sx;
function fonk_Service() {
    

    fetch(IpChange.GetIp + "AltAlanListesi", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify({
            Alan_Ismi: gelen

        })
    })
        .then(res => res.json())
        .then((result) => {
            sx = JSON.parse(result.d);
                
        })

}
export default class AltAlanSec extends Component {
    async componentWillMount() {
        //Actions.reset("AltAlanSec");
        //this.setState({AltAlanlar:[],AltAlanlar_Dizisi:[]});
        //this.AltAlanlar_Dizisi=[];
        
         this.fonk();        
        
    }
    fonk = async() => {
        gelen=''+this.props.secilen_alan;
        //await
        //window.location.reload(true);
        if(sx==null)
        {
            Alert.alert("HELPAS","Bu Alanda bir branş bulunmuyor. Devam Etmek için OK tıklayın");
            gelen=''+this.props.secilen_alan;
            
        }
        await fonk_Service();
        await this.AltAlanAktar();
        
    }
    SayfaYonlendirme(gonderilecek_alan,gonderilecek_dal)
    {
        
        if(gonderilecek_dal=="0")
        {
            
            //Alert.alert(gonderilecek_alan+","+gonderilecek_dal);
            Actions.SehirIlceSec({alan:gonderilecek_alan,dal:gonderilecek_dal})
        }
        else
        {
            //Alert.alert(gonderilecek_alan+","+Hizmet.Hizmet_Dal);
            Actions.SehirIlceSec({alan:gonderilecek_alan,dal:gonderilecek_dal})
        }

    }
    AltAlanAktar = async () => {
       if(sx!=null)
       {
        for (let i = 0; i < sx.length; i++) {
            this.AltAlanlar_Dizisi.push({ Dal_Id: [sx[i].Dal_Id], Dal_Isim: [sx[i].Dal_Isim] })
        }            
        this.setState({ AltAlanlar: [...this.AltAlanlar_Dizisi] })
       }
       else if(sx == null)
       {
           this.setState({Mesaj:'Bu alanda ekstra hizmet bulunmamakta.'});
           Alert.alert(
            'HELPAS',
            this.state.Mesaj,
            [              
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.SayfaYonlendirme(gelen,"0")},
            ],
            {cancelable: false},
          );
       }
        
        
    }

    constructor(props) {
        super(props)
        this.AltAlanlar_Dizisi = [];
        this.state = {
            AltAlanlar_Dizisi: [],
            AltAlanlar: [],
            Mesaj:''
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
            <View style={{ flex: 1, backgroundColor: '#d1d8e0' }}>
            <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', backgroundColor: 'gray', alignItems: 'center', height: height * 0.1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'column', marginLeft: 15 }}>
                        <TouchableOpacity onPress={() => Actions.AlanSec()}>
                            <Icon1 name="leftcircleo" size={35} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={header}>Hangi Branşta Hizmet Almak İstersiniz?</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:16,fontFamily:'Rajdhani-Regular',fontWeight:'bold',textAlign:'center'}}>Teknik Destek</Text>
                </View>

                <View style={{flex:8}}>
                <FlatList
                style={{ width: width, height: height * 0.07 }}
                data={this.state.AltAlanlar}
                
                renderItem={
                    ({ item }) => {
                        return (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ width: width * 0.8, height: height * 0.2 }}
                                    onPress={()=>this.SayfaYonlendirme(gelen,item.Dal_Isim)}
                                >
                                    <View style={{ flex: 1, backgroundColor: '#e3e3e3', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                                        <Icon name="hand-o-down" size={25} color="#88cc00" />
                                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Rajdhani-Regular', textAlign: 'center', marginBottom: 5, marginTop: 5, fontWeight: 'bold' }}>
                                            {
                                                
                                                    item.Dal_Isim
                                               
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    }
                }
            />
                </View>
                
            </View>
        )

    }



}
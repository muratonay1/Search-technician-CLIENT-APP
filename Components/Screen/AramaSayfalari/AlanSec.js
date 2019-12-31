import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Alert  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
import User from '../../Settings/User'
import Hizmet from '../../Settings/Hizmetler';
var ss;

export default class AlanSec extends Component {
  async componentWillMount() {
    fetch(IpChange.GetIp + "AlanListesi", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((result) => {
        ss = JSON.parse(result.d)
      },
        (error) => {
          
        })
  }
  AlanAktar = () => {
    if(User.User_Id != null && User.User_Email != null)
    {
      this.setState({Soru:'Hangi Alanda Hizmet Almak İstersin?'})
      if (this.state.Alanlar == "" || this.state.Alanlar == null) {
        for (let i = 0; i < ss.length; i++) {
          this.Alanlar_Dizisi.push({ Alan_Id: [ss[i].Alan_Id], Alan_Isim: [ss[i].Alan_Isim] })
        }
        this.setState({ Alanlar: [...this.Alanlar_Dizisi] })
      }
    }
    else{
      Alert.alert(
        'HelpAs',
        'Çok kısa sürecek üyelik formuna yönlendirileceksiniz.',
        [
          
          {
            text: 'Hayır',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Tamam', onPress: () => Actions.GirisPage()},
        ],
        {cancelable: false},
      );
    }
    
  }

  GoAltalanSec=(alan)=>{
    
    //Alert.alert('UYARI',''+alan)
    Actions.AltAlanSec({secilen_alan:''+alan});
    
    
  }

  constructor(props) {
    super(props)
    this.Alanlar_Dizisi = [];
    this.state = {
      Alanlar_Dizisi: [],
      Alanlar: [],
      Soru:'',
      click_alan:''

    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#d1d8e0' }}>
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'#e67f7f'}}>
          <TouchableOpacity
            style={{ width: 150, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}
            onPress={() => this.AlanAktar()}
          >
            <Text style={{ color: "gray", fontFamily: 'Rajdhani-Regular', fontSize: 18,fontWeight:'bold' }}>Bana Yardım Et!</Text>
            <Text style={{ color: "gray", fontFamily: 'Rajdhani-Regular', fontSize: 12 }}>Tıkla</Text>
          </TouchableOpacity>
          <Text style={{ color: "snow", fontFamily: 'Rajdhani-Regular', fontSize: 18,fontWeight:'bold' }}>En İyi Teknisyenleri Arayın</Text>
          <Text style={{ color: "snow", fontFamily: 'Rajdhani-Regular', fontSize: 14,fontWeight:'200' }}>Belki de aradığınıza çok yakınsınız</Text>
        </View>
        <View style={{ flex: 4 ,backgroundColor:'#eb9999'}}>
          <View style={{ flex: 1 ,alignItems:'center'}}>
          <Text style={{fontSize:18,fontFamily:'Rajdhani-Regular',color:'black',fontWeight:'normal',textDecorationLine:'underline',textShadowRadius:5}}>{this.state.Soru}</Text>
            <FlatList
              style={{ width: width, height: height * 0.07 }}
              data={this.state.Alanlar}
              renderItem={
                ({ item }) => {
                  return (
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',top:5}}>
                      
                      <TouchableOpacity style={{ width: width * 0.8 , height:height*0.2}} onPress={()=>this.GoAltalanSec(''+item.Alan_Isim)}>
                        <View style={{ flex: 1, backgroundColor: '#e3e3e3', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8',alignItems:'center',justifyContent:'center' ,borderRadius:15}}>
                        <Icon name="hand-o-down" size={25} color="#88cc00" />
                          <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Rajdhani-Regular', textAlign: 'center', marginBottom: 5, marginTop: 5 ,fontWeight:'bold'}}>
                            {item.Alan_Isim}
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


      </View>
    )
  }



}
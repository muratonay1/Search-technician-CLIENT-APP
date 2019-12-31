import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, ImageBackground, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Actions, Router } from 'react-native-router-flux';
console.disableYellowBox = true;
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import IpChange from '../../Settings/IpChange';
var maxlimit = 5;
var ss;
let kontrol = 0;
export default class Haberler_AnaSayfa extends Component {
  async componentWillMount() {
    fetch(IpChange.GetIp + "HaberListele", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then((result) => {
        ss = JSON.parse(result.d)
        this.Haber_Aktar();
      },
        (error) => {

        })
  }

  Haber_Aktar = () => {
    if (this.state.Haberler == "" || this.state.Haberler == null) {
      for (let i = ss.length - 1; i >= 0; i--) {
        this.Haberler_Dizisi.push({ Haber_Baslik: [ss[i].Haber_Baslik], Haber_Icerik: [ss[i].Haber_Icerik] })
      }
      this.setState({ Haberler: [...this.Haberler_Dizisi] })
    }
  }
  constructor(props) {
    super(props)
    this.Haberler_Dizisi = [];
    this.state = {
      Haberler_Dizisi: [],
      Haberler: [],
      modalHaberVisible: false,
      haber_baslik: '',
      haber_icerik: ''
    }
  }
  setHaberModalVisible(visible, baslik, icerik) {

    this.setState({ modalHaberVisible: visible, haber_baslik: baslik, haber_icerik: icerik });
  }

  HaberListModal() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalHaberVisible}
          onRequestClose={() => {

          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#999999' }}>
            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Rajdhani-Regular' , textShadowColor: 'green', textShadowRadius: 20}}>{this.state.haber_baslik}</Text>
            </View>
            <View style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 30, justifyContent: 'space-around' }}>
              <Text style={{ textAlign: 'justify', textDecorationStyle: 'solid', textAlignVertical: 'center', textShadowColor: 'white', textShadowRadius: 30, lineHeight: 30, fontFamily: 'Rajdhani-Regular', fontSize: 16 }}>
                {this.state.haber_icerik}
              </Text>
            </View>


          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#999999' }}>
            <TouchableHighlight
              onPress={() => {
                this.setHaberModalVisible(false);
              }} style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.09, width: width * 0.7, backgroundColor: '#585858', borderRadius: 11, marginBottom: 50 }}>
              <Text style={{ textAlign: 'center', fontFamily: 'Rajdhani-Regular', color: 'snow' }}>Geri</Text>
            </TouchableHighlight>
          </View>
        </Modal>

      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:'#C8C8C8'}}>
        <View style={{marginBottom:20}}>
          <Text style={{ textAlign: 'center', paddingTop: 10, fontSize: 28, color: 'Gray', backgroundColor: '#C8C8C8' }}>HABER KÖŞESİ</Text>
        </View>

        <FlatList
          style={{ width: width, height: height * 0.07 }}
          data={this.state.Haberler}
          renderItem={
            ({ item }) => {
              if (this.state.Haberler[kontrol].Haber_Baslik == item.Haber_Baslik) {
                return (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 5 }}>
                    <TouchableOpacity style={{ width: width * 0.9, height: height * 0.25 }} onPress={() => this.setHaberModalVisible(true, item.Haber_Baslik, item.Haber_Icerik)}>
                      <View style={{ flex: 1, backgroundColor: '#e3e3e3', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                          <Text style={{ fontSize: 16, color: '#3f3f3f', fontWeight: 'bold' }}>{item.Haber_Baslik}</Text>
                        </View>
                        <Icon name="fiber-new" size={25} color="red" />
                        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                          <Text numberOfLines={2} style={{ color: 'black', fontSize: 14, fontFamily: 'Rajdhani-Regular', textAlign: 'center', marginBottom: 5, marginTop: 5, fontWeight: 'normal', paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                            {item.Haber_Icerik}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }
              else {
                return (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', top: 5 }}>
                    <TouchableOpacity style={{ width: width * 0.9, height: height * 0.25 }} onPress={() => this.setHaberModalVisible(true, item.Haber_Baslik, item.Haber_Icerik)}>
                      <View style={{ flex: 1, backgroundColor: '#e3e3e3', marginBottom: 20, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#C8C8C8', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          {this.HaberListModal()}
                          <Text style={{ fontSize: 16, color: '#3f3f3f', fontWeight: 'bold' }}>{item.Haber_Baslik}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                          <Text numberOfLines={2} style={{ color: 'black', fontSize: 14, fontFamily: 'Rajdhani-Regular', textAlign: 'center', marginBottom: 5, marginTop: 5, fontWeight: 'normal', paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                            {item.Haber_Icerik}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              }

            }
          }
        />

      </View>



    )
  }
}
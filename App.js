import React,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Dimensions,FlatList,StatusBar,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {Actions, Router} from 'react-native-router-flux';
import RouterControl from './Components/Settings/RouterControl';
console.disableYellowBox = true;
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
import User from './Components/Settings/User'


export default class PageContainer extends Component{
  
    constructor(props)
    {
        super(props);
        this.state={
          searchIconColor:'#88cc00',
          settingsIconColor:'black',
          adverIconColor:'black',
          statusbarColor:'green',
          
          
          
        }
    }
   ChoosePage=async(text)=>{
     if(text=="search")
     {
        
        this.setState({searchIconColor:'#88cc00'})
        this.setState({settingsIconColor:'black'})
         this.setState({adverIconColor:'black'})
         await this.setState({statusbarColor:'#e67f7f'})
        Actions.AlanSec();
        
        
     }
     if(text=="advertisements")
     {
        this.setState({searchIconColor:'black'})
        this.setState({settingsIconColor:'black'})
         this.setState({adverIconColor:'#88cc00'})
         await this.setState({statusbarColor:'#2ecc71'})
        Actions.Haberler_AnaSayfa();
        
        
     }
     if(text=="settings")
     {
        this.setState({searchIconColor:'black'})
        this.setState({settingsIconColor:'#88cc00'})
         this.setState({adverIconColor:'black'})
         await this.setState({statusbarColor:'#88cc00'})
         if(User.User_Id != null && User.User_Email != null)
         {
           Actions.ProfilPage();
         }
         else{
          Actions.AyarlarSayfa_Main();
         }
        
        
        
        
     }
     
   }

    
  render(){
    
    return(
      <SafeAreaView style={{flex:1}}>
        <View style={{flex:12, backgroundColor:'#dadada'}}>
          <StatusBar backgroundColor={this.state.statusbarColor}/>
          <RouterControl/>
        </View>

        <View style={{flex:1,backgroundColor:'#484848',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',height:height*0.1}}>

            <TouchableOpacity onPress={
              () => {
                this.ChoosePage("search")
              }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',flex:1,borderRadius:15}}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                
                    <Icon name="search" size={35} color={this.state.searchIconColor}/>
                
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={
              () => {
                 
                this.ChoosePage("advertisements")
                }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:15,flex:1}}>
            <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            
                <Icon1 name="appstore1" size={35} color={this.state.adverIconColor}/>
            
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={
              () => {
                 
                this.ChoosePage("settings")
                }
            } 
            style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:15,flex:1}}>
              <View  style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              
                  <Icon name="users-cog" size={35} color={this.state.settingsIconColor}/>
              
              </View>
            </TouchableOpacity>

            

            
        </View>
        
      </SafeAreaView>
    )
  }
}
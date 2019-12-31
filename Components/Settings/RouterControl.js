import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import AlanSec from '../Screen/AramaSayfalari/AlanSec.js';
import AltAlanSec from '../Screen/AramaSayfalari/AltAlanSec.js';
import SehirIlceSec from '../Screen/AramaSayfalari/SehirIlceSec.js';
import AyarlarSayfa_Main from '../Screen/AyarlarSayfaları/AyarlarSayfa_Main';
import Haberler_AnaSayfa from '../Screen/HaberlerSayfası/Haberler_AnaSayfa';
import GirisPage from '../Screen/AyarlarSayfaları/GirisPage';
import ProfilPage from '../Screen/AyarlarSayfaları/ProfilPage';
import AdSoyadPage from '../Screen/AyarlarSayfaları/AdSoyadPage';
import MailTelefonPage from '../Screen/AyarlarSayfaları/MailTelefonPage';
import SifreDegisPage from '../Screen/AyarlarSayfaları/SifreDegisPage';
import LokasyonDegisPage from '../Screen/AyarlarSayfaları/LokasyonDegisPage';
import TeknisyenRaporPage from '../Screen/AyarlarSayfaları/TeknisyenRaporPage';
import KayitPage from '../Screen/AyarlarSayfaları/KayitPage';

export default class RouterControl extends Component {
  render() {
    return (
      <Router>
        <Scene key='Root'>
            
        
            <Scene key="AlanSec" component={AlanSec}   hideNavBar />
            <Scene key="AltAlanSec" component={AltAlanSec}    hideNavBar />
            <Scene key="SehirIlceSec" component={SehirIlceSec}  hideNavBar />
            <Scene key="AyarlarSayfa_Main" component={AyarlarSayfa_Main}  hideNavBar   />
            <Scene key="Haberler_AnaSayfa" component={Haberler_AnaSayfa}     />
            <Scene key="GirisPage" component={GirisPage}   hideNavBar/>
            <Scene key="ProfilPage" component={ProfilPage}  hideNavBar />
            <Scene key="AdSoyadPage" component={AdSoyadPage}   hideNavBar />
            <Scene key="MailTelefonPage" component={MailTelefonPage}   hideNavBar />
            <Scene key="SifreDegisPage" component={SifreDegisPage}   hideNavBar />
            <Scene key="LokasyonDegisPage" component={LokasyonDegisPage}   hideNavBar />
            <Scene key="TeknisyenRaporPage" component={TeknisyenRaporPage}   hideNavBar />
            <Scene key="KayitPage" component={KayitPage} initial  hideNavBar />
           
           
        </Scene>
      </Router>
    )
  }
}
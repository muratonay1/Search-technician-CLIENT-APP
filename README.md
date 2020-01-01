# Search-technician-CLIENT-APP
Bitirme Projesi Kullanıcı Mobil Uygulaması

# Kurulması Gereken Eklentiler
- npm install --save react-native-elements (Arayüz tasarlamak için hazır componentler içerir.)
- npm install --save react-native-phone-call (Telefon numarasını android arama penceresine yönlendirir.)
- npm install --save react-native-router-flux (Sayfa geçişleri/navigation eklentisi.)
- npm install --save react-native-text-avatar (Profil sayfasında kullanıcı ad ve soyadı için baş harfleri ile bir avatar oluşturmak için.)
- npm install --save react-native-vector-icons (https://oblador.github.io/react-native-vector-icons/ kaynaklarına erişmek için)
- Not: Proje klasörü içerisinde Components/Fonts yani özel fontları kullanabilmek için package.json dosyasına;
-   "rnpm": {
    "assets": [
      "./Components/Fonts/"
    ]
  }
  kopyalayın ve "react-native link" diyerek projeye link edelim.

# Projeyi Çalıştırmak
- "react-native init ProjectName" olarak bir proje oluşturun ve projenizi "react-native run-android" ile çalıştırın.
- Ardından 'Kurulması Gereken Eklentiler' i teker teker kurun.
- Ardından proje içerisinde yer alan 'Components' ve 'App.js' dosyalarını proje dizininize kopyalayın.
- Projeyi ayağa kaldırdıktan sonra veriler gelmeyektir. Tasarımsal olarak incelenebilir çünkü Sunucu ve WebService localdedir.

# PROJE HAKKINDA
  Projenin yönetimi için masaüstü uygulamasına, https://github.com/muratonay1/-Search-technician-ADMIN-PANEL adresinden ulaşabilirsiniz.
  Projenin mobil ayağı kullanıcılara hitap etmektedir.
  Projenin Hizmet Sağlayıcısı (Masaüstü Uygulamasına Sahip) hizmet talebinde bulunan kullanıcılara uygun teknisyenleri atayarak
  taleplerini karşılar. 
# Dilediğiniz gibi WebService/Api/Veritabanı tasarlayıp uygulamaya giydirebilirsiniz.
#Örnek olması maksadı ile ekran görüntülerini aşağıda paylaşıyorum.



# Kullanıcı Giriş Ekranı

![girisyap](https://user-images.githubusercontent.com/34923740/71636974-fa316f80-2c49-11ea-9545-88a56e6b88a0.PNG)



# Kullanıcı Profil Sayfası (Scroll 1)

![profil1](https://user-images.githubusercontent.com/34923740/71636998-7af06b80-2c4a-11ea-902e-7e4988e90ba9.PNG)


# Kullanıcı Profil Sayfası (Scroll 2)

![profil2](https://user-images.githubusercontent.com/34923740/71637001-89d71e00-2c4a-11ea-9533-5cdbe005b2db.PNG)


# Kullanıcı Geri Bildirim Oluşturma (Profil sayfasından)

![geribildirimolusturma](https://user-images.githubusercontent.com/34923740/71637009-a4a99280-2c4a-11ea-8686-7cdd96ffce01.PNG)


# Kullanıcı Hizmet Alanı Seçme


![alanlar](https://user-images.githubusercontent.com/34923740/71637010-b723cc00-2c4a-11ea-9281-b2c6c006a90b.PNG)


# Kullanıcı Hizmet Altalanı Seçme (Örnek: Tamirci Servisi altalanları)


![tamirci servisi elektrik](https://user-images.githubusercontent.com/34923740/71637015-c9056f00-2c4a-11ea-9dd3-12af46979069.PNG)



# Kullanıcı Hizmet Sorgulama Sayfası (1-Genel Görünüm)


![hizmetsorgula1](https://user-images.githubusercontent.com/34923740/71637025-f225ff80-2c4a-11ea-850b-a3abfd0d5680.PNG)



# Kullanıcı Hizmet Sorgulama Sayfası (2-Hizmet Sorgulama-(Hizmet sağlanamama durumu))
- Seçilen alan,altalan,şehir ve ilçe bilgileri ve hizmetin bu koşullarda sağlanıp sağlanmadığını kontrol ediyoruz.


![hizmetsorgulahata](https://user-images.githubusercontent.com/34923740/71637049-5ba60e00-2c4b-11ea-9a2b-1bc7f7900eb4.PNG)



# Kullanıcı Hizmet Sorgulama Sayfası (2-Hizmet Sorgulama-(Hizmet varsa))


![kayserikocasinanhizmet](https://user-images.githubusercontent.com/34923740/71637061-7a0c0980-2c4b-11ea-83e1-015043d9976b.PNG)



# Kullanıcı Hizmet Sorgulama Sayfası (3-Talep Oluşturma)


![hizmetolustur](https://user-images.githubusercontent.com/34923740/71637070-9b6cf580-2c4b-11ea-850c-cfa9420e13a3.PNG)



# Kullanıcı Profil Sayfası "Teknisyen Raporu" Sekmesi (Genel Görünüm)


![hizmet talebi](https://user-images.githubusercontent.com/34923740/71637072-b7709700-2c4b-11ea-9260-922be20c625c.PNG)



# Talebin Ayrıntıları (Talep Henüz Onaylanmadı)

https://github.com/muratonay1/-Search-technician-ADMIN-PANEL adresindeki admin panel uygulaması ile hizmet talebinde bulunan
kullanıcılara hizmet vermeye müsait ustalar atanır.

![talep ayrıntısı](https://user-images.githubusercontent.com/34923740/71637088-eedf4380-2c4b-11ea-9be0-22e0a5a43dcb.PNG)



# Talebin Ayrıntıları (Talep Onaylandı ve usta atandı)


![hizmet talebi onaylandı](https://user-images.githubusercontent.com/34923740/71637111-4a113600-2c4c-11ea-87f1-0dc46f05201b.PNG)



# Atanan Ustaya Ulaşma İmkanları


![usta ulaşım arayüzü](https://user-images.githubusercontent.com/34923740/71637118-72993000-2c4c-11ea-862f-2547bdb6cef8.PNG)



# Usta Hakkında Yorumlar


![usta yorumu](https://user-images.githubusercontent.com/34923740/71637121-8a70b400-2c4c-11ea-81f6-2e2c999bfeb2.PNG)



# Kullanıcı Hizmet Talebini Kaldırma


![hizmet talep reddi](https://user-images.githubusercontent.com/34923740/71637128-9c525700-2c4c-11ea-951a-0ceab952193f.PNG)



# Kullanıcı Engelleme



![hesap engeli](https://user-images.githubusercontent.com/34923740/71637130-a7a58280-2c4c-11ea-838f-0e35b634be6e.PNG)



# Haberler


![HABERLER](https://user-images.githubusercontent.com/34923740/71637134-dae81180-2c4c-11ea-8b59-0eddf1ffa04e.PNG)




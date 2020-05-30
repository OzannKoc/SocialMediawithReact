import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {register} from 'timeago.js'

i18n.use(initReactI18next).init({
    resources:{
        en :{
            translations :{
                "Sign Up" : "Sign Up",
                "Password mismatch" : "Password mismatch",
                "Username" : "Username",
                "Display Name" : "Display Name",
                "Password" : "Password",
                "Password Repeat" : "Password Repeat",
                "Kullanıcı adı boş olamaz" : "Username must not be null",
                "Login"  : "Login",
                "Sign in" : "Sign in",
                "Logout" :"Logout",
                "Users" : "Users",
                "Next"  : "Next >",
                "Previous" : "< Previous",
                "Load Failure": "Load Failure",
                "User not found" : "User not found",
                "Change Display Name" : "Change Display Name",
                "Edit": "Edit",
                "Save" : "Save",
                "Cancel" : "Cancel",
                "My Profile" : "My Profile",
                "Share" : "Share",
                "There is no content" : "There is no content",
                "Show contents" : "Show contents",
                "There are new content" : "There is new content",
                "Delete Content" : "Delete Content",
                "Ok" : "Ok",
                "Close" : "Close",
                "Are you sure to delete content?" : "Are you sure to delete content?",
                "Delete My Account" : "Delete My Account",
                "Are you sure to delete your account?" : "Are you sure to delete your account?"
            }
        },
        tr : {
            translations : {
                "Sign Up" : "Kayıt Ol",
                "Password mismatch" : "Şifre eşleşmiyor",
                "Username" : "Kullanıcı Adı",
                "Display Name" : "Görünen İsim",
                "Password" : "Şifre",
                "Password Repeat" : "Şifre Tekrarı",
                "Username must not be null" : "Kullanıcı adı boş olamaz",
                "Login" : "Giriş",
                "Sign in" : "Giriş Yap",
                "Logout" : "Çıkış",
                "Users" : "Kullanıcılar",
                "Next" : "Sonraki >",
                "Previous" : "< Önceki",
                "Load Failure" : "Yükleme başarısız",
                "User not found" : "Kullanıcı bulunamadı",
                "Change Display Name" : "Görünen ismini değiştir",
                "Edit" : "Düzenle",
                "Save" : "Kaydet",
                "Cancel" : "İptal",
                "My Profile" : "Hesabım",
                "Share" : "Paylaş",
                "There is no content" : "İçerik bulunamadı",
                "Show contents" : "İçerikleri göster",
                "There are new content" : "Yeni içerikler var",
                "Delete Content" : "İçeriği Sil",
                "Ok" : "Tamam",
                "Close" : "Kapat",
                "Are you sure to delete content?" : "İçeriği silmek istediğinize emin misiniz?",
                "Delete My Account" : "Hesabımı Sil",
                "Are you sure to delete your account?" :"Hesabınızı silmek istediğinize emin misiniz?"


            }
        }
    },
    fallbackLng : "en",
    ns : ["translations"],
    defaultNS : "translations",
    keySeparator : false,
    interpolation : {
        escapeValue :false,
        formatSeparator : ","
    },
    react : {
        wait : true 
    }


});
const timeAgoTR = (number, index) => {
    return [
      ['az önce', 'şimdi'],
      ['%s saniye önce', '%s saniye içinde'],
      ['1 dakika önce', '1 dakika içinde'],
      ['%s dakika önce', '%s dakika içinde'],
      ['1 saat önce', '1 saat içinde'],
      ['%s saat önce', '%s saat içinde'],
      ['1 gün önce', '1 gün içinde'],
      ['%s gün önce', '%s gün içinde'],
      ['1 hafta önce', '1 hafta içinde'],
      ['%s hafta önce', '%s hafta içinde'],
      ['1 ay önce', '1 ay içinde'],
      ['%s ay önce', '%s ay içinde'],
      ['1 yıl önce', '1 yıl içinde'],
      ['%s yıl önce', '%s yıl içinde'],
    ][index];
  }
  register("tr",timeAgoTR);

export default i18n;
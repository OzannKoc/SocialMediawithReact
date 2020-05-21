import i18n from "i18next";
import {initReactI18next} from "react-i18next";

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
                "My Profile" : "My Profile"

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
                "Edit" : "Değiştir",
                "Save" : "Kaydet",
                "Cancel" : "İptal",
                "My Profile" : "Hesabım"


            }
        }
    },
    fallbackLng : "tr",
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
export default i18n;
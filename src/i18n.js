import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ترجمة الجمل
const resources = {
  en: {
    translation: {
      home: 'Home',
      category: 'Category',
      brands: 'Brands',
      products: 'Products',
      wishlist: 'Wishlist',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      changeLanguage: 'Change Language',
      AddtoCart : 'add to cart +',
      EGY : 'EGY',
      viewdetails : 'view details',
      close : 'close',
      AllCategory : 'All Category',
      AllProducts : 'All Products',
      AllBrands : 'All Brands',
      RelatedProduct : 'Related Product',
      MyWhishList : 'My WhishList',
      Remove : 'Remove',
      MyCart : 'My Cart',
      Yourcartisempty : 'Your Cart Is Empty',
      Product : 'Product',
      Qty : 'Qty',
      Action : 'Action',
      totalprice : 'Total price',
      PaywithVisa : 'Pay with Visa',
      PaywithCash : 'Pay with Cash',
      RemoveCart : 'Remove Cart',
      logine : 'Welcome Back',
      EnterYourEmail : 'Enter Your Email',
      EnterYourPassword : 'Enter Your Password',
      forgetyourpassword : 'forget your password',
      sign : 'sign',
      emailisrequired : 'email is required',
      passwordisrequired : 'password is required',
      invalidemail : 'invalid email',
      min3characters : 'min 3 characters',
      max15characters : 'max 15 characters',
      Register : 'Register',
      EnterYourname : 'Enter Your Name',
      EnterYourrePassword :'Enter Your rePassword',
     EnterYourPhone :'Enter Your Phone' ,
     nameisrequired : 'name is required',
     rePasswordisrequired : 'rePassword is required',
     nomatchwithpassword : 'no match with password',
     Phoneisrequired : 'Phone is required',
     WeNeedEgyptianNumber : 'We Need Egyptian Number',
     entertruepasswordlike :  'enter true password like (Ziad)'

    }
  },
  ar: {
    translation: {
      home: 'الرئيسية',
      category: 'الفئات',
      brands: 'الماركات',
      products: 'المنتجات',
      wishlist: 'المفضلة',
      cart: 'السلة',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
      changeLanguage: 'تغيير اللغة',
      AddtoCart :'+ اضافه الي السله',
      EGY : 'جنيه',
      viewdetails : 'عرض التقاصيل',
      close : 'اغلاق',
      AllCategory : 'جميع الفئات',
      AllProducts: 'جميع المنتجات',
      AllBrands : 'جميع الماركات',
      RelatedProduct :'منتجات متعلقه',
      MyWhishList : 'قائمة أمنياتي',
      Remove : 'حذف', 
      MyCart : 'سلة التسوق الخاصة ',
      Yourcartisempty : 'السله فارغه',
      Product : 'المنتاجات',
      Qty: 'الكميه',
      Price : 'السعر',
      Action : 'الفعل',
      totalprice : 'اجمالي السعر',
      PaywithVisa: 'شراء من خلال الفيزا',
      PaywithCash : 'شراء فوري',
      RemoveCart: 'حذف السله',
      logine : 'مرحبا بعودتك',
      EnterYourEmail : 'البريد الالكتروني',
      EnterYourPassword : 'أدخل كلمة المرور',
      forgetyourpassword: 'هل نسيت كلمه المرور ؟',
      sign : 'تسجيل الدخول',
      emailisrequired : 'البريد الإلكتروني مطلوب',
      passwordisrequired : 'كلمة المرور مطلوبة',
      invalidemail : 'البريد الالكتروني غير صحيح',
      min3characters : 'الحد الأدنى 3 أحرف',
      max15characters : 'الحد الاقصي 15 أحرف',
      Register : 'انشاء حساب',
      EnterYourname : 'أدخل اسمك',
      EnterYourrePassword :'اعد كتابه كلمه المرور',
      EnterYourPhone: 'رقم الهاتف',
      nameisrequired : 'الاسم مطلوب',
      rePasswordisrequired : 'مطلوب', 
      nomatchwithpassword : 'غير متطابق معا كلمت المرور',
      Phoneisrequired : 'مطلوب',
      WeNeedEgyptianNumber : 'يجب ان يكون الرقم مصري',
      entertruepasswordlike : '(Ziad) ادخل كلمه مرور صحيحه مثل' 

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

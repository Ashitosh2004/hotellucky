export type Language = 'en' | 'hi' | 'mr';

export const translations = {
  en: {
    // Welcome & Navigation
    welcome_message: "Welcome to Hotel Lucky",
    menu_subtitle: "Discover our delicious authentic cuisine",
    hotel_lucky: "Hotel Lucky",
    restaurant_management: "Restaurant Management System",
    
    // Roles
    customer_menu: "Customer Menu",
    customer_menu_desc: "Browse menu and place orders",
    south_indian_kitchen: "South Indian Kitchen",
    south_kitchen_desc: "Manage South Indian orders",
    kolhapuri_kitchen: "Kolhapuri Kitchen",
    kolhapuri_kitchen_desc: "Manage Kolhapuri orders",
    admin_dashboard: "Admin Dashboard",
    admin_dashboard_desc: "Manage system and analytics",
    
    // Categories & Menu
    all_items: "All Items",
    south_indian: "South Indian",
    kolhapuri: "Kolhapuri",
    order_now: "Order Now",
    my_orders: "My Orders",
    
    // Order Process
    place_order: "Place Order",
    quantity: "Quantity",
    table_number: "Table Number",
    enter_table_number: "Enter table number",
    confirm_order: "Confirm Order",
    cancel: "Cancel",
    order_placed: "Order placed successfully!",
    
    // Kitchen
    kitchen_dashboard: "Kitchen Dashboard",
    active_orders: "Active Orders",
    new_orders: "New",
    preparing: "Preparing",
    ready: "Ready",
    accept: "Accept",
    reject: "Reject",
    mark_ready: "Mark Ready",
    
    // Admin
    todays_orders: "Today's Orders",
    todays_revenue: "Today's Revenue",
    avg_prep_time: "Avg. Prep Time",
    growth: "Growth",
    add_menu_item: "Add Menu Item",
    add_new_dishes: "Add new dishes to the menu",
    view_all_orders: "View All Orders",
    monitor_orders: "Monitor all restaurant orders",
    
    // Forms
    email: "Email",
    password: "Password",
    sign_in: "Sign In",
    enter_email: "Enter your email",
    enter_password: "Enter your password",
    item_name: "Item Name",
    description: "Description",
    price: "Price",
    category: "Category",
    image: "Image",
    add_item: "Add Item",
    
    // Messages
    login_successful: "Login successful!",
    invalid_credentials: "Invalid email or password",
    please_enter_table: "Please enter table number",
    no_orders_yet: "No orders yet",
    orders_will_appear: "Your orders will appear here",
    
    // Common
    continue: "Continue",
    loading: "Loading...",
    select_role: "Select Your Role",
    select_language: "Select Language",
    secure_access: "Secure Access",
    authenticate_continue: "Please authenticate to continue"
  },
  
  hi: {
    // Welcome & Navigation
    welcome_message: "होटल लकी में आपका स्वागत है",
    menu_subtitle: "हमारे स्वादिष्ट प्रामाणिक व्यंजनों का आनंद लें",
    hotel_lucky: "होटल लकी",
    restaurant_management: "रेस्तरां प्रबंधन प्रणाली",
    
    // Roles
    customer_menu: "ग्राहक मेनू",
    customer_menu_desc: "मेनू ब्राउज़ करें और ऑर्डर दें",
    south_indian_kitchen: "दक्षिण भारतीय रसोई",
    south_kitchen_desc: "दक्षिण भारतीय ऑर्डर प्रबंधित करें",
    kolhapuri_kitchen: "कोल्हापुरी रसोई",
    kolhapuri_kitchen_desc: "कोल्हापुरी ऑर्डर प्रबंधित करें",
    admin_dashboard: "एडमिन डैशबोर्ड",
    admin_dashboard_desc: "सिस्टम और एनालिटिक्स प्रबंधित करें",
    
    // Categories & Menu
    all_items: "सभी व्यंजन",
    south_indian: "दक्षिण भारतीय",
    kolhapuri: "कोल्हापुरी",
    order_now: "अभी ऑर्डर करें",
    my_orders: "मेरे ऑर्डर",
    
    // Order Process
    place_order: "ऑर्डर दें",
    quantity: "मात्रा",
    table_number: "टेबल नंबर",
    enter_table_number: "टेबल नंबर दर्ज करें",
    confirm_order: "ऑर्डर कन्फर्म करें",
    cancel: "रद्द करें",
    order_placed: "ऑर्डर सफलतापूर्वक दिया गया!",
    
    // Kitchen
    kitchen_dashboard: "रसोई डैशबोर्ड",
    active_orders: "सक्रिय ऑर्डर",
    new_orders: "नया",
    preparing: "तैयार कर रहे हैं",
    ready: "तैयार",
    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    mark_ready: "तैयार मार्क करें",
    
    // Admin
    todays_orders: "आज के ऑर्डर",
    todays_revenue: "आज का राजस्व",
    avg_prep_time: "औसत तैयारी समय",
    growth: "वृद्धि",
    add_menu_item: "मेनू आइटम जोड़ें",
    add_new_dishes: "मेनू में नए व्यंजन जोड़ें",
    view_all_orders: "सभी ऑर्डर देखें",
    monitor_orders: "सभी रेस्तरां ऑर्डर मॉनिटर करें",
    
    // Forms
    email: "ईमेल",
    password: "पासवर्ड",
    sign_in: "साइन इन",
    enter_email: "अपना ईमेल दर्ज करें",
    enter_password: "अपना पासवर्ड दर्ज करें",
    item_name: "आइटम का नाम",
    description: "विवरण",
    price: "मूल्य",
    category: "श्रेणी",
    image: "छवि",
    add_item: "आइटम जोड़ें",
    
    // Messages
    login_successful: "लॉगिन सफल!",
    invalid_credentials: "अमान्य ईमेल या पासवर्ड",
    please_enter_table: "कृपया टेबल नंबर दर्ज करें",
    no_orders_yet: "अभी तक कोई ऑर्डर नहीं",
    orders_will_appear: "आपके ऑर्डर यहाँ दिखाई देंगे",
    
    // Common
    continue: "जारी रखें",
    loading: "लोड हो रहा है...",
    select_role: "अपनी भूमिका चुनें",
    select_language: "भाषा चुनें",
    secure_access: "सुरक्षित पहुंच",
    authenticate_continue: "जारी रखने के लिए कृपया प्रमाणीकरण करें"
  },
  
  mr: {
    // Welcome & Navigation
    welcome_message: "हॉटेल लकी मध्ये तुमचे स्वागत आहे",
    menu_subtitle: "आमच्या स्वादिष्ट अस्सल पाककलेचा आनंद घ्या",
    hotel_lucky: "हॉटेल लकी",
    restaurant_management: "रेस्टॉरंट व्यवस्थापन प्रणाली",
    
    // Roles
    customer_menu: "ग्राहक मेनू",
    customer_menu_desc: "मेनू पहा आणि ऑर्डर द्या",
    south_indian_kitchen: "दक्षिण भारतीय स्वयंपाकघर",
    south_kitchen_desc: "दक्षिण भारतीय ऑर्डर व्यवस्थापित करा",
    kolhapuri_kitchen: "कोल्हापुरी स्वयंपाकघर",
    kolhapuri_kitchen_desc: "कोल्हापुरी ऑर्डर व्यवस्थापित करा",
    admin_dashboard: "अॅडमिन डॅशबोर्ड",
    admin_dashboard_desc: "सिस्टम आणि अॅनालिटिक्स व्यवस्थापित करा",
    
    // Categories & Menu
    all_items: "सर्व पदार्थ",
    south_indian: "दक्षिण भारतीय",
    kolhapuri: "कोल्हापुरी",
    order_now: "आता ऑर्डर करा",
    my_orders: "माझे ऑर्डर",
    
    // Order Process
    place_order: "ऑर्डर द्या",
    quantity: "प्रमाण",
    table_number: "टेबल नंबर",
    enter_table_number: "टेबल नंबर टाका",
    confirm_order: "ऑर्डर निश्चित करा",
    cancel: "रद्द करा",
    order_placed: "ऑर्डर यशस्वीरित्या दिला!",
    
    // Kitchen
    kitchen_dashboard: "स्वयंपाकघर डॅशबोर्ड",
    active_orders: "सक्रिय ऑर्डर",
    new_orders: "नवीन",
    preparing: "तयार करत आहे",
    ready: "तयार",
    accept: "स्वीकार करा",
    reject: "नाकारा",
    mark_ready: "तयार म्हणून चिन्हांकित करा",
    
    // Admin
    todays_orders: "आजचे ऑर्डर",
    todays_revenue: "आजचा महसूल",
    avg_prep_time: "सरासरी तयारी वेळ",
    growth: "वाढ",
    add_menu_item: "मेनू आयटम जोडा",
    add_new_dishes: "मेनूमध्ये नवीन पदार्थ जोडा",
    view_all_orders: "सर्व ऑर्डर पहा",
    monitor_orders: "सर्व रेस्टॉरंट ऑर्डर मॉनिटर करा",
    
    // Forms
    email: "ईमेल",
    password: "पासवर्ड",
    sign_in: "साइन इन",
    enter_email: "तुमचा ईमेल टाका",
    enter_password: "तुमचा पासवर्ड टाका",
    item_name: "आयटमचे नाव",
    description: "वर्णन",
    price: "किंमत",
    category: "श्रेणी",
    image: "प्रतिमा",
    add_item: "आयटम जोडा",
    
    // Messages
    login_successful: "लॉगिन यशस्वी!",
    invalid_credentials: "अवैध ईमेल किंवा पासवर्ड",
    please_enter_table: "कृपया टेबल नंबर टाका",
    no_orders_yet: "अजून कोणतेही ऑर्डर नाहीत",
    orders_will_appear: "तुमचे ऑर्डर येथे दिसतील",
    
    // Common
    continue: "सुरू ठेवा",
    loading: "लोड होत आहे...",
    select_role: "तुमची भूमिका निवडा",
    select_language: "भाषा निवडा",
    secure_access: "सुरक्षित प्रवेश",
    authenticate_continue: "सुरू ठेवण्यासाठी कृपया प्रमाणीकरण करा"
  }
};

export const getTranslation = (key: string, language: Language): string => {
  return translations[language]?.[key as keyof typeof translations[Language]] || translations.en[key as keyof typeof translations.en] || key;
};

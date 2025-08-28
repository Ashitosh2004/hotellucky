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
    enter_item_name: "Enter item name",
    enter_description: "Enter description",
    enter_price: "Enter price",
    enter_hindi_name: "Enter Hindi name",
    enter_marathi_name: "Enter Marathi name",
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
    logout_successful: "Logged out successfully!",
    logout_failed: "Logout failed. Please try again.",
    no_items_available: "No items available in this category",
    kitchen_notes: "Kitchen Notes",
    ready_time: "Ready",
    ordered_time: "Ordered",
    recent_orders: "Recent Orders",
    menu_statistics: "Menu Statistics",
    total_menu_items: "Total Menu Items",
    south_indian_items: "South Indian Items",
    kolhapuri_items: "Kolhapuri Items",
    available_items: "Available Items",
    real_time_analytics: "Real-time analytics from Firebase data",
    chart_implementation: "Chart implementation can be added with recharts",
    fill_required_fields: "Please fill in all required fields",
    valid_image_url: "Please enter a valid image URL",
    menu_item_added: "Menu item added successfully!",
    failed_add_item: "Failed to add menu item. Please try again.",
    customer_notes: "Customer Notes",
    accepted_time: "Accepted",
    image_preview: "Image Preview",
    image_url_help: "Enter a direct image URL (jpg, png, gif, webp, svg)",
    no_orders_found: "No orders found",
    orders_appear_kitchen: "Orders will appear here when customers place them",
    all_orders: "All Orders",
    restaurant_management_system: "Restaurant Management System",
    table: "Table",
    qty: "Qty",
    english_label: "(English)",
    hindi_label: "(Hindi)",
    marathi_label: "(Marathi)",
    
    // Logout
    logout: "Logout",
    logout_confirmation: "Logout Confirmation",
    logout_password_prompt: "Please enter your password to logout",
    confirm_logout: "Confirm Logout",
    cancel_order: "Cancel Order",
    cancel_order_confirmation: "Are you sure you want to cancel this order?",
    order_cancelled: "Order cancelled successfully",
    
    // Payment
    show_payment_qr: "Show Payment QR",
    payment_qr_code: "Payment QR Code",
    scan_to_pay: "Scan this QR code to make payment",
    
    // Earnings
    weekly_earnings: "Weekly Earnings",
    monthly_earnings: "Monthly Earnings",
    earnings_chart: "Earnings Chart",
    
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
    enter_item_name: "आइटम का नाम दर्ज करें",
    enter_description: "विवरण दर्ज करें",
    enter_price: "मूल्य दर्ज करें",
    enter_hindi_name: "हिंदी नाम दर्ज करें",
    enter_marathi_name: "मराठी नाम दर्ज करें",
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
    logout_successful: "सफलतापूर्वक लॉगआउट हो गया!",
    logout_failed: "लॉगआउट असफल। कृपया पुनः प्रयास करें।",
    no_items_available: "इस श्रेणी में कोई आइटम उपलब्ध नहीं",
    kitchen_notes: "रसोई नोट्स",
    ready_time: "तैयार",
    ordered_time: "ऑर्डर किया गया",
    recent_orders: "हाल के ऑर्डर",
    menu_statistics: "मेनू आंकड़े",
    total_menu_items: "कुल मेनू आइटम",
    south_indian_items: "दक्षिण भारतीय आइटम",
    kolhapuri_items: "कोल्हापुरी आइटम",
    available_items: "उपलब्ध आइटम",
    real_time_analytics: "Firebase डेटा से रियल-टाइम एनालिटिक्स",
    chart_implementation: "चार्ट कार्यान्वयन recharts के साथ जोड़ा जा सकता है",
    fill_required_fields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    valid_image_url: "कृपया एक वैध छवि URL दर्ज करें",
    menu_item_added: "मेनू आइटम सफलतापूर्वक जोड़ा गया!",
    failed_add_item: "मेनू आइटम जोड़ने में असफल। कृपया पुनः प्रयास करें।",
    customer_notes: "ग्राहक नोट्स",
    accepted_time: "स्वीकृत",
    image_preview: "छवि पूर्वावलोकन",
    image_url_help: "कृपया एक सीधा छवि URL दर्ज करें (jpg, png, gif, webp, svg)",
    no_orders_found: "कोई ऑर्डर नहीं मिला",
    orders_appear_kitchen: "जब ग्राहक ऑर्डर करेंगे तो ऑर्डर यहाँ दिखाई देंगे",
    all_orders: "सभी ऑर्डर",
    restaurant_management_system: "रेस्तराँ प्रबंधन प्रणाली",
    table: "टेबल",
    qty: "मात्रा",
    english_label: "(अंग्रेजी)",
    hindi_label: "(हिंदी)",
    marathi_label: "(मराठी)",
    
    // Logout
    logout: "लॉगआउट",
    logout_confirmation: "लॉगआउट पुष्टि",
    logout_password_prompt: "लॉगआउट करने के लिए कृपया अपना पासवर्ड दर्ज करें",
    confirm_logout: "लॉगआउट की पुष्टि करें",
    cancel_order: "ऑर्डर रद्द करें",
    cancel_order_confirmation: "क्या आप वाकई इस ऑर्डर को रद्द करना चाहते हैं?",
    order_cancelled: "ऑर्डर सफलतापूर्वक रद्द किया गया",
    
    // Payment
    show_payment_qr: "पेमेंट QR दिखाएं",
    payment_qr_code: "पेमेंट QR कोड",
    scan_to_pay: "पेमेंट करने के लिए इस QR कोड को स्कैन करें",
    
    // Earnings
    weekly_earnings: "साप्ताहिक आय",
    monthly_earnings: "मासिक आय",
    earnings_chart: "आय चार्ट",
    
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
    enter_item_name: "आयटमचे नाव टाका",
    enter_description: "वर्णन टाका",
    enter_price: "किंमत टाका",
    enter_hindi_name: "हिंदी नाव टाका",
    enter_marathi_name: "मराठी नाव टाका",
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
    logout_successful: "यशस्वीरित्या लॉगआउट झाले!",
    logout_failed: "लॉगआउट अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    no_items_available: "या श्रेणीत कोणतेही आयटम उपलब्ध नाहीत",
    kitchen_notes: "स्वयंपाकघर नोट्स",
    ready_time: "तयार",
    ordered_time: "ऑर्डर केले",
    recent_orders: "अलीकडील ऑर्डर",
    menu_statistics: "मेनू आकडेवारी",
    total_menu_items: "एकूण मेनू आयटम",
    south_indian_items: "दक्षिण भारतीय आयटम",
    kolhapuri_items: "कोल्हापुरी आयटम",
    available_items: "उपलब्ध आयटम",
    real_time_analytics: "Firebase डेटामधून रियल-टाइम अॅनालिटिक्स",
    chart_implementation: "चार्ट कार्यान्वयन recharts सह जोडले जाऊ शकते",
    fill_required_fields: "कृपया सर्व आवश्यक फील्ड भरा",
    valid_image_url: "कृपया वैध प्रतिमा URL टाका",
    menu_item_added: "मेनू आयटम यशस्वीरित्या जोडले!",
    failed_add_item: "मेनू आयटम जोडण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    customer_notes: "ग्राहक नोट्स",
    accepted_time: "स्वीकारले",
    image_preview: "प्रतिमा पूर्वावलोकन",
    image_url_help: "कृपया थेट URL टाका (jpg, png, gif, webp, svg)",
    no_orders_found: "कोणतेही ऑर्डर सापडले नाही",
    orders_appear_kitchen: "जेव्हा ग्राहक ऑर्डर देतील तेव्हा ऑर्डर येथे दिसतील",
    all_orders: "सर्व ऑर्डर",
    restaurant_management_system: "रेस्टॉरंट व्यवस्थापन प्रणाली",
    table: "टेबल",
    qty: "मात्रा",
    english_label: "(इंग्रजी)",
    hindi_label: "(हिंदी)",
    marathi_label: "(मराठी)",
    
    // Logout
    logout: "लॉगआउट",
    logout_confirmation: "लॉगआउट पुष्टी",
    logout_password_prompt: "लॉगआउट करण्यासाठी कृपया तुमचा पासवर्ड टाका",
    confirm_logout: "लॉगआउटची पुष्टी करा",
    cancel_order: "ऑर्डर रद्द करा",
    cancel_order_confirmation: "तुम्हाला खरोखर हा ऑर्डर रद्द करायचा आहे का?",
    order_cancelled: "ऑर्डर यशस्वीरित्या रद्द केला",
    
    // Payment
    show_payment_qr: "पेमेंट QR दाखवा",
    payment_qr_code: "पेमेंट QR कोड",
    scan_to_pay: "पेमेंट करण्यासाठी हा QR कोड स्कॅन करा",
    
    // Earnings
    weekly_earnings: "साप्ताहिक कमाई",
    monthly_earnings: "मासिक कमाई",
    earnings_chart: "कमाई चार्ट",
    
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

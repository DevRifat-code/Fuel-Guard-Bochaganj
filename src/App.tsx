import React, { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  getDocs,
  setDoc, 
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { auth, db } from './lib/firebase';
import { handleFirestoreError } from './lib/error-handler';
import { AppUser, FuelPrice, Pump, Transaction, OperationType, UserRole } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fuel, 
  QrCode, 
  ShieldCheck, 
  History, 
  User as UserIcon, 
  LogOut, 
  Camera, 
  AlertCircle,
  Settings,
  CheckCircle2,
  XCircle,
  Eye,
  Users,
  MapPin,
  ExternalLink,
  TrendingDown,
  Clock,
  Navigation,
  UserCheck,
  FileCheck,
  X,
  ChevronDown,
  LayoutDashboard,
  Zap,
  UserPlus,
  FileText,
  Trash2,
  Phone,
  PhoneCall,
  Mail,
  Lock,
  Unlock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Globe,
  CreditCard,
  Truck,
  Check,
  Download,
  Printer,
  AlertTriangle,
  Edit,
  Plus,
  ArrowUp,
  Activity,
  Shield,
  ArrowRight,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import * as htmlToImage from 'html-to-image';
import { format, isAfter, parseISO, addDays, differenceInDays } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Language, TRANSLATIONS } from './constants';
import LandingPage from './components/LandingPage';

// Helper for Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// DELETING OLD TRANSLATIONS
const OLD_TRANSLATIONS = {
  en: {
    welcomeBack: "Authorized Personnel Login",

    loginSubtitle: "Scan your credentials or authenticate via digital channel",
    passwordMismatch: "Passwords do not match",
    passwordWeak: "Password must be at least 8 characters",
    password: "Password",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    nbTitle: "7-Day Restriction Protocol",
    nbText: "Fuel consumption is regulated via 7-day restriction protocol. Please ensure your digital permit is valid before arrival.",
    divisionName: "Bochaganj Administration",
    consumerManual: "Consumer Web Manual",
    privacyPolicy: "Privacy Policy",
    copyright: "© 2026 FuelGuard Setabganj. All rights reserved",
    dashboard: "Dashboard",
    registry: "Registry",
    pricing: "Pricing",
    exit: "Exit",
    logout: "Log Out",
    terminal: "Terminal v3.1",
    heroTitle: "Fuel Control & Monitoring System",
    heroDesc: "Regulating Petrol & Octane consumption for motorcycles and motor vehicles across 5 fuel stations in Setabganj.",
    terminals: "Terminals",
    nodes: "Nodes",
    protocol: "Protocol",
    identityTerminal: "Identity Terminal",
    secureGateway: "Secure Access Gateway",
    fullIdentity: "Full Identity",
    dataIndex: "Data Index (Email)",
    passkey: "Passkey",
    authorize: "Authorize Identity",
    initialize: "Initialize Registry",
    encryptionBridge: "Encryption Bridge",
    googleSso: "SAML / Google SSO",
    newRegistry: "Create New Registry Profile",
    returningPersonnel: "Returning Personnel? Sign In",
    protocolGuide: "Protocol Guide",
    operationalWorkflow: "Operational Workflow",
    step1Title: "Identity Registry",
    step1Desc: "Users must submit NID and Vehicle credentials. Administrators verify documentation before granting \"Approved\" status for fuel collection.",
    step2Title: "QR Token Emission",
    step2Desc: "Approved profiles generate unique encrypted QR tokens. These tokens carry identity and cooldown status data for station terminal scanners.",
    step3Title: "Dynamic Cooldown",
    step3Desc: "Linear cooldown logic: 100 BDT = 1 Day. System prevents overproduction and manages regional fuel reserves.",
    monitoringNode: "Centralized Monitoring Node",
    monitoringDesc: "Super Admins maintain a live synchronization layer across all 4 pump stations. Every transaction is indexed by Vehicle ID, Terminal ID, and Dispensing Personnel.",
    latestTransactions: "Latest Transaction Logs",
    availableLimit: "Available Limit",
    totalActiveVehicles: "Total Active Vehicles",
    scanQr: "Scan vehicle QR",
    theme: "Theme",
    switchToLight: "Switch to Light mode",
    switchToDark: "Switch to Dark mode",
    statusAvailable: "Available",
    successAvailable: "Success Available",
    driverName: "Driver Name",
    timestamp: "Timestamp",
    quantityLiters: "Quantity (Liters)",
    recentTransactionFeed: "Recent Transaction Feed",
    criticalSystemAlerts: "Critical System Alerts",
    appUptime: "Appuptime",
    latency: "Latency",
    centralMonitoringNode: "Central Monitoring Node",
    step1Landing: "Register/Onboarding",
    step2Landing: "Verify and Information",
    step3Landing: "Fill and Complete",
    globalStatus: "Global Network Status",
    activeNodes: "Active Nodes",
    systemPerformance: "System Performance",
    viewDashboard: "View Dashboard",
    globalEfficiency: "Global Efficiency",
    uptime: "Terminal Uptime Sync",
    privacy: "Privacy Protocol",
    securityAudit: "Security Audit",
    requirementsTitle: "Required Documents for Registration",
    reqItem1: "Driving License or Vehicle Registration (Any one is mandatory)",
    reqItem2: "National Identity Card (NID)",
    reqItem3: "Passport size photo",
    reqItem4: "Fuel application form with driver's name, NID, and driving license/registration (Available at computer shops)",
    reqItem5: "Proof of employment for those working in Bochaganj institutions (ID Card, etc.)",
    appLocationTitle: "Application Submission Guidelines",
    locMunicipality: "Pourashava area -> Apply to Pourashava Office",
    locUnion123: "Union 1, 2, 3 -> Apply to UNO Office",
    locUnion456: "Union 4, 5, 6 -> Apply to Land Office (AC Land)",
    contactAdmin: "Contact Admin",
    adminName: "Md. Maruf Hasan",
    adminTitle: "Upazila Nirbahi Officer (UNO)",
    adminMobile: "01761-493526",
    adminPhone: "05325-73009",
    adminEmail: "unobochaganj@gov.bd",
    supportMessenger: "Support Messenger",
    facebookProfile: "Facebook Profile",
    facebookMessengerLink: "https://www.facebook.com/messages/t/61564992836491",
    facebookProfileLink: "https://www.facebook.com/upajela.nirbahi.aphisara.bocaganja",
    myDigitalToken: "My Digital Token",
    readyForCollection: "Ready for Collection",
    initializing: "Initializing...",
    waitForApproval: "Wait for Approval",
    scanDescription: "Present this encrypted QR at any of the 4 station terminals. Personnel will verify your data index and dispense fuel.",
    timeRemaining: "Time Remaining",
    minutes: "minutes",
    profile: "Profile",
    scanner: "Scanner",
    admin: "Admin",
    logs: "Logs",
    unauthorized: "Unauthorized Identity",
    unapprovedDesc: "Your clearance is currently pending server authorization. Please contact the Bochaganj Upazila Nirbahi Officer (UNO) for manual override.",
    systemStatus: "System status: Operational",
    finalizeProfile: "Finalize Registry Profile",
    nidNumber: "NID Number",
    vehicleIndex: "Vehicle Index",
    submitProfile: "Authorize Registry Data",
    personnelRegistry: "Personnel Registry",
    personnelRegistryDesc: "Central repository of all approved fuel recipients and logistics personnel.",
    rankMatrix: "Personnel Rank Matrix",
    pricingControl: "Dynamic Pricing Control",
    pendingApprovals: "Pending Approvals",
    priceQuotes: "Price Quotes",
    completeRegistration: "Complete Registration",
    vehiclePlate: "Vehicle License Plate",
    platePlaceholder: "e.g. Dhaka-Metro-Ga-11-2222",
    adminReviewNote: "Note: Admin will review your credentials before terminal activation.",
    submitForApproval: "Submit for Approval",
    userDigitalId: "User Digital ID",
    approvedStatus: "APPROVED",
    pendingStatus: "PENDING",
    registryId: "Registry ID",
    validFrom: "Valid From",
    scannerLogic: "Scanner Logic",
    accessDenied: "Access Denied",
    systemReady: "System Ready",
    remaining: "Remaining",
    days: "Days",
    awaitingApproval: "Awaiting Approval",
    adminReviewDesc: "The Upazila Nirbahi Officer (UNO) must verify documents before terminal activation.",
    cooldownActive: "COOLDOWN ACTIVE",
    nextRefillOn: "Next refill available on",
    ruleCooldown: "Rule: 100 BDT = 1 Day Limit",
    terminalStatus: "Terminal Status",
    active: "ACTIVE",
    scannerHint: "Scanner will accept Digital ID for refill.",
    dailyPricingMatrix: "Daily Pricing Matrix",
    octaneBdt: "Octane / BDT",
    petrolBdt: "Petrol / BDT",
    dieselBdt: "Diesel / BDT",
    stationTerminalControl: "Station Terminal Control",
    terminalLocation: "Terminal Location",
    unassigned: "-- UNASSIGNED --",
    activateQrScanner: "Activate QR Scanner",
    scanStatus: "Scan Status",
    locked: "LOCKED",
    resetTerminal: "Reset Terminal",
    refillRecorded: "Refill Recorded",
    nextVehicle: "Next Vehicle",
    identityVerified: "Identity Verified",
    inputAmountBdt: "Input Amount (BDT)",
    transmitLogRefill: "Transmit & Log Refill",
    radarStandby: "Radar Standby",
    waitingForScan: "Waiting for terminal scanning event...",
    statusReports: "Status Reports",
    registryHub: "Registry Hub",
    priceConfig: "Price Config",
    analytics: "Analytics",
    updatePrices: "Update Prices",
    currentPrices: "Current Prices",
    fuelType: "Fuel Type",
    priceBdt: "Price (BDT)",
    octanePrice: "Octane Price",
    petrolPrice: "Petrol Price",
    dieselPrice: "Diesel Price",
    userRoleHub: "User Role Hub",
    approvalQueue: "Approval Queue",
    actions: "Actions",
    approve: "Approve",
    alreadyApproved: "Already Approved",
    role: "Role",
    update: "Update",
    changeRole: "Change Role",
    userRegistry: "User Registry",
    deleteAccount: "Delete Account",
    superAdminAccess: "Super Admin Access Required",
    addPump: "Add New Pump Station",
    addressLabel: "Station Address",
    geoLocLabel: "Geographic Location",
    syncEstLabel: "Est. Synchronization",
    pumpName: "Pump Name",
    deliveryDate: "Next Delivery Date",
    savePump: "Save Station",
    provisionPersonnel: "Provision Personnel",
    emailPlaceholder: "official@station.com",
    manualAdd: "Pre-Authorize Email",
    toastSuccess: "Operation Successful",
    toastError: "System Error",
    lastDelivery: "Last Delivery",
    offline: "OFFLINE",
    fuelPriceUpdate: "Fuel Price Update",
    deployPricing: "Deploy Pricing",
    manualProvisioning: "Manual Provisioning",
    grantAccess: "Grant Access",
    stationTerminals: "Station Terminals",
    adminLogin: "Admin Login",
    userLogin: "User Portal",
    idPlaceholder: "Official Email / Govt ID",
    passPlaceholder: "Encryption Key / Password",
    loginAsAdmin: "Authenticate as Admin",
    backToUser: "Back to User Portal",
    adminAccessPortal: "Admin Access Portal",
    allUsers: "Citizen Registry",
    transactions: "Service Logs",
    managePrices: "Price Control",
    allTransactions: "Detailed Transaction History",
    filterByStation: "Filter by Station",
    filterByUser: "Filter by User",
    manageUsers: "Manage Users",
    manageStations: "Manage Stations",
    dailyUsage: "Daily Usage & Quota",
    monthlyUsage: "Monthly Usage & Quota",
    weeklyUsage: "Weekly Usage",
    currentQr: "Current QR Code",
    createQr: "Create QR Code",
    viewAll: "View All",
    last7Days: "Last 7 Days Usage",
    liters: "Liters",
    registrationNumberShort: "Reg No.",
    manufactureYearShort: "Year",
    vehicleClassShort: "Class",
    houseHolding: "House/Holding",
    villageStreet: "Village/Street",
    postOffice: "Post Office",
    revokeAccess: "Revoke Access",
    confirmRevoke: "Are you sure you want to revoke this user's access?",
    filterByFuel: "Filter by Fuel",
    allFuels: "All Fuels",
    octane: "Octane",
    petrol: "Petrol",
    diesel: "Diesel",
    uploadProfilePhoto: "Upload Profile Photo",
    changePhoto: "Change Photo",
    registryDetails: "Details",
    userType: "User Type",
    contactInfo: "Contact Info",
    licenseInfo: "License Info",
    activity: "Activity",
    systemLogs: "System Logs",
    vehicleRegistration: "Vehicle Registration",
    vehicleRegistrationSub: "Register your motorcycle or motor vehicle for fuel monitoring at Setabganj stations.",
    licensePlate: "License Plate / Reg No",
    vehicleType: "Vehicle Type",
    drivingLicenseNo: "Driving License No",
    taxTokenNo: "Tax Token / Registration Card Number",
    createOwnerAccount: "Create Owner Account",
    uploadRequiredDocs: "Upload Required Documents (JPG/PNG)",
    passportPhoto: "Passport Size Photo",
    nidPhoto: "NID Card Photo",
    drivingLicensePhoto: "Driving License Photo",
    taxTokenPhoto: "Tax Token / Reg Card"
  },
  bn: {
    appName: "ফুয়েলগার্ড সেতাবগঞ্জ",
    welcomeBack: "অনুমোদিত কর্মী লগইন",
    loginSubtitle: "আপনার পরিচয় যাচাই করুন অথবা ডিজিটাল চ্যানেলে লগইন করুন",
    userManual: "ব্যবহারকারী ম্যানুয়াল",
    register: "যানবাহন নিবন্ধন",
    helpline: "হেল্পলাইন",
    getQrWithOtp: "ওটিপির মাধ্যমে কিউআর পান",
    phoneNumber: "ফোন নম্বর",
    registrationNumber: "রেজিস্ট্রেশন নম্বর",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    email: "ইমেইল ঠিকানা",
    fullName: "পুরো নাম",
    passwordMismatch: "পাসওয়ার্ড দুটি মেলেনি",
    passwordWeak: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
    password: "পাসওয়ার্ড",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    signIn: "সাইন ইন",
    noAccount: "অ্যাকাউন্ট নেই?",
    nbTitle: "৭-দিনের ব্লক নিয়ম",
    nbText: "যানবাহনের জ্বালানি ব্যবহার নিয়ন্ত্রণের জন্য ৭ দিনের ব্লক নিয়ম। স্টেশনে আসার আগে আপনার ডিজিটাল পারমিটটি যাচাই করে নিন।",
    divisionName: "বোচাগঞ্জ প্রশাসন",
    consumerManual: "ভোক্তা ওয়েব ম্যানুয়াল",
    privacyPolicy: "গোপনীয়তা নীতিমালা",
    copyright: "© ২০২৬ ফুয়েলগার্ড সেতাবগঞ্জ। সর্বস্বত্ব সংরক্ষিত",
    dashboard: "ড্যাশবোর্ড",
    registry: "রেজিস্ট্রি",
    pricing: "মূল্য নির্ধারণ",
    exit: "প্রস্থান",
    logout: "লগআউট",
    allTransactions: "বিস্তারিত লেনদেনের ইতিহাস",
    filterByStation: "স্টেশন অনুযায়ী",
    filterByUser: "নাম বা নম্বর অনুযায়ী",
    manageUsers: "ইউজার ব্যবস্থাপনা",
    manageStations: "স্টেশন ব্যবস্থাপনা",
    dailyUsage: "দৈনিক ব্যবহার ও কোটা",
    monthlyUsage: "মাসিক ব্যবহার ও কোটা",
    weeklyUsage: "সাপ্তাহিক ব্যবহার",
    currentQr: "বর্তমান কিউআর কোড",
    createQr: "কিউআর কোড তৈরি করুন",
    viewAll: "সব দেখুন",
    last7Days: "গত ৭ দিনের ব্যবহার",
    liters: "লিটার",
    registrationNumberShort: "রেজিঃ নং",
    manufactureYearShort: "বছর",
    vehicleClassShort: "শ্রেণী",
    houseHolding: "বাসা/হোল্ডিং",
    villageStreet: "গ্রাম/রাস্তা",
    postOffice: "ডাকঘর",
    terminal: "টার্মিনাল v3.1",
    heroTitle: "জ্বালানি নিয়ন্ত্রণ ও পর্যবেক্ষণ ব্যবস্থা",
    heroDesc: "সেতাবগঞ্জের ৫টি ফুয়েল স্টেশনে মোটরসাইকেল এবং মোটরযানের তেল ও অকটেন ব্যবহার নিয়ন্ত্রণ করা হচ্ছে।",
    terminals: "টার্মিনাল",
    nodes: "নোড",
    protocol: "প্রটোকল",
    identityTerminal: "আইডেন্টিটি টার্মিনাল",
    secureGateway: "নিরাপদ অ্যাক্সেস গেটওয়ে",
    fullIdentity: "পূর্ণ পরিচয়",
    dataIndex: "ইমেইল ঠিকানা",
    passkey: "পাসওয়ার্ড",
    authorize: "অনুমোদন করুন",
    initialize: "নিবন্ধন শুরু করুন",
    encryptionBridge: "নিরাপদ সংযোগ",
    googleSso: "গুগল এসএসও",
    newRegistry: "নতুন নিবন্ধন করুন",
    returningPersonnel: "ইতিমধ্যেই নিবন্ধিত? লগইন করুন",
    protocolGuide: "নিয়মাবলী নির্দেশিকা",
    operationalWorkflow: "কার্যপ্রণালী",
    step1Title: "পরিচয় নিবন্ধন",
    step1Desc: "ব্যবহারকারীদের এনআইডি এবং যানবাহনের তথ্য জমা দিতে হবে। কর্তৃপক্ষ জ্বালানি সংগ্রহের জন্য \"অনুমোদিত\" স্ট্যাটাস দেওয়ার আগে তথ্য যাচাই করে।",
    step2Title: "কিউআর টোকেন প্রদান",
    step2Desc: "অনুমোদিত প্রোফাইলগুলি অনন্য এনক্রিপ্টেড কিউআর টোকেন তৈরি করে। এই টোকেনগুলি গ্রাহকের তথ্য এবং সময়সীমা ডেটা বহন করে।",
    step3Title: "গতিশীল কুলডাউন",
    step3Desc: "গাণিতিক কুলডাউন লজিক: ১০০ টাকা = ১ দিন। সিস্টেম অতিরিক্ত জ্বালানি সংগ্রহ প্রতিরোধ করে এবং মজুদ ব্যবস্থাপনা নিশ্চিত করে।",
    monitoringNode: "কেন্দ্রীয় পর্যবেক্ষণ নোড",
    monitoringDesc: "সুপার এডমিনরা ৪টি পাম্প স্টেশনে সরাসরি তথ্য সমন্বয় বজায় রাখে। প্রতিটি লেনদেন যানবাহন আইডি এবং টার্মিনাল আইডি দ্বারা সংরক্ষিত হয়।",
    globalEfficiency: "সার্বিক দক্ষতা",
    uptime: "টার্মিনাল আপটাইম",
    privacy: "গোপনীয়তা নীতিমালা",
    securityAudit: "নিরাপত্তা অডিট",
    requirementsTitle: "নিবন্ধনের প্রয়োজনীয় কাগজপত্র",
    reqItem1: "১। ড্রাইভিং লাইসেন্স/ গাড়ির রেজিষ্ট্রেশন এর যেকোন একটি বাধ্যতামূলক।",
    reqItem2: "২। জাতীয় পরিচয় পত্র (NID)।",
    reqItem3: "৩। পাসপোর্ট সাইজের ছবি।",
    reqItem4: "৪। ফুয়েলের আবেদনপত্রের চালকের নাম, এনআইডি, ড্রাইভিং লাইসেন্স/রেজিস্ট্রেশন পূরণ (আবেদনপত্র কম্পিউটার এর দোকানে পাওয়া যাবে)।",
    reqItem5: "৫। বোচাগঞ্জ উপজেলার বিভিন্ন ধরনের প্রতিষ্ঠানে কর্মরত হলে সেটির সপক্ষে প্রমাণাদি (আইডি কার্ড ইত্যাদি)।",
    appLocationTitle: "আবেদনপত্র জমার নির্দেশিকা",
    locMunicipality: "পৌরসভা এলাকা -> পৌরসভায় আবেদন করবেন।",
    locUnion123: "১, ২, ৩ নম্বর ইউনিয়ন -> উপজেলা নির্বাহী অফিসারের কার্যালয়ে আবেদন করবেন।",
    locUnion456: "৪, ৫, ৬ নম্বর ইউনিয়ন -> উপজেলা ভূমি অফিসে (এসি ল্যান্ড) আবেদন করবেন।",
    contactAdmin: "এডমিনের সাথে যোগাযোগ",
    adminName: "মোঃ মারুফ হাসান",
    adminTitle: "উপজেলা নির্বাহী অফিসার (ইউএনও)",
    adminMobile: "০১৭৬১-৪৯৩৫২৬",
    adminPhone: "০৫৩২৫-৭৩০০৯",
    adminEmail: "unobochaganj@gov.bd",
    supportMessenger: "সাপোর্ট মেসেঞ্জার",
    facebookProfile: "ফেসবুক প্রোফাইল",
    facebookMessengerLink: "https://www.facebook.com/messages/t/61564992836491",
    facebookProfileLink: "https://www.facebook.com/upajela.nirbahi.aphisara.bocaganja",
    myDigitalToken: "আমার ডিজিটাল টোকেন",
    readyForCollection: "সংগ্রহের জন্য প্রস্তুত",
    initializing: "শুরু হচ্ছে...",
    waitForApproval: "অনুমোদনের জন্য অপেক্ষা করুন",
    scanDescription: "এই এনক্রিপ্টেড কিউআর কোডটি ৪টি স্টেশনের যেকোনো টার্মিনালে প্রদর্শন করুন। কর্মীরা আপনার তথ্য যাচাই করে জ্বালানি প্রদান করবেন।",
    timeRemaining: "বাকি সময়",
    minutes: "মিনিট",
    profile: "প্রোফাইল",
    scanner: "স্ক্যানার",
    admin: "এডমিন",
    logs: "লগ",
    unauthorized: "অননুমোদিত পরিচয়",
    unapprovedDesc: "আপনার ক্লিয়ারেন্স বর্তমানে অনুমোদনের অপেক্ষায় রয়েছে। ম্যানুয়াল অনুমোদনের জন্য বোচাগঞ্জ উপজেলা নির্বাহী অফিসার (ইউএনও) এর সাথে যোগাযোগ করুন।",
    systemStatus: "সিস্টেম স্ট্যাটাস: সচল",
    finalizeProfile: "নিবন্ধন প্রোফাইল সম্পন্ন করুন",
    nidNumber: "এনআইডি নম্বর",
    vehicleIndex: "যানবাহন নম্বর",
    submitProfile: "তথ্য অনুমোদন করুন",
    personnelRegistry: "কর্মী রেজিস্ট্রি",
    personnelRegistryDesc: "সকল অনুমোদিত তেলের গ্রাহক এবং লজিস্টিক কর্মীদের কেন্দ্রীয় তালিকা।",
    rankMatrix: "কর্মী র‍্যাঙ্ক ম্যাট্রিক্স",
    pricingControl: "গতিশীল মূল্য নিয়ন্ত্রণ",
    pendingApprovals: "অপেক্ষমান অনুমোদন",
    priceQuotes: "মূল্য তালিকা",
    completeRegistration: "নিবন্ধন সম্পন্ন করুন",
    vehiclePlate: "যানবাহনের লাইসেন্স নম্বর",
    platePlaceholder: "যেমন: ঢাকা-মেট্রো-ঘ-১১-২২২২",
    adminReviewNote: "দ্রষ্টব্য: টার্মিনাল সচল করার আগে কর্তৃপক্ষ আপনার তথ্য যাচাই করবে।",
    submitForApproval: "অনুমোদনের জন্য জমা দিন",
    userDigitalId: "ব্যবহারকারীর ডিজিটাল আইডি",
    approvedStatus: "অনুমোদিত",
    pendingStatus: "অপেক্ষমান",
    registryId: "রেজিস্ট্রি আইডি",
    validFrom: "কার্যকরী হয়েছে",
    scannerLogic: "স্ক্যানার লজিক",
    accessDenied: "প্রবেশাধিকার নেই",
    systemReady: "সিস্টেম প্রস্তুত",
    remaining: "বাকি",
    days: "দিন",
    awaitingApproval: "অনুমোদনের অপেক্ষায়",
    adminReviewDesc: "প্রোফাইল সচল করার আগে উপজেলা নির্বাহী অফিসার (ইউএনও) অবশ্যই তথ্য যাচাই করবেন।",
    cooldownActive: "কুলডাউন সক্রিয়",
    nextRefillOn: "পরবর্তী সংগ্রহ সম্ভব",
    ruleCooldown: "নিয়ম: ১০০ টাকা = ১ দিন সীমা",
    terminalStatus: "টার্মিনাল স্ট্যাটাস",
    active: "সক্রিয়",
    scannerHint: "তেল সংগ্রহের জন্য ডিজিটাল আইডি স্ক্যান করুন।",
    dailyPricingMatrix: "দৈনিক মূল্য তালিকা",
    octaneBdt: "অকটেন / টাকা",
    petrolBdt: "পেট্রোল / টাকা",
    dieselBdt: "ডিজেল / টাকা",
    stationTerminalControl: "স্টেশন টার্মিনাল নিয়ন্ত্রণ",
    terminalLocation: "টার্মিনাল অবস্থান",
    unassigned: "-- অনির্ধারিত --",
    activateQrScanner: "কিউআর স্ক্যানার চালু করুন",
    scanStatus: "স্ক্যান স্ট্যাটাস",
    locked: "লক করা",
    resetTerminal: "টার্মিনাল রিসেট করুন",
    refillRecorded: "লেনদেন সংগৃহীত",
    nextVehicle: "পরবর্তী যানবাহন",
    identityVerified: "পরিচয় যাচাইকৃত",
    inputAmountBdt: "টাকার পরিমাণ লিখুন",
    transmitLogRefill: "লেনদেন সম্পন্ন করুন",
    radarStandby: "রাডার স্ট্যান্ডবাই",
    waitingForScan: "টার্মিনাল স্ক্যান ইভেন্টের জন্য অপেক্ষা করা হচ্ছে...",
    statusReports: "স্ট্যাটাস রিপোর্ট",
    registryHub: "রেজিস্ট্রি হাব",
    priceConfig: "মূল্য কনফিগ",
    analytics: "অ্যানালিটিক্স",
    updatePrices: "মূল্য আপডেট করুন",
    currentPrices: "বর্তমান মূল্য",
    fuelType: "জ্বালানির ধরন",
    priceBdt: "মূল্য (টাকা)",
    userRoleHub: "ব্যবহারকারীর ভূমিকা",
    approvalQueue: "অনুমোদন সারি",
    actions: "অ্যাকশন",
    approve: "অনুমোদন দিন",
    alreadyApproved: "অনুমোদিত হয়েছে",
    role: "ভূমিকা",
    update: "আপডেট",
    changeRole: "ভূমিকা পরিবর্তন",
    userRegistry: "ব্যবহারকারী রেজিস্ট্রি",
    deleteAccount: "একাউন্ট মুছুন",
    superAdminAccess: "সুপার এডমিন অ্যাক্সেস প্রয়োজন",
    addPump: "নতুন পাম্প স্টেশন যোগ করুন",
    addressLabel: "স্টেশন ঠিকানা",
    geoLocLabel: "ভৌগলিক অবস্থান",
    syncEstLabel: "সিংক্রোনাইজেশন সময়",
    pumpName: "পাম্পের নাম",
    deliveryDate: "পরবর্তী সরবরাহের তারিখ",
    savePump: "স্টেশন সংরক্ষণ করুন",
    provisionPersonnel: "কর্মী নিয়োগ",
    emailPlaceholder: "official@station.com",
    manualAdd: "ইমেল প্রাক-অনুমোদন",
    toastSuccess: "অপারেশন সফল হয়েছে",
    toastError: "সিস্টেম ত্রুটি",
    lastDelivery: "শেষ সরবরাহ",
    offline: "অফলাইন",
    fuelPriceUpdate: "জ্বালানি মূল্য আপডেট",
    deployPricing: "মূল্য নির্ধারণ করুন",
    manualProvisioning: "ম্যানুয়াল অনুমোদন",
    grantAccess: "অ্যাক্সেস প্রদান করুন",
    stationTerminals: "স্টেশন টার্মিনাল",
    adminLogin: "এডমিন লগইন",
    userLogin: "ইউজার পোর্টাল",
    idPlaceholder: "ইমেইল / আইডি",
    passPlaceholder: "পাসওয়ার্ড",
    loginAsAdmin: "এডমিন হিসেবে লগইন করুন",
    backToUser: "ইউজার পোর্টালে ফিরুন",
    adminAccessPortal: "এডমিন অ্যাক্সেস পোর্টাল",
    allUsers: "নাগরিক নিবন্ধন তালিকা",
    transactions: "লেনদেন লগ",
    managePrices: "মূল্য পরিবর্তন",
    octanePrice: "অকটেন (প্রতি লিটার)",
    petrolPrice: "পেট্রোল (প্রতি লিটার)",
    dieselPrice: "ডিজেল (প্রতি লিটার)",
    priceUpdated: "মূল্য আপডেট করা হয়েছে",
    revokeAccess: "অ্যাক্সেস প্রত্যাহার করুন",
    confirmRevoke: "আপনি কি এই ব্যবহারকারীর অ্যাক্সেস প্রত্যাহার করতে চান?",
    filterByFuel: "জ্বালানি অনুযায়ী",
    allFuels: "সব জ্বালানি",
    octane: "অকটেন",
    petrol: "পেট্রোল",
    diesel: "ডিজেল",
    uploadProfilePhoto: "প্রোফাইল ছবি আপলোড করুন",
    changePhoto: "ছবি পরিবর্তন করুন",
    registryDetails: "বিস্তারিত তথ্য",
    userType: "ব্যবহারকারীর ধরন",
    contactInfo: "যোগাযোগের তথ্য",
    licenseInfo: "লাইসেন্স তথ্য",
    activity: "কার্যক্রম",
    systemLogs: "সিস্টেম লগ",
    latestTransactions: "সর্বশেষ লেনদেনের রেকর্ড",
    availableLimit: "অবশিষ্ট জ্বালানি সীমা",
    totalActiveVehicles: "মোট সক্রিয় যানবাহন",
    scanQr: "যানবাহন কিউআর স্ক্যান করুন",
    theme: "থিম",
    switchToLight: "লাইট মোডে সুইচ করুন",
    switchToDark: "ডার্ক মোডে সুইচ করুন",
    statusAvailable: "পর্যাপ্ত",
    successAvailable: "সফলভাবে সচল",
    driverName: "চালকের নাম",
    timestamp: "সময়",
    quantityLiters: "পরিমাণ (লিটার)",
    recentTransactionFeed: "সাম্প্রতিক লেনদেন ফিড",
    criticalSystemAlerts: "গুরুত্বপূর্ণ সিস্টেম অ্যালার্ট",
    appUptime: "অ্যাপ আপটাইম",
    latency: "ল্যাটেন্সি",
    centralMonitoringNode: "কেন্দ্রীয় পর্যবেক্ষণ নোড",
    step1Landing: "বোর্ডিং/রেজিস্ট্রেশন",
    step2Landing: "তথ্য যাচাইকরণ",
    step3Landing: "জ্বালানি সংগ্রহ ও সম্পন্ন",
    globalStatus: "সার্বিক নেটওয়ার্ক স্ট্যাটাস",
    activeNodes: "সক্রিয় নোড",
    systemPerformance: "সিস্টেমের দক্ষতা",
    viewDashboard: "ড্যাশবোর্ড দেখুন"
  }
};

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

function Sidebar({ user, activeTab, setActiveTab, lang, onSignOut }: { 
  user: AppUser, 
  activeTab: string, 
  setActiveTab: (t: any) => void,
  lang: Language,
  onSignOut: () => void
}) {
  const t = TRANSLATIONS[lang];
  const role = user.role;
  
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, roles: ['user', 'manager', 'admin'] },
    { id: 'pending', label: t.pendingApprovals, icon: UserPlus, roles: ['admin'] },
    { id: 'users', label: t.userRegistry, icon: Users, roles: ['admin'] },
    { id: 'pricing', label: t.managePrices, icon: CreditCard, roles: ['admin'] },
    { id: 'stations', label: t.manageStations, icon: MapPin, roles: ['admin'] },
    { id: 'transactions', label: t.allTransactions, icon: History, roles: ['user', 'manager', 'admin'] },
    { id: 'stats', label: t.logs, icon: FileText, roles: ['admin'] },
    { id: 'scanner', label: t.scanner, icon: Camera, roles: ['manager', 'admin'] },
  ];

  return (
    <div className="w-64 bg-[#020617] flex flex-col h-screen fixed left-0 top-0 z-50 shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)] border-r border-white/5">
      <div className="p-10 flex items-center gap-4">
        <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-2xl shadow-brand/20 relative group">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl"></div>
          <Fuel className="text-white" size={24} />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl tracking-tighter text-white leading-none">FuelGuard</span>
          <span className="text-[8px] font-mono font-black text-brand uppercase tracking-[0.3em] mt-1.5 opacity-60">Setabganj</span>
        </div>
      </div>
      
      <div className="flex-1 px-6 space-y-1">
        <div className="h-px bg-white/5 mx-4 mb-8"></div>
        <p className="text-[10px] font-mono font-black text-white/20 uppercase tracking-[0.4em] mb-6 ml-4">Terminal Control</p>
        <nav className="space-y-2">
          {menuItems.filter(item => item.roles.includes(role)).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black transition-all group relative duration-300",
                activeTab === item.id 
                  ? "bg-brand text-white shadow-2xl shadow-brand/20" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} className={cn("transition-all duration-300", activeTab === item.id ? "text-white scale-110" : "text-white/20 group-hover:text-white group-hover:scale-110")} />
              <span className="uppercase tracking-[0.2em]">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_15px_white]"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 space-y-4 shadow-xl mb-6 backdrop-blur-md">
           <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
                 {user.licensePhoto ? (
                   <img src={user.licensePhoto} alt="User" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                 ) : (
                   <UserIcon size={18} className="text-white/30" />
                 )}
              </div>
              <div className="flex flex-col -space-y-0.5">
                 <span className="text-[11px] font-black truncate max-w-[120px] uppercase tracking-tighter text-white">{user.name}</span>
                 <span className="text-[8px] font-mono text-brand font-black uppercase tracking-[0.2em] opacity-60">{user.role}</span>
              </div>
           </div>
           <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75 shadow-[0_0_12px_#10b981]"></div>
              <span className="text-[9px] font-mono font-black text-white/30 uppercase tracking-widest leading-none">System Active</span>
           </div>
        </div>

        <button 
          onClick={onSignOut}
          className="w-full flex items-center justify-center gap-4 px-4 py-5 rounded-2xl text-[10px] font-black bg-white/5 text-white/30 hover:text-white hover:bg-rose-500 transition-all border border-white/5 uppercase tracking-[0.3em] group shadow-xl"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          {t.logout}
        </button>
      </div>
    </div>
  );
}

function ProfileModal({ user, lang, onClose, onUpdate }: { user: AppUser, lang: Language, onClose: () => void, onUpdate: (data: Partial<AppUser>) => Promise<void> }) {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // For this demo, we'll convert to base64, but in production we'd use Firebase Storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await onUpdate({ licensePhoto: base64String });
        onClose();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Photo upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.profile}</h3>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} className="text-slate-400" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-50 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner">
                {user.licensePhoto ? (
                  <img src={user.licensePhoto} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={48} className="text-slate-300" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-1 right-1 w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Camera size={20} />
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-black text-slate-800">{user.name}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user.role}</p>
            </div>

            <div className="w-full space-y-4 pt-4 border-t border-slate-100">
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.contactInfo}</span>
                 <p className="text-sm font-bold text-slate-700">{user.phone || '01XXXXXXX'}</p>
               </div>
               <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.vehicleIndex}</span>
                 <p className="text-sm font-bold text-slate-700 font-mono">{user.vehicleNumber || 'N/A'}</p>
               </div>
            </div>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            className="hidden" 
            accept="image/*" 
          />
        </div>
      </motion.div>
    </div>
  );
}

function TopBar({ user, lang, setLang, onProfileClick, onSignOut }: { 
  user: AppUser, 
  lang: Language, 
  setLang: (l: Language) => void, 
  onProfileClick: () => void,
  onSignOut: () => void 
}) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-lg lg:hidden">
          <LayoutDashboard size={20} className="text-slate-600" />
        </button>
        <div className="hidden sm:block">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.welcomeBack}</p>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">{user.name}</h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setLang('en')}
            className={cn("px-3 py-1 text-[10px] font-black rounded-md transition-all", lang === 'en' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400")}
          >English</button>
          <button 
            onClick={() => setLang('bn')}
            className={cn("px-3 py-1 text-[10px] font-black rounded-md transition-all font-bengali", lang === 'bn' ? "bg-white text-slate-800 shadow-sm" : "text-slate-400")}
          >বাংলা</button>
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <button 
            onClick={onSignOut}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors group"
            title={t.logout}
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div 
            onClick={onProfileClick}
            className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
               {user.licensePhoto ? (
                 <img src={user.licensePhoto} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <UserIcon size={14} className="text-slate-500" />
               )}
            </div>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdCardModal({ user, lang, onClose, isDark }: { user: AppUser, lang: Language, onClose: () => void, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadIdCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `FuelPass_ID_${user.vehicleNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-[2rem] shadow-2xl max-w-2xl w-full p-4 md:p-8 relative", isDark ? "bg-slate-900 border border-white/10" : "bg-white")}
      >
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h3 className={cn("text-xl md:text-2xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-800")}>{t.userDigitalId}</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{t.readyForCollection}</p>
          </div>
          <button onClick={onClose} className={cn("p-2 rounded-full transition-colors", isDark ? "hover:bg-white/5 text-white/40" : "hover:bg-slate-100 text-slate-400")}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {/* ID CARD CONTAINER - Precise 85mm x 55mm aspect ratio for professional finish */}
          <div 
            ref={cardRef}
            className="w-[500px] h-[320px] shrink-0 relative overflow-hidden flex flex-col p-0 scale-[0.6] sm:scale-100 origin-center"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {/* Security Background Pattern (Guilloché-inspired) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Official Header */}
            <div className="h-[55px] shrink-0 flex items-center px-6 relative overflow-hidden" style={{ backgroundColor: '#020617' }}>
              <div className="absolute top-0 right-0 w-40 h-full opacity-5 skew-x-[30deg] bg-white -mr-12"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full p-1.5 flex items-center justify-center bg-white shadow-lg">
                  <Fuel className="w-full h-full text-brand" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-[0.15em] leading-none uppercase text-white">FuelGuard Setabganj</span>
                  <span className="text-[6px] font-bold uppercase tracking-widest mt-1 text-white/40">Upazila Administration Bochaganj</span>
                </div>
              </div>
              <div className="ml-auto relative z-10">
                 <div className="bg-brand text-white border border-brand/20 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest">VALID PERMIT</div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex p-6 gap-6 relative">
              {/* Profile Photo Side */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="relative">
                  <div className="w-[105px] h-[125px] rounded-xl overflow-hidden relative border border-slate-100 bg-slate-50 shadow-inner">
                    {user.licensePhoto ? (
                      <img 
                        src={user.licensePhoto} 
                        alt={user.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <UserIcon className="text-slate-200" size={40} />
                      </div>
                    )}
                  </div>
                  {/* Digital Authenticity Mark */}
                  <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-50 shadow-xl">
                     <ShieldCheck size={20} className="text-brand" />
                  </div>
                </div>
              </div>

              {/* Data Center */}
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[7px] font-black uppercase tracking-[0.2em] block mb-1 text-slate-400">Permit Holder / পূর্ণ নাম</label>
                    <p className="text-sm font-black uppercase tracking-tight leading-none text-slate-900">{user.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[7px] font-black uppercase tracking-[0.2em] block mb-1 text-slate-400">Plate No / গাড়ি নং</label>
                      <p className="text-xs font-black font-mono tracking-tighter text-brand">{user.vehicleNumber}</p>
                    </div>
                    <div>
                      <label className="text-[7px] font-black uppercase tracking-[0.2em] block mb-1 text-slate-400">Class / শ্রেণী</label>
                      <p className="text-xs font-bold uppercase text-slate-900">{user.vehicleClass || 'BIKE PRIVATE'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[7px] font-black uppercase tracking-[0.2em] block mb-1 text-slate-400">Identity / এনআইডি</label>
                      <p className="text-[10px] font-mono font-bold text-slate-500">{user.nid || 'VERIFIED'}</p>
                    </div>
                    <div>
                      <label className="text-[7px] font-black uppercase tracking-[0.2em] block mb-1 text-slate-400">Valid Until / মেয়াদ</label>
                      <p className="text-[10px] font-mono font-bold uppercase text-slate-500">DECEMBER 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="w-[100px] shrink-0 flex flex-col items-center justify-between py-1">
                <div className="p-2 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                   <div className="p-1">
                      <QRCodeSVG 
                        value={user.userId} 
                        size={75} 
                        level="H"
                        includeMargin={false}
                        fgColor="#020617"
                      />
                   </div>
                </div>
                <div className="text-center w-full">
                  <p className="text-[6px] font-mono font-black mb-1 uppercase text-slate-300">Identity_Token</p>
                  <div className="h-3 w-full flex gap-[1px]">
                     {[...Array(24)].map((_, i) => (
                       <div key={i} className="h-full bg-slate-100" style={{ width: `${Math.random() * 2 + 1}px`, opacity: Math.random() * 0.5 + 0.3 }}></div>
                     ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fine Print Footer */}
            <div className="h-[30px] shrink-0 flex items-center px-6 justify-between border-t" style={{ backgroundColor: '#f8fafc', borderColor: '#f1f5f9' }}>
               <p className="text-[6px] font-mono font-bold uppercase tracking-widest" style={{ color: '#cbd5e1' }}>Permit ID: {user.userId.slice(-12).toUpperCase()}</p>
               <p className="text-[6px] font-black uppercase tracking-widest" style={{ color: '#334155' }}>Uno, Bochaganj Administered • Pilot v3.1</p>
            </div>
          </div>

          <div className="flex w-full gap-4 pt-4">
             <button 
               onClick={downloadIdCard}
               className="flex-1 py-4 bg-brand text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
             >
                <Download size={18} />
                Download Permit (PNG)
             </button>
             <button 
               className="px-6 py-4 bg-slate-100 text-slate-400 font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-slate-200 transition-all"
             >
                <Printer size={18} />
             </button>
          </div>

          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 mt-4 text-left">
             <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
             </div>
             <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                {lang === 'bn' 
                  ? 'এই ডিজিটাল পারমিটটি আপনার জন্য বরাদ্দকৃত ফুয়েল কোটা ব্যবহারের জন্য একমাত্র প্রমাণপত্র। এটি হারিয়ে গেলে বা অপব্যবহার করলে উপজেলা কর্তৃপক্ষ দায়ী থাকবে না।'
                  : 'This digital permit is the sole credential for using your allocated fuel quota. The Upazila authority will not be responsible for any loss or misuse of this ID.'}
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardUser({ user, onProfileClick, lang, isDark }: { user: AppUser, onProfileClick: () => void, lang: Language, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  const [showIdCard, setShowIdCard] = useState(false);
  
  const usageStats = {
    daily: { current: 1.5, limit: 12.5 },
    monthly: { current: 15.2, limit: 60.0 },
    weekly: { current: 5.8 }
  };

  const chartData = [
    { name: lang === 'bn' ? 'রবি' : 'Sun', liters: 1.2 },
    { name: lang === 'bn' ? 'সোম' : 'Mon', liters: 1.8 },
    { name: lang === 'bn' ? 'মঙ্গল' : 'Tue', liters: 1.5 },
    { name: lang === 'bn' ? 'বুধ' : 'Wed', liters: 2.1 },
    { name: lang === 'bn' ? 'বৃহ' : 'Thu', liters: 1.9 },
    { name: lang === 'bn' ? 'শুক্র' : 'Fri', liters: 2.4 },
    { name: lang === 'bn' ? 'শনি' : 'Sat', liters: 2.0 },
  ];

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        <div className="space-y-1 md:space-y-2">
          <h1 className={cn("text-2xl md:text-4xl font-black tracking-tight uppercase leading-none transition-colors", isDark ? "text-white" : "text-slate-800")}>
            {lang === 'bn' ? 'স্বাগতম, ' : 'Welcome, '} {user.name}
          </h1>
          <p className={cn("font-medium tracking-wide uppercase text-[10px] md:text-xs transition-colors opacity-60", isDark ? "text-slate-400" : "text-slate-500")}>
            {lang === 'bn' ? 'আপনার ব্যক্তিগত পোর্টাল' : 'Your Personal Portal'} • Node: Setabganj_Hub
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowIdCard(true)}
            className={cn("px-6 md:px-8 py-3 md:py-4 border rounded-[2rem] font-black uppercase text-[10px] tracking-widest shadow-xl transition-all flex items-center gap-3",
              isDark ? "bg-white/5 border-white/10 text-white shadow-black/20 hover:bg-white/10" : "bg-white border-slate-200 text-slate-800 shadow-slate-200/50 hover:bg-slate-50")}
          >
            <CreditCard size={18} className="text-brand" />
            {lang === 'bn' ? 'ডিজিটাল আইডি' : 'Digital ID'}
          </button>
          
          <button 
            onClick={onProfileClick}
            className={cn("w-12 h-12 md:w-14 md:h-14 border rounded-full flex items-center justify-center shadow-xl transition-all",
              isDark ? "bg-white/5 border-white/10 text-slate-400 hover:text-brand shadow-black/20" : "bg-white border-slate-200 shadow-slate-200/50 hover:bg-slate-50 text-slate-400 hover:text-brand")}
          >
            <UserIcon size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <StatCard 
          label={t.dailyUsage} 
          value={usageStats.daily.current} 
          subValue={`/ ${usageStats.daily.limit} L`}
          icon={Activity} 
          colorClass={isDark ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-blue-50 text-blue-600 border-blue-100"}
          trend="neutral"
        />
        <StatCard 
          label={t.monthlyUsage} 
          value={usageStats.monthly.current} 
          subValue="LITERS"
          icon={TrendingUp} 
          colorClass={isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-100"}
          trend="up"
        />
        <StatCard 
          label={t.availableLimit} 
          value={(usageStats.daily.limit - usageStats.daily.current).toFixed(1)} 
          subValue="READY"
          icon={Fuel} 
          colorClass="bg-brand/10 text-brand border-brand/20"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card title={t.last7Days || "Usage Trends"} className="lg:col-span-8 h-full">
           <div className="h-[300px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                    dy={16}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="liters" 
                    stroke="#2563eb" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#usageGradient)" 
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </Card>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-brand/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full translate-x-8 -translate-y-8"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                 <ShieldCheck size={28} />
              </div>
              <div className="space-y-1">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Status Authorization</h3>
                 <p className="text-3xl font-black tracking-tight">{user.isApproved ? 'VERIFIED_ACTIVE' : 'PENDING_REVIEW'}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6 text-center">
               <QrCode size={48} className="mx-auto text-brand" />
               <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">Dynamic Token Access</p>
               <button 
                onClick={() => setShowIdCard(true)}
                className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border border-white/10"
               >
                 Show Digital ID
               </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showIdCard && (
          <IdCardModal user={user} lang={lang} onClose={() => setShowIdCard(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function UsageCard({ title, current, limit, unit, lang }: { title: string, current: number, limit: number, unit: string, lang: Language }) {
  const percentage = Math.min((current / limit) * 100, 100);
  
  return (
    <div className="glass-card p-8 space-y-6 group cursor-default">
      <div className="flex justify-between items-start">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] leading-tight group-hover:text-brand transition-colors">{title}</h4>
        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
          <Zap size={14} />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-slate-900 tracking-tighter">{current.toFixed(1)}</span>
          <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{unit}</span>
          <span className="text-xs font-bold text-slate-300 mx-1">/</span>
          <span className="text-xs font-black text-slate-500">{limit} {unit}</span>
        </div>
        
        <div className="space-y-2">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className="h-full bg-brand rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
            {lang === 'bn' ? `${percentage.toFixed(0)}% ব্যবহৃত` : `${percentage.toFixed(0)}% Utilized`}
          </p>
        </div>
      </div>
    </div>
  );
}

function UserProfileView({ user, lang, isDark }: { user: AppUser, lang: Language, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  
  const infoItems = [
    { label: t.fullName, value: user.name, icon: UserIcon },
    { label: t.phoneNumber, value: user.phone, icon: Phone },
    { label: t.nidNumber, value: user.nid, icon: CreditCard },
    { label: t.registrationNumber, value: user.vehicleNumber, icon: Truck },
    { label: t.vehicleClassShort, value: user.vehicleClass, icon: Zap },
    { label: t.manufactureYearShort, value: user.manufactureYear, icon: Clock },
    { label: t.postOffice, value: user.postCode, icon: Mail },
    { label: t.houseHolding, value: user.village, icon: Home },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h2 className={cn("text-3xl font-black tracking-tight uppercase leading-none", isDark ? "text-white" : "text-slate-800")}>
            {t.profile}
          </h2>
          <p className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2", isDark ? "text-slate-500" : "text-slate-400")}>
            <ShieldCheck size={14} className="text-brand" /> {lang === 'bn' ? 'যাচাইকৃত তথ্য' : 'Verified Information'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infoItems.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={cn("p-6 rounded-[2rem] border transition-all", 
              isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm shadow-slate-200/50")}
          >
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", 
                isDark ? "bg-white/10 text-brand" : "bg-brand/5 text-brand")}>
                <item.icon size={20} />
              </div>
              <div className="space-y-1">
                <p className={cn("text-[10px] font-black uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>
                  {item.label}
                </p>
                <p className={cn("text-sm font-bold", isDark ? "text-white" : "text-slate-800")}>
                  {item.value || (lang === 'bn' ? 'তথ্য নেই' : 'Not Provided')}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={cn("p-10 rounded-[3rem] border flex flex-col md:flex-row items-center gap-8 text-center md:text-left", 
        isDark ? "bg-blue-900/10 border-blue-900/20" : "bg-blue-50 border-blue-100")}>
        <div className="w-20 h-20 bg-blue-900 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
          <ShieldCheck size={40} />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className={cn("text-xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-blue-900")}>
            {lang === 'bn' ? 'নিরাপত্তা ও গোপনীয়তা' : 'Security & Privacy'}
          </h3>
          <p className={cn("text-sm font-medium", isDark ? "text-slate-400" : "text-blue-800/60")}>
            {lang === 'bn' 
              ? 'আপনার সংগৃহীত তথ্য শুধুমাত্র দাপ্তরিক কাজের জন্য সংরক্ষিত এবং নিরাপদ। কোন তথ্যে ভুল থাকলে ইউএনও অফিসে যোগাযোগ করুন।' 
              : 'Your information is securely stored for official use only. Contact the UNO office if any information needs correction.'}
          </p>
        </div>
      </div>
    </div>
  );
}

function TransactionHistory({ lang, isDark }: { lang: Language, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className={cn("rounded-[2rem] border p-8 transition-colors", 
      isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}>
      <div className="flex justify-between items-center mb-8">
        <h3 className={cn("text-xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-800")}>{t.allTransactions}</h3>
      </div>
      <div className={cn("flex flex-col items-center justify-center py-20 gap-4", isDark ? "text-white/10" : "text-slate-200")}>
        <History size={64} strokeWidth={1} />
        <p className={cn("font-bold", isDark ? "text-slate-500" : "text-slate-400")}>{lang === 'bn' ? 'লেনদেনের তালিকা এখানে প্রদর্শিত হবে' : 'Transaction history will appear here'}</p>
      </div>
    </div>
  );
}

function UserManagement({ lang, showToast }: { lang: Language, showToast: (m: string, t: 'success' | 'error') => void }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.manageUsers}</h3>
        <button className="bg-brand text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-brand/20">Add User</button>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-slate-300 gap-4">
        <Users size={64} strokeWidth={1} />
        <p className="font-bold text-slate-400">User registry is being synchronized...</p>
      </div>
    </div>
  );
}

function StationManagement({ pumps, lang, showToast }: { pumps: Pump[], lang: Language, showToast: (m: string, t: 'success' | 'error') => void }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{t.manageStations}</h3>
        <button className="border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Register Station</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pumps.map(pump => (
          <div key={pump.pumpId} className="border border-slate-100 rounded-xl p-6 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-brand">
                 <MapPin size={20} />
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase">Online</span>
            </div>
            <div>
               <h4 className="font-black text-slate-800 uppercase truncate">{pump.name}</h4>
               <div className="flex flex-col gap-1 mt-1">
                 <p className="text-xs font-bold text-slate-400">{pump.location}</p>
                 {(pump as any).mapUrl && (
                   <a 
                     href={(pump as any).mapUrl} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-[9px] font-black text-brand flex items-center gap-1 hover:underline w-fit"
                   >
                     <ExternalLink size={10} /> View Map
                   </a>
                 )}
               </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {pump.pumpId}</span>
               <button className="text-[10px] font-black text-brand uppercase tracking-widest">Config</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Components ---

function Header({ user, onSignOut, lang, setLang, onAuthModeChange, activeTab, onTabChange, isDark, onToggleTheme }: { 
  user: AppUser | null, 
  onSignOut: () => void,
  lang: Language,
  setLang: (l: Language) => void,
  onAuthModeChange?: (mode: 'login' | 'signup') => void,
  activeTab?: string,
  onTabChange?: (tab: string) => void,
  isDark: boolean,
  onToggleTheme: () => void
}) {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleTabClick = (tabId: string) => {
    onTabChange?.(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-[100] border-b shadow-sm overflow-hidden transition-colors duration-300", isDark ? "bg-slate-950/80 backdrop-blur-md border-white/5 shadow-2xl" : "bg-white/80 backdrop-blur-md border-slate-200")}>
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex justify-between items-center h-20 md:h-24">
        
        <div className="flex items-center gap-3 md:gap-6 cursor-pointer" onClick={() => onTabChange?.('dashboard')}>
          <div className={cn("w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border p-1 shadow-sm rounded-xl transition-colors shrink-0", isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-100")}>
            <img 
              src="https://scontent.fdac22-2.fna.fbcdn.net/v/t39.30808-6/272973958_300659878763472_3113526947061015013_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=4p2JAvH_V80Q7kNvwFUadwf&_nc_oc=AdrX7Z_8acCYQ_4FFVhlGV-t6qUi1eRUlorlkGlKZuRH7F46AEiWGuqCAPS4FGZIfiY&_nc_zt=23&_nc_ht=scontent.fdac22-2.fna&_nc_gid=9ypYlGD5YuNZHuNFoLNvrQ&_nc_ss=7b2a8&oh=00_Af2NfhmojOoIpoxPaRCLdwZuSicUReO6HD2I51XxlHJwUg&oe=69F9594F" 
              alt="Gov Logo" 
              className="w-full h-full object-contain" 
              loading="lazy"
            />
          </div>
          <div className="flex flex-col">
            <h1 className={cn("font-galada text-lg md:text-2xl mb-0 leading-tight transition-colors truncate max-w-[150px] md:max-w-none", isDark ? "text-white" : "text-blue-800")}>
              {lang === 'bn' ? 'বোচাগঞ্জ ফুয়েল কন্ট্রোল' : 'Bochaganj Fuel Control'}
            </h1>
            <p className={cn("font-bangla text-[10px] md:text-sm font-medium transition-colors opacity-70", isDark ? "text-slate-400" : "text-slate-500")}>
              {lang === 'bn' ? 'উপজেলা নির্বাহী অফিসারের কার্যালয়' : 'Office of UNO, Bochaganj'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          {user && (
            <nav className={cn("hidden lg:flex items-center gap-6 border-r pr-6", isDark ? "border-white/10" : "border-slate-200")}>
               <button 
                 onClick={() => handleTabClick('dashboard')}
                 className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'dashboard' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
               >{t.dashboard}</button>
               {user.role === 'user' && (
                 <>
                   <button 
                     onClick={() => handleTabClick('history')}
                     className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'history' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >{t.allTransactions}</button>
                   <button 
                     onClick={() => handleTabClick('profile')}
                     className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'profile' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >{t.profile}</button>
                 </>
               )}
               {user.role === 'admin' && (
                 <>
                   <button 
                     onClick={() => handleTabClick('pending')}
                     className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'pending' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >Pending</button>
                   <button 
                     onClick={() => handleTabClick('users')}
                     className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'users' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >{t.manageUsers}</button>
                   <button 
                     onClick={() => handleTabClick('pricing')}
                     className={cn("text-[10px) font-black uppercase tracking-widest transition-all", activeTab === 'pricing' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >{t.pricing}</button>
                   <button 
                     onClick={() => handleTabClick('stations')}
                     className={cn("text-[10px] font-black uppercase tracking-widest transition-all", activeTab === 'stations' ? (isDark ? "text-brand" : "text-blue-900") : (isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900"))}
                   >{t.manageStations}</button>
                 </>
               )}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleTheme}
              className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm", 
                isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-400 hover:text-blue-900 hover:border-blue-900")}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className={cn("hidden sm:flex p-1 border rounded-xl overflow-hidden transition-colors", isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200")}>
              <button 
                onClick={() => setLang('en')}
                className={cn("px-3 md:px-4 py-2 text-[10px] font-black uppercase transition-all rounded-lg", lang === 'en' ? (isDark ? "bg-brand text-white" : "bg-blue-900 text-white shadow-lg") : (isDark ? "text-white/40 font-black uppercase" : "text-slate-400 hover:text-blue-900"))}
              >EN</button>
              <button 
                onClick={() => setLang('bn')}
                className={cn("px-3 md:px-4 py-2 text-[10px] font-black uppercase transition-all rounded-lg font-bangla", lang === 'bn' ? (isDark ? "bg-brand text-white" : "bg-blue-900 text-white shadow-lg") : (isDark ? "text-white/40" : "text-slate-400 hover:text-blue-900"))}
              >বাংলা</button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn("lg:hidden w-10 h-10 flex items-center justify-center border rounded-xl transition-all shadow-sm", 
                isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-600")}
            >
              {mobileMenuOpen ? <X size={20} /> : <Search size={20} className="rotate-90" />}
            </button>
          </div>

          <div className={cn("hidden sm:block h-8 w-px mx-2", isDark ? "bg-white/10" : "bg-slate-200")} />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                 <span className={cn("text-xs font-black uppercase tracking-tight leading-none", isDark ? "text-white" : "text-slate-800")}>{user.name}</span>
                 <span className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>{user.role}</span>
              </div>
              <button 
                onClick={onSignOut}
                className={cn("flex items-center justify-center w-10 h-10 border rounded-xl transition-all shadow-sm",
                  isDark ? "bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20" : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100")}
                title={t.logout}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <button 
                onClick={() => onAuthModeChange?.('signup')}
                className={cn("text-[10px] font-black uppercase tracking-widest transition-all px-4", isDark ? "text-white/40 hover:text-white" : "text-slate-400 hover:text-blue-900")}
              >
                {t.register}
              </button>
              <button 
                onClick={() => onAuthModeChange?.('login')}
                className={cn("px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95",
                  isDark ? "bg-brand text-white shadow-brand/20 hover:bg-blue-800" : "bg-blue-900 text-white shadow-blue-900/10 hover:bg-blue-800")}
              >
                {lang === 'bn' ? 'প্রবেশ করুন' : 'Sign In'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cn("lg:hidden border-t overflow-hidden", isDark ? "bg-slate-900 border-white/5" : "bg-slate-50 border-slate-100")}
          >
            <div className="p-6 space-y-6">
              {user && (
                <div className="space-y-2">
                  <p className={cn("text-[8px] font-black uppercase tracking-[0.3em] mb-4 opacity-40", isDark ? "text-white" : "text-slate-500")}>Console Navigation</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleTabClick('dashboard')}
                      className={cn("flex items-center justify-center gap-3 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                        activeTab === 'dashboard' ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : (isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                    >
                      <LayoutDashboard size={14} /> {t.dashboard}
                    </button>
                    {user.role === 'user' && (
                      <>
                        <button 
                          onClick={() => handleTabClick('history')}
                          className={cn("flex items-center justify-center gap-3 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                            activeTab === 'history' ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : (isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                        >
                          <History size={14} /> {t.logs}
                        </button>
                        <button 
                          onClick={() => handleTabClick('profile')}
                          className={cn("col-span-2 flex items-center justify-center gap-3 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                            activeTab === 'profile' ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : (isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                        >
                          <UserIcon size={14} /> {t.profile}
                        </button>
                      </>
                    )}
                    {user.role === 'admin' && (
                      <>
                        <button 
                          onClick={() => handleTabClick('pending')}
                          className={cn("flex items-center justify-center gap-3 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                            activeTab === 'pending' ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : (isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                        >
                          <FileText size={14} /> Pending
                        </button>
                        <button 
                          onClick={() => handleTabClick('users')}
                          className={cn("flex items-center justify-center gap-3 py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                            activeTab === 'users' ? "bg-brand text-white border-brand shadow-lg shadow-brand/20" : (isDark ? "bg-white/5 text-white/50 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                        >
                          <Users size={14} /> Users
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                 <p className={cn("text-[8px] font-black uppercase tracking-[0.3em] opacity-40", isDark ? "text-white" : "text-slate-500")}>Localization & Terminal</p>
                 <div className="flex gap-3">
                    <button 
                      onClick={() => setLang('en')}
                      className={cn("flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all", 
                        lang === 'en' ? "bg-blue-900 text-white border-blue-900" : (isDark ? "bg-white/5 text-slate-500 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                    >English</button>
                    <button 
                      onClick={() => setLang('bn')}
                      className={cn("flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all font-bangla", 
                        lang === 'bn' ? "bg-blue-900 text-white border-blue-900" : (isDark ? "bg-white/5 text-slate-500 border-white/10" : "bg-white text-slate-400 border-slate-200"))}
                    >বাংলা</button>
                 </div>
              </div>

              {!user && (
                <div className="flex flex-col gap-3">
                   <button 
                    onClick={() => { onAuthModeChange?.('login'); setMobileMenuOpen(false); }}
                    className="w-full py-4 bg-brand text-white rounded-xl font-black uppercase tracking-widest text-xs"
                   >SignIn</button>
                   <button 
                    onClick={() => { onAuthModeChange?.('signup'); setMobileMenuOpen(false); }}
                    className={cn("w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs border", isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-600")}
                   >Register</button>
                </div>
              )}

              {user && (
                <button 
                  onClick={onSignOut}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-rose-500 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-rose-500/20"
                >
                  <LogOut size={16} /> {t.logout}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Card({ children, className, title, subtitle }: { children: ReactNode, className?: string, title?: string, subtitle?: string, key?: any }) {
  return (
    <div className={cn("glass-card p-4 md:p-10", className)}>
      {(title || subtitle) && (
        <div className="mb-6 md:mb-8 space-y-1">
          {title && <h2 className="text-xl md:text-3xl font-serif italic font-bold text-slate-800 dark:text-white tracking-tight">{title}</h2>}
          {subtitle && <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

function StatCard({ label, value, subValue, icon: Icon, colorClass, trend }: { label: string, value: string | number, subValue?: string, icon: any, colorClass: string, trend?: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="glass-card p-4 md:p-8 space-y-4 md:space-y-6 group cursor-default shadow-2xl shadow-slate-200/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-slate-50 dark:bg-white/5 rounded-bl-[2rem] md:rounded-bl-[4rem] group-hover:bg-brand/5 transition-all duration-700 -mr-4 -mt-4 md:-mr-6 md:-mt-6" />
      <div className="flex justify-between items-start relative z-10">
        <div className={cn("w-10 h-10 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500", colorClass)}>
          <Icon size={20} className="md:w-7 md:h-7" />
        </div>
        {trend && (
           <div className={cn("flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl border font-black text-[8px] md:text-[10px] uppercase tracking-widest transition-colors", 
             trend === 'up' ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : 
             trend === 'down' ? "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20" : 
             "bg-slate-50 text-slate-400 border-slate-200 dark:bg-white/5 dark:text-slate-500 dark:border-white/10")}>
             {trend === 'up' && <TrendingUp size={10} />}
             {trend === 'down' && <TrendingDown size={10} />}
             {trend === 'neutral' && <Zap size={10} />}
             <span className="leading-none">{trend}</span>
           </div>
        )}
      </div>
      <div className="space-y-1 relative z-10">
        <h4 className="text-[10px] md:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">{label}</h4>
        <div className="flex items-baseline gap-2">
           <span className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors">{value}</span>
           {subValue && <span className="text-[10px] md:text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const t = TRANSLATIONS[lang];
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAdminAuthMode, setIsAdminAuthMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTabID, setActiveTabID] = useState('dashboard');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [prices, setPrices] = useState<FuelPrice | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  const [adminAuthForm, setAdminAuthForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAdminAuthMode) {
      setAdminAuthForm(prev => ({ ...prev, email: 'unobochaganj@gov.bd' }));
    }
  }, [isAdminAuthMode]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const unsubPumps = onSnapshot(collection(db, 'pumps'), (sn) => {
      setPumps(sn.docs.map(d => ({ pumpId: d.id, ...d.data() } as Pump)));
    }, (err) => {
      // Gracefully handle if rules still blocking
      console.warn("Pumps sync skipped:", err.message);
    });

    const unsubPrices = onSnapshot(doc(db, 'settings', 'fuelPrices'), (d) => {
      if (d.exists()) setPrices(d.data() as FuelPrice);
    }, (err) => {
      console.warn("Prices sync skipped:", err.message);
    });

    return () => { 
      unsubPumps(); 
      unsubPrices(); 
    };
  }, []);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      setFbUser(u);
      if (u) {
        try {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists()) {
            setAppUser({ userId: u.uid, ...userDoc.data() } as AppUser);
          } else {
            setAppUser({ userId: u.uid, email: u.email || '', role: 'user', isApproved: false } as AppUser);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${u.uid}`);
        }
      } else {
        setAppUser(null);
      }
      setLoading(false);
    });

    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!fbUser) return;

    // Additional data fetching for logged in users if any
  }, [fbUser]);

  useEffect(() => {
    if (appUser && activeTabID === 'dashboard') {
      const isAdmin = appUser.role === 'admin';
      const isManager = appUser.role === 'manager';
      setActiveTabID(isAdmin ? 'pending' : (isManager ? 'scanner' : 'dashboard'));
    }
  }, [appUser]);

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (authMode === 'signup') {
      if (password !== confirmPassword) {
        setAuthError(t.passwordMismatch);
        return;
      }
      if (password.length < 8) {
        setAuthError(t.passwordWeak);
        return;
      }
      if (!name.trim()) {
        setAuthError(lang === 'bn' ? 'দয়া করে আপনার নাম দিন' : 'Please enter your name');
        return;
      }
    }

    const isAdminUser = email.toLowerCase() === 'unobochaganj@gov.bd';
    
    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', cred.user.uid), {
          userId: cred.user.uid,
          email,
          name,
          role: isAdminUser ? 'admin' : 'user',
          isApproved: isAdminUser,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    if (adminAuthForm.email.toLowerCase() !== 'unobochaganj@gov.bd') {
      setAuthError(lang === 'bn' ? 'শুধুমাত্র অনুমোদিত এডমিন ইমেইল লগইন করতে পারবে' : 'Only authorized admin email can log in');
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, adminAuthForm.email, adminAuthForm.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        role: 'admin',
        isApproved: true,
        email: adminAuthForm.email
      }, { merge: true });
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleRegisterProfile = async (data: Partial<AppUser>) => {
    if (!fbUser) return;
    try {
      await updateDoc(doc(db, 'users', fbUser.uid), {
        ...data,
        isApproved: false
      });
      const updated = await getDoc(doc(db, 'users', fbUser.uid));
      setAppUser({ userId: fbUser.uid, ...updated.data() } as AppUser);
      showToast(TRANSLATIONS[lang].toastSuccess);
    } catch (e) {
      showToast(TRANSLATIONS[lang].toastError, 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setAuthError(null);
    try {
      const cred = await signInWithPopup(auth, provider);
      const email = cred.user.email?.toLowerCase() || '';
      const isAdminUser = email === 'unobochaganj@gov.bd';
      
      const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', cred.user.uid), {
          userId: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName,
          role: isAdminUser ? 'admin' : 'user',
          isApproved: isAdminUser,
          createdAt: new Date().toISOString()
        });
      } else if (isAdminUser && userDoc.data()?.role !== 'admin') {
        // Upgrade to admin if logging in with the designated email
        await updateDoc(doc(db, 'users', cred.user.uid), {
          role: 'admin',
          isApproved: true
        });
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  if (loading) {
    return (
      <div className={cn("min-h-screen bg-slate-50 flex items-center justify-center", lang === 'bn' ? 'font-bengali' : 'font-sans')}>
         <div className="flex flex-col items-center gap-4">
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-blue-900"><Clock size={24} /></motion.div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Initializing Interface...</span>
         </div>
      </div>
    );
  }

  if (!fbUser) {
    return (
      <LandingPage 
        lang={lang} 
        setLang={setLang}
        setAuthMode={setAuthMode}
        isAdminAuthMode={isAdminAuthMode}
        setIsAdminAuthMode={setIsAdminAuthMode}
        handlePasswordAuth={handlePasswordAuth}
        handleAdminAuth={handleAdminAuth}
        authMode={authMode}
        name={name}
        setName={setName}
        email={isAdminAuthMode ? adminAuthForm.email : email}
        setEmail={(val: string) => isAdminAuthMode ? setAdminAuthForm({...adminAuthForm, email: val}) : setEmail(val)}
        password={isAdminAuthMode ? adminAuthForm.password : password}
        setPassword={(val: string) => isAdminAuthMode ? setAdminAuthForm({...adminAuthForm, password: val}) : setPassword(val)}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        authError={authError}
        t={t}
        pumps={pumps}
        handleGoogleSignIn={handleGoogleSignIn}
        Header={Header}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
    );
  }

/* OLD LANDING PAGE REMOVED */

// CLEANUP COMPLETE

  // If user exists but fields are empty, show completion form
  if (appUser && (!appUser.nid || !appUser.vehicleNumber)) {
    return (
      <div className={cn("min-h-screen flex flex-col transition-colors duration-500", 
        isDark ? "bg-[#020617] text-white dark" : "bg-slate-50 text-slate-800",
        lang === 'bn' ? 'font-bengali' : 'font-sans')}>
        <Header 
          user={appUser} 
          onSignOut={() => signOut(auth)} 
          lang={lang} 
          setLang={setLang} 
          onTabChange={() => {}}
          activeTab=""
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />
        <div className="flex-1 pt-32 pb-20 overflow-y-auto flex items-center justify-center">
           <RegistrationForm onRegister={handleRegisterProfile} lang={lang} isDark={isDark} />
        </div>
      </div>
    );
  }

  // If user is not approved, show pending approval screen
  if (appUser && !appUser.isApproved) {
    return <PendingApprovalView lang={lang} isDark={isDark} onSignOut={() => signOut(auth)} />;
  }

  // Fallback for missing user profile (shorter loading)
  if (!appUser) {
    return (
        <div className={cn("min-h-screen bg-slate-50 flex items-center justify-center", lang === 'bn' ? 'font-bengali' : 'font-sans')}>
           <div className="flex flex-col items-center gap-4">
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="text-blue-900"><Clock size={24} /></motion.div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Registry...</span>
           </div>
        </div>
    );
  }

  const isAdmin = appUser.role === 'admin';
  const isManager = appUser.role === 'manager';

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", 
      isDark ? "bg-[#020617] text-white dark" : "bg-slate-50 text-slate-800",
      lang === 'bn' ? 'font-bengali' : 'font-sans')}>
      <Header 
        user={appUser} 
        onSignOut={() => signOut(auth)} 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTabID}
        onTabChange={setActiveTabID}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />
      
      <div className="flex-1 pt-24 md:pt-32 pb-10 md:pb-20">
        <main className="max-w-7xl mx-auto px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabID}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTabID === 'dashboard' && <DashboardUser user={appUser} lang={lang} onProfileClick={() => setShowProfileModal(true)} isDark={isDark} />}
              {activeTabID === 'history' && <TransactionHistory lang={lang} isDark={isDark} />}
              {activeTabID === 'profile' && <UserProfileView user={appUser} lang={lang} isDark={isDark} />}
              {activeTabID === 'pending' && isAdmin && <DashboardAdmin pumps={pumps} prices={prices} lang={lang} showToast={showToast} activeView="pending" isDark={isDark} />}
              {activeTabID === 'users' && isAdmin && <DashboardAdmin pumps={pumps} prices={prices} lang={lang} showToast={showToast} activeView="users" isDark={isDark} />}
              {activeTabID === 'pricing' && isAdmin && <DashboardAdmin pumps={pumps} prices={prices} lang={lang} showToast={showToast} activeView="prices" isDark={isDark} />}
              {activeTabID === 'stations' && isAdmin && <DashboardAdmin pumps={pumps} prices={prices} lang={lang} showToast={showToast} activeView="mgmt" isDark={isDark} />}
              {activeTabID === 'stats' && isAdmin && <DashboardAdmin pumps={pumps} prices={prices} lang={lang} showToast={showToast} activeView="stats" isDark={isDark} />}
              {activeTabID === 'transactions' && <TransactionHistory lang={lang} isDark={isDark} />}
              {activeTabID === 'scanner' && (isAdmin || isManager) && <DashboardManager pumps={pumps} prices={prices} lang={lang} isDark={isDark} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer className={cn("py-8 md:py-12 border-t transition-colors duration-300", isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200")}>
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4 md:space-y-6">
          <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-full p-1 mx-auto border overflow-hidden transition-colors", isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm")}>
            <img src="https://scontent.fdac22-2.fna.fbcdn.net/v/t39.30808-6/272973958_300659878763472_3113526947061015013_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=4p2JAvH_V80Q7kNvwFUadwf&_nc_oc=AdrX7Z_8acCYQ_4FFVhlGV-t6qUi1eRUlorlkGlKZuRH7F46AEiWGuqCAPS4FGZIfiY&_nc_zt=23&_nc_ht=scontent.fdac22-2.fna&_nc_gid=9ypYlGD5YuNZHuNFoLNvrQ&_nc_ss=7b2a8&oh=00_Af2NfhmojOoIpoxPaRCLdwZuSicUReO6HD2I51XxlHJwUg&oe=69F9594F" className="w-full h-full object-contain" alt="Logo" loading="lazy" />
          </div>
          <p className={cn("font-bold text-lg md:text-xl transition-colors", isDark ? "text-white" : "text-slate-800")}>{t.divisionName}</p>
          <p className={cn("text-[10px] md:text-xs font-medium tracking-widest uppercase transition-colors opacity-60", isDark ? "text-slate-500" : "text-slate-400")}>{t.copyright}</p>
        </div>
      </footer>

      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {showProfileModal && appUser && (
        <ProfileModal 
          user={appUser} 
          lang={lang} 
          onClose={() => setShowProfileModal(false)}
          onUpdate={async (data) => {
            try {
              await updateDoc(doc(db, 'users', appUser.userId), data);
              setAppUser(prev => prev ? { ...prev, ...data } : null);
              showToast(t.toastSuccess, 'success');
            } catch (err) {
              console.error('Update failed:', err);
              showToast(t.toastError, 'error');
            }
          }}
        />
      )}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-brand text-white rounded-2xl flex items-center justify-center shadow-[0_20px_40px_rgba(59,130,246,0.3)] border border-white/20 hover:bg-slate-900 transition-all duration-300 group"
            title="Back to Top"
          >
            <div className="absolute inset-0 bg-brand rounded-2xl group-hover:blur-xl opacity-20 transition-all"></div>
            <ArrowUp size={24} className="relative z-10 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Components ---

function PendingApprovalView({ lang, isDark, onSignOut }: { lang: Language, isDark: boolean, onSignOut: () => void }) {
  const t = TRANSLATIONS[lang];
  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", 
      isDark ? "bg-[#020617] text-white dark" : "bg-slate-50 text-slate-800",
      lang === 'bn' ? 'font-bengali' : 'font-sans')}>
      
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className={cn("absolute top-0 left-0 w-full h-full [background-size:20px_20px] opacity-20", isDark ? "bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" : "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]")} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full relative z-10"
        >
          <div className={cn("border rounded-[2rem] md:rounded-[32px] shadow-2xl p-6 md:p-12 text-center space-y-6 md:space-y-8 overflow-hidden relative", isDark ? "bg-slate-900 border-white/5 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200/50")}>
            <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
            
            <div className="w-16 h-16 md:w-24 md:h-24 bg-amber-500/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto shadow-lg shadow-amber-500/20">
              <Clock size={32} className="md:w-12 md:h-12" />
            </div>

            <div className="space-y-3 md:space-y-4">
              <h2 className={cn("text-2xl md:text-3xl font-black tracking-tight uppercase leading-none", isDark ? "text-white" : "text-slate-800")}>
                {t.pendingApprovalTitle}
              </h2>
              <p className={cn("text-xs md:text-sm font-medium leading-relaxed opacity-70", isDark ? "text-slate-400" : "text-slate-500")}>
                {t.pendingApprovalDesc}
              </p>
            </div>

            <div className={cn("p-4 md:p-6 rounded-2xl border flex items-center gap-4 text-left", isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100")}>
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className={cn("text-[9px] md:text-[10px] font-black uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>
                  {lang === 'bn' ? 'সম্ভাব্য সময়' : 'Estimated Time'}
                </p>
                <p className={cn("text-xs font-bold", isDark ? "text-white" : "text-slate-800")}>
                  {t.waitingTime}
                </p>
              </div>
            </div>

            <div className="pt-6 md:pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col gap-3 md:gap-4">
              <button 
                onClick={onSignOut}
                className={cn("w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all", isDark ? "bg-white/5 text-white hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}
              >
                {t.logout}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RegistrationForm({ onRegister, lang, isDark }: { onRegister: (data: Partial<AppUser>) => void, lang: Language, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  const [formData, setFormData] = useState<Partial<AppUser>>({
    nid: '',
    phone: '',
    vehicleNumber: '',
    engineNumber: '',
    chassisNumber: '',
    drivingLicenseNo: '',
    taxTokenNo: '',
    vehicleClass: 'BIKE PRIVATE',
    manufactureYear: '2024',
    village: '',
    postCode: '',
    upazila: '',
    district: '',
    passportPhoto: '',
    nidPhoto: '',
    drivingLicensePhoto: '',
    taxTokenPhoto: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AppUser) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert(lang === 'bn' ? 'ফাইল সাইজ ৫০০কেবি-র বেশি হতে পারবে না' : 'File size must be under 500KB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const PhotoUpload = ({ label, field, value }: { label: string, field: keyof AppUser, value?: string }) => (
    <div className="space-y-4">
      <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{label}</label>
      <div className={cn("relative group border-2 border-dashed rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 transition-all", 
        value ? (isDark ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-100") : (isDark ? "bg-white/5 border-white/10 hover:border-brand/40" : "bg-slate-50 border-slate-200 hover:border-brand/40"))}>
        {value ? (
          <div className="relative group">
            <img src={value} alt={label} className="w-full h-32 object-cover rounded-xl shadow-lg" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, field)} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        ) : (
          <>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", isDark ? "bg-white/5 text-slate-500" : "bg-white text-slate-300 shadow-sm")}>
              <Camera size={24} />
            </div>
            <div className="text-center">
              <p className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-slate-400" : "text-slate-500")}>
                {lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Photo'}
              </p>
            </div>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, field)} className="absolute inset-0 opacity-0 cursor-pointer" />
          </>
        )}
        {value && (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
            <CheckCircle2 size={12} /> {lang === 'bn' ? 'সংযুক্ত করা হয়েছে' : 'Attached'}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("flex items-center justify-center p-6 relative overflow-hidden", lang === 'bn' ? 'font-bengali' : 'font-sans')}>
      <div className={cn("absolute top-0 left-0 w-full h-full [background-size:20px_20px] opacity-20", isDark ? "bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]" : "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]")} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full relative z-10"
      >
        <div className={cn("border rounded-[32px] shadow-2xl p-6 md:p-12 overflow-hidden relative transition-colors", isDark ? "bg-slate-900 border-white/5 shadow-black/40" : "bg-white border-slate-200 shadow-slate-200/50")}>
          <div className="absolute top-0 left-0 w-full h-2 bg-brand"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div className="space-y-1">
              <h2 className={cn("text-3xl font-black tracking-tight leading-tight uppercase transition-colors text-brand")}>
                {t.vehicleRegistration}
              </h2>
              <p className={cn("text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2", isDark ? "text-slate-500" : "text-slate-400")}>
                <ShieldCheck size={14} className="text-brand" /> {lang === 'bn' ? 'যাচাইকরণ প্রয়োজন' : 'Verification Required'}
              </p>
              <p className={cn("text-xs font-medium leading-relaxed max-w-md", isDark ? "text-slate-400" : "text-slate-500")}>
                {t.vehicleRegistrationSub}
              </p>
            </div>
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors", isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100")}>
               <Fuel className="text-brand" size={32} />
            </div>
          </div>

          <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); onRegister(formData); }}>
            {/* Account Info Section */}
            <div className="space-y-6">
              <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3", isDark ? "text-brand" : "text-blue-900")}>
                <Lock size={14} /> {lang === 'bn' ? 'অ্যাকাউন্ট তথ্য' : 'Account Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.email}</label>
                  <div className="relative group grayscale">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      disabled
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all opacity-60", isDark ? "bg-white/5 text-slate-400 border-white/10" : "bg-slate-50 text-slate-400 border-slate-200")}
                      type="text" 
                      value={auth.currentUser?.email || ''}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.password}</label>
                  <div className="relative group grayscale">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                    <input 
                      disabled
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all opacity-60", isDark ? "bg-white/5 text-slate-400 border-white/10" : "bg-slate-50 text-slate-400 border-slate-200")}
                      type="password" 
                      value="••••••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-6">
              <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3", isDark ? "text-brand" : "text-blue-900")}>
                <UserIcon size={14} /> {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.fullName}</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="Official Name"
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.phoneNumber}</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="tel" 
                      placeholder="01XXXXXXXXX"
                      value={formData.phone || ''}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.nidNumber}</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="NID"
                      value={formData.nid || ''}
                      onChange={e => setFormData({...formData, nid: e.target.value || ''})}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.drivingLicenseNo}</label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="License Number"
                      value={formData.drivingLicenseNo || ''}
                      onChange={e => setFormData({...formData, drivingLicenseNo: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-6">
              <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3", isDark ? "text-brand" : "text-blue-900")}>
                <Truck size={14} /> {lang === 'bn' ? 'যানবাহনের তথ্য' : 'Vehicle Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.licensePlate}</label>
                  <div className="relative group">
                    <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="e.g. DHAKA METRO-LA-11-2233"
                      value={formData.vehicleNumber || ''}
                      onChange={e => setFormData({...formData, vehicleNumber: e.target.value || ''})}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.engineNumber}</label>
                  <div className="relative group">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="Engine Number"
                      value={formData.engineNumber || ''}
                      onChange={e => setFormData({...formData, engineNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.chassisNumber}</label>
                  <div className="relative group">
                    <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="Chassis Number"
                      value={formData.chassisNumber || ''}
                      onChange={e => setFormData({...formData, chassisNumber: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.vehicleClassShort}</label>
                  <div className="relative group">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <select 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all appearance-none", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      value={formData.vehicleClass}
                      onChange={e => setFormData({...formData, vehicleClass: e.target.value})}
                    >
                      <option value="BIKE PRIVATE">BIKE PRIVATE</option>
                      <option value="CAR PRIVATE">CAR PRIVATE</option>
                      <option value="COMMERCIAL">COMMERCIAL</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className={cn("text-[10px] font-black uppercase tracking-widest ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.taxTokenNo}</label>
                  <div className="relative group">
                    <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand transition-colors" size={16} />
                    <input 
                      required
                      className={cn("w-full border rounded-xl py-4 pl-12 pr-4 font-bold outline-none transition-all", isDark ? "bg-white/5 text-white border-white/10 focus:bg-white/10" : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:ring-4 focus:ring-brand/5")}
                      type="text" 
                      placeholder="Tax Token No."
                      value={formData.taxTokenNo || ''}
                      onChange={e => setFormData({...formData, taxTokenNo: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-6">
              <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3", isDark ? "text-brand" : "text-blue-900")}>
                <Camera size={14} /> {t.uploadRequiredDocs}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <PhotoUpload label={t.passportPhoto} field="passportPhoto" value={formData.passportPhoto} />
                <PhotoUpload label={t.nidPhoto} field="nidPhoto" value={formData.nidPhoto} />
                <PhotoUpload label={t.drivingLicensePhoto} field="drivingLicensePhoto" value={formData.drivingLicensePhoto} />
                <PhotoUpload label={t.taxTokenPhoto} field="taxTokenPhoto" value={formData.taxTokenPhoto} />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-brand text-white font-black uppercase tracking-[0.4em] text-xs rounded-xl shadow-xl shadow-brand/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
            >
              {t.submitForApproval}
            </button>

            <div className="text-center pt-4">
              <button 
                type="button" 
                onClick={() => signOut(auth)}
                className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] hover:text-slate-800 transition-colors"
              >
                Cancel Registration
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardManager({ pumps, prices, lang, isDark }: { pumps: Pump[], prices: FuelPrice | null, lang: Language, isDark: boolean }) {
  const t = TRANSLATIONS[lang];
  const [selectedPump, setSelectedPump] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [scannedUser, setScannedUser] = useState<AppUser | null>(null);
  const [fuelForm, setFuelForm] = useState({
    amount: '',
    type: 'octane' as 'octane' | 'petrol' | 'diesel'
  });
  const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        "reader", 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      
      scanner.render((decodedText) => {
        handleScan(decodedText);
        scanner.clear();
        setScanning(false);
      }, (err) => {
        // ignore errors
      });

      return () => {
        scanner.clear();
      };
    }
  }, [scanning]);

  const handleScan = async (userId: string) => {
    setStatus(null);
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        setStatus({ type: 'error', message: lang === 'bn' ? 'সিস্টেমে ব্যবহারকারী পাওয়া যায়নি।' : 'User not found in system.' });
        return;
      }
      const userData = userDoc.data() as AppUser;
      
      if (!userData.isApproved) {
        setStatus({ type: 'error', message: lang === 'bn' ? 'ব্যবহারকারী এডমিন দ্বারা অনুমোদিত নয়।' : 'User is not approved by Admin.' });
        return;
      }

      const nextDate = userData.nextFuelDate ? parseISO(userData.nextFuelDate) : null;
      if (nextDate && isAfter(nextDate, new Date())) {
        const diff = differenceInDays(nextDate, new Date());
        setStatus({ type: 'error', message: lang === 'bn' ? `প্রবেশাধিকার নেই। কুলডাউন: ${diff} দিন বাকি।` : `Access Denied. Cooldown: ${diff} days remaining.` });
        setScannedUser(userData); // Load but show error
        return;
      }

      setScannedUser(userData);
      setStatus(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDispense = async () => {
    if (!scannedUser || !selectedPump || !prices) return;
    const amount = parseFloat(fuelForm.amount);
    if (isNaN(amount) || amount <= 0) return;
    const price = fuelForm.type === 'octane' ? prices.octane : fuelForm.type === 'petrol' ? prices.petrol : prices.diesel;
    // value error fix: cast to string or handle NaN
    const liters = amount / (price || 1); 
    
    // Cooldown Logic: 100 BDT = 1 Day
    const daysToAdd = amount / 100;
    const nextFuelDate = addDays(new Date(), daysToAdd);

    try {
      // 1. Log Transaction
      const pump = pumps.find(p => p.pumpId === selectedPump);
      await addDoc(collection(db, 'transactions'), {
        userId: scannedUser.userId,
        userName: scannedUser.name,
        vehicleNumber: scannedUser.vehicleNumber,
        managerId: auth.currentUser?.uid,
        pumpId: selectedPump,
        pumpName: pump ? pump.name : 'Unknown Station',
        amountBdt: amount,
        liters: liters,
        fuelType: fuelForm.type,
        timestamp: serverTimestamp()
      });

      // 2. Update User Cooldown
      await updateDoc(doc(db, 'users', scannedUser.userId), {
        nextFuelDate: nextFuelDate.toISOString()
      });

      setStatus({ type: 'success', message: lang === 'bn' ? 'লেনদেন সফল! তেল প্রদান করা হয়েছে।' : 'Transaction Successful! Fuel dispensed.' });
      setScannedUser(null);
      setFuelForm({ amount: '', type: 'octane' });
    } catch (e) {
      console.error(e);
      setStatus({ type: 'error', message: lang === 'bn' ? 'লেনদেন সংরক্ষণ করতে ব্যর্থ হয়েছে।' : 'Failed to record transaction.' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        {/* Control Section */}
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          <Card className="border-2 border-technical-ink !p-0 overflow-hidden">
            <div className="bg-technical-ink p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-white/50" />
                <span className="font-serif italic font-bold text-white text-sm tracking-tight">{t.stationTerminalControl}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-white/40 uppercase">Terminal_Sync_Active</span>
              </div>
            </div>

            <div className={cn("p-6 md:p-8 space-y-6 md:space-y-8 transition-colors", isDark ? "bg-slate-900" : "bg-white")}>
              <div className="space-y-3">
                <label className={cn("text-[10px] font-mono font-bold uppercase tracking-widest block ml-1", isDark ? "text-slate-500" : "text-slate-400")}>{t.terminalLocation}</label>
                <div className="relative">
                  <select 
                    className={cn("w-full p-4 border-b-2 rounded-none text-base font-bold outline-none transition-all appearance-none cursor-pointer", 
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-brand" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-900")}
                    value={selectedPump || ''}
                    onChange={e => setSelectedPump(e.target.value)}
                  >
                    <option value="">{t.unassigned}</option>
                    {pumps.map(p => (
                      <option key={p.pumpId} value={p.pumpId}>{p.name} // {p.location}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"><ChevronDown /></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  disabled={!selectedPump}
                  onClick={() => setScanning(true)}
                  className={cn(
                    "w-full py-12 border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all group relative overflow-hidden",
                    selectedPump ? "border-technical-ink bg-white text-technical-ink hover:bg-technical-bg" : "border-slate-100 bg-white text-slate-300 opacity-50"
                  )}
                >
                  <Camera size={40} className="group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <span className="font-black uppercase tracking-[0.2em] text-xs block">{t.activateQrScanner}</span>
                    <span className="text-[9px] font-mono opacity-40 uppercase mt-1">Optical_Input_Stream</span>
                  </div>
                </button>

                <div className="p-6 border-2 border-technical-line bg-technical-bg/50 flex flex-col justify-center space-y-2">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-tight">{t.terminalStatus}</p>
                  <p className={cn("text-3xl font-serif italic font-black uppercase tracking-widest", selectedPump ? "text-technical-ink" : "text-slate-300")}>
                    {selectedPump ? t.active : t.offline}
                  </p>
                  {selectedPump && (
                    <p className="text-[9px] font-mono text-emerald-600 font-bold uppercase tracking-tighter">Auth_Token: SEC-{selectedPump.slice(0,4).toUpperCase()}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Console Section */}
        <div className="md:col-span-12 lg:col-span-5 h-full">
          <div className="bg-technical-ink text-white min-h-[400px] lg:h-full flex flex-col relative border-2 border-technical-ink shadow-2xl overflow-hidden">
            {/* Console Header */}
            <div className="bg-white/5 p-4 border-b border-white/10 flex items-center gap-3">
              <LayoutDashboard size={16} className="text-white/40" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold">Protocol_Monitor_Output</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 relative">
              {/* Background HUD elements */}
              <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-10 text-[80px] font-black">ST-04</div>
                <div className="absolute bottom-10 right-10 text-[80px] font-black rotate-180">LOG</div>
              </div>

              {scanning ? (
                <div className="w-full max-w-[340px] bg-technical-ink p-4 rounded-[2rem] border border-white/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] relative z-10 group/scanner">
                  {/* Scanner HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-20 rounded-[2rem] overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-brand/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan"></div>
                     <div className="absolute inset-0 border-[20px] border-technical-ink/40"></div>
                     {/* Corner Brackets */}
                     <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-brand"></div>
                     <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-brand"></div>
                     <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-brand"></div>
                     <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-brand"></div>
                  </div>
                  
                  <div className="bg-white rounded-2xl overflow-hidden shadow-inner p-1">
                    <div id="reader" className="w-full aspect-square"></div>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2">
                       <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black">Scanning_Protocol_Active</span>
                       <div className="flex gap-1">
                          {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand animate-pulse" />)}
                       </div>
                    </div>
                    <button 
                      onClick={() => setScanning(false)} 
                      className="w-full py-4 bg-rose-600/10 border border-rose-600/30 text-rose-500 font-black text-[11px] uppercase tracking-[0.3em] rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-lg"
                    >
                      Terminate_Session
                    </button>
                  </div>
                </div>
              ) : status?.type === 'error' ? (
                <div className="space-y-8 relative z-10">
                  <div className="w-24 h-24 rounded-full border-4 border-rose-500/20 flex items-center justify-center mx-auto bg-rose-500/10">
                     <div className="w-12 h-1 bg-rose-500 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] text-rose-400 font-mono uppercase tracking-widest">{t.scanStatus}</p>
                     <p className="text-4xl font-serif italic font-black text-rose-500 uppercase tracking-widest">{t.locked}</p>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <p className="text-xs text-slate-400 italic font-mono leading-relaxed bg-white/5 p-3 border border-white/10">{status.message}</p>
                  </div>
                  <button onClick={() => setStatus(null)} className="px-8 py-3 bg-white text-technical-ink font-mono text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition shadow-xl shadow-rose-900/40">{t.resetTerminal}</button>
                </div>
              ) : status?.type === 'success' ? (
                <div className="space-y-8 relative z-10">
                  <CheckCircle2 className="text-emerald-500 mx-auto" size={64} />
                  <div className="space-y-2">
                    <p className="text-3xl font-serif italic font-bold text-white uppercase tracking-widest">{t.refillRecorded}</p>
                    <p className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-[0.2em]">{status.message}</p>
                  </div>
                  <button onClick={() => { setStatus(null); setScannedUser(null); }} className="px-10 py-4 bg-emerald-600 text-white font-mono text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition shadow-2xl shadow-emerald-900/50">{t.nextVehicle}</button>
                </div>
              ) : scannedUser ? (
                <div className="w-full space-y-8 relative z-10">
                  <div className="text-left flex items-start gap-6 border-l-4 border-emerald-500 pl-6">
                      <div className="w-20 h-20 rounded-xl bg-white/10 overflow-hidden shrink-0 border border-white/20">
                         {scannedUser.licensePhoto ? (
                           <img src={scannedUser.licensePhoto} alt="Scanned User" className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-white/20"><UserIcon size={32} /></div>
                         )}
                      </div>
                      <div className="space-y-1 py-1">
                        <p className="text-[10px] text-white/30 font-mono uppercase tracking-[0.4em] font-bold">{t.identityVerified}</p>
                        <p className="text-3xl md:text-4xl font-serif italic font-black uppercase tracking-tighter leading-none text-white">{scannedUser.name}</p>
                        <p className="text-base font-mono text-emerald-400 tracking-widest">{scannedUser.vehicleNumber}</p>
                      </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-px bg-white/10 p-px border border-white/10">
                      <button 
                        onClick={() => setFuelForm({...fuelForm, type: 'octane'})}
                        className={cn("py-4 text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all", fuelForm.type === 'octane' ? 'bg-white text-technical-ink' : 'bg-transparent text-white/40 hover:bg-white/5')}
                      >Octane</button>
                      <button 
                        onClick={() => setFuelForm({...fuelForm, type: 'petrol'})}
                        className={cn("py-4 text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all", fuelForm.type === 'petrol' ? 'bg-white text-technical-ink' : 'bg-transparent text-white/40 hover:bg-white/5')}
                      >Petrol</button>
                      <button 
                        onClick={() => setFuelForm({...fuelForm, type: 'diesel'})}
                        className={cn("py-4 text-[11px] font-mono font-black uppercase tracking-[0.2em] transition-all", fuelForm.type === 'diesel' ? 'bg-white text-technical-ink' : 'bg-transparent text-white/40 hover:bg-white/5')}
                      >Diesel</button>
                    </div>
                    
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.3em] block text-left ml-1">{t.inputAmountBdt}</span>
                      <div className="relative">
                        <input 
                          type="number"
                          className="w-full p-6 bg-white/5 border border-white/20 text-6xl font-black text-center outline-none focus:border-white focus:bg-white/10 transition-all font-serif italic"
                            value={fuelForm.amount || ''}
                          onChange={e => setFuelForm({...fuelForm, amount: e.target.value})}
                          placeholder="0.00"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-xl font-serif italic font-bold">BDT</div>
                      </div>
                    </div>

                    <button 
                      disabled={!fuelForm.amount}
                      onClick={handleDispense}
                      className="w-full py-6 bg-white text-technical-ink text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition shadow-2xl shadow-black disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                    >
                      <Zap size={18} />
                      {t.transmitLogRefill}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 relative z-10">
                   <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center mx-auto bg-white/5">
                      <div className="w-12 h-1 bg-white/20 animate-pulse"></div>
                   </div>
                   <div className="space-y-2">
                     <p className="text-[10px] text-white/30 font-mono uppercase tracking-[0.4em]">{t.radarStandby}</p>
                     <p className="text-xl font-serif italic font-bold text-white/60 tracking-tight">{t.waitingForScan}</p>
                   </div>
                   <div className="flex items-center gap-3 justify-center">
                     <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping"></span>
                     <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Listening_on_port_443</span>
                   </div>
                </div>
              )}
            </div>

            {/* Console Footer Decor */}
            <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/20">
               <span>ID: SYS_PUMP_{selectedPump || 'NULL'}</span>
               <span>VER: 24.4.2</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function UserDetailModal({ user, lang, onClose, onUpdate }: { user: AppUser, lang: Language, onClose: () => void, onUpdate?: (uid: string, data: Partial<AppUser>) => Promise<void> }) {
  const t = TRANSLATIONS[lang];
  const fileRef = useRef<HTMLInputElement>(null);
  
  const handlePhotoUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUpdate) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      await onUpdate(user.userId, { licensePhoto: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
           <div className="space-y-1">
             <h3 className="text-2xl font-serif italic font-bold tracking-tight">{user.name}</h3>
             <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">{t.registryId}: {user.userId.slice(0, 8)}</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
           </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-8">
              <div className="relative group/edit">
                <div className="w-full aspect-square md:aspect-auto md:h-64 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner">
                   {user.licensePhoto ? (
                     <img src={user.licensePhoto} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-200"><UserIcon size={64} /></div>
                   )}
                </div>
                {onUpdate && (
                  <button 
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/edit:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                  >
                     <Camera size={32} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Update Photo</span>
                  </button>
                )}
                <input type="file" className="hidden" ref={fileRef} onChange={handlePhotoUpdate} accept="image/*" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.userType}</span>
                <div className="inline-flex">
                   <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest border border-brand/20 rounded-full">{user.role}</span>
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">{t.contactInfo}</h4>
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[9px] font-mono text-slate-400 uppercase font-black">{t.nidNumber}</p>
                      <p className="text-sm font-bold text-slate-800">{user.nid || 'N/A'}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">Phone</p>
                       <p className="text-sm font-bold text-slate-800">{user.phone || 'N/A'}</p>
                     </div>
                     <div className="col-span-2">
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">Email</p>
                       <p className="text-sm font-bold text-slate-800">{user.email}</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">{t.licenseInfo}</h4>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">{t.vehiclePlate}</p>
                       <p className="text-sm font-bold text-brand font-mono uppercase">{user.vehicleNumber}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">{t.vehicleClassShort}</p>
                       <p className="text-sm font-bold text-slate-800 uppercase">{user.vehicleClass || 'N/A'}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">{t.manufactureYearShort}</p>
                       <p className="text-sm font-bold text-slate-800">{user.manufactureYear || 'N/A'}</p>
                     </div>
                     <div>
                       <p className="text-[9px] font-mono text-slate-400 uppercase font-black">Status</p>
                       <span className={cn("text-[10px] font-black uppercase tracking-tighter", user.isApproved ? "text-emerald-500" : "text-rose-500")}>
                         {user.isApproved ? t.approvedStatus : t.pendingStatus}
                       </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  );
}

function DashboardAdmin({ pumps, prices, lang, showToast, isDark, activeView = 'pending' }: { pumps: Pump[], prices: FuelPrice | null, lang: Language, showToast: (m: string, t?: 'success' | 'error') => void, isDark: boolean, activeView?: 'pending' | 'users' | 'prices' | 'stats' | 'mgmt' }) {
  const t = TRANSLATIONS[lang];
  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
  const [logs, setLogs] = useState<Transaction[]>([]);
  const [editPrices, setEditPrices] = useState({ octane: 0, petrol: 0, diesel: 0 });
  const [newPump, setNewPump] = useState({ 
    name: '', 
    location: '', 
    address: '',
    syncEst: '24h',
    deliveryDate: format(new Date(), 'yyyy-MM-dd'), 
    mapUrl: 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A' 
  });
  const [provisionEmail, setProvisionEmail] = useState('');
  const [provisionRole, setProvisionRole] = useState<AppUser['role']>('user');

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), sn => {
      setUsers(sn.docs.map(d => ({ userId: d.id, ...d.data() } as AppUser)));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'users'));
    
    const unsubLogs = onSnapshot(
      query(collection(db, 'transactions'), orderBy('timestamp', 'desc'), limit(50)), 
      sn => {
        setLogs(sn.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Transaction)));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'transactions')
    );

    if (prices) setEditPrices({ octane: prices.octane, petrol: prices.petrol, diesel: prices.diesel });

    return () => { unsubUsers(); unsubLogs(); };
  }, [prices]);

  const toggleApproval = async (userId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'users', userId), { isApproved: !currentStatus });
      showToast(lang === 'bn' ? 'অনুমোদন সফল হয়েছে' : 'Approval successful');
    } catch (e) {
      showToast(lang === 'bn' ? 'ত্রুটি হয়েছে' : 'Error occurred', 'error');
    }
  };

  const isSuperAdmin = auth.currentUser?.email?.toLowerCase() === 'mdrifathossainpersonal@gmail.com' || auth.currentUser?.email?.toLowerCase() === 'unobochaganj@gov.bd';

  const updateUserRole = async (userId: string, newRole: AppUser['role']) => {
    if (!isSuperAdmin) {
      showToast(t.superAdminAccess, 'error');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const deleteUserAccount = async (userId: string) => {
    if (!isSuperAdmin) {
      showToast(t.superAdminAccess, 'error');
      return;
    }
    if (!confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই একাউন্টটি মুছতে চান?' : 'Are you sure you want to delete this account?')) return;
    try {
      await deleteDoc(doc(db, 'users', userId));
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const updatePrices = async () => {
    if (isNaN(editPrices.octane) || isNaN(editPrices.petrol) || isNaN(editPrices.diesel)) {
      showToast(lang === 'bn' ? 'অনুগ্রহ করে সঠিক মূল্য লিখুন' : 'Please enter valid prices', 'error');
      return;
    }
    try {
      await setDoc(doc(db, 'settings', 'fuelPrices'), {
        ...editPrices,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const createPump = async () => {
    if (!newPump.name || !newPump.location) return;
    try {
      const pumpId = `p-${Date.now()}`;
      await setDoc(doc(db, 'pumps', pumpId), {
        pumpId,
        name: newPump.name,
        location: newPump.location,
        address: newPump.address || '',
        syncEst: newPump.syncEst || '24h',
        deliveryDate: newPump.deliveryDate || '',
        mapUrl: newPump.mapUrl || 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A'
      });
      setNewPump({ 
        name: '', 
        location: '', 
        address: '',
        syncEst: '24h',
        deliveryDate: format(new Date(), 'yyyy-MM-dd'), 
        mapUrl: 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A' 
      });
      showToast(t.toastSuccess);
    } catch (e) {
      console.error("Create Pump Error:", e);
      showToast(t.toastError, 'error');
    }
  };

  const provisionUser = async () => {
    if (!provisionEmail) return;
    try {
      const dummyId = `pv-${Date.now()}`;
      await setDoc(doc(db, 'users', dummyId), {
        email: provisionEmail.toLowerCase(),
        name: 'Authorized Personnel',
        role: provisionRole,
        isApproved: true,
        nid: 'PRE-AUTHORIZED',
        vehicleNumber: 'PRE-AUTHORIZED',
        createdAt: new Date().toISOString()
      });
      setProvisionEmail('');
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const pendingUsers = users.filter(u => !u.isApproved && u.nid !== 'PRE-AUTHORIZED');

  const seedPumps = async () => {
    const initialPumps = [
      { id: 'p1', name: 'MOPA Central Station', location: 'Dhaka North', address: 'Secretariat Road, Dhaka 1000', sync: '15m' },
      { id: 'p2', name: 'Gov infra Delta-9', location: 'Dhaka South', address: 'Motijheel Commercial Area', sync: '30m' },
      { id: 'p3', name: 'Port Authority Hub', location: 'CTG Main', address: 'Chittagong Port Zone', sync: '1h' },
      { id: 'p4', name: 'Sylhet Border Gateway', location: 'Sylhet Metro', address: 'Zindabazar, Sylhet', sync: '4h' },
    ];
    try {
      for (const p of initialPumps) {
        await setDoc(doc(db, 'pumps', p.id), { 
          pumpId: p.id,
          name: p.name, 
          location: p.location, 
          address: p.address,
          syncEst: p.sync,
          deliveryDate: new Date().toISOString(),
          mapUrl: 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A'
        });
      }
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction | 'userName' | 'pumpName'; direction: 'asc' | 'desc' }>({ key: 'timestamp', direction: 'desc' });
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStation, setFilterStation] = useState('');
  const [filterFuel, setFilterFuel] = useState('');

  const [editingPumpId, setEditingPumpId] = useState<string | null>(null);
  const [editPumpData, setEditPumpData] = useState<Partial<Pump>>({});

  const deletePump = async (pumpId: string) => {
    if (!confirm(lang === 'bn' ? 'আপনি কি নিশ্চিত যে এই স্টেশনটি মুছতে চান?' : 'Are you sure you want to delete this station?')) return;
    try {
      await deleteDoc(doc(db, 'pumps', pumpId));
      showToast(t.toastSuccess);
    } catch (e) {
      showToast(t.toastError, 'error');
    }
  };

  const updatePump = async () => {
    if (!editingPumpId || !editPumpData.name || !editPumpData.location) return;
    try {
      await updateDoc(doc(db, 'pumps', editingPumpId), {
        pumpId: editingPumpId,
        name: editPumpData.name,
        location: editPumpData.location,
        address: editPumpData.address || '',
        syncEst: editPumpData.syncEst || '',
        deliveryDate: editPumpData.deliveryDate || '',
        mapUrl: editPumpData.mapUrl || 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A'
      });
      setEditingPumpId(null);
      showToast(t.toastSuccess);
    } catch (e) {
      console.error("Update Pump Error:", e);
      showToast(t.toastError, 'error');
    }
  };

  const sortedLogs = [...logs].filter(log => {
    const matchesSearch = 
      log.userName?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.vehicleNumber?.toLowerCase().includes(filterQuery.toLowerCase()) ||
      log.pumpName?.toLowerCase().includes(filterQuery.toLowerCase());
    
    const matchesStation = !filterStation || log.pumpId === filterStation;
    const matchesFuel = !filterFuel || log.fuelType === filterFuel;

    return matchesSearch && matchesStation && matchesFuel;
  }).sort((a, b) => {
    const aVal = (a as any)[sortConfig.key];
    const bVal = (b as any)[sortConfig.key];
    
    if (sortConfig.key === 'timestamp') {
      const aDate = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
      const bDate = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
      return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
    }

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: typeof sortConfig.key) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-8"
        >
          {activeView === 'pending' && (
            <div className="glass-card !p-0 overflow-hidden">
               <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">{t.approvalQueue}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-brand-accent/10 rounded-full border border-brand-accent/20">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                      <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{pendingUsers.length} Pending Actions</span>
                    </div>
                  </div>
              </div>
              {pendingUsers.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-6 shadow-inner text-slate-200">
                    <CheckCircle2 size={40} strokeWidth={1} />
                  </div>
                  <h4 className="text-slate-800 font-black uppercase text-sm tracking-tight mb-1">Queue Clear</h4>
                  <p className="text-slate-400 font-bold text-xs">{lang === 'bn' ? 'কোন অপেক্ষমান অনুমোদন নেই' : 'All identity protocols have been processed'}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pendingUsers.map(user => (
                    <div key={user.userId} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-white overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm p-1">
                           <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-100 flex items-center justify-center">
                             {user.licensePhoto ? (
                               <img src={user.licensePhoto} alt="Profile" className="w-full h-full object-cover" />
                             ) : (
                               <UserIcon size={24} className="text-slate-300" />
                             )}
                           </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <p className="text-2xl font-black text-slate-800 uppercase tracking-tight">{user.name}</p>
                            <span className="tech-badge">{user.role}</span>
                          </div>
                          <div className="flex flex-wrap gap-x-8 gap-y-2">
                             <div className="flex flex-col">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Auth Channel</span>
                               <span className="text-xs font-bold text-slate-600">{user.email}</span>
                             </div>
                             <div className="flex flex-col">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">License ID</span>
                               <span className="text-xs font-black text-brand-accent uppercase tracking-tighter">{user.vehicleNumber}</span>
                             </div>
                             <div className="flex flex-col">
                               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Identity Doc</span>
                               <span className="text-xs font-bold text-slate-600">{user.nid || 'N/A'}</span>
                             </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button 
                           onClick={() => setSelectedUser(user)}
                           className="flex-1 md:flex-none w-14 h-14 rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all flex items-center justify-center"
                        >
                           <Eye size={20} />
                        </button>
                        <button 
                          onClick={() => toggleApproval(user.userId, false)}
                          className="flex-1 md:flex-none px-8 h-14 bg-slate-800 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg hover:shadow-slate-200 flex items-center justify-center gap-3"
                        >
                          <ShieldCheck size={18} className="text-brand-accent" />
                          {t.approve}
                        </button>
                        <button 
                          onClick={() => deleteUserAccount(user.userId)}
                          className="w-14 h-14 rounded-2xl border border-rose-100 text-rose-400 hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'users' && (
            <div className="glass-card !p-0 overflow-hidden">
               <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">{t.userRegistry}</h3>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-slate-200 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600">Total: {users.length} Database Entities</div>
                  </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-6 text-left">{t.fullIdentity}</th>
                      <th className="px-8 py-6 text-left">{t.nidNumber} / {lang === 'en' ? 'Email' : 'ইমেইল'}</th>
                      <th className="px-8 py-6 text-center">{t.vehiclePlate}</th>
                      <th className="px-8 py-6 text-center">{t.vehicleClassShort}</th>
                      <th className="px-8 py-6 text-left">{t.role}</th>
                      <th className="px-8 py-6 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(user => (
                      <tr key={user.userId} className="hover:bg-slate-50/50 transition-all group duration-300">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm p-1 group-hover:shadow-xl group-hover:border-brand/20 transition-all group-hover:-rotate-3">
                               <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                                 {user.licensePhoto ? (
                                   <img src={user.licensePhoto} alt="Profile" className="w-full h-full object-cover" />
                                 ) : (
                                   <UserIcon size={20} className="text-slate-300" />
                                 )}
                               </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-black text-slate-900 uppercase tracking-tight text-[15px] leading-tight mb-1 group-hover:text-brand transition-colors">{user.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.phone || '01XXXXXXX'}</span>
                                {user.isApproved && <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-left">
                           <div className="flex flex-col gap-1">
                             <span className="text-[11px] font-mono font-black text-slate-800 tracking-tighter">{user.nid || 'NID_UNAVAILABLE'}</span>
                             <span className="text-[9px] font-mono text-slate-400 truncate max-w-[150px] font-bold">{user.email}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="inline-block px-4 py-2 bg-slate-100 rounded-xl border border-slate-200 group-hover:border-brand/40 group-hover:bg-white transition-all">
                             <span className="text-[12px] font-mono font-black text-slate-700 tracking-tighter uppercase">{user.vehicleNumber}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center font-black">
                           <span className="tech-badge">{user.vehicleClass || 'BIKE'}</span>
                        </td>
                        <td className="px-8 py-6 text-left">
                           <div className="flex flex-col">
                              <select 
                                value={user.role} 
                                disabled={!isSuperAdmin}
                                onChange={(e) => updateUserRole(user.userId, e.target.value as any)}
                                className="bg-transparent font-black uppercase text-[10px] tracking-widest outline-none focus:text-brand border-none cursor-pointer disabled:opacity-30 p-0 mb-1"
                              >
                                <option value="user">USER</option>
                                <option value="manager">MANAGER</option>
                                <option value="admin">ADMIN</option>
                              </select>
                              <span className={cn("text-[9px] font-black uppercase tracking-tighter", user.isApproved ? "text-emerald-500" : "text-rose-400")}>
                                {user.isApproved ? 'Verified' : 'Verification Pending'}
                              </span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                             <button onClick={() => setSelectedUser(user)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:border-brand shadow-sm transition-all" title={t.registryDetails}><Eye size={18} /></button>
                             <button 
                               onClick={() => deleteUserAccount(user.userId)}
                               className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-xl text-slate-200 hover:text-rose-500 hover:border-rose-100 shadow-sm transition-all"
                             >
                               <Trash2 size={18} />
                             </button>
                             {!user.isApproved && (
                               <button 
                                 onClick={() => toggleApproval(user.userId, false)}
                                 className="w-10 h-10 flex items-center justify-center bg-brand text-white rounded-xl shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
                               >
                                 <Check size={18} />
                               </button>
                             )}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'prices' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="glass-card shadow-xl p-8 space-y-8">
                  <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">{t.fuelPriceUpdate}</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.octaneBdt}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="w-full p-6 bg-slate-50 border-b-2 border-slate-200 text-3xl font-black outline-none focus:border-brand transition-all rounded-2xl"
                            value={editPrices.octane || 0}
                            onChange={e => setEditPrices({...editPrices, octane: parseFloat(e.target.value) || 0})}
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 pointer-events-none">BDT</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.petrolBdt}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="w-full p-6 bg-slate-50 border-b-2 border-slate-200 text-3xl font-black outline-none focus:border-brand transition-all rounded-2xl"
                            value={editPrices.petrol || 0}
                            onChange={e => setEditPrices({...editPrices, petrol: parseFloat(e.target.value) || 0})}
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 pointer-events-none">BDT</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.dieselBdt}</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            className="w-full p-6 bg-slate-50 border-b-2 border-slate-200 text-3xl font-black outline-none focus:border-brand transition-all rounded-2xl"
                            value={editPrices.diesel || 0}
                            onChange={e => setEditPrices({...editPrices, diesel: parseFloat(e.target.value) || 0})}
                          />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 pointer-events-none">BDT</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={updatePrices}
                      className="btn-primary w-full h-16 text-xs uppercase tracking-[0.2em]"
                    >
                      {t.deployPricing}
                    </button>
                  </div>
               </div>
               
               <div className="glass-card shadow-xl p-8 space-y-8">
                  <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">{t.manualProvisioning}</h3>
                  <div className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Channel (Email)</label>
                        <input 
                          type="email" 
                          placeholder="personnel@gov.infra"
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:border-brand focus:bg-white transition-all shadow-inner"
                          value={provisionEmail || ''}
                          onChange={e => setProvisionEmail(e.target.value || '')}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.role}</label>
                        <div className="grid grid-cols-3 gap-3">
                           {['user', 'manager', 'admin'].map(role => (
                             <button 
                                key={role}
                                onClick={() => setProvisionRole(role as any)}
                                className={cn(
                                  "py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border-2", 
                                  provisionRole === role 
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-lg' 
                                    : 'bg-white text-slate-400 border-slate-100 hover:bg-slate-50'
                                )}
                             >{role}</button>
                           ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={provisionUser}
                      className="btn-secondary w-full h-16 text-xs uppercase tracking-[0.2em] border-slate-800 text-slate-800"
                    >
                      {t.grantAccess}
                    </button>
                  </div>
               </div>
            </div>
          )}

          {activeView === 'mgmt' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                   <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.registry}</h3>
                   <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{t.stationTerminals}</h2>
                </div>
                {pumps.length === 0 && <button onClick={seedPumps} className="btn-secondary px-6 h-12 text-[10px] uppercase">Bootstrap Infrastructure</button>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pumps.map(pump => (
                  <div key={pump.pumpId} className="glass-card !p-0 overflow-hidden group hover:border-brand/40 transition-all duration-500">
                    <div className="p-8 space-y-6 relative">
                      {editingPumpId === pump.pumpId ? (
                        <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Update Station Identifier (Name)</label>
                              <input 
                                className="w-full bg-slate-50 border-b-2 border-slate-200 outline-none p-3 font-black uppercase tracking-tight focus:bg-white focus:border-brand rounded-xl" 
                                value={editPumpData.name || ''} 
                                onChange={e => setEditPumpData({...editPumpData, name: e.target.value})} 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Address</label>
                              <input 
                                className="w-full bg-slate-50 border-b-2 border-slate-200 outline-none p-3 font-bold text-xs uppercase tracking-widest focus:bg-white focus:border-brand rounded-xl" 
                                value={editPumpData.address || ''} 
                                onChange={e => setEditPumpData({...editPumpData, address: e.target.value})} 
                              />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Geographic Location (Map link)</label>
                                <input 
                                  className="w-full bg-slate-50 border-b-2 border-slate-200 outline-none p-3 font-mono text-[9px] focus:bg-white focus:border-brand rounded-xl" 
                                  value={editPumpData.mapUrl || ''} 
                                  onChange={e => setEditPumpData({...editPumpData, mapUrl: e.target.value})} 
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Est. Synchronization</label>
                                <input 
                                  className="w-full bg-slate-50 border-b-2 border-slate-200 outline-none p-3 font-black text-[9px] uppercase focus:bg-white focus:border-brand rounded-xl" 
                                  value={editPumpData.syncEst || ''} 
                                  onChange={e => setEditPumpData({...editPumpData, syncEst: e.target.value})} 
                                />
                             </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Delivery / Manifest Date</label>
                              <input 
                                type="date"
                                className="w-full bg-slate-50 border-b-2 border-slate-200 outline-none p-3 font-mono text-xs focus:bg-white focus:border-brand rounded-xl" 
                                value={editPumpData.deliveryDate || ''} 
                                onChange={e => setEditPumpData({...editPumpData, deliveryDate: e.target.value})} 
                              />
                           </div>
                           <div className="flex gap-3 pt-4">
                             <button onClick={updatePump} className="flex-1 btn-primary h-12 text-[10px] uppercase">Commit Changes</button>
                             <button onClick={() => setEditingPumpId(null)} className="px-4 h-12 border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center"><X size={18} /></button>
                           </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start">
                            <div className="p-3 bg-brand/10 text-brand rounded-2xl border border-brand/20">
                               <Fuel size={24} />
                            </div>
                            <div className="flex items-center gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                               <button 
                                onClick={() => {
                                  setEditingPumpId(pump.pumpId);
                                  setEditPumpData({ 
                                     name: pump.name, 
                                     location: pump.location, 
                                     address: pump.address || '',
                                     syncEst: pump.syncEst || '',
                                     deliveryDate: pump.deliveryDate || '',
                                     mapUrl: pump.mapUrl || 'https://maps.app.goo.gl/nfxcHLR2Xa5a4n58A'
                                  });
                                }}
                                className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-brand hover:border-brand rounded-xl transition-all shadow-sm"
                               >
                                 <Settings size={16} />
                               </button>
                               <button 
                                  onClick={() => deletePump(pump.pumpId)}
                                  className="p-2.5 bg-white border border-slate-100 text-slate-200 hover:text-rose-500 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                               >
                                 <Trash2 size={16} />
                               </button>
                            </div>
                          </div>
                          <div className="space-y-2 mt-6">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Station_ID: {pump.pumpId}</p>
                            <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2 truncate">{pump.name}</h4>
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-slate-400">
                                  <MapPin size={14} className="shrink-0 text-brand" />
                                  <span className="text-[10px] font-black uppercase tracking-widest truncate">{pump.location}</span>
                                </div>
                                {pump.address && (
                                  <p className="text-xs font-bold text-slate-600 line-clamp-1 pl-5">{pump.address}</p>
                                )}
                              </div>

                              <div className="flex items-center gap-4">
                                {pump.mapUrl && (
                                  <a 
                                    href={pump.mapUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-black text-brand flex items-center gap-1 hover:underline bg-brand/5 px-2 py-1 rounded-md"
                                  >
                                    <ExternalLink size={10} /> GEO_LOC
                                  </a>
                                )}
                                {pump.syncEst && (
                                  <div className="text-[10px] font-black text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                                    <Clock size={10} /> SYNC: {pump.syncEst}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="pt-6 border-t border-slate-100">
                             <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div className="flex flex-col">
                                   <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sync Due</span>
                                   <span className="text-[10px] font-mono font-black text-slate-600 tracking-tighter">{pump.deliveryDate ? format(parseISO(pump.deliveryDate), 'dd MMM yyyy') : 'N/A'}</span>
                                </div>
                                <div className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase tracking-widest">Online</div>
                             </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {!editingPumpId && (
                  <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center space-y-8 hover:border-brand/40 hover:bg-slate-50 transition-all group cursor-pointer h-full min-h-[350px]">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform duration-500 border border-slate-200 group-hover:bg-brand group-hover:text-white group-hover:rotate-90">
                      <Plus size={32} />
                    </div>
                    
                    <div className="space-y-4 w-full">
                       <input 
                         placeholder="Station Name" 
                         className="w-full bg-transparent border-b-2 border-slate-100 outline-none p-2 text-center text-sm font-black uppercase tracking-widest focus:border-brand transition-all" 
                         value={newPump.name || ''} 
                         onChange={e => setNewPump({...newPump, name: e.target.value || ''})} 
                       />
                       <input 
                         placeholder="Address (Details)" 
                         className="w-full bg-transparent border-b-2 border-slate-100 outline-none p-2 text-center text-xs font-bold tracking-widest focus:border-brand transition-all" 
                         value={newPump.address || ''} 
                         onChange={e => setNewPump({...newPump, address: e.target.value || ''})} 
                       />
                       <input 
                         placeholder="Geographic Location (Map Link)" 
                         className="w-full bg-transparent border-b-2 border-slate-100 outline-none p-2 text-center text-[10px] font-mono tracking-widest focus:border-brand transition-all" 
                         value={newPump.mapUrl || ''} 
                         onChange={e => setNewPump({...newPump, mapUrl: e.target.value || ''})} 
                       />
                       <div className="grid grid-cols-2 gap-4">
                          <input 
                            placeholder="Sync Rate (e.g. 24h)" 
                            className="w-full bg-transparent border-b-2 border-slate-100 outline-none p-2 text-center text-[10px] font-black uppercase tracking-widest focus:border-brand transition-all" 
                            value={newPump.syncEst || ''} 
                            onChange={e => setNewPump({...newPump, syncEst: e.target.value || ''})} 
                          />
                          <input 
                            placeholder="Region/Zone" 
                            className="w-full bg-transparent border-b-2 border-slate-100 outline-none p-2 text-center text-[10px] font-black uppercase tracking-widest focus:border-brand transition-all" 
                            value={newPump.location || ''} 
                            onChange={e => setNewPump({...newPump, location: e.target.value || ''})} 
                          />
                       </div>
                       <button 
                         onClick={createPump} 
                         className="w-full btn-primary h-12 text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
                       >
                         {t.addPump}
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeView === 'stats' && (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-1">
                   <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.activity}</h3>
                   <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">{t.systemLogs}</h2>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative group min-w-[280px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder={t.filterByUser} 
                      className="w-full pl-12 pr-6 h-12 bg-white border border-slate-100 rounded-xl outline-none focus:border-brand focus:bg-white transition-all shadow-sm font-bold text-xs"
                      value={filterQuery || ''}
                      onChange={e => setFilterQuery(e.target.value || '')}
                    />
                  </div>
                  
                  <select 
                    className="h-12 px-4 bg-white border border-slate-100 rounded-xl font-bold text-xs uppercase tracking-widest outline-none focus:border-brand shadow-sm cursor-pointer"
                    value={filterStation || ''}
                    onChange={e => setFilterStation(e.target.value)}
                  >
                    <option value="">{t.filterByStation}</option>
                    {pumps.map(p => (
                      <option key={p.pumpId} value={p.pumpId}>{p.name}</option>
                    ))}
                  </select>

                  <select 
                    className="h-12 px-4 bg-white border border-slate-100 rounded-xl font-bold text-xs uppercase tracking-widest outline-none focus:border-brand shadow-sm cursor-pointer"
                    value={filterFuel || ''}
                    onChange={e => setFilterFuel(e.target.value)}
                  >
                    <option value="">{t.allFuels}</option>
                    <option value="octane">{t.octane}</option>
                    <option value="petrol">{t.petrol}</option>
                    <option value="diesel">{t.diesel}</option>
                  </select>
                </div>
              </div>
              
              <div className="glass-card !p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 font-black text-[9px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => requestSort('timestamp')}>
                          <div className="flex items-center gap-2">
                             Temporal Vector {sortConfig.key === 'timestamp' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-8 py-5 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => requestSort('userName')}>
                          <div className="flex items-center gap-2">
                             Citizen Identity {sortConfig.key === 'userName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-8 py-5 cursor-pointer hover:bg-slate-100/50 transition-colors" onClick={() => requestSort('pumpName')}>
                          <div className="flex items-center gap-2">
                             Network Node {sortConfig.key === 'pumpName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                          </div>
                        </th>
                        <th className="px-8 py-5">Refill Vector</th>
                        <th className="px-8 py-5 text-right">Value (BDT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sortedLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                               <span className="text-xs font-bold text-slate-800">{log.timestamp ? format(log.timestamp.toDate(), 'dd MMM yyyy') : 'N/A'}</span>
                               <span className="text-[10px] font-mono text-slate-400">{log.timestamp ? format(log.timestamp.toDate(), 'HH:mm:ss') : '00:00:00'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300">
                                  <UserIcon size={14} />
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-xs font-black text-slate-800 uppercase tracking-tight leading-none mb-1">{log.userName}</span>
                                 <span className="text-[9px] font-mono font-bold text-brand-accent uppercase tracking-widest">{log.vehicleNumber}</span>
                               </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{log.pumpName}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5">
                             <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                   <span className="text-xs font-black text-slate-800">{log.liters?.toFixed(2)} L</span>
                                   <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{log.fuelType}</span>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-right font-mono font-black text-slate-900">
                             {log.amountBdt?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {sortedLogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                             <div className="flex flex-col items-center justify-center gap-4 opacity-30">
                                <History size={48} strokeWidth={1} />
                                <p className="text-sm font-black uppercase tracking-widest">No Log Data Manifested</p>
                             </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          lang={lang} 
          onClose={() => setSelectedUser(null)} 
          onUpdate={async (uid, data) => {
            try {
              await updateDoc(doc(db, 'users', uid), data);
              setUsers(prev => prev.map(u => u.userId === uid ? { ...u, ...data } : u));
              setSelectedUser(prev => prev ? { ...prev, ...data } : null);
              showToast(lang === 'bn' ? 'তথ্য আপডেট করা হয়েছে।' : 'Identity vector updated successfully.');
            } catch (e) {
              console.error(e);
              showToast(lang === 'bn' ? 'আপডেট ব্যর্থ হয়েছে।' : 'Update failed.', 'error');
            }
          }}
        />
      )}
    </div>
  );
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[], onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] space-y-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className={cn(
              "px-6 py-4 rounded-none shadow-2xl pointer-events-auto flex items-center gap-4 border-l-4 min-w-[320px] max-w-md",
              t.type === 'success' ? "bg-slate-900 border-emerald-500 text-white" : "bg-slate-900 border-rose-500 text-white"
            )}
          >
            <div className="shrink-0">
              {t.type === 'success' ? 
                <div className="bg-emerald-500/20 p-2 rounded-full"><CheckCircle2 className="text-emerald-500" size={20} /></div> : 
                <div className="bg-rose-500/20 p-2 rounded-full"><AlertCircle className="text-rose-500" size={20} /></div>
              }
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-0.5">{t.type === 'success' ? 'Protocol Success' : 'Protocol Breach'}</p>
              <p className="text-xs font-bold uppercase tracking-tight">{t.message}</p>
            </div>
            <button onClick={() => onRemove(t.id)} className="text-slate-500 hover:text-white transition">
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * MakHubby Launch Presentation - Centralized Configuration & CMS Data
 * Powered & Brought to you by Manikarnika Technologies
 * Official URLs: makhubby.in | manikarnikatechnologies.in
 */

window.PRESENTATION_CONFIG = {
  brand: {
    productName: "MakHubby",
    productTagline: "The Student Operating Ecosystem",
    productLogoUrl: "https://www.google.com/s2/favicons?domain=makhubby.in&sz=128",
    companyName: "Manikarnika Technologies",
    companyLogoUrl: "https://www.manikarnikatechnologies.in/_next/image?url=%2Ficon_logo.png&w=96&q=75",
    companyUrl: "https://manikarnikatechnologies.in",
    companyDisplayUrl: "manikarnikatechnologies.in",
    productUrl: "https://makhubby.in",
    productDisplayUrl: "makhubby.in",
    platforms: ["Web", "Android"],
    launchDate: "01.09.2026",
    startDate: "01.01.2026",
    closingMotto: "Built Here. Made for Everywhere.",
    visionStatement: "MAKAUT was the beginning. India is the vision."
  },

  // Real Project Metrics & Time Statistics
  metrics: {
    days: 243,
    hoursPerDay: 18,
    totalHours: 4374,
    totalMinutes: 262440,
    totalSeconds: 15746400,
    
    // Engineering Statistics
    totalFolders: 96,
    totalFiles: 264,
    sourceCodeLines: 73500, // 73,500+ lines
    totalProjectLines: 131980, // Total project lines (including schemas, JSON, configurations)
    
    // Architecture Breakdown
    architecture: [
      {
        name: "Flutter Application Core",
        files: 69,
        lines: 60655,
        desc: "State-driven cross-platform client architecture",
        color: "#38bdf8",
        badge: "Core Client"
      },
      {
        name: "Android Native Layer",
        files: 38,
        lines: 3396,
        desc: "Optimized native platform bridges & background sync",
        color: "#34d399",
        badge: "Native OS"
      },
      {
        name: "Automated Test Suite",
        files: 16,
        lines: 2794,
        desc: "Unit, widget & end-to-end regression safeguards",
        color: "#fbbf24",
        badge: "Quality Assurance"
      },
      {
        name: "Desktop Native Layers",
        files: 25,
        lines: 2150,
        desc: "High-performance macOS & Windows integrations",
        color: "#a78bfa",
        badge: "Desktop"
      },
      {
        name: "Backend Cloud Functions",
        files: 18,
        lines: 1848,
        desc: "Serverless microservices & cloud event triggers",
        color: "#f472b6",
        badge: "Cloud Infrastructure"
      },
      {
        name: "Web Platform & Adaptive Loader",
        files: 3,
        lines: 683,
        desc: "Progressive web engine with ultra-fast initial bundle",
        color: "#60a5fa",
        badge: "Web Layer"
      }
    ],

    // Language Distribution
    languages: [
      { name: "Dart", files: 85, lines: 63449, pct: 72 },
      { name: "JSON & Schemas", files: 16, lines: 9069, pct: 10 },
      { name: "TypeScript / JavaScript", files: 45, lines: 4935, pct: 6 },
      { name: "Kotlin / Java", files: 5, lines: 914, pct: 2 },
      { name: "HTML & CSS", files: 2, lines: 1170, pct: 2 },
      { name: "Native C++ / Swift", files: 14, lines: 769, pct: 1 },
      { name: "Firebase & Cloud Rules", files: 2, lines: 627, pct: 1 }
    ]
  },

  // Month by Month Story Progression
  monthsStory: [
    { month: "JANUARY", title: "THE IDEA.", note: "01.01.2026: Questioning what student life could be." },
    { month: "FEBRUARY", title: "THE FIRST BUILD.", note: "Writing the first thousands of lines. Laying foundations." },
    { month: "MARCH", title: "THE FIRST REAL CHALLENGES.", note: "Edge cases, state complexity, scale bottlenecks." },
    { month: "APRIL", title: "REBUILD.", note: "Tearing down flawed assumptions. Designing for resilience." },
    { month: "MAY", title: "GROWING THE PRODUCT.", note: "Resource modules, timetable integrations, faculty bridges." },
    { month: "JUNE", title: "MORE FEATURES. MORE PROBLEMS.", note: "Pushing the limits of cross-platform performance." },
    { month: "JULY", title: "TEST. FIX. REPEAT.", note: "2,794 lines of tests. 18-hour daily debugging marathons." },
    { month: "AUGUST", title: "ARE WE READY?", note: "Final polishing. Zero compromises." }
  ],

  // India Academic Map Nodes
  mapNodes: [
    { id: "makaut", name: "MAKAUT (West Bengal)", x: 74, y: 54, isOrigin: true, type: "Origin Hub" },
    { id: "kolkata", name: "Kolkata Hub (JU / CU)", x: 75, y: 58, isOrigin: false, type: "State Node" },
    { id: "delhi", name: "Delhi Hub (IITD / DU)", x: 38, y: 32, isOrigin: false, type: "Expansion Hub" },
    { id: "mumbai", name: "Mumbai Hub (IITB / MU)", x: 26, y: 64, isOrigin: false, type: "Expansion Hub" },
    { id: "bangalore", name: "Bengaluru Tech Hub (IISc / VTU)", x: 42, y: 83, isOrigin: false, type: "Expansion Hub" },
    { id: "chennai", name: "Chennai Hub (IITM / Anna Univ)", x: 50, y: 84, isOrigin: false, type: "Expansion Hub" },
    { id: "hyderabad", name: "Hyderabad Hub (IITH / JNTU)", x: 44, y: 68, isOrigin: false, type: "Expansion Hub" },
    { id: "pune", name: "Pune Hub (SPPU / COEP)", x: 30, y: 66, isOrigin: false, type: "Expansion Hub" },
    { id: "roorkee", name: "Roorkee / North Hub (IITR)", x: 42, y: 26, isOrigin: false, type: "Expansion Hub" },
    { id: "guwahati", name: "North-East Hub (IITG)", x: 88, y: 40, isOrigin: false, type: "Expansion Hub" }
  ],

  // Scene metadata for presenter navigation drawer
  scenesList: [
    { num: "01", id: "scene-01", title: "Before Everything" },
    { num: "02", id: "scene-02", title: "The Problem (Scattered)" },
    { num: "03", id: "scene-03", title: "The Decision (Build It)" },
    { num: "04", id: "scene-04", title: "The Journey Begins (Timeline)" },
    { num: "05", id: "scene-05", title: "The Clock (4,374 Hours)" },
    { num: "06", id: "scene-06", title: "The Effort (18 Hours/Day)" },
    { num: "07", id: "scene-07", title: "The Build (73,500+ LOC)" },
    { num: "08", id: "scene-08", title: "What's Under The Hood" },
    { num: "09", id: "scene-09", title: "It Broke (Resilience)" },
    { num: "10", id: "scene-10", title: "Journey Through The Months" },
    { num: "11", id: "scene-11", title: "It Became Real (Product Reveal)" },
    { num: "12", id: "scene-12", title: "What is MakHubby?" },
    { num: "13", id: "scene-13", title: "Manikarnika Technologies" },
    { num: "14", id: "scene-14", title: "Why Stop Here?" },
    { num: "15", id: "scene-15", title: "MAKAUT to India Map" },
    { num: "16", id: "scene-16", title: "The Vision (Connected India)" },
    { num: "17", id: "scene-17", title: "This is Not The End" },
    { num: "18", id: "scene-18", title: "Rising From Here" },
    { num: "19", id: "scene-19", title: "MakHubby is Live" },
    { num: "20", id: "scene-20", title: "Finale & Closing Screen" }
  ]
};

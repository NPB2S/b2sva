// BridgeToSuccess Virginia (B2SVA) Academic Ecosystem & Student Resources

const ACADEMIC_TRACKS = [
  {
    id: "stem-math",
    category: "STEM & Mathematics",
    icon: "calculator",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    headline: "Rigorous Foundation in STEM & Problem Solving",
    summary: "From foundational Algebra to AP Calculus BC and Computer Science, our mentors break down abstract concepts with visual methods and bilingual terminology.",
    subjects: [
      { name: "Algebra I & Foundations", level: "Grade 9", solTested: true, desc: "Linear equations, quadratic relations, graphing, and word problem translation." },
      { name: "Geometry", level: "Grades 9-10", solTested: true, desc: "Geometric proofs, angle relationships, trigonometry basics, coordinate geometry." },
      { name: "Algebra II & Trigonometry", level: "Grades 10-11", solTested: true, desc: "Polynomial functions, logarithms, exponential modeling, and complex numbers." },
      { name: "Pre-Calculus & AP Calculus AB/BC", level: "Grades 11-12", solTested: false, desc: "Limits, derivatives, integrals, series, and college-level engineering prep." },
      { name: "Biology & Chemistry", level: "Grades 9-11", solTested: true, desc: "Cellular biology, genetics, chemical bonding, stoichiometry, and laboratory reports." },
      { name: "Physics & Environmental Science", level: "Grades 11-12", solTested: true, desc: "Newtonian mechanics, circuits, energy conservation, ecological systems." },
      { name: "Computer Science & Python", level: "Grades 9-12", solTested: false, desc: "Programming logic, data structures, algorithm design, and web app building." }
    ],
    features: [
      "Bilingual STEM glossaries (English, Spanish, Arabic, Dari, Amharic, Vietnamese)",
      "Interactive digital whiteboard sessions and visual graph simulations",
      "Direct preparation for Virginia Mathematics and Science SOL assessments",
      "Mentorship for regional science fairs and STEM innovation challenges"
    ]
  },
  {
    id: "esl-language",
    category: "English Language & ESL/ELL Development",
    icon: "languages",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    headline: "Accelerating WIDA ACCESS Proficiency (Levels 1 to 6)",
    summary: "Targeted language scaffolding designed specifically for newcomer immigrant high schoolers to master conversational fluency and rigorous academic English.",
    subjects: [
      { name: "WIDA ACCESS Assessment Prep", level: "All Grades (1-6)", solTested: false, desc: "Targeted drills across Listening, Speaking, Reading, and Writing domains." },
      { name: "Academic Vocabulary Mastery", level: "Grades 9-12", solTested: false, desc: "Tier 2 & Tier 3 cross-curricular terminology for high school coursework." },
      { name: "Structured Essay Writing & Grammar", level: "Grades 9-12", solTested: true, desc: "5-paragraph essays, DBQ analysis, thesis formulation, and MLA/APA citations." },
      { name: "Conversational English Circles", level: "Small Groups (4-6)", solTested: false, desc: "Safe, interactive speaking practice to build social confidence and fluency." },
      { name: "Pronunciation & American Idiom Nuance", level: "All Grades", solTested: false, desc: "Phonetic practice, contextual listening, and everyday communication nuance." }
    ],
    features: [
      "Individualized WIDA score growth plan with measurable quarterly milestones",
      "Trauma-informed, patient tutors who understand the newcomer journey",
      "Dual-language reading materials and leveled comprehension guides",
      "Focus on reducing the 21-30 percentage point graduation rate gap"
    ]
  },
  {
    id: "sol-standardized",
    category: "Virginia SOL & Standardized Testing",
    icon: "award",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    headline: "Mastering Virginia Graduation Assessments & College Entrance",
    summary: "Guiding students through state-mandated verified credit requirements (SOLs) and standardized college admissions exams (PSAT, SAT, ACT).",
    subjects: [
      { name: "End-of-Course Reading & Writing SOL", level: "Grades 10-11", solTested: true, desc: "Passage analysis, persuasive writing prompt mastery, and vocabulary in context." },
      { name: "Algebra I & Geometry SOL Review", level: "Grades 9-10", solTested: true, desc: "Technology-enhanced items (TEI) practice, graphing calculator navigation." },
      { name: "Virginia & US History SOL", level: "Grade 11", solTested: true, desc: "Historical timelines, primary source interpretation, and civics fundamentals." },
      { name: "PSAT / SAT Math & Verbal Strategies", level: "Grades 10-12", solTested: false, desc: "Pacing strategies, digital SAT calculator tools, and reading shortcut techniques." },
      { name: "AP & IB Exam Prep Coaching", level: "Grades 11-12", solTested: false, desc: "Free response question (FRQ) scoring rubrics, past exam walk-throughs." }
    ],
    features: [
      "Access to Virginia Department of Education (VDOE) released test banks",
      "Diagnostic test scoring to identify targeted knowledge gaps",
      "Calculator and digital testing tools practice on school-issued Chromebooks",
      "Confidence-building timed practice sessions"
    ]
  },
  {
    id: "social-studies",
    category: "Social Studies, Civics & Community Life",
    icon: "landmark",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    headline: "Civic Empowerment & Understanding American Systems",
    summary: "Helping immigrant students understand US government, local Virginia civic structures, and economic independence while honoring cultural heritage.",
    subjects: [
      { name: "Virginia & U.S. Government", level: "Grade 12", solTested: true, desc: "Constitutional principles, 3 branches of government, voting rights, state laws." },
      { name: "World History & Geography (1500-Present)", level: "Grades 9-10", solTested: true, desc: "Global trade, industrialization, world conflicts, and geographic systems." },
      { name: "Economics & Personal Finance", level: "Grades 10-12", solTested: false, desc: "Banking, credit scores, budgeting, taxes, and investing fundamentals." },
      { name: "Civic Action & Local Government", level: "All Grades", solTested: false, desc: "Connecting with Northern Virginia city councils, community boards, and voting." }
    ],
    features: [
      "Clear, accessible breakdowns of complex US historical and legal concepts",
      "Real-world budgeting and financial literacy simulations",
      "Connections to local youth councils in Alexandria, Arlington, and Fairfax",
      "Community leadership and public speaking workshops"
    ]
  },
  {
    id: "college-career",
    category: "College, Career & Technical Pathways (CTE)",
    icon: "graduation-cap",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    headline: "Post-Secondary Success, Dual Enrollment & Scholarships",
    summary: "Guiding immigrant youth through college applications, NOVA Dual Enrollment, CTE certifications, and financial aid navigation (FAFSA/VASA).",
    subjects: [
      { name: "NOVA Dual Enrollment Navigation", level: "Grades 11-12", solTested: false, desc: "Earning college credits while in high school through Northern Virginia Community College." },
      { name: "College Admissions Essay Coaching", level: "Grade 12", solTested: false, desc: "Crafting powerful personal statements highlighting immigrant resilience and vision." },
      { name: "FAFSA & VASA Financial Aid Assistance", level: "Grade 12", solTested: false, desc: "Step-by-step financial aid application support including immigrant eligibility." },
      { name: "Career & Technical Education (CTE) Certifications", level: "Grades 10-12", solTested: false, desc: "IT, healthcare, trades, and business industry-recognized credentials." }
    ],
    features: [
      "1-on-1 college mentor pairing with university students at GMU and Marymount",
      "Bilingual family financial aid workshops in Spanish, Arabic, and Dari",
      "Resume building and interview preparation with corporate mentors",
      "100% 10th-grade pathway planning commitment"
    ]
  }
];

const VIRGINIA_STUDENT_RESOURCES = [
  {
    id: "vjas-science-fair",
    title: "Virginia Junior Academy of Science (VJAS) & Regional Science Fairs",
    category: "Competitions & STEM",
    icon: "microscope",
    location: "Northern Virginia (Fairfax / Arlington / Alexandria / Regional)",
    eligibility: "High School Students (Grades 9-12)",
    languages: "English (B2S Mentors provide bilingual research support)",
    description: "Participate in regional science and engineering competitions. Students design independent research projects, write formal scientific papers, and present before university judges.",
    benefits: "Win scholarships, state honors, and qualify for Intel ISEF & National STEM Festival.",
    b2sSupport: "B2SVA matches students with STEM adult mentors and peer tutors from GMU and TJHSST for project idea generation, lab report editing, and presentation practice.",
    officialLink: "https://vjas.org"
  },
  {
    id: "fbla-va",
    title: "Future Business Leaders of America (FBLA) - Virginia Chapter",
    category: "Leadership & Business",
    icon: "briefcase",
    location: "Statewide (Regional & Virginia State Leadership Conferences)",
    eligibility: "High School Students interested in business, technology & finance",
    languages: "English with multilingual student outreach",
    description: "FBLA inspires and prepares students to become community-minded business leaders in a global society through competitive events, career exploration, and civic projects.",
    benefits: "Compete in over 70 business & technology categories, build leadership credentials for college applications.",
    b2sSupport: "Study materials for business calculations, economics, public speaking coaching, and resume development.",
    officialLink: "https://www.vafbla.org"
  },
  {
    id: "tsa-va",
    title: "Technology Student Association (TSA) Virginia",
    category: "Competitions & STEM",
    icon: "cpu",
    location: "Richmond Convention Center & NoVA Regional Rallies",
    eligibility: "High School Students enrolled in STEM / CTE courses",
    languages: "English",
    description: "TSA fosters STEM leadership through dynamic competitive events spanning architectural design, software development, coding, CAD, biotechnology, and robotics.",
    benefits: "Hands-on engineering experience, state trophies, and national networking.",
    b2sSupport: "Pairing with senior high school peer tutors in CAD, Python, and engineering design portfolios.",
    officialLink: "https://virginiatsa.org"
  },
  {
    id: "deca-va",
    title: "DECA Virginia (Distributive Education Clubs of America)",
    category: "Leadership & Business",
    icon: "trending-up",
    location: "Virginia Beach / Local NoVA Districts",
    eligibility: "High School Students",
    languages: "English",
    description: "DECA prepares emerging leaders and entrepreneurs in marketing, finance, hospitality, and management in high schools and colleges around the globe.",
    benefits: "Role-play scenario competitions, written business proposals, and executive leadership workshops.",
    b2sSupport: "Mock interview practice, case study analysis, and presentation slides design.",
    officialLink: "https://vadeca.org"
  },
  {
    id: "invention-convention-va",
    title: "Invention Convention Regional Virginia Fair & National STEM Festival",
    category: "Competitions & STEM",
    icon: "lightbulb",
    location: "Regional Virginia Fairs & Washington D.C. National Showcase",
    eligibility: "K-12 Students with an original invention or prototype",
    languages: "Multilingual welcoming",
    description: "A premier invention education program empowering students to identify real-world problems in their communities and build working prototypes.",
    benefits: "Patent review opportunities, national showcase in D.C., entrepreneurship grants.",
    b2sSupport: "Mentors guide students through the invention logbook, prototype construction, and video pitches.",
    officialLink: "https://inventionconvention.org"
  },
  {
    id: "gov-schools-va",
    title: "Virginia Summer Residential Governor's Schools (VSRGS)",
    category: "Academic Enrichment",
    icon: "sparkles",
    location: "Host Universities across Virginia (W&M, UVA, VT, Radford, VCU)",
    eligibility: "High-achieving 10th and 11th grade students",
    languages: "English",
    description: "Month-long intensive residential summer programs in Humanities, Mathematics, Science, Engineering, Technology, Visual Arts, and Agriculture.",
    benefits: "Tuition-free college-level research experience and lifelong friendships with scholars across the Commonwealth.",
    b2sSupport: "Nomination essay editing, recommendation letter coordination, and application coaching for multilingual students.",
    officialLink: "https://www.doe.virginia.gov/teaching-learning-assessment/specialized-instruction/governors-schools"
  },
  {
    id: "nova-library-hubs",
    title: "Northern Virginia Public Library Tutoring & Multilingual Centers",
    category: "Community Hubs",
    icon: "book-open",
    location: "Fairfax, Arlington, Alexandria & Loudoun County Public Libraries",
    eligibility: "All Students and Families",
    languages: "English, Spanish, Arabic, Amharic, Vietnamese, Dari/Pashto",
    description: "Safe, accessible community spaces offering free high-speed internet, Chromebook loaners, bilingual book collections, and quiet tutoring study rooms.",
    benefits: "Designated physical hubs for BridgeToSuccess Virginia in-person 1-on-1 tutoring sessions.",
    b2sSupport: "B2SVA coordinators schedule reserved meeting study rooms and coordinate transportation navigation.",
    officialLink: "https://b2sva.org"
  },
  {
    id: "resettlement-services-va",
    title: "Newcomer Family Community Navigation & Legal Resources",
    category: "Family & Legal",
    icon: "shield-check",
    location: "Northern Virginia Service Hubs (CASA, Edu-Futuro, IROC, EEC)",
    eligibility: "Immigrant and Refugee Families",
    languages: "Multilingual Assistance",
    description: "Comprehensive community navigation connecting families with English classes, healthcare enrollment, legal orientation, and school registration assistance.",
    benefits: "Holistic support ensuring students have the stability needed to excel in their high school academics.",
    b2sSupport: "Integrated referral portal within the B2SVA platform for parents and guardians.",
    officialLink: "https://b2sva.org"
  }
];

window.B2S_RESOURCES = {
  academicTracks: ACADEMIC_TRACKS,
  studentResources: VIRGINIA_STUDENT_RESOURCES
};

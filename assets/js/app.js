// BridgeToSuccess Virginia (B2SVA) Core Application Logic
// Statewide Educational Equity Initiative across the Commonwealth of Virginia

let currentLanguage = localStorage.getItem('b2s_language') || 'en';
let currentView = 'home';
let currentRole = 'all'; // 'tutee', 'peer_tutor', 'adult_volunteer' or 'all'

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initRouter();
  renderCurrentView();
  initEventListeners();
  
  // Show welcome language picker modal if first time visit
  if (!localStorage.getItem('b2s_language_selected_v2')) {
    setTimeout(() => {
      UI.openLanguageModal();
      localStorage.setItem('b2s_language_selected_v2', 'true');
    }, 400);
  }
});

// Multi-Language Management
function initLanguage() {
  window.currentLang = currentLanguage;
  applyTranslations(currentLanguage);
}

function setAppLanguage(langCode) {
  if (!translations[langCode]) langCode = 'en';
  currentLanguage = langCode;
  window.currentLang = langCode;
  localStorage.setItem('b2s_language', langCode);
  
  // Update HTML dir and lang
  const langConfig = translations[langCode];
  document.documentElement.setAttribute('lang', langCode);
  document.documentElement.setAttribute('dir', langConfig.dir || 'ltr');
  
  applyTranslations(langCode);
  renderCurrentView(); // Re-render current page with new translations
}

function applyTranslations(langCode) {
  const dict = translations[langCode] || translations.en;
  
  // Translate static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Update language switcher button label
  const langLabel = document.getElementById('current-lang-label');
  if (langLabel) {
    langLabel.innerHTML = `${dict.flag} <span class="hidden sm:inline">${dict.langName}</span>`;
  }
}

// Router & Page Views
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  currentView = hash;
  
  // Update Nav links active state
  document.querySelectorAll('.nav-link').forEach(link => {
    const target = link.getAttribute('data-route');
    if (target === hash) {
      link.classList.add('text-cyan-400', 'font-bold');
      link.classList.remove('text-slate-300');
    } else {
      link.classList.remove('text-cyan-400', 'font-bold');
      link.classList.add('text-slate-300');
    }
  });

  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTo(route) {
  window.location.hash = route;
}

// View Renderer Dispatcher
function renderCurrentView() {
  const main = document.getElementById('main-content');
  if (!main) return;

  switch (currentView) {
    case 'home':
      renderHome(main);
      break;
    case 'matching':
      renderMatching(main);
      break;
    case 'tracks':
      renderAcademicTracks(main);
      break;
    case 'resources':
      renderStudentResources(main);
      break;
    case 'about':
      renderAbout(main);
      break;
    case 'board':
      renderAbout(main);
      setTimeout(() => {
        const boardEl = document.getElementById('board-section');
        if (boardEl) boardEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      break;
    case 'student-register':
      renderStudentRegister(main);
      break;
    case 'tutor-register':
      renderTutorRegister(main);
      break;
    case 'admin-db':
      renderAdminDatabase(main);
      break;
    default:
      renderHome(main);
      break;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -------------------------------------------------------------
// 1. HOME VIEW
// -------------------------------------------------------------
function renderHome(container) {
  const t = translations[currentLanguage] || translations.en;
  
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            ${t.hero_badge}
          </div>

          <h1 class="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none mb-6">
            ${t.hero_title_1} <br class="hidden sm:inline" />
            <span class="gradient-text">${t.hero_title_highlight}</span>
          </h1>

          <p class="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            ${t.hero_sub}
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onclick="navigateTo('matching')" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5">
              <i data-lucide="users" class="w-5 h-5"></i>
              ${t.hero_cta_match}
            </button>
            <button onclick="navigateTo('tracks')" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-bold text-base transition flex items-center justify-center gap-2.5">
              <i data-lucide="book-open" class="w-5 h-5 text-cyan-400"></i>
              ${t.hero_cta_tracks}
            </button>
            <button onclick="navigateTo('tutor-register')" class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/40 text-purple-300 font-bold text-base transition flex items-center justify-center gap-2.5">
              <i data-lucide="award" class="w-5 h-5 text-purple-400"></i>
              ${t.hero_cta_apply}
            </button>
          </div>
        </div>

        <!-- Virginia Impact Stats -->
        <div class="mt-16 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="glass-card p-6 rounded-3xl text-center border-l-4 border-l-cyan-400">
            <div class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.stat_students_need}</div>
            <div class="text-xs sm:text-sm text-slate-400 font-medium">${t.stat_students_need_lbl}</div>
          </div>
          <div class="glass-card p-6 rounded-3xl text-center border-l-4 border-l-purple-500">
            <div class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.stat_grad_rate}</div>
            <div class="text-xs sm:text-sm text-slate-400 font-medium">${t.stat_grad_rate_lbl}</div>
          </div>
          <div class="glass-card p-6 rounded-3xl text-center border-l-4 border-l-pink-500">
            <div class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.stat_hours}</div>
            <div class="text-xs sm:text-sm text-slate-400 font-medium">${t.stat_hours_lbl}</div>
          </div>
          <div class="glass-card p-6 rounded-3xl text-center border-l-4 border-l-emerald-400">
            <div class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.stat_languages}</div>
            <div class="text-xs sm:text-sm text-slate-400 font-medium">${t.stat_languages_lbl}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Match & Intake Simulator Section -->
    <section class="py-16 bg-slate-950/70 border-y border-slate-800/80 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold mb-2">
            <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Statewide Matching Initiative
          </div>
          <h2 class="text-3xl font-extrabold text-white">${t.quick_title}</h2>
          <p class="text-sm text-slate-400 mt-2">${t.quick_sub}</p>
        </div>

        <div class="max-w-4xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
          <div class="flex items-center justify-center gap-4 mb-6">
            <button id="quick-role-stu" onclick="setQuickRole('tutee')" class="px-5 py-2.5 rounded-xl font-bold text-sm transition ${currentRole === 'peer_tutor' ? 'bg-slate-800 text-slate-400' : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'}">
              ${t.quick_role_student}
            </button>
            <button id="quick-role-tut" onclick="setQuickRole('peer_tutor')" class="px-5 py-2.5 rounded-xl font-bold text-sm transition ${currentRole === 'peer_tutor' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' : 'bg-slate-800 text-slate-400'}">
              ${t.quick_role_tutor}
            </button>
          </div>

          <form onsubmit="handleQuickSearch(event)" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1.5">${t.quick_grade}</label>
              <select id="quick-grade" class="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="all">All Grades (9-12)</option>
                <option value="9">Grade 9 (Freshman)</option>
                <option value="10">Grade 10 (Sophomore)</option>
                <option value="11">Grade 11 (Junior)</option>
                <option value="12">Grade 12 (Senior)</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1.5">${t.quick_subject}</label>
              <select id="quick-subject" class="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="all">All Subjects</option>
                <option value="Algebra">Algebra I / II</option>
                <option value="Geometry">Geometry</option>
                <option value="Calculus">Pre-Calculus / Calculus</option>
                <option value="Biology">Biology / Chemistry</option>
                <option value="ESL">ESL / WIDA Prep</option>
                <option value="SOL">Virginia SOL Prep</option>
                <option value="History">Virginia & US History</option>
                <option value="Computer">Computer Science / STEM</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1.5">${t.quick_language}</label>
              <select id="quick-lang" class="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="all">Any Language</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="Dari">Dari / Pashto (دری)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Amharic">Amharic (አማርኛ)</option>
                <option value="Mongolian">Mongolian (Монгол)</option>
                <option value="Vietnamese">Vietnamese (Tiếng Việt)</option>
                <option value="Urdu">Urdu (اردو)</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-400 mb-1.5">${t.quick_region}</label>
              <select id="quick-district" class="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500">
                <option value="all">All Over Virginia</option>
                <option value="Northern Virginia">Northern Virginia</option>
                <option value="Central Virginia">Central Virginia / Richmond</option>
                <option value="Hampton Roads">Hampton Roads / Tidewater</option>
                <option value="Shenandoah Valley">Shenandoah Valley</option>
                <option value="Roanoke / Southwest">Roanoke / Southwest Virginia</option>
                <option value="Southside Virginia">Southside Virginia</option>
              </select>
            </div>

            <div class="sm:col-span-2 md:col-span-4 mt-2">
              <button type="submit" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
                ${t.quick_btn_search}
              </button>
            </div>
          </form>

          <div id="quick-results-preview" class="mt-6 hidden">
            <!-- Injected by handleQuickSearch -->
          </div>
        </div>
      </div>
    </section>

    <!-- 4 Core Pillars -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">${t.pillars_title}</h2>
        <p class="text-base text-slate-400 mt-3">${t.pillars_sub}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
              <i data-lucide="cpu" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">${t.pillar_1_title}</h3>
            <p class="text-sm text-slate-300 leading-relaxed">${t.pillar_1_desc}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800">
            <span class="text-xs text-cyan-400 font-semibold flex items-center gap-1">
              5-Pillar Algorithm <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>

        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
              <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">${t.pillar_2_title}</h3>
            <p class="text-sm text-slate-300 leading-relaxed">${t.pillar_2_desc}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800">
            <span class="text-xs text-purple-400 font-semibold flex items-center gap-1">
              STEM, ESL & SOL Prep <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>

        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-5">
              <i data-lucide="trophy" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">${t.pillar_3_title}</h3>
            <p class="text-sm text-slate-300 leading-relaxed">${t.pillar_3_desc}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800">
            <span class="text-xs text-pink-400 font-semibold flex items-center gap-1">
              Science Fair, FBLA & TSA <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>

        <div class="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
              <i data-lucide="heart-handshake" class="w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">${t.pillar_4_title}</h3>
            <p class="text-sm text-slate-300 leading-relaxed">${t.pillar_4_desc}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800">
            <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              Multilingual Family Support <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Statewide Outreach & Mission Callout -->
    <section class="py-14 bg-slate-900/40 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-3">
          Serving Students Throughout the Commonwealth of Virginia
        </p>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">Empowering Multilingual Youth in Every Virginia Community</h3>
        <p class="text-sm text-slate-300 max-w-2xl mx-auto mb-6">
          Whether you are in Northern Virginia, Richmond, Hampton Roads, Charlottesville, the Shenandoah Valley, or Southwest Virginia, BridgeToSuccess Virginia connects you with personalized virtual and local tutoring.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button onclick="navigateTo('student-register')" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md transition">
            Student Registration
          </button>
          <button onclick="navigateTo('tutor-register')" class="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs sm:text-sm border border-purple-500/30 transition">
            Become a Volunteer Tutor
          </button>
        </div>
      </div>
    </section>
  `;
}

function setQuickRole(role) {
  currentRole = role;
  const btnStu = document.getElementById('quick-role-stu');
  const btnTut = document.getElementById('quick-role-tut');
  if (btnStu && btnTut) {
    if (role === 'peer_tutor') {
      btnTut.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg";
      btnStu.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition bg-slate-800 text-slate-400";
    } else {
      btnStu.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg";
      btnTut.className = "px-5 py-2.5 rounded-xl font-bold text-sm transition bg-slate-800 text-slate-400";
    }
  }
}

function handleQuickSearch(event) {
  event.preventDefault();
  const resultsDiv = document.getElementById('quick-results-preview');
  if (!resultsDiv) return;

  resultsDiv.classList.remove('hidden');
  resultsDiv.innerHTML = `
    <div class="pt-6 border-t border-slate-800 text-center py-4">
      <div class="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3">
        <i data-lucide="sparkles" class="w-6 h-6"></i>
      </div>
      <h4 class="text-base font-bold text-white mb-1">Statewide Mentor Matching in Progress</h4>
      <p class="text-xs text-slate-400 max-w-md mx-auto mb-4">
        Our statewide volunteer tutor network is expanding across Virginia. Register today to be paired with a mentor or become a volunteer tutor!
      </p>
      <div class="flex items-center justify-center gap-3">
        <button onclick="navigateTo('student-register')" class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-bold shadow-md">
          Register as Student
        </button>
        <button onclick="navigateTo('tutor-register')" class="px-5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-500/30">
          Apply as Volunteer Tutor
        </button>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// -------------------------------------------------------------
// 2. PEER MATCHING VIEW
// -------------------------------------------------------------
function renderMatching(container) {
  const t = translations[currentLanguage] || translations.en;
  const tutors = window.b2sDB.getTutors();

  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <i data-lucide="users" class="w-3.5 h-3.5"></i> ${t.nav_matching}
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-3">${t.match_header_title}</h1>
        <p class="text-base text-slate-300">${t.match_header_sub}</p>
      </div>

      <!-- Classification Dropdown / Tab Menu -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
        <div class="flex flex-wrap items-center gap-2">
          <button onclick="filterTutorDirectory('all')" id="tab-match-all" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md">
            All Mentors & Tutors (${tutors.length})
          </button>
          <button onclick="filterTutorDirectory('peer_tutor')" id="tab-match-peer" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition bg-slate-800 text-slate-300 hover:bg-slate-700">
            High School Peer Tutors
          </button>
          <button onclick="filterTutorDirectory('adult_volunteer')" id="tab-match-adult" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition bg-slate-800 text-slate-300 hover:bg-slate-700">
            Adult Volunteer Mentors
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="navigateTo('student-register')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition">
            <i data-lucide="user-plus" class="w-4 h-4"></i> ${t.match_tab_tutee_reg}
          </button>
          <button onclick="navigateTo('tutor-register')" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-500/30 flex items-center gap-1.5 transition">
            <i data-lucide="award" class="w-4 h-4"></i> ${t.match_tab_tutor_reg}
          </button>
        </div>
      </div>

      <!-- Live Search & Filters Bar -->
      <div class="glass-card p-4 sm:p-5 rounded-2xl mb-8 border border-slate-800">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Search Keywords</label>
            <div class="relative">
              <input type="text" id="dir-search" oninput="handleDirectoryFilter()" placeholder="Name, subject, city..." class="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500" />
              <i data-lucide="search" class="w-4 h-4 text-slate-500 absolute left-3 top-2.5"></i>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Language</label>
            <select id="dir-lang" onchange="handleDirectoryFilter()" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500">
              <option value="all">All Languages</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="Dari">Dari / Pashto (دری)</option>
              <option value="Arabic">Arabic (العربية)</option>
              <option value="Amharic">Amharic (አማርኛ)</option>
              <option value="Mongolian">Mongolian (Монгол)</option>
              <option value="Vietnamese">Vietnamese (Tiếng Việt)</option>
              <option value="Urdu">Urdu (اردو)</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Subject Expertise</label>
            <select id="dir-subject" onchange="handleDirectoryFilter()" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500">
              <option value="all">All Subjects</option>
              <option value="Algebra">Algebra I / II</option>
              <option value="Geometry">Geometry</option>
              <option value="Calculus">Pre-Calculus / Calculus</option>
              <option value="Biology">Biology / Chemistry</option>
              <option value="ESL">ESL / WIDA Prep</option>
              <option value="SOL">Virginia SOL Prep</option>
              <option value="History">History & Social Studies</option>
              <option value="Computer">Computer Science / STEM</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">Virginia Region</label>
            <select id="dir-district" onchange="handleDirectoryFilter()" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500">
              <option value="all">All Across Virginia</option>
              <option value="Northern Virginia">Northern Virginia</option>
              <option value="Central Virginia">Central Virginia / Richmond</option>
              <option value="Hampton Roads">Hampton Roads / Tidewater</option>
              <option value="Shenandoah Valley">Shenandoah Valley</option>
              <option value="Roanoke / Southwest">Roanoke / Southwest Virginia</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tutors Grid -->
      <div id="tutors-grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Rendered by renderTutorCards -->
      </div>
    </div>
  `;

  renderTutorCards(tutors);
}

function filterTutorDirectory(type) {
  currentRole = type;
  document.querySelectorAll('#tab-match-all, #tab-match-peer, #tab-match-adult').forEach(btn => {
    btn.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition bg-slate-800 text-slate-300 hover:bg-slate-700";
  });

  const activeBtn = type === 'all' ? document.getElementById('tab-match-all') :
                    type === 'peer_tutor' ? document.getElementById('tab-match-peer') :
                    document.getElementById('tab-match-adult');
  if (activeBtn) {
    activeBtn.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md";
  }

  handleDirectoryFilter();
}

function handleDirectoryFilter() {
  const search = document.getElementById('dir-search')?.value || '';
  const lang = document.getElementById('dir-lang')?.value || 'all';
  const subject = document.getElementById('dir-subject')?.value || 'all';
  const district = document.getElementById('dir-district')?.value || 'all';

  const tutors = window.b2sDB.getTutors({
    type: currentRole,
    search,
    language: lang,
    subject,
    region: district
  });

  renderTutorCards(tutors);
}

function renderTutorCards(tutors) {
  const container = document.getElementById('tutors-grid-container');
  if (!container) return;

  if (tutors.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-6 glass-card rounded-3xl border border-purple-500/20 max-w-2xl mx-auto">
        <div class="w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <i data-lucide="user-plus" class="w-8 h-8"></i>
        </div>
        <h3 class="text-2xl font-extrabold text-white mb-2">Be the First Volunteer Tutor in Virginia!</h3>
        <p class="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
          We are launching our fresh statewide peer and volunteer mentorship network across the Commonwealth of Virginia. Join us today to empower newcomer students in your community.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onclick="navigateTo('tutor-register')" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition">
            <i data-lucide="award" class="w-4 h-4"></i> Apply as Volunteer Tutor
          </button>
          <button onclick="navigateTo('student-register')" class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition">
            <i data-lucide="user" class="w-4 h-4 text-cyan-400"></i> Register as a Student
          </button>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = tutors.map(t => {
    const isPeer = t.type === 'peer_tutor';
    const langTags = (t.languages || []).slice(0, 3).map(l => 
      `<span class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-cyan-300 text-[11px] font-medium">${l.language}</span>`
    ).join(' ');

    const subjectsTags = (t.subjectExpertise || []).slice(0, 3).map(s => 
      `<span class="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">${s}</span>`
    ).join(' ');

    return `
      <div class="glass-card rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/40 transition">
        <div>
          <!-- Header Card -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <img src="${t.avatar || 'assets/images/logo.jpg'}" alt="${t.fullName}" class="w-14 h-14 rounded-2xl object-cover border border-purple-500/30 shadow-md" />
              <div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isPeer ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}">
                  ${isPeer ? 'High School Peer Tutor' : 'Adult Volunteer Mentor'}
                </span>
                <h3 class="text-lg font-bold text-white mt-1">${t.fullName}</h3>
                <p class="text-xs text-slate-400 flex items-center gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3 text-purple-400"></i> ${t.district || 'Virginia'}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-md text-xs font-bold">
              <i data-lucide="star" class="w-3 h-3 fill-amber-400"></i> ${t.rating || 5.0}
            </div>
          </div>

          <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">${t.bio || ''}</p>

          <!-- Subjects -->
          <div class="mb-3">
            <div class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Expertise</div>
            <div class="flex flex-wrap gap-1.5">${subjectsTags}</div>
          </div>

          <!-- Languages -->
          <div class="mb-4">
            <div class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Languages</div>
            <div class="flex flex-wrap gap-1.5">${langTags}</div>
          </div>
        </div>

        <!-- Card Footer Action -->
        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div class="text-[11px] text-slate-400 flex items-center gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-cyan-400"></i> ${t.availableHoursPerWeek || 4} hrs/wk
          </div>
          <button onclick="UI.openTutorModal('${t.id}')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition">
            View & Request
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

// -------------------------------------------------------------
// 3. ACADEMIC TRACKS (THE ACADEMIC ECOSYSTEM)
// -------------------------------------------------------------
function renderAcademicTracks(container) {
  const t = translations[currentLanguage] || translations.en;
  const tracks = window.B2S_RESOURCES.academicTracks;

  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
          <i data-lucide="layers" class="w-3.5 h-3.5"></i> ${t.nav_tracks}
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-3">${t.tracks_title}</h1>
        <p class="text-base text-slate-300 leading-relaxed">${t.tracks_sub}</p>
      </div>

      <div class="space-y-12">
        ${tracks.map((track) => `
          <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-purple-500/30 transition">
            <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <i data-lucide="${track.icon}" class="w-7 h-7"></i>
                </div>
                <div>
                  <span class="inline-block px-3 py-0.5 rounded-full text-xs font-bold border ${track.badgeColor} mb-2">
                    ${track.category}
                  </span>
                  <h2 class="text-2xl sm:text-3xl font-extrabold text-white">${track.headline}</h2>
                  <p class="text-sm text-slate-300 mt-1 max-w-2xl">${track.summary}</p>
                </div>
              </div>
              <button onclick="navigateTo('student-register')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 flex-shrink-0 shadow-lg transition">
                Request Support in this Track <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Subjects Grid -->
            <div class="mt-6">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Core Subject Areas & Offerings</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${track.subjects.map(s => `
                  <div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition">
                    <div class="flex items-center justify-between mb-1.5">
                      <div class="text-sm font-bold text-white">${s.name}</div>
                      ${s.solTested ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">VA SOL Tested</span>' : ''}
                    </div>
                    <div class="text-[11px] text-cyan-400 font-semibold mb-2">${s.level}</div>
                    <p class="text-xs text-slate-400 leading-relaxed">${s.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Key Features -->
            <div class="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span class="font-bold text-slate-400">Included Support:</span>
              ${track.features.map(f => `
                <div class="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-cyan-400"></i> ${f}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 4. STUDENT RESOURCES & VIRGINIA OPPORTUNITIES
// -------------------------------------------------------------
function renderStudentResources(container) {
  const t = translations[currentLanguage] || translations.en;
  const resources = window.B2S_RESOURCES.studentResources;

  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-3">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> State Opportunities & Competitions
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-3">${t.resources_title}</h1>
        <p class="text-base text-slate-300 leading-relaxed">${t.resources_sub}</p>
      </div>

      <!-- Resource Filter Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button onclick="filterResources('all')" id="res-btn-all" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md transition">
          All Opportunities (${resources.length})
        </button>
        <button onclick="filterResources('Competitions & STEM')" id="res-btn-stem" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
          STEM & Competitions (Science Fair, TSA, Invention)
        </button>
        <button onclick="filterResources('Leadership & Business')" id="res-btn-biz" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
          Leadership & Business (FBLA, DECA)
        </button>
        <button onclick="filterResources('Community Hubs')" id="res-btn-com" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
          Community & Libraries
        </button>
      </div>

      <!-- Resources Cards Grid -->
      <div id="resources-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Rendered by renderResourceCards -->
      </div>
    </div>
  `;

  renderResourceCards(resources);
}

function filterResources(category) {
  document.querySelectorAll('[id^="res-btn-"]').forEach(btn => {
    btn.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition";
  });

  const activeBtn = category === 'all' ? document.getElementById('res-btn-all') :
                    category === 'Competitions & STEM' ? document.getElementById('res-btn-stem') :
                    category === 'Leadership & Business' ? document.getElementById('res-btn-biz') :
                    document.getElementById('res-btn-com');
  if (activeBtn) {
    activeBtn.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md transition";
  }

  let list = window.B2S_RESOURCES.studentResources;
  if (category !== 'all') {
    list = list.filter(r => r.category === category);
  }
  renderResourceCards(list);
}

function renderResourceCards(list) {
  const container = document.getElementById('resources-grid');
  if (!container) return;

  container.innerHTML = list.map(r => `
    <div class="glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800 hover:border-pink-500/40 transition">
      <div>
        <div class="flex items-start justify-between gap-4 mb-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-pink-300 flex items-center justify-center flex-shrink-0">
              <i data-lucide="${r.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                ${r.category}
              </span>
              <h3 class="text-lg sm:text-xl font-bold text-white mt-1">${r.title}</h3>
            </div>
          </div>
        </div>

        <p class="text-sm text-slate-300 leading-relaxed mb-4">${r.description}</p>

        <div class="space-y-2.5 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 mb-5">
          <div class="flex items-start gap-2">
            <span class="text-slate-400 font-bold flex-shrink-0">Location / Scope:</span>
            <span class="text-slate-200">${r.location}</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-slate-400 font-bold flex-shrink-0">Eligibility:</span>
            <span class="text-slate-200">${r.eligibility}</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-pink-400 font-bold flex-shrink-0">B2SVA Guidance:</span>
            <span class="text-slate-200">${r.b2sSupport}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span class="text-xs text-slate-400">Virginia Opportunities Hub</span>
        <a href="${r.officialLink}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition">
          Learn More <i data-lucide="external-link" class="w-3.5 h-3.5 text-cyan-400"></i>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// -------------------------------------------------------------
// 5. ABOUT US & LEADERSHIP VIEW (NIK PIROUZ & SEAN MURPHY)
// -------------------------------------------------------------
function renderAbout(container) {
  const t = translations[currentLanguage] || translations.en;

  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- About Hero -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-3">
          <i data-lucide="info" class="w-3.5 h-3.5"></i> ${t.nav_about}
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">${t.about_title}</h1>
        <p class="text-base text-slate-300 leading-relaxed">${t.about_sub}</p>
      </div>

      <!-- Founder & Executive Leadership Spotlight -->
      <div class="glass-card rounded-3xl p-8 sm:p-12 mb-12 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          <div class="flex-shrink-0">
            <div class="relative">
              <img src="assets/images/nik_pirouz.jpg" alt="Nik Pirouz, Founder" class="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl object-cover border-4 border-purple-500/40 shadow-2xl" />
              <div class="absolute -bottom-3 -right-3 p-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg">
                <i data-lucide="award" class="w-6 h-6"></i>
              </div>
            </div>
          </div>

          <div class="flex-1 text-center md:text-left">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 inline-block mb-2">
              ${t.founder_title}
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.founder_name}</h2>
            <p class="text-sm font-semibold text-purple-400 mb-4">${t.founder_role}</p>
            <p class="text-base text-slate-300 leading-relaxed mb-6">
              ${t.founder_bio}
            </p>
            
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href="mailto:nikpirouz@b2sva.org" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md">
                <i data-lucide="mail" class="w-4 h-4"></i> nikpirouz@b2sva.org
              </a>
              <a href="tel:2026816019" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition border border-cyan-500/30">
                <i data-lucide="phone" class="w-4 h-4"></i> (202) 681-6019
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Chair of the Board Section: Sean Murphy -->
      <div id="board-section" class="glass-card rounded-3xl p-8 sm:p-12 mb-16 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div class="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-pink-500/20 border-2 border-cyan-500/40 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-xl">
            <i data-lucide="user-check" class="w-16 h-16 sm:w-20 sm:h-20 text-cyan-400"></i>
          </div>

          <div class="flex-1 text-center md:text-left">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 inline-block mb-2">
              ${t.board_chair_title}
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-1">${t.board_chair_name}</h2>
            <p class="text-sm font-semibold text-cyan-400 mb-4">${t.board_chair_role}</p>
            <p class="text-base text-slate-300 leading-relaxed mb-6">
              ${t.board_chair_bio}
            </p>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href="mailto:admin@b2sva.org" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md">
                <i data-lucide="mail" class="w-4 h-4"></i> admin@b2sva.org
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- The Virginia Educational Challenge & Our Statewide Mission -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="glass-card p-8 rounded-3xl border border-slate-800">
          <div class="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5">
            <i data-lucide="alert-triangle" class="w-6 h-6"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">The Statewide Challenge We Address</h3>
          <ul class="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li class="flex items-start gap-2">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>6th Worst Nationally:</strong> Virginia ranks 6th worst in graduation rates for English Language Learners.</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>21-30% Point Gap:</strong> Significant graduation rate gap between non-ELL students and multilingual learners statewide.</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="x-circle" class="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>Over 69,000 English Learners:</strong> Growing communities across Virginia need individualized academic mentorship.</span>
            </li>
          </ul>
        </div>

        <div class="glass-card p-8 rounded-3xl border border-slate-800">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
            <i data-lucide="target" class="w-6 h-6"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Our 3-Year Statewide Goals</h3>
          <ul class="space-y-3 text-sm text-slate-300 leading-relaxed">
            <li class="flex items-start gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>85%+ Graduation Rate:</strong> Achieve top-tier graduation rates for all participating multilingual high schoolers.</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>500+ Students & 300+ Tutors:</strong> Establishing community hubs across all regions of Virginia.</span>
            </li>
            <li class="flex items-start gap-2">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
              <span><strong>Holistic Integration:</strong> Combining 1-on-1 tutoring with state competitions, college visits, and family guides.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Open Invitation for School Divisions & Community Volunteers -->
      <div class="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 text-center">
        <h3 class="text-2xl font-bold text-white mb-2">Get in Touch with BridgeToSuccess Virginia</h3>
        <p class="text-sm text-slate-300 max-w-2xl mx-auto mb-6">
          BridgeToSuccess Virginia welcomes educators, school counselors, high school student leaders, and community volunteers from all school divisions across Virginia to connect with us.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:admin@b2sva.org" class="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg">
            <i data-lucide="mail" class="w-4 h-4"></i> admin@b2sva.org
          </a>
          <a href="tel:2026816019" class="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs sm:text-sm flex items-center gap-2 border border-cyan-500/30 transition">
            <i data-lucide="phone" class="w-4 h-4"></i> Call (202) 681-6019
          </a>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 6. STUDENT REGISTRATION VIEW (STATEWIDE VIRGINIA)
// -------------------------------------------------------------
function renderStudentRegister(container) {
  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Student Intake Portal
        </div>
        <h1 class="text-3xl font-extrabold text-white">Student (Tutee) Registration</h1>
        <p class="text-sm text-slate-300 mt-1">100% Free personalized tutoring and academic mentorship for students across Virginia.</p>
      </div>

      <div class="glass-card p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl">
        <form onsubmit="handleStudentFormSubmit(event)" class="space-y-8">
          
          <!-- Basic Profile Info -->
          <div>
            <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="user" class="w-4 h-4"></i> 1. Basic Profile Information
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">First Name *</label>
                <input type="text" id="stu-fname" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Middle Name</label>
                <input type="text" id="stu-mname" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Last Name *</label>
                <input type="text" id="stu-lname" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Date of Birth *</label>
                <input type="date" id="stu-dob" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Student Email *</label>
                <input type="email" id="stu-email" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <input type="tel" id="stu-phone" placeholder="(703) 555-0123" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-medium text-slate-300 mb-1">Home Address / City *</label>
                <input type="text" id="stu-address" required placeholder="e.g. Richmond, Alexandria, Virginia Beach..." class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Virginia Region *</label>
                <select id="stu-district" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="Northern Virginia">Northern Virginia</option>
                  <option value="Central Virginia / Richmond">Central Virginia / Richmond</option>
                  <option value="Hampton Roads / Tidewater">Hampton Roads / Tidewater</option>
                  <option value="Shenandoah Valley">Shenandoah Valley</option>
                  <option value="Roanoke / Southwest VA">Roanoke / Southwest VA</option>
                  <option value="Southside Virginia">Southside Virginia</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">High School Name *</label>
                <input type="text" id="stu-school" required placeholder="e.g. Virginia High School Name" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Current Grade Level *</label>
                <select id="stu-grade" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="9">Grade 9 (Freshman)</option>
                  <option value="10">Grade 10 (Sophomore)</option>
                  <option value="11">Grade 11 (Junior)</option>
                  <option value="12">Grade 12 (Senior)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Current GPA (0.0 - 4.0)</label>
                <input type="number" step="0.01" min="0" max="4.5" id="stu-gpa" placeholder="e.g. 3.0" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>
          </div>

          <!-- Academic Needs Assessment -->
          <div class="pt-6 border-t border-slate-800">
            <h3 class="text-base font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="book-open" class="w-4 h-4"></i> 2. Academic Needs Assessment & Language
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Primary Home Language *</label>
                <select id="stu-homelang" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="Dari / Pashto">Dari / Pashto (دری / پښتو)</option>
                  <option value="Arabic">Arabic (العربية)</option>
                  <option value="Amharic">Amharic (አማርኛ)</option>
                  <option value="Mongolian">Mongolian (Монгол)</option>
                  <option value="Vietnamese">Vietnamese (Tiếng Việt)</option>
                  <option value="Urdu">Urdu (اردو)</option>
                  <option value="French">French</option>
                  <option value="Other">Other Language</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">English Proficiency Level (WIDA 1 - 6)</label>
                <select id="stu-wida" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="1">Level 1 - Entering (Beginning English)</option>
                  <option value="2" selected>Level 2 - Emerging</option>
                  <option value="3">Level 3 - Developing</option>
                  <option value="4">Level 4 - Expanding</option>
                  <option value="5">Level 5 - Bridging</option>
                  <option value="6">Level 6 - Reaching / Fluent</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-2">Subject-Specific Needs (Select all that apply) *</label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Algebra I" checked class="text-cyan-500" /> Algebra I
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Algebra II" class="text-cyan-500" /> Algebra II
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Geometry" class="text-cyan-500" /> Geometry
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Biology" checked class="text-cyan-500" /> Biology
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Chemistry" class="text-cyan-500" /> Chemistry
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="ESL Foundations" checked class="text-cyan-500" /> ESL / WIDA Prep
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="Virginia SOL Prep" class="text-cyan-500" /> Virginia SOL Prep
                </label>
                <label class="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                  <input type="checkbox" name="stu-subjects" value="US History" class="text-cyan-500" /> US & VA History
                </label>
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Academic Goals & Specific Needs</label>
              <textarea id="stu-goals" rows="2" placeholder="e.g. Want to pass Virginia SOL assessments, improve English vocabulary, and prepare for college..." class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
            </div>
          </div>

          <!-- Learning Profile & Logistics -->
          <div class="pt-6 border-t border-slate-800">
            <h3 class="text-base font-bold text-pink-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4"></i> 3. Learning Preferences & Availability
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Learning Style Preferences</label>
                <select id="stu-style" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="Visual">Visual (Diagrams, Step-by-Step, Colors)</option>
                  <option value="Auditory">Auditory (Discussion, Verbal Explanation)</option>
                  <option value="Kinesthetic">Kinesthetic (Hands-on, Interactive Drills)</option>
                  <option value="Reading/Writing">Reading & Writing (Notes, Summaries)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Session Preference</label>
                <select id="stu-format" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="Virtual Zoom">Virtual Zoom / Google Meet</option>
                  <option value="In-Person Library">In-Person at Local Public Library</option>
                  <option value="Hybrid">Hybrid (Either Virtual or In-Person)</option>
                </select>
              </div>
            </div>

            <!-- FERPA Compliance & Parent Consent -->
            <div class="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mt-6">
              <div class="flex items-start gap-3">
                <input type="checkbox" id="stu-consent" required class="mt-1 text-cyan-500 rounded" />
                <label for="stu-consent" class="text-xs text-slate-300 leading-relaxed cursor-pointer">
                  <strong>FERPA & Parental Consent Agreement:</strong> I certify that the information provided is accurate. For students under 18, parental/guardian consent is confirmed for participation in BridgeToSuccess Virginia educational tutoring and mentorship programs across Virginia.
                </label>
              </div>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" onclick="navigateTo('matching')" class="px-6 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-semibold transition">Cancel</button>
            <button type="submit" class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition">
              Complete Student Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleStudentFormSubmit(event) {
  event.preventDefault();
  const fName = document.getElementById('stu-fname').value;
  const lName = document.getElementById('stu-lname').value;
  const email = document.getElementById('stu-email').value;
  const grade = parseInt(document.getElementById('stu-grade').value);
  const district = document.getElementById('stu-district').value;
  const homeLang = document.getElementById('stu-homelang').value;
  const wida = parseInt(document.getElementById('stu-wida').value);
  const goals = document.getElementById('stu-goals').value;
  const school = document.getElementById('stu-school').value;
  const gpa = parseFloat(document.getElementById('stu-gpa').value) || 3.0;

  const subjectCheckboxes = document.querySelectorAll('input[name="stu-subjects"]:checked');
  const subjects = Array.from(subjectCheckboxes).map(cb => cb.value);

  const student = window.b2sDB.addStudent({
    firstName: fName,
    lastName: lName,
    email,
    gradeLevel: grade,
    district,
    schoolName: school,
    currentGpa: gpa,
    homeLanguage: homeLang,
    widaLevel: wida,
    subjectNeeds: subjects.length ? subjects : ["Algebra I", "ESL Foundations"],
    academicGoals: goals,
    weeklyAvailability: ["Mon Afternoon", "Sat Morning"]
  });

  UI.showToast(`Registration complete! Welcome, ${fName}. Our team will review your profile and connect you with a mentor.`, 'success');
  navigateTo('matching');
}

// -------------------------------------------------------------
// 7. TUTOR REGISTRATION VIEW (STATEWIDE VOLUNTEERS)
// -------------------------------------------------------------
function renderTutorRegister(container) {
  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
          <i data-lucide="award" class="w-3.5 h-3.5"></i> Tutor & Volunteer Intake
        </div>
        <h1 class="text-3xl font-extrabold text-white">Join the B2SVA Statewide Mentor Network</h1>
        <p class="text-sm text-slate-300 mt-1">Make a direct impact in the lives of Virginia immigrant and multilingual youth.</p>
      </div>

      <div class="glass-card p-6 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl">
        <form onsubmit="handleTutorFormSubmit(event)" class="space-y-8">
          
          <div>
            <h3 class="text-base font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="user-check" class="w-4 h-4"></i> 1. Mentor Classification & Basic Info
            </h3>

            <div class="mb-4">
              <label class="block text-xs font-medium text-slate-300 mb-1">Mentor Type *</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <label class="p-3 bg-slate-950 rounded-xl border border-cyan-500/40 flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="tut-type" value="peer_tutor" checked class="text-cyan-500" />
                  <div>
                    <div class="font-bold text-white">High School Peer Tutor</div>
                    <div class="text-xs text-slate-400">Earn service learning credit & leadership hours</div>
                  </div>
                </label>
                <label class="p-3 bg-slate-950 rounded-xl border border-purple-500/40 flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="tut-type" value="adult_volunteer" class="text-purple-500" />
                  <div>
                    <div class="font-bold text-white">Adult Volunteer Mentor</div>
                    <div class="text-xs text-slate-400">Educators, professionals & university scholars</div>
                  </div>
                </label>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Full Legal Name *</label>
                <input type="text" id="tut-fullname" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <input type="email" id="tut-email" required class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Current School / University / Org *</label>
                <input type="text" id="tut-org" required placeholder="e.g. High School or College Name" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Primary Virginia Region *</label>
                <select id="tut-district" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option value="Northern Virginia">Northern Virginia</option>
                  <option value="Central Virginia / Richmond">Central Virginia / Richmond</option>
                  <option value="Hampton Roads / Tidewater">Hampton Roads / Tidewater</option>
                  <option value="Shenandoah Valley">Shenandoah Valley</option>
                  <option value="Roanoke / Southwest VA">Roanoke / Southwest VA</option>
                  <option value="Southside Virginia">Southside Virginia</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Available Hours / Week</label>
                <input type="number" id="tut-hours" min="2" max="20" value="4" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>
          </div>

          <!-- Academic Expertise & Languages -->
          <div class="pt-6 border-t border-slate-800">
            <h3 class="text-base font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="award" class="w-4 h-4"></i> 2. Subjects & Language Proficiencies
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Languages Spoken Fluently *</label>
                <input type="text" id="tut-langs" required placeholder="e.g. English, Spanish, Arabic, Dari..." class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Subject Expertise (comma separated) *</label>
                <input type="text" id="tut-subjects" required placeholder="e.g. Algebra I, Geometry, Biology, SOL Prep" class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-slate-300 mb-1">Bio / Tutoring Philosophy & Background</label>
              <textarea id="tut-bio" rows="3" placeholder="Tell us about your background, subjects you love, and why you want to volunteer with B2SVA..." class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
            </div>
          </div>

          <!-- Background Check & Safety Compliance -->
          <div class="pt-6 border-t border-slate-800">
            <h3 class="text-base font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4"></i> 3. Safety Compliance & Training
            </h3>

            <div class="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required class="mt-0.5 text-cyan-500 rounded" />
                <span>I authorize BridgeToSuccess Virginia to perform verification and screening in compliance with child safety and youth protection standards.</span>
              </label>
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required class="mt-0.5 text-cyan-500 rounded" />
                <span>I agree to complete the cross-cultural ESL tutoring orientation training prior to student matching.</span>
              </label>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <button type="button" onclick="navigateTo('matching')" class="px-6 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-semibold transition">Cancel</button>
            <button type="submit" class="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition">
              Submit Tutor Application
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function handleTutorFormSubmit(event) {
  event.preventDefault();
  const type = document.querySelector('input[name="tut-type"]:checked').value;
  const fullName = document.getElementById('tut-fullname').value;
  const email = document.getElementById('tut-email').value;
  const org = document.getElementById('tut-org').value;
  const district = document.getElementById('tut-district').value;
  const hours = parseInt(document.getElementById('tut-hours').value) || 4;
  const langsStr = document.getElementById('tut-langs').value;
  const subjectsStr = document.getElementById('tut-subjects').value;
  const bio = document.getElementById('tut-bio').value;

  const languages = langsStr.split(',').map(s => ({ language: s.trim(), level: "Proficient" }));
  const subjects = subjectsStr.split(',').map(s => s.trim());

  const newTutor = window.b2sDB.addTutor({
    type,
    fullName,
    email,
    schoolOrOrg: org,
    district,
    availableHoursPerWeek: hours,
    languages,
    primaryLanguage: languages[0]?.language || "English",
    subjectExpertise: subjects,
    bio: bio || "Dedicated volunteer tutor passionate about multilingual student success in Virginia.",
    availability: ["Tue Afternoon", "Sat Morning"],
    locationPrefs: ["Local Public Library", "Online Virtual"],
    sessionMode: ["1-on-1", "Virtual"]
  });

  UI.showToast(`Application submitted! Welcome to BridgeToSuccess Virginia, ${fullName}.`, 'success');
  navigateTo('matching');
}

// -------------------------------------------------------------
// 8. DATABASE / ADMIN MANAGEMENT VIEW
// -------------------------------------------------------------
function renderAdminDatabase(container) {
  const tutors = window.b2sDB.getTutors();
  const students = window.b2sDB.getStudents();
  const requests = window.b2sDB.getSessionRequests();

  container.innerHTML = `
    <div class="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white">B2SVA Live Database Inspector</h1>
          <p class="text-xs sm:text-sm text-slate-400">Client data store inspection for tutors, students & session requests.</p>
        </div>
        <div class="flex gap-2">
          <button onclick="exportDBData()" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Export JSON
          </button>
          <button onclick="resetDBDefaults()" class="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Clear / Reset
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-cyan-400">
          <div class="text-2xl font-bold text-white">${tutors.length}</div>
          <div class="text-xs text-slate-400">Registered Mentors & Tutors</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-purple-500">
          <div class="text-2xl font-bold text-white">${students.length}</div>
          <div class="text-xs text-slate-400">Registered Students</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-emerald-400">
          <div class="text-2xl font-bold text-white">${requests.length}</div>
          <div class="text-xs text-slate-400">Scheduled Session Requests</div>
        </div>
      </div>

      <!-- Tables Section -->
      <div class="space-y-8">
        <!-- Tutors Table -->
        <div class="glass-card rounded-3xl p-6 border border-slate-800">
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="award" class="w-4 h-4 text-cyan-400"></i> Registered Mentors & Tutors (${tutors.length})
          </h3>
          <div class="overflow-x-auto">
            ${tutors.length === 0 ? '<p class="text-xs text-slate-400 py-4">No tutors registered yet. New applications will appear here in real-time.</p>' : `
              <table class="w-full text-left text-xs text-slate-300">
                <thead class="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3">Type</th>
                    <th class="p-3">Affiliation / Region</th>
                    <th class="p-3">Subjects</th>
                    <th class="p-3">Languages</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                  ${tutors.map(t => `
                    <tr>
                      <td class="p-3 font-bold text-white">${t.fullName}</td>
                      <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${t.type === 'peer_tutor' ? 'bg-cyan-950 text-cyan-300' : 'bg-purple-950 text-purple-300'}">${t.type}</span></td>
                      <td class="p-3">${t.schoolOrOrg} (${t.district})</td>
                      <td class="p-3 text-slate-300">${(t.subjectExpertise || []).join(', ')}</td>
                      <td class="p-3 text-cyan-400">${(t.languages || []).map(l => l.language).join(', ')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>

        <!-- Registered Students Table -->
        <div class="glass-card rounded-3xl p-6 border border-slate-800">
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <i data-lucide="users" class="w-4 h-4 text-purple-400"></i> Registered Students (${students.length})
          </h3>
          <div class="overflow-x-auto">
            ${students.length === 0 ? '<p class="text-xs text-slate-400 py-4">No student intake records yet. Submissions from student registration will appear here.</p>' : `
              <table class="w-full text-left text-xs text-slate-300">
                <thead class="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3">School / Region</th>
                    <th class="p-3">Grade</th>
                    <th class="p-3">Home Language</th>
                    <th class="p-3">WIDA Level</th>
                    <th class="p-3">Needs</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                  ${students.map(s => `
                    <tr>
                      <td class="p-3 font-bold text-white">${s.firstName} ${s.lastName}</td>
                      <td class="p-3">${s.schoolName || s.district}</td>
                      <td class="p-3">Grade ${s.gradeLevel}</td>
                      <td class="p-3 text-cyan-300">${s.homeLanguage}</td>
                      <td class="p-3"><span class="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/30 text-purple-300 font-bold">Level ${s.widaLevel}</span></td>
                      <td class="p-3 text-slate-400">${(s.subjectNeeds || []).join(', ')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

function exportDBData() {
  const data = window.b2sDB.data;
  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", jsonStr);
  downloadAnchor.setAttribute("download", `b2sva_database_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  UI.showToast("Database exported successfully as JSON file.", "success");
}

function resetDBDefaults() {
  if (confirm("Are you sure you want to clear/reset the database?")) {
    window.b2sDB.resetToDefaults();
    UI.showToast("Database reset to fresh state.", "info");
    renderCurrentView();
  }
}

// Global Event Listeners
function initEventListeners() {
  // Mobile Nav Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu on route click
  document.querySelectorAll('#mobile-menu a, #mobile-menu button').forEach(item => {
    item.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });
}

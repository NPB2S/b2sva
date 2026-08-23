// BridgeToSuccess Virginia (B2SVA) UI Components & Modal Management

const UI = {
  // Toast notifications
  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' :
                    type === 'error' ? 'bg-rose-950/90 border-rose-500/40 text-rose-200' :
                    'bg-slate-900/90 border-cyan-500/40 text-cyan-200';
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';

    toast.className = `pointer-events-auto p-4 rounded-xl border backdrop-blur-lg shadow-2xl flex items-start gap-3 transition-all duration-300 transform translate-y-4 opacity-0 ${bgClass}`;
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0 mt-0.5"></i>
      <div class="flex-1 text-sm font-medium leading-relaxed">${message}</div>
      <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white transition">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    // Auto remove
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  },

  // Open Tutor Detail & Booking Modal
  openTutorModal(tutorId, preCalculatedMatch = null) {
    const tutor = window.b2sDB.getTutorById(tutorId);
    if (!tutor) return;

    const modalOverlay = document.getElementById('global-modal-overlay');
    const modalContent = document.getElementById('global-modal-container');

    const langsBadges = tutor.languages.map(l => 
      `<span class="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">${l.language} (${l.level})</span>`
    ).join(' ');

    const subjectsBadges = tutor.subjectExpertise.map(s => 
      `<span class="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">${s}</span>`
    ).join(' ');

    const matchScoreHtml = preCalculatedMatch ? `
      <div class="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border border-purple-500/30 flex items-center justify-between">
        <div>
          <div class="text-xs uppercase tracking-wider text-purple-300 font-bold">5-Pillar Match Compatibility</div>
          <div class="text-2xl font-extrabold text-white flex items-center gap-2">
            ${preCalculatedMatch.totalScore}% <span class="text-sm font-normal text-slate-300">Match Score</span>
          </div>
          <div class="text-xs text-slate-400 mt-1">${preCalculatedMatch.matchReasons.slice(0, 2).join(' • ')}</div>
        </div>
        <div class="h-12 w-12 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-500/20 text-cyan-300 font-bold">
          ${preCalculatedMatch.totalScore}%
        </div>
      </div>
    ` : '';

    modalContent.innerHTML = `
      <div class="relative bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-content">
        <button onclick="UI.closeModal()" class="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex flex-col md:flex-row gap-6 items-start">
          <img src="${tutor.avatar}" alt="${tutor.fullName}" class="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/40 shadow-lg flex-shrink-0" />
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${tutor.type === 'peer_tutor' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}">
                ${tutor.type === 'peer_tutor' ? 'High School Peer Tutor' : 'Adult Volunteer Mentor'}
              </span>
              <span class="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/30">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${tutor.rating} (${tutor.reviewsCount} reviews)
              </span>
            </div>
            <h3 class="text-2xl font-bold text-white">${tutor.fullName}</h3>
            <p class="text-sm text-cyan-400 font-medium">${tutor.schoolOrOrg}</p>
            <p class="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-purple-400"></i> ${tutor.district}
            </p>
          </div>
        </div>

        <div class="mt-6 border-t border-slate-800 pt-6 space-y-5">
          ${matchScoreHtml}

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About Mentor</h4>
            <p class="text-sm text-slate-300 leading-relaxed">${tutor.bio}</p>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Subject Expertise</h4>
            <div class="flex flex-wrap gap-2">${subjectsBadges}</div>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Languages Spoken</h4>
            <div class="flex flex-wrap gap-2">${langsBadges}</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <div class="text-xs text-slate-400 font-semibold">Weekly Availability</div>
              <div class="text-sm font-medium text-slate-200 mt-0.5">${tutor.availability.join(', ')} (${tutor.availableHoursPerWeek} hrs/wk)</div>
            </div>
            <div>
              <div class="text-xs text-slate-400 font-semibold">Verification & Training</div>
              <div class="text-sm font-medium text-emerald-400 mt-0.5 flex items-center gap-1">
                <i data-lucide="shield-check" class="w-4 h-4"></i> ${tutor.trainingStatus}
              </div>
            </div>
          </div>

          <!-- Session Request Form -->
          <div class="bg-gradient-to-b from-slate-800/80 to-slate-900 p-5 rounded-2xl border border-purple-500/20">
            <h4 class="text-base font-bold text-white mb-2 flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-cyan-400"></i> Request 1-on-1 Tutoring Session
            </h4>
            <p class="text-xs text-slate-400 mb-4">Sessions are 100% free for Northern Virginia immigrant students and English Language Learners.</p>
            
            <form onsubmit="UI.handleSessionBooking(event, '${tutor.id}')" class="space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Your Full Name *</label>
                  <input type="text" id="req-student-name" required placeholder="e.g., Mateo Reyes" class="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Your Email or Parent Email *</label>
                  <input type="email" id="req-student-email" required placeholder="student@example.com" class="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Target Subject *</label>
                  <select id="req-subject" required class="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                    ${tutor.subjectExpertise.map(s => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Preferred Time Window *</label>
                  <select id="req-time" required class="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500">
                    ${tutor.availability.map(a => `<option value="${a}">${a}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Meeting Format</label>
                <div class="flex gap-4 text-xs text-slate-300 pt-1">
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="req-mode" value="Virtual Zoom / Google Meet" checked class="text-cyan-500" /> Virtual
                  </label>
                  <label class="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="req-mode" value="In-Person at Community Library" class="text-cyan-500" /> In-Person (Library Hub)
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Notes / Specific Goals for Session</label>
                <textarea id="req-notes" rows="2" placeholder="e.g., Preparing for next week's Algebra test, need bilingual explanation in Spanish..." class="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"></textarea>
              </div>

              <div class="pt-2 flex justify-end gap-3">
                <button type="button" onclick="UI.closeModal()" class="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-semibold transition">Cancel</button>
                <button type="submit" class="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition">
                  Confirm & Request Session
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  },

  handleSessionBooking(event, tutorId) {
    event.preventDefault();
    const tutor = window.b2sDB.getTutorById(tutorId);
    const studentName = document.getElementById('req-student-name').value;
    const studentEmail = document.getElementById('req-student-email').value;
    const subject = document.getElementById('req-subject').value;
    const timeWindow = document.getElementById('req-time').value;
    const mode = document.querySelector('input[name="req-mode"]:checked').value;
    const notes = document.getElementById('req-notes').value;

    const request = window.b2sDB.createSessionRequest({
      studentName,
      studentEmail,
      tutorId,
      tutorName: tutor ? tutor.fullName : 'Mentor',
      subject,
      meetingType: mode,
      requestedDay: timeWindow,
      notes
    });

    UI.closeModal();
    UI.showToast(`Tutoring session requested with ${tutor.fullName}! An automated confirmation and calendar invite has been sent to ${studentEmail}.`, 'success');
  },

  closeModal() {
    const modalOverlay = document.getElementById('global-modal-overlay');
    if (modalOverlay) {
      modalOverlay.classList.add('hidden');
      modalOverlay.classList.remove('flex');
    }
  },

  // Language Selection Modal
  openLanguageModal() {
    const modalOverlay = document.getElementById('global-modal-overlay');
    const modalContent = document.getElementById('global-modal-container');
    const curLang = window.currentLang || 'en';

    const languages = [
      { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
      { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
      { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
      { code: 'fa', name: 'Dari / Pashto / Persian', native: 'دری / پښتو / فارسی', flag: '🇦🇫' },
      { code: 'mn', name: 'Mongolian', native: 'Монгол хэл', flag: '🇲🇳' },
      { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
      { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' }
    ];

    modalContent.innerHTML = `
      <div class="relative bg-slate-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl modal-content">
        <button onclick="UI.closeModal()" class="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="text-center mb-6">
          <div class="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3">
            <i data-lucide="globe" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-extrabold text-white" data-i18n="lang_modal_title">Welcome to BridgeToSuccess Virginia</h3>
          <p class="text-sm text-slate-400 mt-2" data-i18n="lang_modal_prompt">What language do you speak? Choose your preferred language to explore the platform.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          ${languages.map(l => `
            <button onclick="UI.selectLanguage('${l.code}')" class="p-3.5 rounded-2xl border text-left transition flex items-center gap-3.5 ${curLang === l.code ? 'bg-gradient-to-r from-purple-900/60 to-cyan-950/80 border-cyan-400 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-300'}">
              <span class="text-2xl">${l.flag}</span>
              <div>
                <div class="text-sm font-bold">${l.native}</div>
                <div class="text-xs text-slate-400">${l.name}</div>
              </div>
            </button>
          `).join('')}
        </div>

        <div class="text-center">
          <button onclick="UI.closeModal()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold shadow-lg shadow-purple-600/25 transition" data-i18n="lang_modal_btn">
            Continue to Platform
          </button>
        </div>
      </div>
    `;

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  },

  selectLanguage(langCode) {
    if (window.setAppLanguage) {
      window.setAppLanguage(langCode);
    }
    UI.closeModal();
    UI.showToast(`Language switched to ${translations[langCode]?.langName || langCode}!`, 'info');
  }
};

window.UI = UI;

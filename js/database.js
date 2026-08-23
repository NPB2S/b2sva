// BridgeToSuccess Virginia (B2SVA) Database Engine
// Statewide Virginia educational equity initiative - Fresh start

const B2S_DB_STORAGE_KEY = "b2sva_platform_db_v2"; // v2 to ensure clean state for fresh start

const INITIAL_SEED_DATA = {
  // Fresh start - no peer tutors pre-loaded
  tutors: [],

  // Sample placeholder students demonstrating registration
  students: [],

  sessionRequests: []
};

// Database Service Helper Class
class B2SDatabase {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(B2S_DB_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using fresh initial data", e);
    }
    this.saveData(INITIAL_SEED_DATA);
    return JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
  }

  saveData(data) {
    try {
      localStorage.setItem(B2S_DB_STORAGE_KEY, JSON.stringify(data));
      this.data = data;
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }

  getTutors(filters = {}) {
    let list = this.data.tutors || [];
    if (filters.type && filters.type !== "all") {
      list = list.filter(t => t.type === filters.type);
    }
    if (filters.region && filters.region !== "all") {
      list = list.filter(t => t.district && t.district.toLowerCase().includes(filters.region.toLowerCase()));
    }
    if (filters.language && filters.language !== "all") {
      list = list.filter(t => 
        (t.languages && t.languages.some(l => l.language.toLowerCase() === filters.language.toLowerCase())) ||
        (t.primaryLanguage && t.primaryLanguage.toLowerCase() === filters.language.toLowerCase())
      );
    }
    if (filters.subject && filters.subject !== "all") {
      list = list.filter(t => 
        t.subjectExpertise && t.subjectExpertise.some(s => s.toLowerCase().includes(filters.subject.toLowerCase()))
      );
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(t => 
        (t.fullName && t.fullName.toLowerCase().includes(q)) ||
        (t.schoolOrOrg && t.schoolOrOrg.toLowerCase().includes(q)) ||
        (t.subjectExpertise && t.subjectExpertise.some(s => s.toLowerCase().includes(q))) ||
        (t.bio && t.bio.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getTutorById(id) {
    return (this.data.tutors || []).find(t => t.id === id);
  }

  addTutor(tutorData) {
    const newTutor = {
      id: "tut-" + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      sessionsCompleted: 0,
      backgroundCheckVerified: tutorData.type === 'peer_tutor' ? true : false,
      trainingStatus: "Pending Orientation (24hr Modules)",
      registeredDate: new Date().toISOString().split('T')[0],
      ...tutorData
    };
    if (!this.data.tutors) this.data.tutors = [];
    this.data.tutors.unshift(newTutor);
    this.saveData(this.data);
    return newTutor;
  }

  getStudents() {
    return this.data.students || [];
  }

  getStudentById(id) {
    return (this.data.students || []).find(s => s.id === id);
  }

  addStudent(studentData) {
    const newStudent = {
      id: "stu-" + Date.now(),
      status: "Active - Finding Match",
      matchedTutorId: null,
      registeredDate: new Date().toISOString().split('T')[0],
      ...studentData
    };
    if (!this.data.students) this.data.students = [];
    this.data.students.unshift(newStudent);
    this.saveData(this.data);
    return newStudent;
  }

  createSessionRequest(requestData) {
    const newReq = {
      id: "req-" + Date.now(),
      status: "Pending Tutor Confirmation",
      timestamp: new Date().toISOString().split('T')[0],
      ...requestData
    };
    if (!this.data.sessionRequests) this.data.sessionRequests = [];
    this.data.sessionRequests.unshift(newReq);
    this.saveData(this.data);
    return newReq;
  }

  getSessionRequests() {
    return this.data.sessionRequests || [];
  }

  resetToDefaults() {
    this.saveData(INITIAL_SEED_DATA);
    return this.data;
  }
}

window.b2sDB = new B2SDatabase();

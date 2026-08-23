// BridgeToSuccess Virginia (B2SVA) 5-Pillar Weighted Matching Algorithm

function calculateMatchScore(student, tutor) {
  let scoreAcademic = 0;
  let scoreCommunication = 0;
  let scoreLogistics = 0;
  let scoreGoals = 0;
  let scoreCommunity = 0;
  let matchReasons = [];

  // 1. ACADEMIC COMPATIBILITY (30% Max Weight)
  // Check subject overlap
  const studentNeeds = student.subjectNeeds || [];
  const tutorSkills = tutor.subjectExpertise || [];
  let subjectOverlapCount = 0;

  studentNeeds.forEach(sub => {
    if (tutorSkills.some(ts => ts.toLowerCase().includes(sub.toLowerCase()) || sub.toLowerCase().includes(ts.toLowerCase()))) {
      subjectOverlapCount++;
    }
  });

  if (studentNeeds.length > 0) {
    const subjectRatio = Math.min(1.0, subjectOverlapCount / Math.max(1, studentNeeds.length));
    scoreAcademic += subjectRatio * 18; // up to 18 pts
    if (subjectOverlapCount > 0) {
      matchReasons.push(`Subject Expertise Match in ${subjectOverlapCount} key area(s)`);
    }
  } else {
    scoreAcademic += 15;
  }

  // WIDA ACCESS Level Experience Match (up to 6 pts)
  const studentWida = student.widaLevel || 2;
  if (tutor.widaExperienceLevels && tutor.widaExperienceLevels.includes(studentWida)) {
    scoreAcademic += 6;
    matchReasons.push(`Certified experience coaching WIDA ACCESS Level ${studentWida} learners`);
  } else {
    scoreAcademic += 3;
  }

  // Learning Style Match (up to 6 pts)
  const studentStyles = student.learningStyles || ["Visual"];
  const tutorStyles = tutor.learningStylesSupported || ["Visual", "Reading/Writing"];
  const styleMatch = studentStyles.some(s => tutorStyles.includes(s));
  if (styleMatch) {
    scoreAcademic += 6;
    matchReasons.push(`Compatible learning style: ${studentStyles.join(', ')}`);
  } else {
    scoreAcademic += 3;
  }

  // 2. COMMUNICATION & LANGUAGE FACTORS (25% Max Weight)
  const studentLang = (student.homeLanguage || "").toLowerCase();
  const tutorLangs = (tutor.languages || []).map(l => l.language.toLowerCase());
  const tutorPrimary = (tutor.primaryLanguage || "").toLowerCase();

  if (studentLang && (tutorLangs.includes(studentLang) || tutorPrimary === studentLang)) {
    scoreCommunication += 18;
    matchReasons.push(`Direct native/bilingual language bridge in ${student.homeLanguage}`);
  } else if (tutorLangs.some(l => l.includes("english"))) {
    scoreCommunication += 10;
  } else {
    scoreCommunication += 6;
  }

  // Cultural competency & empathy score (up to 7 pts)
  if (tutor.trainingStatus && tutor.trainingStatus.includes("Trauma-Informed")) {
    scoreCommunication += 7;
    matchReasons.push("Trained in trauma-informed cross-cultural mentorship");
  } else {
    scoreCommunication += 5;
  }

  // 3. SCHEDULE & LOGISTICS (20% Max Weight)
  // Availability overlap (up to 10 pts)
  const studentAvail = student.weeklyAvailability || [];
  const tutorAvail = tutor.availability || [];
  let availOverlap = studentAvail.filter(a => tutorAvail.includes(a)).length;

  if (availOverlap > 0) {
    scoreLogistics += Math.min(10, 5 + availOverlap * 2.5);
    matchReasons.push(`Overlapping weekly schedule slots: ${availOverlap} time window(s)`);
  } else {
    scoreLogistics += 4;
  }

  // District / Location proximity (up to 6 pts)
  const sDistrict = (student.district || "").toLowerCase();
  const tDistrict = (tutor.district || "").toLowerCase();
  if (sDistrict && tDistrict && (sDistrict.includes(tDistrict) || tDistrict.includes(sDistrict))) {
    scoreLogistics += 6;
    matchReasons.push(`Same Northern Virginia school district (${student.district})`);
  } else {
    scoreLogistics += 3;
  }

  // Session mode (up to 4 pts)
  const studentModes = student.sessionPreferences || ["Virtual"];
  const tutorModes = tutor.sessionMode || ["Virtual"];
  if (studentModes.some(m => tutorModes.includes(m))) {
    scoreLogistics += 4;
  } else {
    scoreLogistics += 2;
  }

  // 4. LEARNING OBJECTIVES & GOAL ALIGNMENT (15% Max Weight)
  if (student.academicGoals) {
    scoreGoals += 12;
  } else {
    scoreGoals += 8;
  }
  if (tutor.rating >= 4.9) {
    scoreGoals += 3;
  } else {
    scoreGoals += 1;
  }

  // 5. COMMUNITY CONNECTION POTENTIAL (10% Max Weight)
  const studentInterests = student.interests || ["STEM", "Community Service", "Science Fair"];
  const tutorInterests = tutor.interests || ["Youth Mentorship", "Robotics", "DECA"];
  let sharedInterest = studentInterests.some(i => tutorInterests.includes(i));
  if (sharedInterest) {
    scoreCommunity += 10;
    matchReasons.push("Shared extracurricular interests & civic engagement goals");
  } else {
    scoreCommunity += 6;
  }

  // Calculate total capped at 100
  const totalScore = Math.min(99, Math.round(scoreAcademic + scoreCommunication + scoreLogistics + scoreGoals + scoreCommunity));

  return {
    totalScore,
    breakdown: {
      academic: Math.round(scoreAcademic),
      communication: Math.round(scoreCommunication),
      logistics: Math.round(scoreLogistics),
      goals: Math.round(scoreGoals),
      community: Math.round(scoreCommunity)
    },
    matchReasons
  };
}

// Function to rank tutors for a given student profile
function getRankedTutorsForStudent(studentProfile, tutorsList) {
  const ranked = tutorsList.map(tutor => {
    const match = calculateMatchScore(studentProfile, tutor);
    return {
      tutor,
      ...match
    };
  });

  ranked.sort((a, b) => b.totalScore - a.totalScore);
  return ranked;
}

window.B2S_MATCHING = {
  calculateMatchScore,
  getRankedTutorsForStudent
};

export const EVENT_DETAILS = {
   programming: {
      id: 1,
      slug: "programming",
      title: "Programming Contest",
      tagline: "Solve, optimize, and outrun the clock.",
      description:
         "Tackle algorithmic challenges designed for competitive programmers. Team up or go solo and prove your mastery over logic and speed.",
      registrationLink: "https://forms.gle/ZNiikAKbz74cBCr47",
      rulebookPath:
         "https://drive.google.com/file/d/1adYlZWovbMSmQPz6ItEwXxgjYpayrTfn/view",
      deadline: "2025-10-31T11:59:00+06:00",
      icon: "💻",
      gradient: "from-blue-500/20 to-cyan-500/20",
      buttonGradient: "from-blue-500 to-cyan-500",
      pagePath: "/CseFest/registration/programming",
      startDate: "10 November 2025",
      highlights: [
         "Preliminary online qualifier followed by on-site finals",
         "ICPC-style scoring with live leaderboard",
         "Exclusive mentoring session with alumni coaches",
      ],
   },
   gaming: {
      id: 2,
      slug: "gaming",
      title: "Gaming Tournament",
      tagline: "Strategize, adapt, and go for the clutch win.",
      description:
         "Compete across PUBG, Valorant, Free Fire, and E-Football in a high-energy arena. Assemble your squad and get ready for heart-pounding action.",
      registrationLink: "https://forms.google.com/gaming-tournament",
      rulebookPath: "/rulebooks/gaming-tournament-rulebook.pdf",
      deadline: "2025-11-10T23:59:00+06:00",
      icon: "🎮",
      gradient: "from-orange-500/20 to-red-500/20",
      buttonGradient: "from-orange-500 to-red-500",
      pagePath: "/CseFest/registration/gaming",
      startDate: "10 November 2025",
      highlights: [
         "Group-stage eliminations followed by grand finals",
         "Shoutcasters and live broadcast on campus stage",
         "Best play awards and MVP recognitions",
      ],
   },
   project: {
      id: 3,
      slug: "project",
      title: "Project Showcase",
      tagline: "Pitch innovations that push the envelope.",
      description:
         "Present your cutting-edge software, hardware, or research project to industry experts. Inspire the crowd and compete for grant opportunities.",
      registrationLink: "https://forms.gle/XzJNuroGxsdwutZG6",
      rulebookPath:
         "https://drive.google.com/file/d/1kXioErBlvHGz5mx9-3aClQ1S47Ecvrau/view",
      deadline: "2025-10-31T23:59:00+06:00",
      icon: "🚀",
      gradient: "from-purple-500/20 to-pink-500/20",
      buttonGradient: "from-purple-500 to-pink-500",
      pagePath: "/CseFest/registration/project",
      startDate: "10 November 2025",
      highlights: [
         "Prototype demo arena with technical jury feedback",
         "Innovation marketplace for networking",
         "Special track for sustainable technology",
      ],
   },
   ideathon: {
      id: 4,
      slug: "poster-presentation",
      title: "Poster Presentation",
      tagline: "Share your research story with stunning visuals.",
      description:
         "Design a compelling academic or industry poster, communicate your findings with clarity, and engage judges in a vibrant exhibition floor.",
      registrationLink: "https://forms.gle/xtT4DjfCiwUH87iu6",
      rulebookPath:
         "https://drive.google.com/file/d/1ClP4wlN5yOwmN_iaMoHvdgeuDMLymjTq/view",
      deadline: "2025-10-31T23:59:00+06:00",
      icon: "💡",
      gradient: "from-yellow-500/20 to-orange-500/20",
      buttonGradient: "from-yellow-500 to-orange-500",
      pagePath: "/CseFest/registration/poster-presentation",
      startDate: "10 November 2025",
      highlights: [
         "Professional feedback from industry and academic judges",
         "Dedicated showcase arena with interactive Q&A",
         "Awards celebrating innovation and visual storytelling",
      ],
   },
   datathon: {
      id: 5,
      slug: "datathon",
      title: "Datathon",
      tagline: "Transform raw data into winning insights.",
      description:
         "Analyze large datasets, uncover patterns, and deliver actionable dashboards that impress data scientists and business leaders alike.",
      registrationLink: "https://forms.gle/ZCFv7KBhmV3KGnAJA",
      rulebookPath:
         "https://drive.google.com/file/d/1jN9zEm-qTpvwe6dAwTSU2lES0MA8JaN8/view",
      deadline: "2025-10-31T23:59:00+06:00",
      icon: "📊",
      gradient: "from-green-500/20 to-emerald-500/20",
      buttonGradient: "from-green-500 to-emerald-500",
      pagePath: "/CseFest/registration/datathon",
      startDate: "3 November 2025",
      highlights: [
         "Problem statements released 48 hours before event",
         "Judging rubric balances accuracy and storytelling",
         "Opportunity to present to analytics recruiters",
      ],
   },
   quiz: {
      id: 6,
      slug: "quiz",
      title: "Quiz",
      tagline: "Think fast, buzz faster.",
      description:
         "Test your knowledge across tech, trivia, and pop culture in a rapid-fire arena. Team up and outsmart rival quizzers for festival bragging rights.",
      registrationLink: "https://forms.gle/TqQG7jCHh7GUqQuiz",
      rulebookPath: "https://drive.google.com/file/d/1quizRulebookSample/view",
      deadline: "2025-10-31T05:59:00+06:00",
      icon: "🧠",
      gradient: "from-indigo-500/20 to-violet-500/20",
      buttonGradient: "from-indigo-500 to-violet-500",
      pagePath: "/CseFest/registration/quiz",
      startDate: "10 November 2025",
      highlights: [
         "Mixed-round format covering STEM, pop culture, and general knowledge",
         "Live buzzer finale with audience interaction",
         "Special prizes for highest-scoring rookie team",
      ],
   },
};

export const EVENT_ARRAY = Object.values(EVENT_DETAILS);

export const getEventBySlug = (slug) => EVENT_ARRAY.find((event) => event.slug === slug);

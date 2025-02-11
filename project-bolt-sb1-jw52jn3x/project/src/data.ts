import { Question, Course, CourseAllocations } from './types';

export const questions: Question[] = [
  // Technical Questions
  { id: 'T1', text: 'How comfortable are you with working with data and numbers?', type: 'technical' },
  { id: 'T2', text: 'Do you enjoy problem-solving and analytical thinking?', type: 'technical' },
  { id: 'T3', text: 'Are you interested in learning new software tools and technologies?', type: 'technical' },
  { id: 'T4', text: 'How would you rate your ability to learn technical concepts quickly?', type: 'technical' },
  { id: 'T5', text: 'Do you have experience with any programming languages or coding?', type: 'technical' },
  { id: 'T6', text: 'Are you comfortable with using computers and other digital devices?', type: 'technical' },
  { id: 'T7', text: 'Do you enjoy working on projects that require attention to detail?', type: 'technical' },
  { id: 'T8', text: 'How would you rate your ability to troubleshoot technical problems?', type: 'technical' },
  { id: 'T9', text: 'Are you interested in the technical aspects of how things work?', type: 'technical' },
  { id: 'T10', text: 'Do you prefer hands-on, practical learning experiences?', type: 'technical' },
  
  // Non-Technical Questions
  { id: 'N1', text: 'Are you a self-motivated learner?', type: 'non-technical' },
  { id: 'N2', text: 'Do you enjoy working independently or as part of a team?', type: 'non-technical' },
  { id: 'N3', text: 'How would you rate your communication skills?', type: 'non-technical' },
  { id: 'N4', text: 'Are you comfortable with presenting your ideas to others?', type: 'non-technical' },
  { id: 'N5', text: 'How organized and detail-oriented are you?', type: 'non-technical' },
  { id: 'N6', text: 'Are you adaptable and open to new challenges?', type: 'non-technical' },
  { id: 'N7', text: 'How important is it to you to learn skills that are in high demand?', type: 'non-technical' },
  { id: 'N8', text: 'Do you prefer structured learning environments or more flexible ones?', type: 'non-technical' },
  { id: 'N9', text: 'How much time are you willing to dedicate to learning a new skill?', type: 'non-technical' },
  { id: 'N10', text: 'Are you interested in a career that involves continuous learning and development?', type: 'non-technical' },
];

export const courses: Course[] = [
  { id: 1, name: "Data Science and Analytics", description: "Learn to analyze and interpret complex data sets using statistical methods and programming.", videoUrl: "https://www.youtube.com/watch?v=gDZ6czwuQ18", courseUrl: "https://www.coursera.org/specializations/introduction-data-science", backgroundVideo: "AI.mp4" },
  { id: 2, name: "Artificial Intelligence and Machine Learning", description: "Explore AI algorithms, neural networks, and machine learning techniques.", videoUrl: "https://www.youtube.com/watch?v=5NgNicANyqM&t=1s", courseUrl: "https://www.coursera.org/learn/ai-for-everyone", backgroundVideo: "AI.mp4" },
  { id: 3, name: "Software Development", description: "Master programming languages and software development methodologies.", videoUrl: "https://www.youtube.com/live/Ubg3PenEdNw?si=1BSb5wbO5KGKim8b", courseUrl: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer", backgroundVideo: "AI.mp4" },
  { id: 4, name: "Cybersecurity", description: "Learn to protect systems, networks, and data from digital attacks.", videoUrl: "https://www.youtube.com/watch?v=hXSFdwIOfnE", courseUrl: "https://www.coursera.org/learn/cybersecurity-for-everyone", backgroundVideo: "AI.mp4" },
  { id: 5, name: "Digital Marketing", description: "Master digital marketing strategies, analytics, and campaign management.", videoUrl: "https://www.youtube.com/watch?v=W41F-IdjPlU", courseUrl: "https://skillshop.exceedlms.com/student/collection/654330-digital-marketing?locale=en-GB", backgroundVideo: "AI.mp4" },
  { id: 6, name: "Blockchain and Cryptocurrency", description: "Understand blockchain technology and its applications.", videoUrl: "https://www.youtube.com/watch?v=cGQHXmCS94M", courseUrl: "https://www.coursera.org/specializations/blockchain", backgroundVideo: "Block.mp4" },
  { id: 7, name: "Cloud Computing", description: "Learn cloud infrastructure, services, and deployment strategies.", videoUrl: "https://www.youtube.com/watch?v=2LaAJq1lB1Q", courseUrl: "https://www.coursera.org/learn/introduction-to-cloud", backgroundVideo: "Block.mp4" },
  { id: 8, name: "Photo and Video Editing", description: "Master digital media editing and production techniques.", videoUrl: "https://www.youtube.com/watch?v=qDHnCFMZ9HA&t=2s", courseUrl: "https://www.udemy.com/course/video-editing-101-learn-the-basics-of-video-editing/", backgroundVideo: "Block.mp4" },
  { id: 9, name: "E-commerce", description: "Learn to build and manage online businesses and marketplaces.", videoUrl: "https://www.youtube.com/watch?v=zLaOpZrLg70", courseUrl: "https://www.udemy.com/course/online-business-hacks-ecommerce/", backgroundVideo: "Block.mp4" },
  { id: 10, name: "Finance and Fintech", description: "Explore financial technology and modern banking solutions.", videoUrl: "https://www.youtube.com/watch?v=EJHPltmAULA", courseUrl: "https://www.edx.org/learn/financial-accounting/massachusetts-institute-of-technology-financial-accounting", backgroundVideo: "Block.mp4" },
  { id: 11, name: "Large Language Modelling", description: "Learn about NLP and large language models like GPT.", videoUrl: "https://www.youtube.com/watch?v=xZDB1naRUlk", courseUrl: "https://www.udemy.com/course/build-ranking-system-stock-market-pro-chatbot-using-aiml/", backgroundVideo: "cloud_computing.mp4" },
  { id: 12, name: "Generative AI", description: "Master AI systems that create content and solve complex problems.", videoUrl: "https://www.youtube.com/watch?v=mEsleV16qdo", courseUrl: "https://www.udemy.com/course/a-gentle-introduction-to-generative-ai/", backgroundVideo: "cloud_computing.mp4" },
  { id: 13, name: "Database Management", description: "Learn to design, implement, and manage database systems.", videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY", courseUrl: "https://www.udemy.com/course/unity-mysql-database-management/", backgroundVideo: "cloud_computing.mp4" },
  { id: 14, name: "Product Management", description: "Master the art of product development and management.", videoUrl: "https://www.youtube.com/watch?v=T0oO_-JlOdA", courseUrl: "https://www.coursera.org/enroll/google-project-management/paidmedia", backgroundVideo: "cloud_computing.mp4" },
  { id: 15, name: "UI/UX Design", description: "Create beautiful and functional user interfaces and experiences.", videoUrl: "https://www.youtube.com/watch?v=BU_afT-aIn0", courseUrl: "https://www.coursera.org/professional-certificates/ux-design", backgroundVideo: "cloud_computing.mp4" },
  { id: 16, name: "Automotive and Electric Vehicles", description: "Explore modern automotive technology and electric vehicles.", videoUrl: "https://youtu.be/qIfjibyt6pY", courseUrl: "https://alison.com/course/diploma-in-automotive-systems-training", backgroundVideo: "cyber.mp4" },
  { id: 17, name: "Game Development", description: "Create engaging games using modern development tools.", videoUrl: "https://youtu.be/6UlU_FsicK8?si=Nabx7c3bdWNjGmJk", courseUrl: "https://www.coursera.org/specializations/game-design-and-development", backgroundVideo: "cyber.mp4" },
  { id: 18, name: "DevOps", description: "Master development operations and automation.", videoUrl: "https://www.youtube.com/watch?v=hQcFE0RD0cQ&t=4s", courseUrl: "https://www.coursera.org/learn/intro-to-devops", backgroundVideo: "cyber.mp4" },
  { id: 19, name: "App Development", description: "Build mobile and web applications for various platforms.", videoUrl: "https://www.youtube.com/watch?v=VPvVD8t02U8", courseUrl: "https://www.coursera.org/professional-certificates/meta-android-developer", backgroundVideo: "cyber.mp4" },
  { id: 20, name: "Web Development", description: "Create modern web applications and services.", videoUrl: "https://www.youtube.com/watch?v=ZxKM3DCV2kE", courseUrl: "https://www.coursera.org/specializations/html-css-javascript-for-web-developers", backgroundVideo: "cyber.mp4" }
];

// Improved course allocations with more logical groupings
export const courseAllocations: CourseAllocations = {
  // Data Science: Strong focus on data, analytics, and mathematical skills
  1: { 
    A: ['T1', 'T2', 'T4', 'T5', 'T7'],  // Core data and analytical skills
    B: ['T3', 'T8', 'T9', 'N1', 'N5'],  // Technical aptitude and attention to detail
    C: ['N6', 'N7', 'N9', 'N10', 'T6'], // Learning commitment and adaptability
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Supplementary skills
  },
  
  // AI/ML: Heavy emphasis on advanced technical skills and mathematical thinking
  2: {
    A: ['T1', 'T2', 'T4', 'T5', 'T8'],  // Core technical and problem-solving skills
    B: ['T3', 'T7', 'T9', 'N1', 'N6'],  // Technical curiosity and learning ability
    C: ['N5', 'N7', 'N9', 'N10', 'T6'], // Commitment and precision
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Collaboration and practical skills
  },
  
  // Software Development: Focus on coding and problem-solving
  3: {
    A: ['T5', 'T2', 'T3', 'T4', 'T8'],  // Core programming and problem-solving
    B: ['T6', 'T7', 'T9', 'N1', 'N5'],  // Technical precision and self-motivation
    C: ['N2', 'N6', 'N7', 'N9', 'T10'], // Teamwork and practical application
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication and continuous learning
  },
  
  // Cybersecurity: Strong focus on technical security and attention to detail
  4: {
    A: ['T5', 'T7', 'T8', 'T9', 'T6'],  // Core security and technical skills
    B: ['T2', 'T3', 'T4', 'N5', 'N6'],  // Problem-solving and adaptability
    C: ['T1', 'N1', 'N7', 'N9', 'N10'], // Analytical thinking and commitment
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Team collaboration
  },
  
  // Digital Marketing: Balance of technical and communication skills
  5: {
    A: ['N3', 'N4', 'N6', 'N7', 'T1'],  // Communication and market awareness
    B: ['T2', 'T6', 'N1', 'N2', 'N5'],  // Analysis and organization
    C: ['T3', 'T9', 'N8', 'N9', 'N10'], // Technical interest and learning
    D: ['T4', 'T5', 'T7', 'T8', 'T10']  // Technical support skills
  },
  
  // Blockchain: Technical understanding with financial awareness
  6: {
    A: ['T2', 'T5', 'T8', 'T9', 'T1'],  // Technical and analytical skills
    B: ['T3', 'T4', 'T6', 'N1', 'N7'],  // Learning ability and market awareness
    C: ['T7', 'N5', 'N6', 'N9', 'N10'], // Precision and commitment
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Communication
  },
  
  // Cloud Computing: Infrastructure and system management focus
  7: {
    A: ['T3', 'T5', 'T6', 'T8', 'T9'],  // Core technical skills
    B: ['T2', 'T4', 'T7', 'N1', 'N5'],  // Problem-solving and precision
    C: ['N2', 'N6', 'N7', 'N9', 'T10'], // Collaboration and practical skills
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication and learning
  },
  
  // Photo/Video Editing: Creative technical skills
  8: {
    A: ['T6', 'T7', 'N3', 'N4', 'N6'],  // Technical creativity and communication
    B: ['T3', 'T10', 'N1', 'N5', 'N8'], // Practical skills and organization
    C: ['N2', 'N7', 'N9', 'N10', 'T9'], // Professional development
    D: ['T1', 'T2', 'T4', 'T5', 'T8']   // Technical support skills
  },
  
  // E-commerce: Business and technical balance
  9: {
    A: ['N3', 'N4', 'N7', 'T1', 'T6'],  // Business and basic technical skills
    B: ['T2', 'N1', 'N2', 'N5', 'N6'],  // Analysis and organization
    C: ['T3', 'T9', 'N8', 'N9', 'N10'], // Technical interest and learning
    D: ['T4', 'T5', 'T7', 'T8', 'T10']  // Technical support skills
  },
  
  // Finance/Fintech: Financial analysis and technology
  10: {
    A: ['T1', 'T2', 'T6', 'N5', 'N7'],  // Analysis and market awareness
    B: ['T3', 'T4', 'T5', 'N1', 'N6'],  // Technical learning and adaptability
    C: ['T7', 'T8', 'T9', 'N9', 'N10'], // Technical precision
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Communication
  },
  
  // LLM: Advanced AI and language processing
  11: {
    A: ['T1', 'T2', 'T4', 'T5', 'T8'],  // Core technical skills
    B: ['T3', 'T7', 'T9', 'N1', 'N6'],  // Learning and precision
    C: ['N5', 'N7', 'N9', 'N10', 'T6'], // Commitment and adaptability
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Communication
  },
  
  // Generative AI: Creative AI applications
  12: {
    A: ['T1', 'T2', 'T4', 'T5', 'T8'],  // Technical foundation
    B: ['T3', 'T7', 'T9', 'N1', 'N6'],  // Creative technical skills
    C: ['N5', 'N7', 'N9', 'N10', 'T6'], // Innovation and commitment
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Collaboration
  },
  
  // Database Management: Data organization and system design
  13: {
    A: ['T1', 'T5', 'T7', 'T8', 'T9'],  // Core database skills
    B: ['T2', 'T3', 'T4', 'N1', 'N5'],  // Technical learning and organization
    C: ['T6', 'N6', 'N7', 'N9', 'N10'], // Technical precision
    D: ['N2', 'N3', 'N4', 'N8', 'T10']  // Team collaboration
  },
  
  // Product Management: Leadership and technical understanding
  14: {
    A: ['N2', 'N3', 'N4', 'N6', 'N7'],  // Leadership and communication
    B: ['T2', 'T4', 'N1', 'N5', 'N10'], // Analysis and organization
    C: ['T3', 'T6', 'T9', 'N8', 'N9'],  // Technical awareness
    D: ['T1', 'T5', 'T7', 'T8', 'T10']  // Technical support skills
  },
  
  // UI/UX Design: Design and user experience focus
  15: {
    A: ['N3', 'N4', 'T6', 'T7', 'T9'],  // Design and user communication
    B: ['T2', 'T3', 'N1', 'N5', 'N6'],  // Creative problem-solving
    C: ['N2', 'N7', 'N8', 'N9', 'N10'], // Professional skills
    D: ['T1', 'T4', 'T5', 'T8', 'T10']  // Technical support skills
  },
  
  // Automotive/EV: Technical systems and engineering
  16: {
    A: ['T2', 'T3', 'T8', 'T9', 'T10'], // Technical and practical skills
    B: ['T4', 'T5', 'T6', 'T7', 'N5'],  // Engineering precision
    C: ['N1', 'N6', 'N7', 'N9', 'N10'], // Learning and commitment
    D: ['T1', 'N2', 'N3', 'N4', 'N8']   // Support skills
  },
  
  // Game Development: Creative technical development
  17: {
    A: ['T5', 'T2', 'T3', 'T6', 'T9'],  // Core development skills
    B: ['T4', 'T7', 'T8', 'N1', 'N6'],  // Technical creativity
    C: ['N2', 'N5', 'N7', 'N9', 'T10'], // Collaboration and practical skills
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication
  },
  
  // DevOps: System operations and automation
  18: {
    A: ['T5', 'T6', 'T8', 'T9', 'T3'],  // Core DevOps skills
    B: ['T2', 'T4', 'T7', 'N1', 'N5'],  // Technical precision
    C: ['N2', 'N6', 'N7', 'N9', 'T10'], // Collaboration and practical skills
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication
  },
  
  // App Development: Mobile and application focus
  19: {
    A: ['T5', 'T3', 'T6', 'T7', 'T8'],  // Core development skills
    B: ['T2', 'T4', 'T9', 'N1', 'N5'],  // Technical aptitude
    C: ['N2', 'N6', 'N7', 'N9', 'T10'], // Collaboration and practical skills
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication
  },
  
  // Web Development: Web technologies and design
  20: {
    A: ['T5', 'T3', 'T6', 'T7', 'T8'],  // Core web development skills
    B: ['T2', 'T4', 'T9', 'N1', 'N5'],  // Technical learning
    C: ['N2', 'N6', 'N7', 'N9', 'T10'], // Collaboration and practical skills
    D: ['N3', 'N4', 'N8', 'N10', 'T1']  // Communication
  }
};
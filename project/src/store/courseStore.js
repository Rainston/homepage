import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [],
      userPreferences: {
        learningStyle: 'sequential', // or 'flexible'
        dailyGoal: 2, // number of topics per day
        difficulty: 'medium', // easy, medium, hard
      },

      // Add a new course with predefined structure
      addCourse: (course) =>
        set((state) => ({
          courses: [...state.courses, { 
            ...course, 
            id: Date.now(), 
            topics: [], 
            progress: 0,
            lastAccessed: Date.now(),
            recommendations: [],
          }],
        })),

      // Update course topics with optimized structure
      updateTopics: (courseId, topics) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId ? {
              ...course,
              topics: topics.map(t => ({
                ...t,
                id: t.id,
                completed: false,
                mastery: 0, // 0-100 mastery level
                lastPracticed: null,
                subtopics: [],
                isLearning: false,
                difficulty: 'medium',
                estimatedTimeMinutes: 30,
                prerequisites: [],
                resources: []
              }))
            } : course
          ),
        })),

      // Update subtopics with learning optimization
      updateSubTopics: (courseId, topicId, subtopics) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  topics: course.topics.map((topic) =>
                    topic.id === topicId
                      ? { 
                          ...topic, 
                          subtopics: subtopics.map(st => ({
                            ...st,
                            completed: false,
                            mastery: 0,
                            lastPracticed: null,
                            difficulty: 'medium',
                            estimatedTimeMinutes: 15,
                            prerequisites: [],
                            resources: []
                          })), 
                          isLearning: true 
                        }
                      : topic
                  ),
                }
              : course
          ),
        })),

      // Update progress with mastery tracking
      updateProgress: (courseId, topicId, subtopicId, score) =>
        set((state) => ({
          courses: state.courses.map((course) => {
            if (course.id === courseId) {
              const updatedTopics = course.topics.map((topic) => {
                if (topic.id === topicId) {
                  const updatedSubtopics = topic.subtopics.map(st =>
                    st.id === subtopicId
                      ? {
                          ...st,
                          completed: true,
                          mastery: Math.min(st.mastery + score, 100),
                          lastPracticed: Date.now()
                        }
                      : st
                  );
                  
                  const topicMastery = updatedSubtopics.reduce((acc, st) => acc + st.mastery, 0) / updatedSubtopics.length;
                  
                  return {
                    ...topic,
                    completed: topicMastery >= 80,
                    mastery: topicMastery,
                    subtopics: updatedSubtopics
                  };
                }
                return topic;
              });

              const overallProgress = updatedTopics.reduce((acc, topic) => acc + topic.mastery, 0) / updatedTopics.length;

              return { 
                ...course, 
                topics: updatedTopics, 
                progress: Math.round(overallProgress),
                lastAccessed: Date.now()
              };
            }
            return course;
          }),
        })),

      // Get personalized recommendations
      getRecommendations: (courseId) => {
        const state = get();
        const course = state.courses.find(c => c.id === courseId);
        if (!course) return [];

        const recommendations = [];
        const { userPreferences } = state;

        course.topics.forEach(topic => {
          // Skip completed topics with high mastery
          if (topic.completed && topic.mastery >= 90) return;

          // Check prerequisites
          const prerequisitesMet = topic.prerequisites.every(preReqId => {
            const preReqTopic = course.topics.find(t => t.id === preReqId);
            return preReqTopic && preReqTopic.mastery >= 70;
          });

          if (!prerequisitesMet) return;

          // Calculate topic priority
          const priority = calculateTopicPriority(topic, userPreferences);

          // Add topic to recommendations
          recommendations.push({
            topicId: topic.id,
            subtopicId: getNextSubtopic(topic)?.id,
            priority,
            reason: getRecommendationReason(topic, userPreferences)
          });
        });

        // Sort by priority and return top 5
        return recommendations
          .sort((a, b) => b.priority - a.priority)
          .slice(0, 5);
      },

      // Update user preferences
      updateUserPreferences: (preferences) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences }
        })),
    }),
    {
      name: 'course-storage',
    }
  )
);

// Helper function to calculate topic priority
const calculateTopicPriority = (topic, preferences) => {
  let priority = 0;

  // Base priority on mastery (lower mastery = higher priority)
  priority += (100 - topic.mastery);

  // Adjust based on difficulty preference
  if (topic.difficulty === preferences.difficulty) {
    priority += 20;
  }

  // Prioritize recently started topics
  if (topic.isLearning) {
    priority += 30;
  }

  // Time decay for last practiced
  if (topic.lastPracticed) {
    const daysSinceLastPractice = (Date.now() - topic.lastPracticed) / (1000 * 60 * 60 * 24);
    priority += Math.min(daysSinceLastPractice * 5, 50);
  }

  return priority;
};

// Helper function to get next incomplete subtopic
const getNextSubtopic = (topic) => {
  return topic.subtopics.find(st => !st.completed || st.mastery < 80);
};

// Helper function to generate recommendation reason
const getRecommendationReason = (topic, preferences) => {
  if (!topic.lastPracticed) {
    return "New topic to explore";
  }
  if (topic.mastery < 50) {
    return "Needs more practice to improve mastery";
  }
  if (topic.isLearning) {
    return "Continue your learning progress";
  }
  return "Review to maintain knowledge";
};

export default useCourseStore;
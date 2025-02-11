import React, { useEffect, useState } from 'react';
import useCourseStore from '../store/courseStore';

const CourseOptimizer = () => {
  const { 
    courses, 
    addCourse, 
    updateTopics, 
    updateSubTopics, 
    updateProgress,
    getRecommendations,
    userPreferences,
    updateUserPreferences
  } = useCourseStore();

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (selectedCourse) {
      const courseRecommendations = getRecommendations(selectedCourse.id);
      setRecommendations(courseRecommendations);
    }
  }, [selectedCourse, getRecommendations]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleTopicComplete = (topicId, subtopicId, score) => {
    if (selectedCourse) {
      updateProgress(selectedCourse.id, topicId, subtopicId, score);
    }
  };

  const handlePreferenceUpdate = (preferences) => {
    updateUserPreferences(preferences);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Course Optimizer
          </h1>
          <p className="text-lg text-gray-600">
            Personalized learning path based on your progress and preferences
          </p>
        </div>

        {/* User Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Learning Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Style
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={userPreferences.learningStyle}
                onChange={(e) => handlePreferenceUpdate({ learningStyle: e.target.value })}
              >
                <option value="sequential">Sequential</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Goal (Topics)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={userPreferences.dailyGoal}
                onChange={(e) => handlePreferenceUpdate({ dailyGoal: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Difficulty
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={userPreferences.difficulty}
                onChange={(e) => handlePreferenceUpdate({ difficulty: e.target.value })}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`cursor-pointer rounded-lg border p-6 transition-all ${
                  selectedCourse?.id === course.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => handleCourseSelect(course)}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{course.topics.length} Topics</span>
                  <span>{course.progress}% Complete</span>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {selectedCourse && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Recommended Next Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec) => {
                const topic = selectedCourse.topics.find(t => t.id === rec.topicId);
                const subtopic = topic?.subtopics.find(s => s.id === rec.subtopicId);
                
                return (
                  <div
                    key={`${rec.topicId}-${rec.subtopicId}`}
                    className="bg-white rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {topic?.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {subtopic?.title}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {topic?.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Estimated: {topic?.estimatedTimeMinutes} mins
                      </span>
                      <button
                        onClick={() => handleTopicComplete(rec.topicId, rec.subtopicId, 20)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Start Learning
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Course Content */}
        {selectedCourse && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Course Content
            </h2>
            <div className="space-y-6">
              {selectedCourse.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {topic.title}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        topic.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {topic.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topic.subtopics.map((subtopic) => (
                      <div
                        key={subtopic.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          subtopic.completed
                            ? 'bg-green-50'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {subtopic.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Mastery: {subtopic.mastery}%
                          </p>
                        </div>
                        <button
                          onClick={() => handleTopicComplete(topic.id, subtopic.id, 20)}
                          disabled={subtopic.completed}
                          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                            subtopic.completed
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          }`}
                        >
                          {subtopic.completed ? 'Completed' : 'Complete'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOptimizer;

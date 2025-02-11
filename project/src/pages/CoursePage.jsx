import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCourseStore from '../store/courseStore';
import { generateTopics } from '../services/gemini';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import CourseOptimizer from '../components/CourseOptimizer';

export default function CoursePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const { courses, updateTopics, getRecommendations } = useCourseStore();
  const course = courses.find((c) => c.id === parseInt(id));
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (course && !course.topics?.length) {
        setLoading(true);
        setError(null);
        try {
          const topics = await generateTopics(course.name, course.level);
          updateTopics(course.id, topics.map((t, i) => ({ 
            ...t, 
            id: i,
            mastery: 0,
            lastPracticed: null,
            difficulty: course.level,
            estimatedTimeMinutes: 30,
            prerequisites: [],
            resources: []
          })));
        } catch (error) {
          setError(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopics();
  }, [course, updateTopics]);

  useEffect(() => {
    if (course) {
      const recs = getRecommendations(course.id);
      setRecommendations(recs);
    }
  }, [course, getRecommendations]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">Course not found</p>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{course.name}</h2>
          <p className="text-gray-600">
            Level: {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </p>
        </div>
        <button
          onClick={() => setShowOptimizer(!showOptimizer)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <span>{showOptimizer ? 'Hide Optimizer' : 'Show Optimizer'}</span>
        </button>
      </div>

      {showOptimizer && (
        <div className="mb-8">
          <CourseOptimizer />
        </div>
      )}

      {!showOptimizer && recommendations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended Next Steps</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => {
              const topic = course.topics.find(t => t.id === rec.topicId);
              return (
                <div
                  key={rec.topicId}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{topic?.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{rec.reason}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Priority Score: {Math.round(rec.priority)}</span>
                    <Link
                      to={`/course/${course.id}/topic/${rec.topicId}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {course.topics?.map((topic, index) => (
            <div
              key={topic.id}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all ${
                topic.isLearning ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {index + 1}. {topic.title}
                  </h3>
                  {topic.mastery > 0 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Mastery: {Math.round(topic.mastery)}%
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="space-y-2">
                  {topic.lastPracticed && (
                    <p className="text-sm text-gray-500">
                      Last practiced: {new Date(topic.lastPracticed).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex justify-between items-center space-x-4">
                    <Link
                      to={`/course/${course.id}/topic/${topic.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex-1 text-center"
                    >
                      {topic.isLearning ? 'Continue Learning' : 'Start Learning'}
                    </Link>
                    {topic.completed ? (
                      <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Mastered ({topic.mastery}%)
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={`/course/${course.id}/topic/${topic.id}/test`}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Take Test
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateSubTopics, generateSubtopicExplanation, generateDetailedExplanation } from '../services/gemini';
import useCourseStore from '../store/courseStore';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import LearningChat from '../components/LearningChat';

export default function TopicPage() {
  const { courseId, topicId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);
  const { courses, updateSubTopics, updateProgress } = useCourseStore();
  
  const course = courses.find((c) => c.id === parseInt(courseId));
  const topic = course?.topics.find((t) => t.id === parseInt(topicId));

  useEffect(() => {
    const loadTopicDetails = async () => {
      if (!topic?.subtopics?.length) {
        setLoading(true);
        try {
          const subtopics = await generateSubTopics(topic.title);
          const enrichedSubtopics = subtopics.map((st, index) => ({
            ...st,
            id: index,
            mastery: 0,
            lastPracticed: null,
            difficulty: 'medium',
            estimatedTimeMinutes: 15,
            prerequisites: [],
            resources: []
          }));
          updateSubTopics(parseInt(courseId), parseInt(topicId), enrichedSubtopics);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
    };
    loadTopicDetails();
  }, [topic, courseId, topicId, updateSubTopics]);

  const handleSubtopicClick = async (subtopic) => {
    setSelectedSubtopic(subtopic);
    setShowDetailedExplanation(false);
    setLoading(true);
    try {
      const explanationText = await generateSubtopicExplanation(subtopic.title);
      const cleanExplanation = explanationText
        .replace(/\*\*/g, '')
        .split('\n')
        .filter(line => line.trim())
        .join('\n');
      setExplanation(cleanExplanation);
      
      // Update progress when viewing a subtopic
      updateProgress(parseInt(courseId), parseInt(topicId), subtopic.id, 10);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailedExplanation = async () => {
    if (!selectedSubtopic) return;
    setLoading(true);
    try {
      const detailed = await generateDetailedExplanation(selectedSubtopic.title);
      const cleanDetailed = detailed
        .replace(/\*\*/g, '')
        .split('\n')
        .filter(line => line.trim())
        .join('\n');
      setDetailedExplanation(cleanDetailed);
      setShowDetailedExplanation(true);
      
      // Update progress when viewing detailed explanation
      updateProgress(parseInt(courseId), parseInt(topicId), selectedSubtopic.id, 15);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMasteryUpdate = (subtopicId, masteryIncrease) => {
    updateProgress(parseInt(courseId), parseInt(topicId), subtopicId, masteryIncrease);
  };

  if (!topic) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">Topic not found</p>
        <Link to={`/course/${courseId}`} className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Return to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <Link to={`/course/${courseId}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Course
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subtopics List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{topic.title}</h2>
              <div className="space-y-4">
                {topic.subtopics?.map((subtopic) => (
                  <div
                    key={subtopic.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedSubtopic?.id === subtopic.id
                        ? 'bg-indigo-50 border-2 border-indigo-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSubtopicClick(subtopic)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {subtopic.title}
                      </h3>
                      {subtopic.mastery > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {Math.round(subtopic.mastery)}% Mastered
                        </span>
                      )}
                    </div>
                    {subtopic.lastPracticed && (
                      <p className="text-sm text-gray-500">
                        Last studied: {new Date(subtopic.lastPracticed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : selectedSubtopic ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {selectedSubtopic.title}
                  </h3>
                  <div className="prose max-w-none">
                    {explanation.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {!showDetailedExplanation && (
                    <button
                      onClick={handleDetailedExplanation}
                      className="mt-4 text-indigo-600 hover:text-indigo-800"
                    >
                      Show Detailed Explanation
                    </button>
                  )}
                </div>

                {showDetailedExplanation && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Detailed Explanation
                    </h3>
                    <div className="prose max-w-none">
                      {detailedExplanation.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Chat */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <LearningChat
                    topic={topic.title}
                    subtopic={selectedSubtopic.title}
                    onProgress={() => handleMasteryUpdate(selectedSubtopic.id, 5)}
                  />
                </div>

                {/* Practice Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Practice</h3>
                  <Link
                    to={`/course/${courseId}/topic/${topicId}/test`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Take Practice Test
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-600">Select a subtopic to begin learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useCallback, memo, useMemo, useRef, useEffect } from 'react';
import { questions, courses, courseAllocations } from './data';
import { getTopRecommendations, getYouTubeVideoId } from './utils';
import { StarRating } from './components/StarRating';
import { UserResponses } from './types';
import { GraduationCap, ArrowRight, RotateCcw } from 'lucide-react';



interface VideoBackgroundProps {
  videoPath: string;
}

const VideoBackground = memo(({ videoPath }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      console.log('Loading video:', videoPath);
      
      videoRef.current.play()
        .then(() => {
          console.log('Video playing successfully');
        })
        .catch((error) => {
          console.error('Error playing video:', error);
        });

      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error:', (e.target as HTMLVideoElement).error);
      });
    }
  }, [videoPath]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover -z-10"
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
    >
      <source src={videoPath} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

VideoBackground.displayName = 'VideoBackground';

const App = memo(function App() {
  const [started, setStarted] = useState(false);
  const [showTechnical, setShowTechnical] = useState(true);
  const [responses, setResponses] = useState<UserResponses>({});
  const [showResults, setShowResults] = useState(false);

  const handleRatingChange = useCallback((questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const technicalQuestions = useMemo(() => questions.filter(q => q.type === 'technical'), []);
  const nonTechnicalQuestions = useMemo(() => questions.filter(q => q.type === 'non-technical'), []);

  const allTechnicalAnswered = useMemo(() => technicalQuestions.every(q => responses[q.id]), [technicalQuestions, responses]);
  const allNonTechnicalAnswered = useMemo(() => nonTechnicalQuestions.every(q => responses[q.id]), [nonTechnicalQuestions, responses]);

  const handleNext = () => {
    if (showTechnical && allTechnicalAnswered) {
      setShowTechnical(false);
    } else if (!showTechnical && allNonTechnicalAnswered) {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setResponses({});
    setShowTechnical(true);
    setShowResults(false);
    setStarted(false);
  };

  const recommendedCourse = showResults ? courses[getTopRecommendations(responses, courseAllocations, 1)[0] - 1] : null;

  if (!started) {
    return (
      <>
        <VideoBackground videoPath="/path.mp4" />
        <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
          <div className="max-w-md w-full text-center text-white">
            <GraduationCap className="w-16 h-16 mx-auto text-indigo-600 mb-6" />
            <h1 className="text-4xl font-bold mb-4">
              Find Your Perfect Course
            </h1>
            <p className="text-lg mb-8 text-white/90">
              Answer a few questions about your skills and preferences to discover the ideal course for you.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </>
    );
  }

  if (showResults && recommendedCourse) {
    const videoId = getYouTubeVideoId(recommendedCourse.videoUrl);

    return (
      <>
        <VideoBackground videoPath={`/${recommendedCourse.backgroundVideo}`} />
        <div className="min-h-screen py-8 px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-white">
            <div className="text-center mb-8">
              <GraduationCap className="w-16 h-16 mx-auto text-white" />
              <h2 className="mt-6 text-3xl font-bold text-white">
                Your Perfect Course Match
              </h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-3">
                {recommendedCourse.name}
              </h3>
              <p className="text-lg text-white/90 mb-6">
                {recommendedCourse.description}
              </p>
              <div className="flex flex-col gap-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
                  <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  />
                </div>

                <div className="flex justify-center">
                  <a
                    href={recommendedCourse.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                  >
                    Enroll in Course
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start Over
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }



  const currentQuestions = showTechnical ? technicalQuestions : nonTechnicalQuestions;
  const allCurrentAnswered = showTechnical ? allTechnicalAnswered : allNonTechnicalAnswered;

  return (
    <>
        <VideoBackground videoPath="/path.mp4" />
      <div className="min-h-screen py-8 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-white">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">
              {showTechnical ? 'Technical Skills Assessment' : 'Personal Preferences'}
            </h2>
            <p className="mt-2 text-white/90">
              {showTechnical
                ? 'Rate your technical abilities and interests'
                : 'Tell us about your learning style and preferences'}
            </p>
          </div>

          <div className="space-y-6 mt-12">
            {currentQuestions.map(question => (
              <div key={question.id} className="p-4">
                <div className="flex items-center justify-between">
                    <span className="text-white text-lg pr-4">{question.text}</span>
                  <StarRating
                    value={responses[question.id] || 0}
                    onChange={(value) => handleRatingChange(question.id, value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!allCurrentAnswered}
              className={`inline-flex items-center px-6 py-3 rounded-lg text-white font-medium ${
                allCurrentAnswered
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {showTechnical ? 'Next Section' : 'Get Recommendation'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default App;


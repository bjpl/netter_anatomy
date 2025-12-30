import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Volume2,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

interface ContentSection {
  id: string;
  type: 'text' | '3d-viewer' | 'quiz' | 'reference';
  content: any;
}

const ModuleView: React.FC = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Mock data - replace with actual data from context/API
  const [moduleData] = useState({
    id: moduleId || 'mod6',
    chapterId: 'ch1',
    title: 'Spinal Cord Anatomy',
    totalSections: 8,
    currentProgress: 3,
  });

  const [sections] = useState<ContentSection[]>([
    {
      id: 'sec1',
      type: 'text',
      content: {
        title: 'Overview of Spinal Cord',
        text: 'The spinal cord is a cylindrical structure that extends from the medulla oblongata at the foramen magnum to approximately the L1-L2 vertebral level. It is protected by the vertebral column and surrounded by three meningeal layers: dura mater, arachnoid mater, and pia mater.',
      },
    },
    {
      id: 'sec2',
      type: '3d-viewer',
      content: {
        title: 'Spinal Cord 3D Model',
        modelUrl: '/models/spinal-cord.glb',
        description: 'Explore the 3D anatomy of the spinal cord',
      },
    },
    {
      id: 'sec3',
      type: 'text',
      content: {
        title: 'Gray Matter Organization',
        text: 'The gray matter of the spinal cord is organized into dorsal (posterior) and ventral (anterior) horns. The dorsal horn contains sensory neurons, while the ventral horn contains motor neurons. In thoracic and upper lumbar segments, a lateral horn is present containing autonomic preganglionic neurons.',
      },
    },
  ]);

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleTTS = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate(`/guided/chapter/${moduleData.chapterId}`);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Module complete - return to chapter overview
      navigate(`/guided/chapter/${moduleData.chapterId}`);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection]);

  const currentSectionData = sections[currentSection];

  const renderContent = () => {
    if (!currentSectionData) return null;

    switch (currentSectionData.type) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {currentSectionData.content.title}
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <button
                onClick={() => handleTTS(currentSectionData.content.text)}
                className={`flex-shrink-0 p-3 rounded-lg transition-colors ${
                  isSpeaking
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Read aloud"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentSectionData.content.text}
              </p>
            </div>
          </div>
        );

      case '3d-viewer':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {currentSectionData.content.title}
            </h2>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-8 mb-4">
              <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                <p className="text-gray-500">
                  3D Viewer Component (model:{' '}
                  {currentSectionData.content.modelUrl})
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-center">
              {currentSectionData.content.description}
            </p>
          </div>
        );

      case 'quiz':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Quick Check
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <p className="text-lg text-gray-700 mb-4">
                {currentSectionData.content.question}
              </p>
              {/* Quiz component would go here */}
            </div>
          </div>
        );

      case 'reference':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Topics
            </h2>
            <div className="space-y-3">
              {currentSectionData.content.references?.map((ref: any) => (
                <button
                  key={ref.id}
                  className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {ref.title}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate(`/guided/chapter/${moduleData.chapterId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Chapter</span>
            </button>
            <span className="text-sm text-gray-600">
              Section {currentSection + 1} of {sections.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-lg font-semibold text-gray-900">
                {moduleData.title}
              </h1>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          {renderContent()}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            {currentSection === 0 ? 'Back to Chapter' : 'Previous'}
          </button>

          <div className="flex gap-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSection
                    ? 'bg-blue-600 w-8'
                    : index < currentSection
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            {currentSection === sections.length - 1
              ? 'Complete Module'
              : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Use{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded border">←</kbd> and{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded border">→</kbd> to
          navigate
        </div>
      </div>
    </div>
  );
};

export default ModuleView;

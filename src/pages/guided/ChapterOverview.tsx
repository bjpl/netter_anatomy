import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModuleProgress } from '../../components/guided/ModuleProgress';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Target,
  Play,
  CheckCircle,
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  isComplete: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  estimatedMinutes?: number;
}

interface LearningObjective {
  id: string;
  text: string;
  isComplete: boolean;
}

const ChapterOverview: React.FC = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data from context/API
  const [chapterData] = useState({
    id: chapterId || 'ch1',
    number: 1,
    title: 'Back and Spinal Cord',
    description:
      'Explore the anatomy of the vertebral column, spinal cord, and associated structures. Learn about the intricate relationships between bones, ligaments, muscles, and neural pathways.',
    coverImage: '/images/chapters/chapter1.jpg',
    totalProgress: 62,
    estimatedTimeRemaining: 120, // minutes
  });

  const [modules] = useState<Module[]>([
    {
      id: 'mod1',
      title: 'Introduction to Vertebral Column',
      isComplete: true,
      isCurrent: false,
      isLocked: false,
    },
    {
      id: 'mod2',
      title: 'Cervical Vertebrae',
      isComplete: true,
      isCurrent: false,
      isLocked: false,
    },
    {
      id: 'mod3',
      title: 'Thoracic and Lumbar Vertebrae',
      isComplete: true,
      isCurrent: false,
      isLocked: false,
    },
    {
      id: 'mod4',
      title: 'Sacrum and Coccyx',
      isComplete: true,
      isCurrent: false,
      isLocked: false,
    },
    {
      id: 'mod5',
      title: 'Intervertebral Discs and Ligaments',
      isComplete: true,
      isCurrent: false,
      isLocked: false,
    },
    {
      id: 'mod6',
      title: 'Spinal Cord Anatomy',
      isComplete: false,
      isCurrent: true,
      isLocked: false,
      estimatedMinutes: 45,
    },
    {
      id: 'mod7',
      title: 'Spinal Nerves and Meninges',
      isComplete: false,
      isCurrent: false,
      isLocked: false,
      estimatedMinutes: 50,
    },
    {
      id: 'mod8',
      title: 'Clinical Applications',
      isComplete: false,
      isCurrent: false,
      isLocked: false,
      estimatedMinutes: 35,
    },
  ]);

  const [objectives] = useState<LearningObjective[]>([
    {
      id: 'obj1',
      text: 'Identify and describe the features of each vertebral region',
      isComplete: true,
    },
    {
      id: 'obj2',
      text: 'Explain the structure and function of intervertebral discs',
      isComplete: true,
    },
    {
      id: 'obj3',
      text: 'Trace the pathway of spinal nerves from cord to periphery',
      isComplete: false,
    },
    {
      id: 'obj4',
      text: 'Describe the protective layers of the spinal cord',
      isComplete: false,
    },
    {
      id: 'obj5',
      text: 'Apply anatomical knowledge to common clinical scenarios',
      isComplete: false,
    },
  ]);

  const currentModule = modules.find((m) => m.isCurrent);
  const completedCount = modules.filter((m) => m.isComplete).length;

  const handleModuleClick = (moduleId: string) => {
    navigate(`/guided/module/${moduleId}`);
  };

  const handleStartNext = () => {
    if (currentModule) {
      navigate(`/guided/module/${currentModule.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/guided')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Chapters</span>
        </button>

        {/* Chapter header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-sm font-semibold mb-2 opacity-90">
                  Chapter {chapterData.number}
                </p>
                <h1 className="text-4xl font-bold mb-2">{chapterData.title}</h1>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {completedCount} / {modules.length} modules
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>~{chapterData.estimatedTimeRemaining} min left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {chapterData.description}
            </p>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Chapter Progress
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {chapterData.totalProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
                  style={{ width: `${chapterData.totalProgress}%` }}
                />
              </div>
            </div>

            {/* Start next button */}
            {currentModule && (
              <button
                onClick={handleStartNext}
                className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Play className="w-6 h-6" />
                Start Next Module: {currentModule.title}
              </button>
            )}
          </div>
        </div>

        {/* Learning objectives */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            Learning Objectives
          </h2>
          <div className="space-y-3">
            {objectives.map((objective) => (
              <div
                key={objective.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {objective.isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <p
                  className={`text-gray-700 ${
                    objective.isComplete ? 'line-through opacity-60' : ''
                  }`}
                >
                  {objective.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Module list */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Modules
          </h2>
          <ModuleProgress modules={modules} onModuleClick={handleModuleClick} />
        </div>
      </div>
    </div>
  );
};

export default ChapterOverview;

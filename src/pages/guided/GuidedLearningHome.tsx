import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChapterCard } from '../../components/guided/ChapterCard';
import {
  BookOpen,
  TrendingUp,
  Award,
  Calendar,
  Target,
  Clock,
} from 'lucide-react';

interface Chapter {
  id: string;
  number: number;
  title: string;
  coverImage: string;
  moduleCount: number;
  completedModules: number;
  totalProgress: number;
  isStarted: boolean;
}

const GuidedLearningHome: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual data from context/API
  const [chapters] = useState<Chapter[]>([
    {
      id: 'ch1',
      number: 1,
      title: 'Back and Spinal Cord',
      coverImage: '/images/chapters/chapter1.jpg',
      moduleCount: 8,
      completedModules: 5,
      totalProgress: 62,
      isStarted: true,
    },
    {
      id: 'ch2',
      number: 2,
      title: 'Upper Limb',
      coverImage: '/images/chapters/chapter2.jpg',
      moduleCount: 10,
      completedModules: 0,
      totalProgress: 0,
      isStarted: false,
    },
    {
      id: 'ch3',
      number: 3,
      title: 'Thorax',
      coverImage: '/images/chapters/chapter3.jpg',
      moduleCount: 12,
      completedModules: 0,
      totalProgress: 0,
      isStarted: false,
    },
    {
      id: 'ch4',
      number: 4,
      title: 'Abdomen',
      coverImage: '/images/chapters/chapter4.jpg',
      moduleCount: 14,
      completedModules: 0,
      totalProgress: 0,
      isStarted: false,
    },
  ]);

  const [dashboardStats] = useState({
    totalModulesCompleted: 5,
    currentStreak: 12,
    weeklyGoal: 80,
    weeklyProgress: 65,
    hoursThisWeek: 4.5,
    certificatesEarned: 0,
  });

  const handleChapterSelect = (chapterId: string) => {
    navigate(`/guided/chapter/${chapterId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Guided Learning
          </h1>
          <p className="text-lg text-gray-600">
            Follow a structured path through Netter's Anatomy
          </p>
        </div>

        {/* Progress Dashboard */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            Your Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Modules completed */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Modules Completed
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.totalModulesCompleted}
                  </p>
                </div>
                <BookOpen className="w-12 h-12 text-blue-500 opacity-80" />
              </div>
            </div>

            {/* Current streak */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Current Streak
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.currentStreak} days
                  </p>
                </div>
                <Calendar className="w-12 h-12 text-orange-500 opacity-80" />
              </div>
            </div>

            {/* Hours this week */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Hours This Week
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.hoursThisWeek}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-green-500 opacity-80" />
              </div>
            </div>
          </div>

          {/* Weekly goal progress */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Goal
                </h3>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {dashboardStats.weeklyProgress}% of {dashboardStats.weeklyGoal}{' '}
                minutes
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${dashboardStats.weeklyProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Chapters section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            Chapters
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapterNumber={chapter.number}
                title={chapter.title}
                coverImage={chapter.coverImage}
                moduleCount={chapter.moduleCount}
                completedModules={chapter.completedModules}
                totalProgress={chapter.totalProgress}
                onSelect={() => handleChapterSelect(chapter.id)}
                isStarted={chapter.isStarted}
              />
            ))}
          </div>
        </div>

        {/* Achievements section */}
        {dashboardStats.certificatesEarned > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-7 h-7 text-yellow-600" />
              Achievements
            </h2>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
              <p className="text-lg text-gray-700">
                You've earned {dashboardStats.certificatesEarned} certificates!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidedLearningHome;

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from './RootLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy-loaded page components
const ExplorerHome = lazy(() => import('@/pages/explorer/ExplorerHome'));
const RegionalView = lazy(() => import('@/pages/explorer/RegionalView'));
const StructureDetail = lazy(() => import('@/pages/explorer/StructureDetail'));
const SearchResults = lazy(() => import('@/pages/explorer/SearchResults'));

const GuidedLearningHome = lazy(() => import('@/pages/guided/GuidedLearningHome'));
const ChapterOverview = lazy(() => import('@/pages/guided/ChapterOverview'));
const ModuleView = lazy(() => import('@/pages/guided/ModuleView'));
const SpacedRepetitionQueue = lazy(() => import('@/pages/guided/SpacedRepetitionQueue'));

const FlashcardDeckManager = lazy(() => import('@/pages/tools/FlashcardDeckManager'));
const Bookmarks = lazy(() => import('@/pages/tools/Bookmarks'));
const StudyHistory = lazy(() => import('@/pages/tools/StudyHistory'));

const Settings = lazy(() => import('@/pages/Settings'));

// Wrapper component for lazy-loaded routes with suspense boundary
const LazyRoute = ({ Component }: { Component: React.LazyExoticComponent<React.ComponentType<any>> }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

/**
 * Application router configuration using React Router v6
 * Implements URL structure from Section 4.3 of specs
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Default redirect to explorer
      {
        index: true,
        element: <Navigate to="/explorer" replace />,
      },

      // Explorer routes - Interactive anatomical exploration
      {
        path: 'explorer',
        children: [
          {
            index: true,
            element: <LazyRoute Component={ExplorerHome} />,
          },
          {
            path: 'region/:regionSlug',
            element: <LazyRoute Component={RegionalView} />,
          },
          {
            path: 'structure/:structureId',
            element: <LazyRoute Component={StructureDetail} />,
          },
          {
            path: 'search',
            element: <LazyRoute Component={SearchResults} />,
          },
        ],
      },

      // Guided Learning routes - Chapter-based learning system
      {
        path: 'learn',
        children: [
          {
            index: true,
            element: <LazyRoute Component={GuidedLearningHome} />,
          },
          {
            path: 'chapter/:chapterId',
            element: <LazyRoute Component={ChapterOverview} />,
          },
          {
            path: 'chapter/:chapterId/:moduleId',
            element: <LazyRoute Component={ModuleView} />,
          },
          {
            path: 'review',
            element: <LazyRoute Component={SpacedRepetitionQueue} />,
          },
        ],
      },

      // Study Tools routes - Flashcards, bookmarks, history
      {
        path: 'tools',
        children: [
          {
            path: 'flashcards',
            element: <LazyRoute Component={FlashcardDeckManager} />,
          },
          {
            path: 'bookmarks',
            element: <LazyRoute Component={Bookmarks} />,
          },
          {
            path: 'history',
            element: <LazyRoute Component={StudyHistory} />,
          },
        ],
      },

      // Settings route
      {
        path: 'settings',
        element: <LazyRoute Component={Settings} />,
      },

      // 404 fallback
      {
        path: '*',
        element: <Navigate to="/explorer" replace />,
      },
    ],
  },
]);

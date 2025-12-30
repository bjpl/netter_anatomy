import React from 'react';
import { SynthesisExercise } from '../components/guided';

/**
 * Example data for different types of synthesis exercises
 * These can be used as templates for creating educational content
 */

// Example 1: Connection Exercise - Cardiac Anatomy
export const cardiacAnatomyConnectionExercise = {
  title: 'Cardiac Anatomy Synthesis',
  description: 'Connect anatomical structures with their functions and clinical applications',
  exerciseType: 'connection' as const,
  nodes: [
    // Anatomical structures
    { id: 'sa-node', label: 'SA Node', x: 20, y: 20, type: 'structure' as const },
    { id: 'av-node', label: 'AV Node', x: 20, y: 50, type: 'structure' as const },
    { id: 'bundle-of-his', label: 'Bundle of His', x: 20, y: 80, type: 'structure' as const },

    // Functions
    { id: 'pacemaker', label: 'Natural Pacemaker', x: 50, y: 20, type: 'function' as const },
    { id: 'av-delay', label: 'AV Delay', x: 50, y: 50, type: 'function' as const },
    { id: 'ventricular-conduction', label: 'Ventricular Conduction', x: 50, y: 80, type: 'function' as const },

    // Clinical applications
    { id: 'atrial-fib', label: 'Atrial Fibrillation', x: 80, y: 20, type: 'clinical' as const },
    { id: 'heart-block', label: 'Heart Block', x: 80, y: 50, type: 'clinical' as const },
    { id: 'bundle-branch-block', label: 'Bundle Branch Block', x: 80, y: 80, type: 'clinical' as const },
  ],
  correctConnections: [
    { from: 'sa-node', to: 'pacemaker' },
    { from: 'pacemaker', to: 'atrial-fib' },
    { from: 'av-node', to: 'av-delay' },
    { from: 'av-delay', to: 'heart-block' },
    { from: 'bundle-of-his', to: 'ventricular-conduction' },
    { from: 'ventricular-conduction', to: 'bundle-branch-block' },
  ],
};

// Example 2: Clinical Case - Shoulder Pain
export const shoulderPainClinicalCase = {
  title: 'Clinical Case: Shoulder Pain',
  description: 'Analyze this patient presentation and answer questions about anatomical correlations',
  exerciseType: 'clinical' as const,
  clinicalCase: {
    id: 'shoulder-case-1',
    patient: {
      age: 45,
      gender: 'male',
      chiefComplaint: 'Right shoulder pain and limited range of motion for 3 weeks',
    },
    history: [
      'Gradual onset of pain after painting ceiling',
      'Pain worse with overhead activities',
      'Difficulty sleeping on right side',
      'No history of trauma',
      'Previous episode 2 years ago that resolved with rest',
    ],
    physicalExam: [
      'Tenderness over greater tuberosity',
      'Positive painful arc test (60-120 degrees abduction)',
      'Positive Neer impingement sign',
      'Weakness with external rotation',
      'Full passive range of motion',
      'No signs of instability',
    ],
    questions: [
      {
        id: 'q1',
        question: 'Which anatomical structure is most likely involved?',
        type: 'multiple-choice' as const,
        options: [
          'Supraspinatus tendon',
          'Biceps tendon (long head)',
          'Subscapularis tendon',
          'Deltoid muscle',
        ],
        correctAnswer: 'Supraspinatus tendon',
        explanation: 'The supraspinatus tendon is most commonly affected in rotator cuff impingement. The painful arc test (60-120 degrees) and positive Neer sign are classic findings.',
      },
      {
        id: 'q2',
        question: 'What anatomical space is narrowed in this condition?',
        type: 'multiple-choice' as const,
        options: [
          'Subacromial space',
          'Glenohumeral joint space',
          'Acromioclavicular joint space',
          'Quadrilateral space',
        ],
        correctAnswer: 'Subacromial space',
        explanation: 'Rotator cuff impingement occurs when the supraspinatus tendon is compressed in the subacromial space between the humeral head and the acromion.',
      },
      {
        id: 'q3',
        question: 'Identify all structures that form the rotator cuff',
        type: 'structure-identification' as const,
        options: [
          'Supraspinatus',
          'Infraspinatus',
          'Teres minor',
          'Subscapularis',
          'Teres major',
          'Deltoid',
        ],
        correctAnswer: ['Supraspinatus', 'Infraspinatus', 'Teres minor', 'Subscapularis'],
        explanation: 'The rotator cuff consists of four muscles: supraspinatus, infraspinatus, teres minor, and subscapularis (SITS). Teres major and deltoid are not part of the rotator cuff.',
      },
    ],
  },
};

// Example 3: Interactive Anatomy Diagram - Brachial Plexus
export const brachialPlexusDiagramTask = {
  title: 'Brachial Plexus Anatomy',
  description: 'Identify and label the components of the brachial plexus',
  exerciseType: 'diagram' as const,
  diagramTask: {
    id: 'brachial-plexus-1',
    imageUrl: '/images/anatomy/brachial-plexus.svg',
    structures: [
      // Roots
      { id: 'c5', name: 'C5 Root', x: 15, y: 20, region: 'Roots' },
      { id: 'c6', name: 'C6 Root', x: 15, y: 30, region: 'Roots' },
      { id: 'c7', name: 'C7 Root', x: 15, y: 40, region: 'Roots' },
      { id: 'c8', name: 'C8 Root', x: 15, y: 50, region: 'Roots' },
      { id: 't1', name: 'T1 Root', x: 15, y: 60, region: 'Roots' },

      // Trunks
      { id: 'superior-trunk', name: 'Superior Trunk', x: 35, y: 25, region: 'Trunks' },
      { id: 'middle-trunk', name: 'Middle Trunk', x: 35, y: 40, region: 'Trunks' },
      { id: 'inferior-trunk', name: 'Inferior Trunk', x: 35, y: 55, region: 'Trunks' },

      // Divisions
      { id: 'ant-div-sup', name: 'Anterior Division (Superior)', x: 55, y: 20, region: 'Divisions' },
      { id: 'post-div-sup', name: 'Posterior Division (Superior)', x: 55, y: 30, region: 'Divisions' },
      { id: 'ant-div-mid', name: 'Anterior Division (Middle)', x: 55, y: 40, region: 'Divisions' },
      { id: 'post-div-mid', name: 'Posterior Division (Middle)', x: 55, y: 50, region: 'Divisions' },
      { id: 'ant-div-inf', name: 'Anterior Division (Inferior)', x: 55, y: 60, region: 'Divisions' },
      { id: 'post-div-inf', name: 'Posterior Division (Inferior)', x: 55, y: 70, region: 'Divisions' },

      // Cords
      { id: 'lateral-cord', name: 'Lateral Cord', x: 75, y: 30, region: 'Cords' },
      { id: 'posterior-cord', name: 'Posterior Cord', x: 75, y: 50, region: 'Cords' },
      { id: 'medial-cord', name: 'Medial Cord', x: 75, y: 70, region: 'Cords' },
    ],
    tasks: [
      {
        type: 'label' as const,
        instruction: 'Drag and drop labels to correctly identify all structures',
      },
      {
        type: 'identify' as const,
        instruction: 'Click on structures to highlight related components',
      },
      {
        type: 'relate' as const,
        instruction: 'Understand the progression from roots to terminal nerves',
      },
    ],
  },
};

// Example 4: Multi-part Exercise - Upper Limb Innervation
export const upperLimbMultiPartExercise = {
  title: 'Upper Limb Innervation Analysis',
  description: 'A comprehensive multi-step exercise on upper limb nerve anatomy',
  exerciseType: 'multi-part' as const,
  questions: [
    {
      id: 'step1',
      type: 'connection' as const,
      question: 'First, connect the nerve roots to their spinal levels',
      data: {
        nodes: [
          { id: 'musculocutaneous', label: 'Musculocutaneous N.', x: 20, y: 30, type: 'structure' },
          { id: 'median', label: 'Median N.', x: 20, y: 50, type: 'structure' },
          { id: 'ulnar', label: 'Ulnar N.', x: 20, y: 70, type: 'structure' },
          { id: 'c5-c6', label: 'C5-C6', x: 60, y: 20, type: 'function' },
          { id: 'c6-c7', label: 'C6-C7', x: 60, y: 40, type: 'function' },
          { id: 'c8-t1', label: 'C8-T1', x: 60, y: 60, type: 'function' },
        ],
      },
    },
    {
      id: 'step2',
      type: 'clinical' as const,
      question: 'Now apply this knowledge to a clinical scenario',
      depends_on: 'step1',
      data: {
        id: 'nerve-injury-case',
        patient: {
          age: 28,
          gender: 'female',
          chiefComplaint: 'Numbness and weakness in right hand after fall',
        },
        history: [
          'Fell on outstretched hand 2 days ago',
          'Immediate onset of weakness',
          'Numbness over lateral palm and first 3.5 digits',
        ],
        physicalExam: [
          'Weakness of thumb opposition',
          'Weakness of wrist flexion',
          'Decreased sensation over thenar eminence',
          'Positive Tinel sign at wrist',
        ],
        questions: [
          {
            id: 'nerve-id',
            question: 'Which nerve is most likely injured?',
            type: 'multiple-choice',
            options: ['Median nerve', 'Ulnar nerve', 'Radial nerve'],
            correctAnswer: 'Median nerve',
          } as const,
        ],
      },
    },
    {
      id: 'step3',
      type: 'diagram' as const,
      question: 'Finally, identify the affected structures on the diagram',
      depends_on: 'step2',
      data: {
        id: 'hand-innervation',
        imageUrl: '/images/anatomy/hand-innervation.svg',
        structures: [
          { id: 'thenar', name: 'Thenar muscles', x: 30, y: 40, region: 'Muscles' },
          { id: 'lumbricals', name: 'Lumbricals (lateral)', x: 50, y: 60, region: 'Muscles' },
          { id: 'median-sensory', name: 'Median nerve sensory area', x: 70, y: 50, region: 'Sensory' },
        ],
        tasks: [
          {
            type: 'identify' as const,
            instruction: 'Select all structures affected by median nerve injury',
          },
        ],
      },
    },
  ],
};

// Demo component showing all exercise types
export const SynthesisExerciseDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = React.useState<'connection' | 'clinical' | 'diagram' | 'multi-part'>('connection');

  const handleComplete = (results: any) => {
    console.log('Exercise completed:', results);
    alert(`Exercise completed! Score: ${Math.round(results.score)}%`);
  };

  const renderExample = () => {
    switch (selectedExample) {
      case 'connection':
        return <SynthesisExercise {...cardiacAnatomyConnectionExercise} onComplete={handleComplete} />;
      case 'clinical':
        return <SynthesisExercise {...shoulderPainClinicalCase} onComplete={handleComplete} />;
      case 'diagram':
        return <SynthesisExercise {...brachialPlexusDiagramTask} onComplete={handleComplete} />;
      case 'multi-part':
        return <SynthesisExercise {...upperLimbMultiPartExercise} onComplete={handleComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Synthesis Exercise Examples
          </h1>
          <p className="text-gray-600">
            Interactive demonstrations of different exercise types
          </p>
        </div>

        {/* Example selector */}
        <div className="mb-6 flex gap-3">
          {[
            { key: 'connection', label: 'Connection Exercise' },
            { key: 'clinical', label: 'Clinical Case' },
            { key: 'diagram', label: 'Diagram Labeling' },
            { key: 'multi-part', label: 'Multi-Part Exercise' },
          ].map((example) => (
            <button
              key={example.key}
              onClick={() => setSelectedExample(example.key as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedExample === example.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>

        {/* Render selected example */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {renderExample()}
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Component Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">SynthesisExercise</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Case-based learning scenarios</li>
                <li>• Clinical vignette presentation</li>
                <li>• Step-by-step guided problem solving</li>
                <li>• Multi-part questions with dependencies</li>
                <li>• Anatomical reasoning exercises</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">ClinicalCase</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Patient presentation display</li>
                <li>• History and symptoms</li>
                <li>• Physical examination findings</li>
                <li>• Multiple question types</li>
                <li>• Anatomical correlation questions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">StructureDiagram</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• SVG-based interactive diagrams</li>
                <li>• Clickable regions for labeling</li>
                <li>• Zoom and pan support</li>
                <li>• Drag-and-drop labeling</li>
                <li>• Show/hide labels toggle</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">ExerciseProgress</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Real-time progress tracking</li>
                <li>• Time spent monitoring</li>
                <li>• Hint usage counter</li>
                <li>• Score display</li>
                <li>• Visual step indicators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynthesisExerciseDemo;

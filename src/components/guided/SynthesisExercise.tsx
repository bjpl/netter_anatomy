import React, { useState } from 'react';
import { CheckCircle, RotateCcw, Lightbulb, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { ClinicalCase } from './ClinicalCase';
import { StructureDiagram } from './StructureDiagram';
import { ExerciseProgress } from './ExerciseProgress';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'structure' | 'function' | 'clinical';
}

interface Connection {
  from: string;
  to: string;
  label?: string;
  isCorrect?: boolean;
}

interface MultiPartQuestion {
  id: string;
  type: 'connection' | 'clinical' | 'diagram' | 'multi-choice';
  question: string;
  depends_on?: string; // ID of question that must be completed first
  data?: any;
}

interface ClinicalScenario {
  id: string;
  patient: {
    age: number;
    gender: string;
    chiefComplaint: string;
  };
  history: string[];
  physicalExam: string[];
  questions: {
    id: string;
    question: string;
    type: 'multiple-choice' | 'open-ended' | 'structure-identification';
    options?: string[];
    correctAnswer?: string | string[];
    explanation?: string;
  }[];
}

interface DiagramTask {
  id: string;
  imageUrl: string;
  structures: {
    id: string;
    name: string;
    x: number;
    y: number;
    region: string;
  }[];
  tasks: {
    type: 'label' | 'identify' | 'relate';
    instruction: string;
  }[];
}

interface SynthesisExerciseProps {
  title: string;
  description: string;
  exerciseType: 'connection' | 'clinical' | 'diagram' | 'multi-part';

  // Connection exercise data
  nodes?: Node[];
  correctConnections?: Connection[];

  // Clinical case data
  clinicalCase?: ClinicalScenario;

  // Diagram data
  diagramTask?: DiagramTask;

  // Multi-part exercise data
  questions?: MultiPartQuestion[];

  onComplete?: (results: {
    score: number;
    timeSpent: number;
    hintsUsed: number;
    answers: Record<string, any>;
  }) => void;
}

export const SynthesisExercise: React.FC<SynthesisExerciseProps> = ({
  title,
  description,
  exerciseType,
  nodes = [],
  correctConnections = [],
  clinicalCase,
  diagramTask,
  questions = [],
  onComplete,
}) => {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userConnections, setUserConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Multi-part question handling
  const currentQuestion = exerciseType === 'multi-part' ? questions[currentQuestionIndex] : null;
  const canProceed = currentQuestion?.depends_on
    ? answers[currentQuestion.depends_on] !== undefined
    : true;

  const handleNodeClick = (nodeId: string) => {
    if (isChecked) return;

    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      const newConnection: Connection = {
        from: selectedNode,
        to: nodeId,
      };
      setUserConnections([...userConnections, newConnection]);
      setSelectedNode(null);
    }
  };

  const handleCheck = () => {
    const updatedConnections = userConnections.map((conn) => {
      const isCorrect = correctConnections.some(
        (correct) =>
          (correct.from === conn.from && correct.to === conn.to) ||
          (correct.from === conn.to && correct.to === conn.from)
      );
      return { ...conn, isCorrect };
    });

    setUserConnections(updatedConnections);
    setIsChecked(true);

    const calculatedScore =
      (updatedConnections.filter((c) => c.isCorrect).length /
        correctConnections.length) *
      100;

    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleReset = () => {
    setUserConnections([]);
    setSelectedNode(null);
    setIsChecked(false);
    setShowHint(false);
    setShowResults(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
    if (!showHint) {
      setHintsUsed(hintsUsed + 1);
    }
  };

  const handleComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onComplete?.({
      score,
      timeSpent,
      hintsUsed,
      answers,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsChecked(false);
      setShowHint(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsChecked(false);
      setShowHint(false);
    }
  };

  const getNodeColor = (type: Node['type']) => {
    switch (type) {
      case 'structure':
        return 'bg-blue-100 border-blue-400 text-blue-900';
      case 'function':
        return 'bg-green-100 border-green-400 text-green-900';
      case 'clinical':
        return 'bg-purple-100 border-purple-400 text-purple-900';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-900';
    }
  };

  // Render different exercise types
  const renderExerciseContent = () => {
    switch (exerciseType) {
      case 'clinical':
        return clinicalCase ? (
          <ClinicalCase
            scenario={clinicalCase}
            onAnswerSubmit={(questionId, answer) => {
              setAnswers({ ...answers, [questionId]: answer });
            }}
            answers={answers}
          />
        ) : null;

      case 'diagram':
        return diagramTask ? (
          <StructureDiagram
            task={diagramTask}
            onComplete={(taskAnswers) => {
              setAnswers(taskAnswers);
            }}
          />
        ) : null;

      case 'multi-part':
        return currentQuestion ? (
          <div className="space-y-6">
            {/* Question navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                {currentQuestion.depends_on && !canProceed && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                    Complete previous question first
                  </span>
                )}
              </div>
            </div>

            {/* Question content */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h4>

              {currentQuestion.type === 'connection' && (
                <div className="text-sm text-gray-600 mb-4">
                  Click nodes to create connections between related anatomical structures, functions, and clinical applications.
                </div>
              )}

              {currentQuestion.type === 'clinical' && currentQuestion.data && (
                <ClinicalCase
                  scenario={currentQuestion.data}
                  onAnswerSubmit={(questionId, answer) => {
                    setAnswers({ ...answers, [questionId]: answer });
                  }}
                  answers={answers}
                />
              )}

              {currentQuestion.type === 'diagram' && currentQuestion.data && (
                <StructureDiagram
                  task={currentQuestion.data}
                  onComplete={(taskAnswers) => {
                    setAnswers({ ...answers, [currentQuestion.id]: taskAnswers });
                  }}
                />
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  disabled={!canProceed}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleCheck}
                  disabled={!canProceed}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit All Answers
                </button>
              )}
            </div>
          </div>
        ) : null;

      case 'connection':
      default:
        return (
          <>
            {/* Canvas */}
            <div className="relative border-2 border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-8 min-h-[500px]">
              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {userConnections.map((conn, index) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const color = isChecked
                    ? conn.isCorrect
                      ? '#10b981'
                      : '#ef4444'
                    : '#3b82f6';

                  return (
                    <g key={index}>
                      <line
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={color}
                        strokeWidth="3"
                        strokeDasharray={isChecked && !conn.isCorrect ? '5,5' : '0'}
                      />
                      {isChecked && (
                        <g>
                          <circle
                            cx={`${(fromNode.x + toNode.x) / 2}%`}
                            cy={`${(fromNode.y + toNode.y) / 2}%`}
                            r="12"
                            fill="white"
                            stroke={color}
                            strokeWidth="2"
                          />
                          {conn.isCorrect ? (
                            <text
                              x={`${(fromNode.x + toNode.x) / 2}%`}
                              y={`${(fromNode.y + toNode.y) / 2}%`}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="16"
                              fill={color}
                            >
                              ✓
                            </text>
                          ) : (
                            <text
                              x={`${(fromNode.x + toNode.x) / 2}%`}
                              y={`${(fromNode.y + toNode.y) / 2}%`}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fontSize="16"
                              fill={color}
                            >
                              ✗
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  disabled={isChecked}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${getNodeColor(
                    node.type
                  )} ${
                    selectedNode === node.id
                      ? 'ring-4 ring-blue-300 scale-110'
                      : 'hover:scale-105'
                  } ${isChecked ? 'cursor-default' : 'cursor-pointer'}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  aria-label={`${node.type} node: ${node.label}`}
                >
                  {node.label}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-400" />
                <span>Structure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-400" />
                <span>Function</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-100 border-2 border-purple-400" />
                <span>Clinical</span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Progress tracker for multi-part exercises */}
      {exerciseType === 'multi-part' && (
        <div className="mb-6">
          <ExerciseProgress
            currentStep={currentQuestionIndex}
            totalSteps={questions.length}
            timeSpent={Math.floor((Date.now() - startTime) / 1000)}
            hintsUsed={hintsUsed}
            score={score}
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {exerciseType === 'connection' && (
          <button
            onClick={handleCheck}
            disabled={userConnections.length === 0 || isChecked}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Check Answers
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
        <button
          onClick={handleShowHint}
          className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium hover:bg-yellow-200 transition-colors flex items-center gap-2"
        >
          <Lightbulb className="w-5 h-5" />
          {showHint ? 'Hide Hint' : 'Show Hint'}
          {hintsUsed > 0 && (
            <span className="ml-1 text-xs">({hintsUsed})</span>
          )}
        </button>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-900">
            <strong>Hint:</strong>{' '}
            {exerciseType === 'connection' &&
              'Look for relationships between anatomical structures (blue), their functions (green), and clinical applications (purple). Click one node, then another to create a connection.'}
            {exerciseType === 'clinical' &&
              'Consider how the patient\'s symptoms relate to specific anatomical structures and their functions.'}
            {exerciseType === 'diagram' &&
              'Study the anatomical relationships and spatial positioning of structures in the diagram.'}
            {exerciseType === 'multi-part' &&
              'Each question builds on the previous one. Take your time to think through the anatomical reasoning.'}
          </p>
        </div>
      )}

      {/* Exercise content */}
      {renderExerciseContent()}

      {/* Results */}
      {showResults && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Exercise Complete!
              </h4>
              <p className="text-sm text-gray-600">
                {exerciseType === 'connection' &&
                  `${userConnections.filter((c) => c.isCorrect).length} / ${correctConnections.length} connections correct`}
              </p>
            </div>
            <div className="text-4xl font-bold text-blue-600">
              {Math.round(score)}%
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Complete Exercise
          </button>
        </div>
      )}
    </div>
  );
};

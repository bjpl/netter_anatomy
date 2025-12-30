import React, { useState } from 'react';
import { User, Stethoscope, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ClinicalQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'open-ended' | 'structure-identification';
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
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
  questions: ClinicalQuestion[];
}

interface ClinicalCaseProps {
  scenario: ClinicalScenario;
  onAnswerSubmit: (questionId: string, answer: any) => void;
  answers: Record<string, any>;
  showFeedback?: boolean;
}

export const ClinicalCase: React.FC<ClinicalCaseProps> = ({
  scenario,
  onAnswerSubmit,
  answers,
  showFeedback = false,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    history: true,
    physicalExam: true,
    questions: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const isAnswerCorrect = (question: ClinicalQuestion, answer: any): boolean => {
    if (!question.correctAnswer || !answer) return false;

    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.includes(answer);
    }

    return question.correctAnswer === answer;
  };

  const renderQuestion = (question: ClinicalQuestion, index: number) => {
    const userAnswer = answers[question.id];
    const isCorrect = showFeedback && userAnswer ? isAnswerCorrect(question, userAnswer) : null;

    return (
      <div
        key={question.id}
        className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors"
      >
        {/* Question header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-semibold text-sm">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {question.question}
            </h4>

            {/* Answer feedback */}
            {showFeedback && userAnswer && (
              <div
                className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg ${
                  isCorrect
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Incorrect</span>
                  </>
                )}
              </div>
            )}

            {/* Multiple choice options */}
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-2">
                {question.options.map((option, optIndex) => {
                  const isSelected = userAnswer === option;
                  const isCorrectOption = showFeedback && question.correctAnswer === option;

                  return (
                    <button
                      key={optIndex}
                      onClick={() => !showFeedback && onAnswerSubmit(question.id, option)}
                      disabled={showFeedback}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                        showFeedback && isCorrectOption
                          ? 'border-green-500 bg-green-50'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 bg-white hover:border-blue-300'
                      } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            showFeedback && isCorrectOption
                              ? 'border-green-500 bg-green-500'
                              : isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-400'
                          }`}
                        >
                          {(isSelected || (showFeedback && isCorrectOption)) && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-gray-900">{option}</span>
                        {showFeedback && isCorrectOption && (
                          <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Open-ended response */}
            {question.type === 'open-ended' && (
              <textarea
                value={userAnswer || ''}
                onChange={(e) => onAnswerSubmit(question.id, e.target.value)}
                disabled={showFeedback}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                rows={4}
              />
            )}

            {/* Structure identification */}
            {question.type === 'structure-identification' && question.options && (
              <div className="grid grid-cols-2 gap-3">
                {question.options.map((structure, structIndex) => {
                  const isSelected = Array.isArray(userAnswer)
                    ? userAnswer.includes(structure)
                    : userAnswer === structure;
                  const isCorrectOption =
                    showFeedback &&
                    Array.isArray(question.correctAnswer) &&
                    question.correctAnswer.includes(structure);

                  return (
                    <button
                      key={structIndex}
                      onClick={() => {
                        if (showFeedback) return;

                        if (Array.isArray(question.correctAnswer)) {
                          // Multiple selection
                          const current = Array.isArray(userAnswer) ? userAnswer : [];
                          const updated = isSelected
                            ? current.filter((s: string) => s !== structure)
                            : [...current, structure];
                          onAnswerSubmit(question.id, updated);
                        } else {
                          // Single selection
                          onAnswerSubmit(question.id, structure);
                        }
                      }}
                      disabled={showFeedback}
                      className={`px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all ${
                        showFeedback && isCorrectOption
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                      } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {structure}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Explanation (shown after feedback) */}
            {showFeedback && question.explanation && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Explanation</h5>
                    <p className="text-sm text-blue-800">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Patient presentation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Patient Presentation</h3>
            <p className="text-sm text-gray-600">
              {scenario.patient.age} year old {scenario.patient.gender}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border-2 border-blue-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Chief Complaint</p>
          <p className="text-gray-900 font-medium">{scenario.patient.chiefComplaint}</p>
        </div>
      </div>

      {/* Medical history */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('history')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Medical History</h4>
          </div>
          <span className="text-gray-400">{expandedSections.history ? '−' : '+'}</span>
        </button>

        {expandedSections.history && (
          <div className="px-6 pb-6">
            <ul className="space-y-2">
              {scenario.history.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Physical examination */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection('physicalExam')}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-gray-600" />
            <h4 className="text-lg font-semibold text-gray-900">Physical Examination</h4>
          </div>
          <span className="text-gray-400">{expandedSections.physicalExam ? '−' : '+'}</span>
        </button>

        {expandedSections.physicalExam && (
          <div className="px-6 pb-6">
            <ul className="space-y-2">
              {scenario.physicalExam.map((finding, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Clinical questions */}
      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">
            Clinical Reasoning Questions
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Answer the following questions based on the patient presentation
          </p>
        </div>

        <div className="p-6 space-y-4">
          {scenario.questions.map((question, index) => renderQuestion(question, index))}
        </div>
      </div>
    </div>
  );
};

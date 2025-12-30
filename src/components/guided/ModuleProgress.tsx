import React from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  isComplete: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  estimatedMinutes?: number;
}

interface ModuleProgressProps {
  modules: Module[];
  onModuleClick?: (moduleId: string) => void;
}

export const ModuleProgress: React.FC<ModuleProgressProps> = ({
  modules,
  onModuleClick,
}) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((module, index) => {
          const canClick = !module.isLocked && onModuleClick;

          return (
            <div
              key={module.id}
              className={`relative flex items-start gap-4 ${
                canClick ? 'cursor-pointer group' : ''
              }`}
              onClick={() => canClick && onModuleClick(module.id)}
            >
              {/* Circle indicator */}
              <div className="relative z-10 flex-shrink-0">
                {module.isComplete ? (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                ) : module.isCurrent ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-blue-100 animate-pulse">
                    <Circle className="w-5 h-5 text-white fill-white" />
                  </div>
                ) : module.isLocked ? (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                    <Circle className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 pb-8 ${
                  canClick ? 'group-hover:bg-gray-50' : ''
                } rounded-lg p-4 -ml-2 transition-colors`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        Module {index + 1}
                      </span>
                      {module.isCurrent && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          Current
                        </span>
                      )}
                      {module.isComplete && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Complete
                        </span>
                      )}
                    </div>
                    <h4
                      className={`text-lg font-semibold mb-1 ${
                        module.isLocked
                          ? 'text-gray-400'
                          : module.isCurrent
                          ? 'text-blue-900'
                          : 'text-gray-900'
                      } ${canClick ? 'group-hover:text-blue-600' : ''}`}
                    >
                      {module.title}
                    </h4>
                    {module.estimatedMinutes && !module.isComplete && (
                      <p className="text-sm text-gray-500">
                        ~{module.estimatedMinutes} min remaining
                      </p>
                    )}
                  </div>

                  {/* Action button */}
                  {!module.isLocked && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onModuleClick?.(module.id);
                      }}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        module.isCurrent
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : module.isComplete
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600'
                      }`}
                    >
                      {module.isCurrent
                        ? 'Continue'
                        : module.isComplete
                        ? 'Review'
                        : 'Start'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Target, Tag } from 'lucide-react';

interface Structure {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  region: string;
}

interface DiagramTask {
  id: string;
  imageUrl: string;
  structures: Structure[];
  tasks: {
    type: 'label' | 'identify' | 'relate';
    instruction: string;
  }[];
}

interface StructureDiagramProps {
  task: DiagramTask;
  onComplete: (answers: Record<string, any>) => void;
  showLabels?: boolean;
}

export const StructureDiagram: React.FC<StructureDiagramProps> = ({
  task,
  onComplete,
  showLabels: initialShowLabels = false,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [showLabels, setShowLabels] = useState(initialShowLabels);
  const [selectedStructures, setSelectedStructures] = useState<string[]>([]);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const [userLabels, setUserLabels] = useState<Record<string, string>>({});
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Notify parent of completion when all tasks are done
    const checkCompletion = () => {
      const hasLabeling = task.tasks.some(t => t.type === 'label');
      const hasIdentification = task.tasks.some(t => t.type === 'identify');

      if (hasLabeling && Object.keys(userLabels).length === task.structures.length) {
        onComplete({ labels: userLabels, selected: selectedStructures });
      } else if (hasIdentification && selectedStructures.length > 0) {
        onComplete({ selected: selectedStructures });
      }
    };

    checkCompletion();
  }, [userLabels, selectedStructures, task, onComplete]);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setShowLabels(initialShowLabels);
    setSelectedStructures([]);
    setUserLabels({});
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleStructureClick = (structureId: string) => {
    setSelectedStructures((prev) => {
      if (prev.includes(structureId)) {
        return prev.filter((id) => id !== structureId);
      } else {
        return [...prev, structureId];
      }
    });
  };

  const handleLabelDragStart = (structureId: string) => {
    setDraggedLabel(structureId);
  };

  const handleLabelDrop = (structureId: string) => {
    if (draggedLabel) {
      const structure = task.structures.find(s => s.id === draggedLabel);
      setUserLabels((prev) => ({
        ...prev,
        [structureId]: structure?.name || '',
      }));
      setDraggedLabel(null);
    }
  };

  const getStructuresByRegion = () => {
    const regions: Record<string, Structure[]> = {};
    task.structures.forEach((structure) => {
      if (!regions[structure.region]) {
        regions[structure.region] = [];
      }
      regions[structure.region]?.push(structure);
    });
    return regions;
  };

  const hasLabelingTask = task.tasks.some(t => t.type === 'label');
  const hasIdentificationTask = task.tasks.some(t => t.type === 'identify');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Task instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200 p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Interactive Anatomy Diagram</h4>
        <div className="space-y-1">
          {task.tasks.map((taskItem, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-purple-600 font-medium">{index + 1}.</span>
              <span>{taskItem.instruction}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Zoom: {Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              showLabels
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-300'
            }`}
          >
            {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {showLabels ? 'Hide' : 'Show'} Labels
          </button>
        </div>
      </div>

      {/* Main diagram area */}
      <div className="flex">
        {/* Diagram canvas */}
        <div
          ref={containerRef}
          className="flex-1 relative bg-gray-100 overflow-hidden cursor-move"
          style={{ height: '600px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isPanning ? 'none' : 'transform 0.2s',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Anatomy image */}
            <img
              ref={imageRef}
              src={task.imageUrl}
              alt="Anatomical diagram"
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />

            {/* Structure markers */}
            {task.structures.map((structure) => {
              const isSelected = selectedStructures.includes(structure.id);
              const isHighlighted = highlightedRegion === structure.region;
              const hasUserLabel = userLabels[structure.id];

              return (
                <div
                  key={structure.id}
                  className="absolute"
                  style={{
                    left: `${structure.x}%`,
                    top: `${structure.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Hotspot marker */}
                  <button
                    onClick={() => handleStructureClick(structure.id)}
                    onMouseEnter={() => setHighlightedRegion(structure.region)}
                    onMouseLeave={() => setHighlightedRegion(null)}
                    className={`relative w-6 h-6 rounded-full transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 ring-4 ring-blue-300 scale-125'
                        : isHighlighted
                        ? 'bg-purple-400 ring-2 ring-purple-300 scale-110'
                        : 'bg-white border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-400'
                    }`}
                    title={structure.name}
                    aria-label={`Structure: ${structure.name}`}
                  >
                    <Target className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-700" />
                  </button>

                  {/* Label */}
                  {(showLabels || isSelected) && (
                    <div
                      className={`absolute top-full mt-2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border-2 border-gray-300 text-gray-900'
                      }`}
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      {hasUserLabel || structure.name}
                      {hasLabelingTask && hasUserLabel && (
                        <Tag className="w-3 h-3 inline ml-1" />
                      )}
                    </div>
                  )}

                  {/* Drop zone for labeling task */}
                  {hasLabelingTask && !hasUserLabel && (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleLabelDrop(structure.id)}
                      className="absolute top-full mt-2 px-3 py-2 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-lg text-xs text-yellow-800"
                      style={{ transform: 'translateX(-50%)' }}
                    >
                      Drop label here
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar with regions/labels */}
        <div className="w-80 border-l-2 border-gray-200 bg-white overflow-y-auto" style={{ height: '600px' }}>
          {hasLabelingTask && (
            <div className="p-4">
              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Available Labels
              </h5>
              <p className="text-xs text-gray-600 mb-3">
                Drag labels to the diagram markers
              </p>
              <div className="space-y-2">
                {task.structures.map((structure) => (
                  <div
                    key={structure.id}
                    draggable
                    onDragStart={() => handleLabelDragStart(structure.id)}
                    className={`px-3 py-2 rounded-lg border-2 cursor-move transition-all ${
                      userLabels[structure.id]
                        ? 'bg-green-50 border-green-400 text-green-800 opacity-50'
                        : 'bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{structure.name}</span>
                      {userLabels[structure.id] && (
                        <span className="text-xs text-green-600">✓ Placed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasIdentificationTask && (
            <div className="p-4 border-t-2 border-gray-200">
              <h5 className="font-semibold text-gray-900 mb-3">Anatomical Regions</h5>
              {Object.entries(getStructuresByRegion()).map(([region, structures]) => (
                <div key={region} className="mb-4">
                  <button
                    onClick={() => setHighlightedRegion(highlightedRegion === region ? null : region)}
                    className={`w-full px-3 py-2 rounded-lg text-left font-medium text-sm transition-colors ${
                      highlightedRegion === region
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region} ({structures.length})
                  </button>
                  {highlightedRegion === region && (
                    <div className="mt-2 space-y-1 pl-3">
                      {structures.map((structure) => (
                        <div
                          key={structure.id}
                          className={`px-2 py-1 rounded text-xs ${
                            selectedStructures.includes(structure.id)
                              ? 'bg-blue-100 text-blue-900 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          • {structure.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedStructures.length > 0 && (
            <div className="p-4 border-t-2 border-gray-200 bg-blue-50">
              <h5 className="font-semibold text-blue-900 mb-2">Selected Structures</h5>
              <div className="space-y-1">
                {selectedStructures.map((id) => {
                  const structure = task.structures.find((s) => s.id === id);
                  return structure ? (
                    <div key={id} className="text-sm text-blue-800">
                      • {structure.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      {hasLabelingTask && (
        <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Labeling Progress: {Object.keys(userLabels).length} / {task.structures.length}
            </span>
            <div className="flex gap-1">
              {task.structures.map((structure) => (
                <div
                  key={structure.id}
                  className={`w-2 h-2 rounded-full ${
                    userLabels[structure.id] ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

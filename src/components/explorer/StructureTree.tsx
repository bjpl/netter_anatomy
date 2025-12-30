import React, { useState, useMemo } from 'react';
import { Structure, StructureType } from '../../types/anatomy';
import Badge from '../ui/Badge';
import Input from '../ui/Input';

/**
 * StructureTree Component
 *
 * Hierarchical tree with:
 * - Collapsible nodes
 * - Icons for structure types
 * - Click to select, double-click for details
 * - Search filter within tree
 */

interface StructureTreeProps {
  /** All structures to display */
  structures: Structure[];
  /** Currently selected structure ID */
  selectedId: string | null;
  /** Called when structure is selected (single click) */
  onSelect: (structureId: string) => void;
  /** Called when structure is double-clicked */
  onDoubleClick: (structureId: string) => void;
}

interface TreeNode {
  structure: Structure;
  children: TreeNode[];
}

const StructureTree: React.FC<StructureTreeProps> = ({
  structures,
  selectedId,
  onSelect,
  onDoubleClick,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Build tree structure
  const tree = useMemo(() => {
    const nodes = new Map<string, TreeNode>();

    // Create nodes
    structures.forEach(structure => {
      nodes.set(structure.id, { structure, children: [] });
    });

    // Build hierarchy
    const roots: TreeNode[] = [];
    nodes.forEach(node => {
      if (node.structure.parent_structure_id) {
        const parent = nodes.get(node.structure.parent_structure_id);
        if (parent) {
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }, [structures]);

  // Filter tree based on search
  const filteredTree = useMemo(() => {
    if (!searchQuery) return tree;

    const query = searchQuery.toLowerCase();

    const filterNode = (node: TreeNode): TreeNode | null => {
      const matches = node.structure.canonical_name.toLowerCase().includes(query) ||
                     node.structure.common_names.some(name => name.toLowerCase().includes(query));

      const filteredChildren = node.children
        .map(filterNode)
        .filter((child): child is TreeNode => child !== null);

      if (matches || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren };
      }

      return null;
    };

    return tree.map(filterNode).filter((node): node is TreeNode => node !== null);
  }, [tree, searchQuery]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedIds.has(node.structure.id);
    const isSelected = selectedId === node.structure.id;
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.structure.id} className="select-none">
        <div
          className={`
            flex items-center gap-2 px-3 py-2 cursor-pointer
            transition-colors duration-150
            ${isSelected ? 'bg-[#EFF6FF] border-l-2 border-[#2563EB]' : 'hover:bg-[#F9FAFB]'}
          `}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => onSelect(node.structure.id)}
          onDoubleClick={() => onDoubleClick(node.structure.id)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(node.structure.id);
              }}
              className="flex-shrink-0 p-0.5 hover:bg-[#E5E7EB] rounded transition-colors"
            >
              <svg
                className={`w-4 h-4 text-[#6B7280] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Type Icon */}
          <div className="flex-shrink-0">
            {getStructureIcon(node.structure.structure_type)}
          </div>

          {/* Structure Name */}
          <span className={`flex-1 text-sm truncate ${isSelected ? 'font-medium text-[#2563EB]' : 'text-[#1F2937]'}`}>
            {node.structure.canonical_name}
          </span>

          {/* Type Badge */}
          <div className="flex-shrink-0">
            <Badge type={node.structure.structure_type as StructureType} size="sm" />
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Filter */}
      <div className="flex-shrink-0 p-3 border-b border-[#E5E7EB]">
        <Input
          type="text"
          placeholder="Filter structures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="search"
          fullWidth
          onClear={() => setSearchQuery('')}
        />
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto">
        {filteredTree.length === 0 ? (
          <div className="p-4 text-center text-sm text-[#6B7280]">
            {searchQuery ? 'No matching structures' : 'No structures available'}
          </div>
        ) : (
          <div className="py-2">
            {filteredTree.map(node => renderNode(node))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex-shrink-0 p-3 border-t border-[#E5E7EB] bg-[#F9FAFB]">
        <p className="text-xs text-[#6B7280]">
          {structures.length} total structures
          {searchQuery && ` • ${filteredTree.length} shown`}
        </p>
      </div>
    </div>
  );
};

// Helper function to get structure type icon
const getStructureIcon = (type: StructureType) => {
  const iconClass = "w-4 h-4";

  switch (type) {
    case StructureType.BONE:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20" style={{ color: '#F5F0E6' }}>
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      );
    case StructureType.MUSCLE:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#C45C5C' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case StructureType.NERVE:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#E6C744' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      );
    case StructureType.ARTERY:
    case StructureType.VEIN:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: type === StructureType.ARTERY ? '#D64545' : '#4571D6' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case StructureType.ORGAN:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20" style={{ color: '#7E57C2' }}>
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9CA3AF' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
};

export default StructureTree;

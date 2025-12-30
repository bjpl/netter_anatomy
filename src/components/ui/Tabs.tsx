import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: number;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  // Content is rendered via tabs.map below, not here
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  void activeTabData; // Used for future tab panel rendering

  return (
    <div className={`w-full ${className}`}>
      {/* Tab List */}
      <div
        role="tablist"
        className="flex border-b border-[#E5E7EB] overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap
                border-b-2 transition-colors duration-150
                focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2
                ${
                  isActive
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-[#D1D5DB]'
                }
              `}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`
                    px-2 py-0.5 text-xs font-semibold rounded-full
                    ${
                      isActive
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-[#E5E7EB] text-[#6B7280]'
                    }
                  `}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== activeTab}
            className={tab.id === activeTab ? 'animate-fade-in' : ''}
          >
            {tab.content}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 150ms ease-out;
        }
      `}</style>
    </div>
  );
};

export default Tabs;

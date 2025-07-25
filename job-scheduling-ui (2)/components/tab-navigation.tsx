"use client"

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  showWarning?: boolean
}

export const TabNavigation = ({ tabs, activeTab, onTabChange, showWarning }: TabNavigationProps) => {
  return (
    <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 overflow-hidden">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 md:px-6 py-3 text-sm font-medium border-b-[3px] transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-gray-900 border-[#0066cc] bg-blue-50"
                : "text-[#0066cc] border-transparent hover:text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute inset-x-0 -bottom-[3px] h-[3px] bg-[#0066cc]" />}
          </button>
        ))}
      </div>

      {/* Warning Message */}
      {showWarning && activeTab === "frequency" && (
        <div className="bg-[#fff3cd] border border-[#ffeaa7] border-t-0 text-[#856404] p-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-amber-500 text-lg">⚠️</span>
            <div>
              <strong>WARNING!</strong>
              <br />
              VRM section is disabled for non-executable jobs
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

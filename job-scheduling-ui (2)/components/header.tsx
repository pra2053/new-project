import { Clock } from "lucide-react"

export const Header = () => {
  return (
    <>
      {/* Main Header */}
      <div className="bg-[#e8e8e8] px-4 md:px-8 py-4 md:py-5 border-b border-[#d0d0d0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900">Enterprise Job Scheduling</h1>
          <div className="flex items-center gap-3">
            <span className="text-base md:text-lg font-bold text-gray-900">BANK OF AMERICA</span>
            <span className="text-[#dc1431] text-xl md:text-2xl font-bold">⟩⟩</span>
          </div>
        </div>
      </div>

      {/* User Info Bar */}
      <div className="bg-[#f8f8f8] px-4 md:px-8 py-3 border-b border-[#e0e0e0]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-gray-800">Hello Guest User</div>
            <div className="text-sm text-gray-600">What would you like to do today ?</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={14} />
            <span className="hidden md:inline">{new Date().toLocaleString()}</span>
            <span className="md:hidden">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </>
  )
}

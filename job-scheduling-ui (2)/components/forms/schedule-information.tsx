"use client"

import { Calendar, Clock } from "lucide-react"
import { Button } from "../ui/button"

interface ScheduleInformationProps {
  onNext: () => void
  onBack: () => void
}

export const ScheduleInformation = ({ onNext, onBack }: ScheduleInformationProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Calendar size={20} className="text-green-600" />
        Schedule Configuration
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue="09:00"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Repeat Pattern</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  defaultChecked={!["Saturday", "Sunday"].includes(day)}
                />
                <span className="hidden md:inline">{day}</span>
                <span className="md:hidden">{day.slice(0, 3)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
            <div>
              <div className="font-medium text-blue-800 text-sm">Schedule Summary</div>
              <div className="text-sm text-blue-700 mt-1">
                Job will run daily at 09:00 AM, Monday through Friday, starting from the specified date.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <Button variant="outline" onClick={onBack}>
          Back to Dependencies
        </Button>
        <Button onClick={onNext}>Continue to Review</Button>
      </div>
    </div>
  )
}

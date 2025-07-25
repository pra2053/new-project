"use client"

import { useState } from "react"
import { Database, Zap, Clock, X, HelpCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Modal } from "../ui/modal"

interface ScheduleFrequencyData {
  schedulingEnabled: boolean
  startDate: string
  startTime: string
  datasetTriggers: Array<{
    id: string
    datasetName: string
    condition: string
    description: string
  }>
}

interface ScheduleFrequencyProps {
  formData: ScheduleFrequencyData
  onFormDataChange: (data: Partial<ScheduleFrequencyData>) => void
  onNext: () => void
  onBack: () => void
}

export const ScheduleFrequency = ({ formData, onFormDataChange, onNext, onBack }: ScheduleFrequencyProps) => {
  const [showDatasetModal, setShowDatasetModal] = useState(false)
  const [newTrigger, setNewTrigger] = useState({
    datasetName: "",
    condition: "Dataset Exists",
    description: "",
  })

  const handleSchedulingToggle = (enabled: boolean) => {
    onFormDataChange({ schedulingEnabled: enabled })
  }

  const handleAddDatasetTrigger = () => {
    if (newTrigger.datasetName.trim()) {
      const trigger = {
        id: Date.now().toString(),
        datasetName: newTrigger.datasetName.trim().toUpperCase(),
        condition: newTrigger.condition,
        description: newTrigger.description.trim(),
      }

      onFormDataChange({
        datasetTriggers: [...formData.datasetTriggers, trigger],
      })

      setNewTrigger({
        datasetName: "",
        condition: "Dataset Exists",
        description: "",
      })
      setShowDatasetModal(false)
    }
  }

  const handleRemoveTrigger = (id: string) => {
    onFormDataChange({
      datasetTriggers: formData.datasetTriggers.filter((trigger) => trigger.id !== id),
    })
  }

  const canProceed = formData.datasetTriggers.length > 0 || formData.schedulingEnabled

  return (
    <div className="space-y-6">
      {/* Pre-filled Job Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Job Information (Auto-filled)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-600 font-medium">UID:</span>
            <span className="ml-2 text-blue-800">SYS001</span>
          </div>
          <div>
            <span className="text-blue-600 font-medium">JCL Library:</span>
            <span className="ml-2 text-blue-800">PROD.JCL.LIB</span>
          </div>
          <div>
            <span className="text-blue-600 font-medium">Job Type:</span>
            <span className="ml-2 text-blue-800">Non-Executable</span>
          </div>
        </div>
      </div>

      {/* Scheduling Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Schedule Configuration</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-medium text-gray-700">Enable Scheduling</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={formData.schedulingEnabled}
                onChange={(e) => handleSchedulingToggle(e.target.checked)}
              />
              <div
                className={`w-11 h-6 rounded-full transition-colors ${
                  formData.schedulingEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform mt-1 ml-1 ${
                    formData.schedulingEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </label>
        </div>

        {formData.schedulingEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.startDate}
                onChange={(e) => onFormDataChange({ startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.startTime}
                onChange={(e) => onFormDataChange({ startTime: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Frequency Types */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Frequency Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Dataset Trigger - Active */}
          <button
            className="relative p-4 md:p-5 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-all hover:shadow-lg group"
            onClick={() => setShowDatasetModal(true)}
          >
            <Database size={24} className="mx-auto mb-2 text-white/90" />
            <div className="text-sm font-medium">Dataset Trigger</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
              <HelpCircle size={12} />
            </div>
          </button>

          {/* Job Trigger - Disabled */}
          <button
            className="relative p-4 md:p-5 bg-gray-300 text-gray-500 rounded cursor-not-allowed opacity-60"
            disabled
          >
            <Zap size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Job Trigger</div>
            <div className="text-xs mt-1">(Coming Soon)</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-black/10 rounded-full flex items-center justify-center">
              <HelpCircle size={12} />
            </div>
          </button>

          {/* Time-Driven Schedule - Disabled */}
          <button
            className="relative p-4 md:p-5 bg-gray-300 text-gray-500 rounded cursor-not-allowed opacity-60"
            disabled
          >
            <Clock size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Time Schedule</div>
            <div className="text-xs mt-1">(Coming Soon)</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-black/10 rounded-full flex items-center justify-center">
              <HelpCircle size={12} />
            </div>
          </button>
        </div>
      </div>

      {/* Dataset Triggers List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Configured Dataset Triggers</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          {formData.datasetTriggers.length > 0 ? (
            <div className="space-y-3">
              {formData.datasetTriggers.map((trigger) => (
                <div
                  key={trigger.id}
                  className="flex items-start justify-between p-4 bg-white rounded border border-gray-200"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <Database size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{trigger.datasetName}</div>
                      <div className="text-xs text-gray-600 mt-1">Condition: {trigger.condition}</div>
                      {trigger.description && <div className="text-xs text-gray-500 mt-1">{trigger.description}</div>}
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 ml-3"
                    onClick={() => handleRemoveTrigger(trigger.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Database size={48} className="mx-auto mb-3 opacity-30" />
              <div className="text-sm">No dataset triggers configured</div>
              <div className="text-xs text-gray-400 mt-1">Click "Dataset Trigger" above to add one</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button variant="outline" onClick={onBack}>
          Back to Job Definition
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Continue to Review
        </Button>
      </div>

      {/* Dataset Trigger Modal */}
      <Modal
        isOpen={showDatasetModal}
        onClose={() => setShowDatasetModal(false)}
        title="Add Dataset Trigger"
        icon={<Database className="text-blue-600" size={24} />}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDatasetModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDatasetTrigger} disabled={!newTrigger.datasetName.trim()}>
              Add Trigger
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dataset Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter dataset name (e.g., PROD.DATA.INPUT)"
              value={newTrigger.datasetName}
              onChange={(e) => setNewTrigger({ ...newTrigger, datasetName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Condition</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              value={newTrigger.condition}
              onChange={(e) => setNewTrigger({ ...newTrigger, condition: e.target.value })}
            >
              <option>Dataset Exists</option>
              <option>Dataset Modified</option>
              <option>Dataset Created</option>
              <option>Dataset Deleted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter trigger description..."
              value={newTrigger.description}
              onChange={(e) => setNewTrigger({ ...newTrigger, description: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Calendar, Database, Zap, Plus, Workflow, HelpCircle, X } from "lucide-react"
import { Button } from "../ui/button"
import { Modal } from "../ui/modal"

interface FrequencyData {
  frequencies: string[]
  predecessors: string[]
  resources: string[]
  datasetTriggers: string[]
}

interface FrequencyInformationProps {
  isJobOnRequest: string
  onJobOnRequestChange: (value: string) => void
  frequencyData: FrequencyData
  onFrequencyDataChange: (data: Partial<FrequencyData>) => void
  onNext: () => void
  onReset: () => void
}

export const FrequencyInformation = ({
  isJobOnRequest,
  onJobOnRequestChange,
  frequencyData,
  onFrequencyDataChange,
  onNext,
  onReset,
}: FrequencyInformationProps) => {
  const [showDatasetTriggerModal, setShowDatasetTriggerModal] = useState(false)
  const [showPredecessorModal, setShowPredecessorModal] = useState(false)
  const [newDatasetName, setNewDatasetName] = useState("")
  const [triggerCondition, setTriggerCondition] = useState("Dataset Exists")

  const handleAddDatasetTrigger = () => {
    if (newDatasetName.trim()) {
      onFrequencyDataChange({
        datasetTriggers: [...frequencyData.datasetTriggers, newDatasetName.trim()],
      })
      setNewDatasetName("")
      setShowDatasetTriggerModal(false)
    }
  }

  const handleAddPredecessor = (jobName: string) => {
    onFrequencyDataChange({
      predecessors: [...frequencyData.predecessors, jobName],
    })
    setShowPredecessorModal(false)
  }

  const handleRemoveItem = (type: keyof FrequencyData, index: number) => {
    const newArray = [...frequencyData[type]]
    newArray.splice(index, 1)
    onFrequencyDataChange({ [type]: newArray })
  }

  const predecessorJobs = ["CA7KR002", "CA7KR003", "CA7KR004", "CA7KR005", "CA7KR006", "CA7KR007", "CA7KR008"]

  return (
    <div className="space-y-6">
      {/* Job Request Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Is the job on request?</span>
            <select
              className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
              value={isJobOnRequest}
              onChange={(e) => onJobOnRequestChange(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <Button variant="danger" size="small" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Add Frequency Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Add Frequency</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            className="relative p-4 md:p-5 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-all hover:shadow-lg group"
            onClick={() => {
              /* Handle Add Schedule */
            }}
          >
            <Calendar size={24} className="mx-auto mb-2 text-white/90" />
            <div className="text-sm font-medium">Add Schedule</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
              <HelpCircle size={12} />
            </div>
          </button>

          <button
            className="relative p-4 md:p-5 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-all hover:shadow-lg group"
            onClick={() => setShowDatasetTriggerModal(true)}
          >
            <Database size={24} className="mx-auto mb-2 text-white/90" />
            <div className="text-sm font-medium">Add Dataset</div>
            <div className="text-sm font-medium">Trigger</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
              <HelpCircle size={12} />
            </div>
          </button>

          <button
            className="relative p-4 md:p-5 bg-[#0066cc] text-white rounded hover:bg-[#0052a3] transition-all hover:shadow-lg group"
            onClick={() => {
              /* Handle Add Job Trigger */
            }}
          >
            <Zap size={24} className="mx-auto mb-2 text-white/90" />
            <div className="text-sm font-medium">Add Job Trigger</div>
            <div className="absolute top-2 right-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
              <HelpCircle size={12} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="p-4 bg-[#6c757d] text-white rounded hover:bg-[#5a6268] transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
            onClick={() => {
              /* Handle Add Resource */
            }}
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add a Resource</span>
            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all ml-2">
              <HelpCircle size={12} />
            </div>
          </button>

          <button
            className="p-4 bg-[#6c757d] text-white rounded hover:bg-[#5a6268] transition-all hover:shadow-lg flex items-center justify-center gap-2"
            onClick={() => setShowPredecessorModal(true)}
          >
            <Workflow size={18} />
            <span className="text-sm font-medium">Add a Predecessor</span>
          </button>
        </div>
      </div>

      {/* Frequencies Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Frequencies</h3>
        <div className="bg-gray-50 rounded-lg p-6 md:p-8">
          {frequencyData.datasetTriggers.length > 0 ||
          frequencyData.predecessors.length > 0 ||
          frequencyData.resources.length > 0 ? (
            <div className="space-y-3">
              {frequencyData.datasetTriggers.map((trigger, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Database size={16} className="text-blue-600" />
                    <span className="text-sm font-medium">Dataset Trigger: {trigger}</span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem("datasetTriggers", index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {frequencyData.predecessors.map((predecessor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <Workflow size={16} className="text-purple-600" />
                    <span className="text-sm font-medium">Predecessor: {predecessor}</span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveItem("predecessors", index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-3 opacity-30" />
              <div className="text-sm">Job does not have any frequency attached</div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {isJobOnRequest === "No" && (
        <div className="flex justify-center">
          <Button onClick={onNext}>Continue</Button>
        </div>
      )}

      {/* Dataset Trigger Modal */}
      <Modal
        isOpen={showDatasetTriggerModal}
        onClose={() => setShowDatasetTriggerModal(false)}
        title="Add Dataset Trigger"
        icon={<Database className="text-blue-600" size={24} />}
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDatasetTriggerModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDatasetTrigger} disabled={!newDatasetName.trim()}>
              Add Trigger
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dataset Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter dataset name (e.g., PROD.DATA.INPUT)"
              value={newDatasetName}
              onChange={(e) => setNewDatasetName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Condition</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              value={triggerCondition}
              onChange={(e) => setTriggerCondition(e.target.value)}
            >
              <option>Dataset Exists</option>
              <option>Dataset Modified</option>
              <option>Dataset Created</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter trigger description..."
            />
          </div>
        </div>
      </Modal>

      {/* Predecessor Modal */}
      <Modal
        isOpen={showPredecessorModal}
        onClose={() => setShowPredecessorModal(false)}
        title="Add Predecessor Job"
        icon={<Workflow className="text-purple-600" size={24} />}
        footer={
          <Button variant="outline" onClick={() => setShowPredecessorModal(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-3">
          {predecessorJobs.map((job) => (
            <button
              key={job}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left"
              onClick={() => handleAddPredecessor(job)}
            >
              <div>
                <span className="font-medium text-sm">{job}</span>
                <div className="text-xs text-gray-500">Daily Backup Job</div>
              </div>
              <Plus size={16} className="text-blue-600" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

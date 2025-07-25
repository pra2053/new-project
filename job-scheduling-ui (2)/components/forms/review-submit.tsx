"use client"

import { CheckCircle, Database, Calendar, ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"

interface JobDefinitionData {
  jobName: string
  region: string
  lpar: string
}

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

interface ReviewSubmitProps {
  jobData: JobDefinitionData
  scheduleData: ScheduleFrequencyData
  onBack: () => void
  onSubmit: () => void
}

export const ReviewSubmit = ({ jobData, scheduleData, onBack, onSubmit }: ReviewSubmitProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Review Job Configuration</h2>

      <div className="space-y-6">
        {/* Job Definition Summary */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700 flex items-center gap-2">
            <Database size={18} className="text-blue-600" />
            Job Definition
          </h3>
          <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Name</div>
                <div className="font-semibold mt-1 text-gray-800">{jobData.jobName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Region</div>
                <div className="font-semibold mt-1 text-gray-800">{jobData.region}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">LPAR</div>
                <div className="font-semibold mt-1 text-gray-800">{jobData.lpar}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Job Type</div>
                <div className="font-semibold mt-1 text-gray-800">Non-Executable</div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-filled Information */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700">Auto-filled Information</h3>
          <div className="bg-blue-50 p-4 md:p-5 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">UID</div>
                <div className="font-semibold mt-1 text-blue-800">SYS001</div>
              </div>
              <div>
                <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">JCL Library</div>
                <div className="font-semibold mt-1 text-blue-800">PROD.JCL.LIB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Configuration Summary */}
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-700 flex items-center gap-2">
            <Calendar size={18} className="text-green-600" />
            Schedule & Frequency Configuration
          </h3>
          <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-3 border-b border-gray-200 gap-2">
                <span className="text-gray-600">Scheduling Enabled:</span>
                <span
                  className={`font-semibold ${scheduleData.schedulingEnabled ? "text-green-600" : "text-gray-800"}`}
                >
                  {scheduleData.schedulingEnabled ? "Yes" : "No"}
                </span>
              </div>

              {scheduleData.schedulingEnabled && (
                <>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-3 border-b border-gray-200 gap-2">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold text-gray-800">{scheduleData.startDate || "Not set"}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-3 border-b border-gray-200 gap-2">
                    <span className="text-gray-600">Start Time:</span>
                    <span className="font-semibold text-gray-800">{scheduleData.startTime || "Not set"}</span>
                  </div>
                </>
              )}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <span className="text-gray-600">Dataset Triggers:</span>
                <span className="font-semibold text-gray-800">{scheduleData.datasetTriggers.length} configured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dataset Triggers List */}
        {scheduleData.datasetTriggers.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4 text-gray-700">Dataset Triggers</h3>
            <div className="bg-gray-50 p-4 md:p-5 rounded-lg space-y-3">
              {scheduleData.datasetTriggers.map((trigger, index) => (
                <div key={trigger.id} className="bg-white p-4 rounded border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Database size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{trigger.datasetName}</div>
                      <div className="text-xs text-gray-600 mt-1">Condition: {trigger.condition}</div>
                      {trigger.description && <div className="text-xs text-gray-500 mt-1">{trigger.description}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <div className="font-medium text-green-800">Ready for Submission</div>
            <div className="text-sm text-green-700 mt-1">
              Job configuration is complete. All required fields have been filled and at least one trigger or schedule
              has been configured.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Schedule
        </Button>
        <Button variant="success" size="large" onClick={onSubmit}>
          <CheckCircle size={16} className="mr-2" />
          Submit Job
        </Button>
      </div>
    </div>
  )
}

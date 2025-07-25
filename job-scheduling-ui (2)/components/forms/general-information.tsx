"use client"

import { Database } from "lucide-react"
import { Button } from "../ui/button"

interface FormData {
  jobName: string
  jobType: string
  lpar: string
  uid: string
  region: string
  jclLibName: string
}

interface GeneralInformationProps {
  formData: FormData
  onFormDataChange: (data: Partial<FormData>) => void
  onNext: () => void
}

export const GeneralInformation = ({ formData, onFormDataChange, onNext }: GeneralInformationProps) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormDataChange({ [field]: value })
  }

  const isFormValid = formData.jobName.trim() !== ""

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Database size={20} className="text-blue-600" />
        Job Definition
      </h3>

      <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">Job Name:</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter job name (e.g., DAILY_BACKUP_JOB)"
              value={formData.jobName}
              onChange={(e) => handleInputChange("jobName", e.target.value.toUpperCase())}
            />
            <span className="text-red-500 text-lg font-bold" title="Required field">
              !
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start">
          <label className="text-sm font-medium text-gray-700 md:text-right md:pt-3">Job Type:</label>
          <div className="max-w-md p-4 bg-gray-50 border border-gray-300 rounded text-sm">
            <div className="font-mono font-semibold text-gray-800">ABC12340</div>
            <div className="mt-2 space-y-1">
              <div className="font-medium">Non- Executable Job:</div>
              <div>C$aaaxx or $aaaxx: For eg:</div>
              <div className="font-mono text-blue-600 mt-1">C$ABC123 or $ABC1234</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">LPAR:</label>
          <select
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            value={formData.lpar}
            onChange={(e) => handleInputChange("lpar", e.target.value)}
          >
            <option value="">--Select LPAR--</option>
            <option value="LPAR1">LPAR1 - Production</option>
            <option value="LPAR2">LPAR2 - Development</option>
            <option value="LPAR3">LPAR3 - Testing</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">UID:</label>
          <input
            type="text"
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter User ID"
            value={formData.uid}
            onChange={(e) => handleInputChange("uid", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">Region:</label>
          <select
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            value={formData.region}
            onChange={(e) => handleInputChange("region", e.target.value)}
          >
            <option value="">--Select Region--</option>
            <option value="US-EAST">US-EAST (Primary)</option>
            <option value="US-WEST">US-WEST (Secondary)</option>
            <option value="EU-CENTRAL">EU-CENTRAL</option>
            <option value="ASIA-PACIFIC">ASIA-PACIFIC</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">JCL Lib Name:</label>
          <input
            type="text"
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter JCL Library Name (e.g., PROD.JCL.LIBRARY)"
            value={formData.jclLibName}
            onChange={(e) => handleInputChange("jclLibName", e.target.value.toUpperCase())}
          />
        </div>
      </div>

      <div className="flex justify-center mt-6 md:mt-8">
        <Button onClick={onNext} disabled={!isFormValid}>
          Continue
        </Button>
      </div>
    </div>
  )
}

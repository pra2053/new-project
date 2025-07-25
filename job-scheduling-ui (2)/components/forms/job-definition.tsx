"use client"

import { Database, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"

interface JobDefinitionData {
  jobName: string
  region: string
  lpar: string
}

interface JobDefinitionProps {
  formData: JobDefinitionData
  onFormDataChange: (data: Partial<JobDefinitionData>) => void
  onNext: (exists: boolean) => void
}

export const JobDefinition = ({ formData, onFormDataChange, onNext }: JobDefinitionProps) => {
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof JobDefinitionData, value: string) => {
    onFormDataChange({ [field]: value })
    if (error) setError("") // Clear error when user starts typing
  }

  const checkJobExists = async () => {
    setIsChecking(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock logic: job exists if name contains "EXISTING"
      const jobExists = formData.jobName.toUpperCase().includes("EXISTING")

      if (jobExists) {
        setError(`Job "${formData.jobName}" already exists in the system. Please choose a different name.`)
      } else {
        onNext(false) // Job doesn't exist, proceed to next step
      }
    } catch (err) {
      setError("Failed to check job existence. Please try again.")
    } finally {
      setIsChecking(false)
    }
  }

  const isFormValid = formData.jobName.trim() !== "" && formData.region !== "" && formData.lpar !== ""

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <Database size={20} className="text-blue-600" />
        Job Definition
      </h3>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="text-red-600 text-lg">⚠️</div>
            <div>
              <div className="font-medium text-red-800">Job Already Exists</div>
              <div className="text-sm text-red-700 mt-1">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">
            Job Name: <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className={`flex-1 max-w-md px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter job name (e.g., DAILY_BACKUP_JOB)"
              value={formData.jobName}
              onChange={(e) => handleInputChange("jobName", e.target.value.toUpperCase())}
              disabled={isChecking}
            />
          </div>
          <div className="md:col-start-2 text-xs text-gray-500 mt-1">
            Try typing "EXISTING" in the name to test error handling
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">
            Region: <span className="text-red-500">*</span>
          </label>
          <select
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            value={formData.region}
            onChange={(e) => handleInputChange("region", e.target.value)}
            disabled={isChecking}
          >
            <option value="">--Select Region--</option>
            <option value="US-EAST">US-EAST (Primary)</option>
            <option value="US-WEST">US-WEST (Secondary)</option>
            <option value="EU-CENTRAL">EU-CENTRAL</option>
            <option value="ASIA-PACIFIC">ASIA-PACIFIC</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-start md:items-center">
          <label className="text-sm font-medium text-gray-700 md:text-right">
            LPAR: <span className="text-red-500">*</span>
          </label>
          <select
            className="max-w-md px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            value={formData.lpar}
            onChange={(e) => handleInputChange("lpar", e.target.value)}
            disabled={isChecking}
          >
            <option value="">--Select LPAR--</option>
            <option value="LPAR1">LPAR1 - Production</option>
            <option value="LPAR2">LPAR2 - Development</option>
            <option value="LPAR3">LPAR3 - Testing</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-6 md:mt-8">
        <Button onClick={checkJobExists} disabled={!isFormValid || isChecking} className="min-w-[120px]">
          {isChecking ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  )
}

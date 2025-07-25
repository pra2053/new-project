"use client"

import { useState } from "react"
import { Database, Calendar, CheckCircle } from "lucide-react"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { StepIndicator } from "./components/step-indicator"
import { JobDefinition } from "./components/forms/job-definition"
import { ScheduleFrequency } from "./components/forms/schedule-frequency"
import { ReviewSubmit } from "./components/forms/review-submit"

const JobSchedulingUI = () => {
  const [currentStep, setCurrentStep] = useState(0) // 0-2 for steps
  const [selectedMenuItem, setSelectedMenuItem] = useState("add-job")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Form state
  const [jobData, setJobData] = useState({
    jobName: "",
    region: "",
    lpar: "",
  })

  const [scheduleData, setScheduleData] = useState({
    schedulingEnabled: false,
    startDate: "",
    startTime: "09:00",
    datasetTriggers: [],
  })

  const steps = [
    { id: "definition", title: "Job Definition", icon: Database },
    { id: "schedule", title: "Schedule & Frequency", icon: Calendar },
    { id: "review", title: "Review & Submit", icon: CheckCircle },
  ]

  const handleJobDataChange = (data: Partial<typeof jobData>) => {
    setJobData((prev) => ({ ...prev, ...data }))
  }

  const handleScheduleDataChange = (data: Partial<typeof scheduleData>) => {
    setScheduleData((prev) => ({ ...prev, ...data }))
  }

  const handleJobDefinitionNext = (jobExists: boolean) => {
    if (!jobExists) {
      setCurrentStep(1)
    }
  }

  const handleScheduleNext = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 0)
    setCurrentStep(prevStep)
  }

  const handleSubmit = () => {
    // Handle job submission
    const submissionData = {
      jobDefinition: jobData,
      schedule: scheduleData,
      autoFilled: {
        uid: "SYS001",
        jclLibrary: "PROD.JCL.LIB",
        jobType: "Non-Executable",
      },
    }

    console.log("Submitting job:", submissionData)
    alert("Job submitted successfully!")

    // Reset form or redirect
    // setCurrentStep(0)
    // setJobData({ jobName: "", region: "", lpar: "" })
    // setScheduleData({ schedulingEnabled: false, startDate: "", startTime: "09:00", datasetTriggers: [] })
  }

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <JobDefinition formData={jobData} onFormDataChange={handleJobDataChange} onNext={handleJobDefinitionNext} />
        )
      case 1:
        return (
          <ScheduleFrequency
            formData={scheduleData}
            onFormDataChange={handleScheduleDataChange}
            onNext={handleScheduleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <ReviewSubmit jobData={jobData} scheduleData={scheduleData} onBack={handleBack} onSubmit={handleSubmit} />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 md:z-0 h-full transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar selectedMenuItem={selectedMenuItem} onMenuItemSelect={setSelectedMenuItem} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden mb-4 p-2 bg-white rounded-lg shadow-sm border border-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="w-5 h-5 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </button>

            {/* Step Progress Indicator */}
            <StepIndicator currentStep={currentStep} steps={steps} />

            {/* Content */}
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSchedulingUI

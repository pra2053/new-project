import { CheckCircle } from "lucide-react"

interface Step {
  id: string
  title: string
  icon: any
}

interface StepIndicatorProps {
  currentStep: number
  steps: Step[]
  className?: string
}

export const StepIndicator = ({ currentStep, steps, className = "" }: StepIndicatorProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 ${className}`}>
      <div className="flex items-center justify-between relative overflow-x-auto">
        <div className="flex items-center gap-4 md:gap-8 min-w-max mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isCompleted = index < currentStep
            const isActive = index === currentStep

            return (
              <div key={step.id} className="flex items-center relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-[#0066cc] text-white ring-4 ring-blue-100"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <IconComponent size={16} />}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-xs font-medium max-w-[80px] md:max-w-none ${
                        isActive || isCompleted ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 md:w-20 h-[2px] transition-all duration-300 ml-4 md:ml-8 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

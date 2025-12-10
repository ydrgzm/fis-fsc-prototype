import { Check } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import './WizardProgress.css';

const steps = [
  { id: 1, label: 'Setup' },
  { id: 2, label: 'Field Mapping' },
  { id: 3, label: 'Data Fixes' },
  { id: 4, label: 'Run' },
];

export function WizardProgress() {
  const { currentStep, visitedSteps, setCurrentStep, markStepVisited } = useWizard();

  const handleStepClick = (stepId: number) => {
    if (visitedSteps.has(stepId) || stepId <= currentStep) {
      setCurrentStep(stepId);
      markStepVisited(stepId);
    }
  };

  return (
    <div className="wizard-progress">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = visitedSteps.has(step.id) && currentStep > step.id;
        const isClickable = visitedSteps.has(step.id) || step.id <= currentStep;

        return (
          <div
            key={step.id}
            className={`wizard-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isClickable ? 'clickable' : ''}`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="step-content">
              {isCompleted && <Check size={14} className="check-icon" />}
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className="step-arrow" />}
          </div>
        );
      })}
    </div>
  );
}

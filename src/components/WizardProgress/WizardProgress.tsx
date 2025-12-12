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
    <div className="slds-path">
      <div className="slds-path__track">
        <ul className="slds-path__nav" role="listbox">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = visitedSteps.has(step.id) && currentStep > step.id;
            const isClickable = visitedSteps.has(step.id) || step.id <= currentStep;
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;

            let stateClass = 'slds-is-incomplete';
            if (isCompleted) stateClass = 'slds-is-complete';
            if (isActive) stateClass = 'slds-is-current slds-is-active';

            return (
              <li
                key={step.id}
                className={`slds-path__item ${stateClass} ${isClickable ? 'slds-is-clickable' : ''} ${isFirst ? 'slds-is-first' : ''} ${isLast ? 'slds-is-last' : ''}`}
                role="presentation"
              >
                <a
                  className="slds-path__link"
                  role="option"
                  aria-selected={isActive}
                  tabIndex={isClickable ? 0 : -1}
                  onClick={() => handleStepClick(step.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(step.id);
                    }
                  }}
                >
                  {isCompleted ? (
                    <>
                      <span className="slds-path__stage">
                        <Check size={16} strokeWidth={2.5} />
                      </span>
                      <span className="slds-path__title-hover">{step.label}</span>
                    </>
                  ) : (
                    <span className="slds-path__title">{step.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

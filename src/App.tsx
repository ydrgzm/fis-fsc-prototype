import { WizardProvider, useWizard } from './context/WizardContext';
import { WizardProgress } from './components/WizardProgress';
import { SetupScreen, FieldMappingScreen, PreviewScreen, RunScreen } from './components/screens';
import { Button, Toast } from './components/ui';
import './App.css';

function WizardContent() {
  const { 
    currentStep, 
    setCurrentStep, 
    markStepVisited, 
    visitedSteps,
    showToast,
    setShowToast,
    toastMessage
  } = useWizard();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      markStepVisited(nextStep);
      setCurrentStep(nextStep);
    }
  };

  const canProceed = () => {
    // For prototype, always allow proceeding
    return true;
  };

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <SetupScreen />;
      case 2:
        return <FieldMappingScreen />;
      case 3:
        return <PreviewScreen />;
      case 4:
        return <RunScreen />;
      default:
        return <SetupScreen />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>FIS-FSC Integration</h1>
      </header>
      
      <main className="app-main">
        <WizardProgress />
        
        <div className="screen-container">
          {renderScreen()}
        </div>

        <div className="navigation-footer">
          <Button
            variant="neutral"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          {currentStep < 4 && (
            <Button
              variant="brand"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 3 ? 'Continue to Run' : 'Next'}
            </Button>
          )}
        </div>
      </main>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}

export default App;

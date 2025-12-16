import { WizardProvider, useWizard } from './context/WizardContext';
import { WizardProgress } from './components/WizardProgress';
import { SetupScreen, FieldMappingScreen, PreviewScreen, RunScreen, AppExchangeScreen, InstallOptionsScreen } from './components/screens';
import { Button, Toast } from './components/ui';
import dataiamLogo from './assets/dataiam-logo.png';
import './App.css';

function WizardFlow() {
  const { 
    currentStep, 
    setCurrentStep, 
    markStepVisited, 
    showToast,
    setShowToast,
    toastMessage,
    // setPreWizardStep // Unused now
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Setup';
      case 2: return 'Field Mapping';
      case 3: return 'Preview';
      case 4: return 'Run';
      default: return 'Setup';
    }
  };

  return (
    <div className="wizard-app">
      <main className="wizard-main">
        {/* Page Header */}
        <div className="wizard-header">
          <div className="wizard-logo">
            <img src={dataiamLogo} alt="FIS Logo" />
          </div>
          <div className="wizard-title-section">
            <h1 className="wizard-page-title">Configure FIS Integration for Financial Services Cloud</h1>
            <p className="wizard-subtitle">Step {currentStep} of 4: {getStepTitle()}</p>
          </div>
        </div>

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

function WizardContent() {
  const { preWizardStep } = useWizard();

  // Pre-wizard screens (outside the main wizard flow)
  if (preWizardStep === 0) {
    return <AppExchangeScreen />;
  }

  if (preWizardStep === 1) {
    return <InstallOptionsScreen />;
  }

  // Main wizard flow (preWizardStep === 2)
  return <WizardFlow />;
}

function App() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}

export default App;

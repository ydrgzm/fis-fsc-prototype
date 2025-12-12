import { WizardProvider, useWizard } from './context/WizardContext';
import { WizardProgress } from './components/WizardProgress';
import { SetupScreen, FieldMappingScreen, PreviewScreen, RunScreen, AppExchangeScreen, InstallOptionsScreen } from './components/screens';
import { Button, Toast } from './components/ui';
import { ChevronDown, ChevronRight, Search, Heart, User } from 'lucide-react';
import fisLogo from './assets/fis-logo.png';
import salesforceLogo from './assets/salesforce-logo.png';
import './App.css';

function WizardFlow() {
  const { 
    currentStep, 
    setCurrentStep, 
    markStepVisited, 
    showToast,
    setShowToast,
    toastMessage,
    setPreWizardStep
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
      {/* Top Navigation Bar */}
      <header className="appexchange-topnav">
        <div className="topnav-left">
          <div className="appexchange-logo">
            <img src={salesforceLogo} alt="Salesforce" className="salesforce-cloud-icon" />
            <span className="logo-text">AppExchange</span>
          </div>
        </div>
        <nav className="topnav-center">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Explore <ChevronDown size={14} /></a>
          <a href="#" className="nav-link">Collections</a>
          <a href="#" className="nav-link">Consultants</a>
          <a href="#" className="nav-link">Learn</a>
        </nav>
        <div className="topnav-right">
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search AppExchange" className="search-input" />
          </div>
          <button className="icon-btn" title="Favorites" aria-label="Favorites">
            <Heart size={20} />
          </button>
          <button className="icon-btn" title="Account" aria-label="Account">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a href="#" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); setPreWizardStep(0); }}>FIS-FSC Integration</a>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Configuration - {getStepTitle()}</span>
        </div>
      </div>
      
      <main className="wizard-main">
        {/* Page Header */}
        <div className="wizard-header">
          <div className="wizard-logo">
            <img src={fisLogo} alt="FIS Logo" />
          </div>
          <div className="wizard-title-section">
            <h1 className="wizard-page-title">Configure FIS-FSC Integration</h1>
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

      {/* Footer */}
      <footer className="appexchange-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Offer your solution on AppExchange</a>
            <span className="footer-divider">|</span>
            <a href="#">Privacy Statement</a>
            <span className="footer-divider">|</span>
            <a href="#">Terms of Use</a>
          </div>
          <p className="footer-copyright">© 2000-2025, Salesforce, Inc.</p>
        </div>
      </footer>

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

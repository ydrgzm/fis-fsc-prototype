import { ChevronDown, ChevronRight, Search, AlertTriangle, Heart, User } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import type { InstallConfig } from '../../context/WizardContext';
import './InstallOptionsScreen.css';
import fisLogo from '../../assets/fis-logo.png';
import salesforceLogo from '../../assets/salesforce-logo.png';

export function InstallOptionsScreen() {
  const { wizardData, updateInstallConfig, setPreWizardStep } = useWizard();
  const { installConfig } = wizardData;

  const handleConflictChange = (value: InstallConfig['conflictHandling']) => {
    updateInstallConfig({ ...installConfig, conflictHandling: value });
  };

  const handleScopeChange = (value: InstallConfig['installScope']) => {
    updateInstallConfig({ ...installConfig, installScope: value });
  };

  const handleInstall = () => {
    setPreWizardStep(2);
  };

  const handleCancel = () => {
    setPreWizardStep(0);
  };

  return (
    <div className="install-options-screen">
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
          <button className="icon-btn">
            <Heart size={20} />
          </button>
          <button className="icon-btn">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a href="#" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); handleCancel(); }}>FIS-FSC Integration</a>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Installation</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="install-container">
        {/* Page Header */}
        <div className="install-header">
          <div className="install-logo">
            <img src={fisLogo} alt="FIS Logo" />
          </div>
          <div className="install-title-section">
            <h1 className="install-page-title">Install FIS-FSC Integration</h1>
            <p className="install-subtitle">Configure your installation preferences below</p>
          </div>
        </div>

        {/* Conflict Handling Section */}
        <div className="install-card">
          <div className="card-header">
            <AlertTriangle size={20} className="warning-icon" />
            <h2 className="card-title">What if existing component names conflict with ones in this package?</h2>
          </div>
          
          <div className="conflict-options">
            <label className="radio-option">
              <input
                type="radio"
                name="conflict"
                checked={installConfig.conflictHandling === 'doNotInstall'}
                onChange={() => handleConflictChange('doNotInstall')}
              />
              <span className="radio-circle"></span>
              <span className="radio-label">Do not install</span>
            </label>
            
            <label className="radio-option">
              <input
                type="radio"
                name="conflict"
                checked={installConfig.conflictHandling === 'rename'}
                onChange={() => handleConflictChange('rename')}
              />
              <span className="radio-circle"></span>
              <span className="radio-label">Rename conflicting components in package</span>
            </label>
          </div>
        </div>

        {/* Install Scope Section */}
        <div className="install-card">
          <h2 className="card-title">Select Installation Scope</h2>
          <p className="card-description">Choose who will have access to this package</p>
          
          <div className="scope-cards">
            <div 
              className={`scope-card ${installConfig.installScope === 'admins' ? 'selected' : ''}`}
              onClick={() => handleScopeChange('admins')}
            >
              <div className="scope-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#E8F4FC"/>
                  <circle cx="24" cy="18" r="8" fill="#032d60"/>
                  <path d="M12 40c0-8 5-14 12-14s12 6 12 14" fill="#032d60"/>
                  <circle cx="24" cy="10" r="3" fill="#FFB800"/>
                </svg>
              </div>
              <div className="scope-content">
                <div className="scope-radio">
                  <input
                    type="radio"
                    name="scope"
                    checked={installConfig.installScope === 'admins'}
                    onChange={() => handleScopeChange('admins')}
                  />
                  <span className="radio-circle"></span>
                </div>
                <span className="scope-label">Install for Admins Only</span>
                <span className="scope-description">Only administrators can access</span>
              </div>
            </div>

            <div 
              className={`scope-card ${installConfig.installScope === 'allUsers' ? 'selected' : ''}`}
              onClick={() => handleScopeChange('allUsers')}
            >
              <div className="scope-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#E8F4FC"/>
                  <circle cx="16" cy="18" r="6" fill="#032d60"/>
                  <circle cx="32" cy="18" r="6" fill="#032d60"/>
                  <path d="M8 38c0-6 4-10 8-10s8 4 8 10" fill="#032d60"/>
                  <path d="M24 38c0-6 4-10 8-10s8 4 8 10" fill="#032d60"/>
                </svg>
              </div>
              <div className="scope-content">
                <div className="scope-radio">
                  <input
                    type="radio"
                    name="scope"
                    checked={installConfig.installScope === 'allUsers'}
                    onChange={() => handleScopeChange('allUsers')}
                  />
                  <span className="radio-circle"></span>
                </div>
                <span className="scope-label">Install for All Users</span>
                <span className="scope-description">Everyone in your org can access</span>
              </div>
            </div>

            <div 
              className={`scope-card ${installConfig.installScope === 'specificProfiles' ? 'selected' : ''}`}
              onClick={() => handleScopeChange('specificProfiles')}
            >
              <div className="scope-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#E8F4FC"/>
                  <circle cx="24" cy="16" r="5" fill="#032d60"/>
                  <circle cx="14" cy="22" r="4" fill="#706E6B"/>
                  <circle cx="34" cy="22" r="4" fill="#706E6B"/>
                  <path d="M16 38c0-5 4-9 8-9s8 4 8 9" fill="#032d60"/>
                </svg>
              </div>
              <div className="scope-content">
                <div className="scope-radio">
                  <input
                    type="radio"
                    name="scope"
                    checked={installConfig.installScope === 'specificProfiles'}
                    onChange={() => handleScopeChange('specificProfiles')}
                  />
                  <span className="radio-circle"></span>
                </div>
                <span className="scope-label">Install for Specific Profiles</span>
                <span className="scope-description">Choose specific user profiles</span>
              </div>
            </div>
          </div>

          {installConfig.installScope === 'specificProfiles' && (
            <div className="profiles-placeholder">
              <p>Profile selection will be available in a future update.</p>
            </div>
          )}
        </div>

        {/* App Metadata Card */}
        <div className="install-card metadata-card">
          <h2 className="card-title">Package Details</h2>
          <div className="metadata-grid">
            <div className="metadata-item">
              <span className="metadata-label">App Name</span>
              <span className="metadata-value">FSC-FIS Integration</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Publisher</span>
              <span className="metadata-value">DatalAm</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Version Name</span>
              <span className="metadata-value">1.0</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Version Number</span>
              <span className="metadata-value">1.0.0</span>
            </div>
          </div>
          <div className="metadata-description">
            <span className="metadata-label">Description</span>
            <p>Pre-built integration for loading core-banking data from FIS to FSC. Manages the initial load, ongoing daily deltas, and on-demand deltas.</p>
          </div>
          <a href="#" className="view-components-link">View Components →</a>
        </div>

        {/* Action Buttons */}
        <div className="install-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="install-btn" onClick={handleInstall}>
            Install Package
          </button>
        </div>
      </div>

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
    </div>
  );
}

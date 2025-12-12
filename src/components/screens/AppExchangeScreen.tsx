import { ChevronLeft, ChevronDown, Star, Search, Heart, MessageCircle, Play, ChevronRight, Menu, User } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import './AppExchangeScreen.css';

export function AppExchangeScreen() {
  const { setPreWizardStep } = useWizard();

  const handleGetItNow = () => {
    setPreWizardStep(1);
  };

  return (
    <div className="appexchange-screen">
      {/* Top Navigation Bar */}
      <header className="appexchange-topnav">
        <div className="topnav-left">
          <div className="appexchange-logo">
            <svg viewBox="0 0 40 28" className="salesforce-cloud-icon">
              <path d="M16.8 5.6c1.4-1.5 3.4-2.4 5.6-2.4 2.8 0 5.3 1.5 6.6 3.8 1-.4 2.1-.6 3.2-.6 4.4 0 8 3.6 8 8s-3.6 8-8 8H7.2c-4 0-7.2-3.2-7.2-7.2 0-3.6 2.6-6.5 6-7.1.3-2.5 2.4-4.5 5-4.5 1.4 0 2.7.6 3.6 1.5.7.8 1.5 1.8 2.2.5z" fill="#00A1E0"/>
            </svg>
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
          <a href="#" className="breadcrumb-link">Home</a>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">FIS-FSC Integration</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="listing-container">
        {/* Listing Header */}
        <div className="listing-header">
          <div className="listing-logo">
            <div className="logo-wrapper">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="64" height="64" rx="12" fill="#032D60"/>
                <text x="32" y="40" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">FIS</text>
              </svg>
            </div>
          </div>
          <div className="listing-info">
            <div className="listing-badges">
              <span className="badge badge-paid">Paid</span>
              <span className="badge badge-lightning">⚡ Lightning Ready</span>
            </div>
            <h1 className="listing-title">FIS-FSC Integration | Financial Services Cloud Connector</h1>
            <p className="listing-byline">By <a href="#" className="provider-link">DatalAm</a></p>
            <p className="listing-description">
              Built for financial institutions digitally transforming their operations, this integration seamlessly connects FIS core banking data with Salesforce Financial Services Cloud, enabling real-time account synchronization, transaction visibility, and unified customer profiles.
            </p>
            <div className="listing-meta">
              <div className="rating-section">
                <div className="star-rating">
                  <Star size={18} fill="#FFB800" stroke="#FFB800" />
                  <Star size={18} fill="#FFB800" stroke="#FFB800" />
                  <Star size={18} fill="#FFB800" stroke="#FFB800" />
                  <Star size={18} fill="#FFB800" stroke="#FFB800" />
                  <Star size={18} fill="#FFB800" stroke="#FFB800" />
                </div>
                <span className="rating-value">4.95</span>
                <a href="#reviews" className="reviews-link">279 Reviews</a>
              </div>
            </div>
          </div>
          <div className="listing-actions">
            <div className="pricing-card">
              <div className="price-label">Starting at</div>
              <div className="price-value">$35<span className="price-period">/user/month</span></div>
              <p className="price-note">Contact us for pricing.</p>
              <a href="#" className="pricing-details-link">Pricing Details</a>
            </div>
            <button className="get-it-now-btn" onClick={handleGetItNow}>
              <span className="btn-icon">↓</span>
              Get It Now
            </button>
            <div className="action-buttons">
              <button className="secondary-btn">
                <Play size={16} />
                Watch Demo
              </button>
              <button className="secondary-btn">
                <Heart size={16} />
                Add to Favorites
              </button>
              <button className="secondary-btn">
                <MessageCircle size={16} />
                Chat with Provider
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="listing-tabs">
          <button className="tab-btn active">Overview</button>
          <button className="tab-btn">Reviews</button>
          <button className="tab-btn">More Details</button>
        </div>

        {/* Content Section */}
        <div className="listing-content">
          {/* Media Carousel */}
          <div className="media-section">
            <div className="media-carousel">
              <div className="carousel-main">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect fill='%23032D60' width='800' height='450'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='white' font-size='32' font-family='Arial'%3EFIS Integration%3C/text%3E%3Ctext x='400' y='250' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3Efor%3C/text%3E%3Ctext x='400' y='300' text-anchor='middle' fill='white' font-size='32' font-family='Arial'%3EFinancial Services Cloud%3C/text%3E%3C/svg%3E"
                  alt="FIS Integration for Financial Services Cloud"
                  className="carousel-image"
                />
              </div>
              <div className="carousel-thumbnails">
                <div className="thumbnail active">
                  <div className="thumbnail-placeholder">1</div>
                </div>
                <div className="thumbnail">
                  <div className="thumbnail-placeholder">2</div>
                </div>
                <div className="thumbnail">
                  <div className="thumbnail-placeholder">3</div>
                </div>
                <div className="thumbnail">
                  <div className="thumbnail-placeholder">4</div>
                </div>
              </div>
              <div className="carousel-pagination">1 of 4</div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="highlights-section">
            <h2 className="section-title">Highlights</h2>
            <div className="highlights-grid">
              <div className="highlight-card">
                <div className="highlight-icon">🔄</div>
                <div className="highlight-content">
                  <strong>REAL-TIME DATA SYNCHRONIZATION:</strong> Automatically sync accounts, transactions, and customer data between FIS core banking and Financial Services Cloud. Bi-directional updates ensure data consistency across systems.
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">👤</div>
                <div className="highlight-content">
                  <strong>UNIFIED CUSTOMER 360 VIEW:</strong> Consolidate customer financial data from multiple FIS sources into a single Financial Services Cloud profile. Enable relationship managers with complete visibility.
                </div>
              </div>
              <div className="highlight-card">
                <div className="highlight-icon">⚡</div>
                <div className="highlight-content">
                  <strong>STREAMLINED FIELD MAPPING:</strong> Intuitive mapping interface to connect FIS data fields to FSC objects. Pre-built mappings for Account, FinancialAccount, and Transaction objects accelerate implementation.
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="details-section">
            <h2 className="section-title">Additional Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Listed On</span>
                <span className="detail-value">September 10, 2024</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Latest Release</span>
                <span className="detail-value">December 1, 2024</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Version</span>
                <span className="detail-value">16.0.2122</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Categories</span>
                <span className="detail-value">Financial Services, Integration</span>
              </div>
            </div>
          </div>

          {/* Resources Section */}
          <div className="resources-section">
            <h2 className="section-title">Resources & Documentation</h2>
            <div className="resources-grid">
              <div className="resource-category">
                <h3 className="resource-title">Case Studies</h3>
                <ul className="resource-list">
                  <li><a href="#">Regional Bank streamlines operations with FIS-FSC Integration</a></li>
                  <li><a href="#">Credit Union improves member experience with unified data</a></li>
                  <li><a href="#">Investment firm gains real-time portfolio visibility</a></li>
                </ul>
              </div>
              <div className="resource-category">
                <h3 className="resource-title">Data Sheets</h3>
                <ul className="resource-list">
                  <li><a href="#">FIS-FSC Integration: Connect your core banking data</a></li>
                </ul>
              </div>
            </div>
          </div>
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

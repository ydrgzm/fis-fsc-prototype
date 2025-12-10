import { useState } from 'react';
import { Card, Button } from '../ui';
import './PreviewScreen.css';

// Mock data based on the wireframe showing realistic financial data
const mockData = [
  {
    balance: 'ASHLEY',
    assetType: 'GONZALEZ',
    accountNumber: 'Zenith Corp',
    maxBalance: '$5M',
    contact: '221-532-2551',
  },
  {
    balance: 'robert',
    assetType: 'Hernandez',
    accountNumber: 'Elevate Digital',
    maxBalance: 'USD220000',
    contact: '(810) 971.8698',
  },
  {
    balance: 'DAVID',
    assetType: 'BROWN',
    accountNumber: 'AstroWave',
    maxBalance: '95M',
    contact: '800 599 2717 Ext 6959',
  },
  {
    balance: 'DANIEL',
    assetType: 'GARCIA',
    accountNumber: 'QuantumEdge',
    maxBalance: '$500,000',
    contact: '353-457-5239',
  },
  {
    balance: 'matthew',
    assetType: 'willman',
    accountNumber: 'Skyline Consulting',
    maxBalance: '12MM',
    contact: '+1 (794) 507-4180',
  },
  {
    balance: 'william',
    assetType: 'garcia',
    accountNumber: 'Summit Solutions',
    maxBalance: 'USD15MM',
    contact: '800 8426 765',
  },
  {
    balance: 'JESSICA',
    assetType: 'TAYLOR',
    accountNumber: 'Visionary Tech',
    maxBalance: '1MM',
    contact: '+1 482 525 3878',
  },
  {
    balance: 'CHRISTOPHER',
    assetType: 'JONES',
    accountNumber: 'Elevate Digital',
    maxBalance: '$600K',
    contact: '+1 (913) 683-9234 Ext 440',
  },
  {
    balance: 'JOSEPH',
    assetType: 'MILLER',
    accountNumber: 'Pinnacle Systems',
    maxBalance: '25M',
    contact: '+1 255 249 3889',
  },
  {
    balance: 'CHRISTOPHER',
    assetType: 'THOMAS',
    accountNumber: 'Silverstone Group',
    maxBalance: '25M',
    contact: '+1 (502) 847-3804',
  },
  {
    balance: 'DAVID',
    assetType: 'Jones',
    accountNumber: 'Silverstone Group',
    maxBalance: '90MM',
    contact: '+1 791 432 4012',
  },
  {
    balance: 'william',
    assetType: 'rod',
    accountNumber: 'QuantumEdge',
    maxBalance: '$7.2M',
    contact: '(745) 485.2256 Ext 321',
  },
  {
    balance: 'amanda',
    assetType: 'gonzalez',
    accountNumber: 'Pinnacle Systems',
    maxBalance: '$500,000',
    contact: '(680) 517.9859',
  },
  {
    balance: 'elizabeth',
    assetType: 'taylor',
    accountNumber: 'Summit Solutions',
    maxBalance: '75M',
    contact: '1 (346) 225-6506 Ext 100',
  },
];

// Transform data for "Preview of fixes" view
const transformData = (data: typeof mockData) => {
  return data.map((row) => ({
    balance: row.balance.charAt(0).toUpperCase() + row.balance.slice(1).toLowerCase(),
    assetType: row.assetType.charAt(0).toUpperCase() + row.assetType.slice(1).toLowerCase(),
    accountNumber: row.accountNumber,
    maxBalance: convertToNumber(row.maxBalance),
    contact: formatPhone(row.contact),
  }));
};

const convertToNumber = (value: string): string => {
  // Remove $ and other currency symbols
  let clean = value.replace(/[$USD,]/g, '').trim();
  
  // Convert K, M, MM, B notations
  if (clean.endsWith('K')) {
    const num = parseFloat(clean.slice(0, -1));
    return (num * 1000).toLocaleString();
  }
  if (clean.endsWith('MM')) {
    const num = parseFloat(clean.slice(0, -2));
    return (num * 1000000).toLocaleString();
  }
  if (clean.endsWith('M')) {
    const num = parseFloat(clean.slice(0, -1));
    return (num * 1000000).toLocaleString();
  }
  if (clean.endsWith('B')) {
    const num = parseFloat(clean.slice(0, -1));
    return (num * 1000000000).toLocaleString();
  }
  
  // Already a number
  const num = parseFloat(clean);
  return isNaN(num) ? value : num.toLocaleString();
};

const formatPhone = (value: string): string => {
  // Extract just digits
  const digits = value.replace(/\D/g, '');
  
  // Handle extension
  const extMatch = value.match(/ext\.?\s*(\d+)/i);
  const ext = extMatch ? ` Ext ${extMatch[1]}` : '';
  
  // Format as NANP: XXX-XXX-XXXX
  if (digits.length >= 10) {
    const main = digits.slice(-10);
    const country = digits.length > 10 ? `+${digits.slice(0, -10)} ` : '';
    return `${country}${main.slice(0, 3)}-${main.slice(3, 6)}-${main.slice(6)}${ext}`;
  }
  
  return value;
};

export function PreviewScreen() {
  const [viewMode, setViewMode] = useState<'original' | 'preview'>('original');
  
  const displayData = viewMode === 'original' ? mockData : transformData(mockData);

  return (
    <div className="preview-screen">
      <Card>
        <div className="preview-table-container">
          <table className="preview-table">
            <thead>
              <tr>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.Balance</span>
                    <span className="target-name">→ FSC.Value</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.AssetType</span>
                    <span className="target-name">→ FSC.Type</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.AccountNumber</span>
                    <span className="target-name">→ FSC.AcctNumber</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.MaxBalance</span>
                    <span className="target-name">→ FSC.MaxValue</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.Contact</span>
                    <span className="target-name">→ FSC.Phone</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={index}>
                  <td>{row.balance}</td>
                  <td>{row.assetType}</td>
                  <td>{row.accountNumber}</td>
                  <td>{row.maxBalance}</td>
                  <td>{row.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="preview-footer">
          <span className="subset-notice">Displaying subset of records only</span>
          <div className="view-toggle">
            <Button
              variant={viewMode === 'original' ? 'brand' : 'neutral'}
              size="small"
              onClick={() => setViewMode('original')}
            >
              Original data
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'brand' : 'neutral'}
              size="small"
              onClick={() => setViewMode('preview')}
            >
              Preview of fixes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Card, Button } from '../ui';
import './PreviewScreen.css';

// Mock data based on real FIS-FSC field mappings
const mockData = [
  {
    customerId: 'CUST-001234',
    firstName: 'ASHLEY',
    lastName: 'GONZALEZ',
    dateOfBirth: '03/15/1985',
    annualIncome: '75',
    accountNumber: 'CHK-98765432',
    accountType: 'CHK',
    balance: '$5,250,000',
    dateOpened: '01/15/2020',
    interestRate: '2.5%',
    transactionAmount: '($1,500.00)',
    postingDate: '12/10/2025',
    debitCreditFlag: 'D',
  },
  {
    customerId: '  CUST-001235  ',
    firstName: 'robert',
    lastName: 'HERNANDEZ',
    dateOfBirth: '1990-07-22',
    annualIncome: '125',
    accountNumber: 'sav-12345678',
    accountType: 'SAV',
    balance: 'USD220000',
    dateOpened: '2019-03-10',
    interestRate: '3.75%',
    transactionAmount: '$2,500.00',
    postingDate: '2025-12-09',
    debitCreditFlag: 'C',
  },
  {
    customerId: 'CUST-001236',
    firstName: 'DAVID',
    lastName: 'BROWN',
    dateOfBirth: '11/30/1978',
    annualIncome: '95',
    accountNumber: 'CHK-55566677',
    accountType: 'CHK',
    balance: '95M',
    dateOpened: '06/20/2018',
    interestRate: '1.25%',
    transactionAmount: '(500)',
    postingDate: '12/08/2025',
    debitCreditFlag: 'D',
  },
  {
    customerId: 'CUST-001237',
    firstName: 'JENNIFER',
    lastName: 'MARTINEZ',
    dateOfBirth: '05/08/1992',
    annualIncome: '200',
    accountNumber: 'MM-44455566',
    accountType: 'MMA',
    balance: '$1.5M',
    dateOpened: '09/12/2021',
    interestRate: '4.00%',
    transactionAmount: '$10,000.00',
    postingDate: '12/07/2025',
    debitCreditFlag: 'C',
  },
  {
    customerId: '  cust-001238',
    firstName: 'michael',
    lastName: 'wilson',
    dateOfBirth: '1988/02/14',
    annualIncome: '85.5',
    accountNumber: 'cd-77788899',
    accountType: 'CD',
    balance: '$250,000',
    dateOpened: '2022/01/01',
    interestRate: '5.25%',
    transactionAmount: '$250,000.00',
    postingDate: '2024-01-01',
    debitCreditFlag: 'C',
  },
  {
    customerId: 'CUST-001239',
    firstName: '  SARAH  ',
    lastName: '  JOHNSON  ',
    dateOfBirth: '12/25/1995',
    annualIncome: '150',
    accountNumber: 'LON-11122233',
    accountType: 'MORT',
    balance: '$425,000.00',
    dateOpened: '03/15/2023',
    interestRate: '6.875%',
    transactionAmount: '($2,847.33)',
    postingDate: '12/01/2025',
    debitCreditFlag: 'D',
  },
  {
    customerId: 'CUST-001240',
    firstName: 'CHRISTOPHER',
    lastName: 'ANDERSON',
    dateOfBirth: '08/17/1982',
    annualIncome: '300',
    accountNumber: 'CHK-99900011',
    accountType: 'CHK',
    balance: '12MM',
    dateOpened: '11/30/2017',
    interestRate: '0.50%',
    transactionAmount: '$50,000',
    postingDate: '12/05/2025',
    debitCreditFlag: 'C',
  },
  {
    customerId: 'CUST-001241',
    firstName: 'amanda',
    lastName: 'TAYLOR',
    dateOfBirth: '04/03/1990',
    annualIncome: '180',
    accountNumber: 'SAV-22233344',
    accountType: 'SAV',
    balance: '$875K',
    dateOpened: '07/22/2019',
    interestRate: '3.25%',
    transactionAmount: '(15000)',
    postingDate: '12/04/2025',
    debitCreditFlag: 'D',
  },
];

// Transform data for "Preview of fixes" view
const transformData = (data: typeof mockData) => {
  return data.map((row) => ({
    customerId: row.customerId.trim().toUpperCase(),
    firstName: toTitleCase(row.firstName.trim()),
    lastName: toTitleCase(row.lastName.trim()),
    dateOfBirth: formatDateISO(row.dateOfBirth),
    annualIncome: convertFromThousands(row.annualIncome),
    accountNumber: row.accountNumber.trim().toUpperCase(),
    accountType: convertAccountType(row.accountType),
    balance: convertCurrency(row.balance),
    dateOpened: formatDateISO(row.dateOpened),
    interestRate: row.interestRate.replace('%', ''),
    transactionAmount: convertTransactionAmount(row.transactionAmount),
    postingDate: formatDateISO(row.postingDate),
    debitCreditFlag: row.debitCreditFlag === 'D' ? 'Debit' : 'Credit',
  }));
};

const toTitleCase = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatDateISO = (date: string): string => {
  // Handle various date formats and convert to ISO
  const cleaned = date.replace(/[\/\-]/g, '/');
  const parts = cleaned.split('/');
  
  if (parts.length === 3) {
    // Check if already ISO format (YYYY-MM-DD or YYYY/MM/DD)
    if (parts[0].length === 4) {
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
    // Assume MM/DD/YYYY
    return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  }
  return date;
};

const convertFromThousands = (value: string): string => {
  const num = parseFloat(value) * 1000;
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const convertCurrency = (value: string): string => {
  let clean = value.replace(/[$USD,\s]/g, '').trim();
  
  // Handle parentheses for negative
  if (clean.startsWith('(') && clean.endsWith(')')) {
    clean = '-' + clean.slice(1, -1);
  }
  
  // Convert K, M, MM, B notations
  let multiplier = 1;
  if (clean.endsWith('MM')) {
    multiplier = 1000000;
    clean = clean.slice(0, -2);
  } else if (clean.endsWith('M')) {
    multiplier = 1000000;
    clean = clean.slice(0, -1);
  } else if (clean.endsWith('K')) {
    multiplier = 1000;
    clean = clean.slice(0, -1);
  } else if (clean.endsWith('B')) {
    multiplier = 1000000000;
    clean = clean.slice(0, -1);
  }
  
  const num = parseFloat(clean) * multiplier;
  return isNaN(num) ? value : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const convertTransactionAmount = (value: string): string => {
  let clean = value.replace(/[$,\s]/g, '').trim();
  
  // Handle parentheses for negative
  if (clean.startsWith('(') && clean.endsWith(')')) {
    clean = '-' + clean.slice(1, -1);
  }
  
  const num = parseFloat(clean);
  return isNaN(num) ? value : num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const convertAccountType = (code: string): string => {
  const mapping: Record<string, string> = {
    'CHK': 'Checking',
    'SAV': 'Savings',
    'MMA': 'Money Market',
    'CD': 'Certificate of Deposit',
    'MORT': 'Mortgage',
    'LON': 'Loan',
  };
  return mapping[code] || code;
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
                    <span className="source-name">FIS.customerId</span>
                    <span className="target-name">→ Account.FinServ__CustomerID__c</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.firstName</span>
                    <span className="target-name">→ Account.FirstName</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.lastName</span>
                    <span className="target-name">→ Account.LastName</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.accountType</span>
                    <span className="target-name">→ FinancialAccount.FinServ__FinancialAccountType__c</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.balances.currentBalance</span>
                    <span className="target-name">→ FinancialAccount.FinServ__Balance__c</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.transactionAmount</span>
                    <span className="target-name">→ FinancialAccountTransaction.FinServ__Amount__c</span>
                  </div>
                </th>
                <th>
                  <div className="header-cell">
                    <span className="source-name">FIS.debitCreditFlag</span>
                    <span className="target-name">→ FinancialAccountTransaction.FinServ__TransactionType__c</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={index}>
                  <td>{row.customerId}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.accountType}</td>
                  <td>{row.balance}</td>
                  <td>{row.transactionAmount}</td>
                  <td>{row.debitCreditFlag}</td>
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

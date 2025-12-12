import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type SourceType = 'sftp' | 'api';

export interface LoadConfig {
  enabled: boolean;
  sourceType: SourceType;
  sftp: {
    location: string;
    id: string;
    password: string;
  };
  api: {
    key: string;
  };
}

export interface SetupConfig {
  initialLoad: LoadConfig;
  dailyLoad: LoadConfig;
  onDemandLoad: LoadConfig;
}

export interface DataFix {
  id: string;
  label: string;
  example: string;
  enabled: boolean;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  enabled: boolean;
  dataFixes: DataFix[];
}

export interface RunConfig {
  mode: 'now' | 'later';
  scheduleType: 'afterHours' | 'custom';
  customDate: string;
  customTime: string;
}

export interface InstallConfig {
  conflictHandling: 'doNotInstall' | 'rename';
  installScope: 'admins' | 'allUsers' | 'specificProfiles';
}

export interface WizardData {
  setup: SetupConfig;
  mappings: FieldMapping[];
  run: RunConfig;
  installConfig: InstallConfig;
}

interface WizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  visitedSteps: Set<number>;
  markStepVisited: (step: number) => void;
  wizardData: WizardData;
  updateSetup: (setup: SetupConfig) => void;
  updateMappings: (mappings: FieldMapping[]) => void;
  updateRun: (run: RunConfig) => void;
  updateInstallConfig: (installConfig: InstallConfig) => void;
  preWizardStep: number;
  setPreWizardStep: (step: number) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
}

const defaultSetupConfig: SetupConfig = {
  initialLoad: {
    enabled: true,
    sourceType: 'sftp',
    sftp: {
      location: 'secure.ftp.acmebank.com/accounts/extract',
      id: 'admin567',
      password: 'Xnlfj763q;d',
    },
    api: { key: '' },
  },
  dailyLoad: {
    enabled: true,
    sourceType: 'api',
    sftp: { location: '', id: '', password: '' },
    api: { key: 'ABC12345XYZ8765' },
  },
  onDemandLoad: {
    enabled: true,
    sourceType: 'api',
    sftp: { location: '', id: '', password: '' },
    api: { key: 'ABC12345XYZ8765' },
  },
};

const defaultMappings: FieldMapping[] = [
  // Account mappings
  {
    sourceField: 'customerId',
    targetField: 'Account.FinServ__CustomerID__c',
    enabled: true,
    dataFixes: [
      { id: 'trimWhitespace', label: 'Trim whitespace', example: '  CUST123  → CUST123', enabled: true },
    ],
  },
  {
    sourceField: 'firstName',
    targetField: 'Account.FirstName',
    enabled: true,
    dataFixes: [
      { id: 'trimWhitespace', label: 'Trim whitespace', example: '  John  → John', enabled: true },
      { id: 'toTitleCase', label: 'Convert to title case', example: 'JOHN → John', enabled: true },
    ],
  },
  {
    sourceField: 'lastName',
    targetField: 'Account.LastName',
    enabled: true,
    dataFixes: [
      { id: 'trimWhitespace', label: 'Trim whitespace', example: '  Smith  → Smith', enabled: true },
      { id: 'toTitleCase', label: 'Convert to title case', example: 'SMITH → Smith', enabled: true },
    ],
  },
  {
    sourceField: 'dateOfBirth',
    targetField: 'Account.PersonBirthdate',
    enabled: true,
    dataFixes: [
      { id: 'dateISO', label: 'Standardize to ISO format', example: '12/10/1985 → 1985-12-10', enabled: true },
    ],
  },
  {
    sourceField: 'annualIncomeInThousands',
    targetField: 'Account.FinServ__AnnualIncome__pc',
    enabled: true,
    dataFixes: [
      { id: 'convertThousands', label: 'Convert from thousands to actual value', example: '75 → 75000', enabled: true },
      { id: 'decimalPlaces', label: 'Convert to 2-decimal values', example: '75000 → 75000.00', enabled: false },
    ],
  },
  // Financial Account mappings
  {
    sourceField: 'accountNumber',
    targetField: 'FinancialAccount.FinServ__FinancialAccountNumber__c',
    enabled: true,
    dataFixes: [
      { id: 'trimWhitespace', label: 'Trim whitespace', example: '  123456  → 123456', enabled: true },
      { id: 'toUpperCase', label: 'Convert to uppercase', example: 'acc123 → ACC123', enabled: false },
    ],
  },
  {
    sourceField: 'accountType',
    targetField: 'FinancialAccount.FinServ__FinancialAccountType__c',
    enabled: true,
    dataFixes: [
      { id: 'codesToLabels', label: 'Convert codes to labels', example: 'CHK → Checking, SAV → Savings', enabled: true },
      { id: 'defaultValue', label: 'Set default value for empty fields:', example: '', enabled: false },
    ],
  },
  {
    sourceField: 'balances.currentBalance',
    targetField: 'FinancialAccount.FinServ__Balance__c',
    enabled: true,
    dataFixes: [
      { id: 'removeCurrency', label: 'Remove currency symbols', example: '$1,234.56 → 1234.56', enabled: true },
      { id: 'convertNotation', label: 'Convert financial notations', example: '1.5M → 1500000', enabled: true },
      { id: 'decimalPlaces', label: 'Convert to 2-decimal values', example: '1234 → 1234.00', enabled: false },
    ],
  },
  {
    sourceField: 'dateOpened',
    targetField: 'FinancialAccount.FinServ__OpenDate__c',
    enabled: true,
    dataFixes: [
      { id: 'dateISO', label: 'Standardize to ISO format', example: '01/15/2020 → 2020-01-15', enabled: true },
    ],
  },
  {
    sourceField: 'interest.currentInterestRate',
    targetField: 'FinancialAccount.FinServ__InterestRate__c',
    enabled: true,
    dataFixes: [
      { id: 'percentToDecimal', label: 'Convert percent to decimal', example: '5.25% → 0.0525', enabled: false },
      { id: 'removePercent', label: 'Remove percent symbol only', example: '5.25% → 5.25', enabled: true },
    ],
  },
  // Transaction mappings
  {
    sourceField: 'transactionAmount',
    targetField: 'FinancialAccountTransaction.FinServ__Amount__c',
    enabled: true,
    dataFixes: [
      { id: 'removeCurrency', label: 'Remove currency symbols', example: '$500.00 → 500.00', enabled: true },
      { id: 'handleNegative', label: 'Handle negative amounts', example: '(500) → -500', enabled: true },
    ],
  },
  {
    sourceField: 'transactionDates.postingDate',
    targetField: 'FinancialAccountTransaction.FinServ__PostDate__c',
    enabled: true,
    dataFixes: [
      { id: 'dateISO', label: 'Standardize to ISO format', example: '12/10/2025 → 2025-12-10', enabled: true },
    ],
  },
  {
    sourceField: 'debitCreditFlag',
    targetField: 'FinancialAccountTransaction.FinServ__TransactionType__c',
    enabled: true,
    dataFixes: [
      { id: 'codesToLabels', label: 'Convert codes to labels', example: 'D → Debit, C → Credit', enabled: true },
    ],
  },
];

const defaultRunConfig: RunConfig = {
  mode: 'now',
  scheduleType: 'afterHours',
  customDate: '',
  customTime: '',
};

const defaultInstallConfig: InstallConfig = {
  conflictHandling: 'doNotInstall',
  installScope: 'admins',
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  const [preWizardStep, setPreWizardStep] = useState(0);
  const [wizardData, setWizardData] = useState<WizardData>({
    setup: defaultSetupConfig,
    mappings: defaultMappings,
    run: defaultRunConfig,
    installConfig: defaultInstallConfig,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const markStepVisited = (step: number) => {
    setVisitedSteps((prev) => new Set([...prev, step]));
  };

  const updateSetup = (setup: SetupConfig) => {
    setWizardData((prev) => ({ ...prev, setup }));
  };

  const updateMappings = (mappings: FieldMapping[]) => {
    setWizardData((prev) => ({ ...prev, mappings }));
  };

  const updateRun = (run: RunConfig) => {
    setWizardData((prev) => ({ ...prev, run }));
  };

  const updateInstallConfig = (installConfig: InstallConfig) => {
    setWizardData((prev) => ({ ...prev, installConfig }));
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        visitedSteps,
        markStepVisited,
        wizardData,
        updateSetup,
        updateMappings,
        updateRun,
        updateInstallConfig,
        preWizardStep,
        setPreWizardStep,
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}

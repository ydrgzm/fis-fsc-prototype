import { createContext, useContext, useState, ReactNode } from 'react';

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

export interface WizardData {
  setup: SetupConfig;
  mappings: FieldMapping[];
  run: RunConfig;
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
  {
    sourceField: 'FIS.Balance',
    targetField: 'FSC.Value',
    enabled: true,
    dataFixes: [
      { id: 'removeCurrency', label: 'Remove currency symbols', example: '$100 → 100', enabled: true },
      { id: 'convertNotation', label: 'Convert financial notations to multiples', example: '1M → 1,000,000', enabled: true },
      { id: 'decimalPlaces', label: 'Convert to 2-decimal values', example: '100 → 100.00', enabled: false },
    ],
  },
  {
    sourceField: 'FIS.AssetType',
    targetField: 'FSC.Type',
    enabled: true,
    dataFixes: [
      { id: 'codesToLabels', label: 'Convert codes to labels', example: '10 → Checking, 30 → Savings', enabled: true },
      { id: 'defaultValue', label: 'Empty values will be set to default value <value> in FSC. Check to override to user defined default value:', example: '', enabled: false },
    ],
  },
  {
    sourceField: 'FIS.AccountNumber',
    targetField: 'FSC.AcctNumber',
    enabled: true,
    dataFixes: [
      { id: 'toLowerCase', label: 'Convert alphabets to lower case', example: '123ABC → 123abc', enabled: false },
    ],
  },
  {
    sourceField: 'FIS.Contact',
    targetField: 'FSC.Phone',
    enabled: true,
    dataFixes: [
      { id: 'phoneNational', label: 'Standardize phone format: National standard', example: '(234) 555-6666', enabled: false },
      { id: 'phoneNANP', label: 'Standardize phone format: NANP standard', example: '234-555-6666', enabled: true },
      { id: 'phoneE164', label: 'Standardize phone format: E.164 international standard', example: '+12345556666', enabled: false },
    ],
  },
];

const defaultRunConfig: RunConfig = {
  mode: 'now',
  scheduleType: 'afterHours',
  customDate: '',
  customTime: '',
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  const [wizardData, setWizardData] = useState<WizardData>({
    setup: defaultSetupConfig,
    mappings: defaultMappings,
    run: defaultRunConfig,
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

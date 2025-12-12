import { useWizard } from '../../context/WizardContext';
import type { FieldMapping, DataFix } from '../../context/WizardContext';
import { Card, Checkbox, Radio, Select, Input, Button } from '../ui';
import './FieldMappingScreen.css';

// Target field option with metadata from Salesforce
interface TargetFieldOption {
  value: string;
  label: string;
  dataType: string;  // Actual Salesforce type
  hasDefaultValue?: boolean;
  isRestricted?: boolean;
}

// Target field options with actual datatypes from Salesforce metadata
const TARGET_FIELD_OPTIONS: TargetFieldOption[] = [
  // Account fields (standard and FSC custom)
  { value: 'Account.FinServ__CustomerID__c', label: 'Account.FinServ__CustomerID__c', dataType: 'Text' },
  { value: 'Account.FinServ__TaxId__pc', label: 'Account.FinServ__TaxId__pc', dataType: 'Text' },
  { value: 'Account.FirstName', label: 'Account.FirstName', dataType: 'Text' },
  { value: 'Account.MiddleName', label: 'Account.MiddleName', dataType: 'Text' },
  { value: 'Account.LastName', label: 'Account.LastName', dataType: 'Text' },
  { value: 'Account.PersonBirthdate', label: 'Account.PersonBirthdate', dataType: 'Date' },
  { value: 'Account.FinServ__Gender__pc', label: 'Account.FinServ__Gender__pc', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'Account.FinServ__MaritalStatus__pc', label: 'Account.FinServ__MaritalStatus__pc', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'Account.FinServ__PrimaryLanguage__pc', label: 'Account.FinServ__PrimaryLanguage__pc', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'Account.FinServ__PrimaryCitizenship__pc', label: 'Account.FinServ__PrimaryCitizenship__pc', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'Account.FinServ__NumberOfDependents__pc', label: 'Account.FinServ__NumberOfDependents__pc', dataType: 'Number' },
  { value: 'Account.FinServ__AnnualIncome__pc', label: 'Account.FinServ__AnnualIncome__pc', dataType: 'Currency' },
  { value: 'Account.FinServ__Status__c', label: 'Account.FinServ__Status__c', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'Account.NumberOfEmployees', label: 'Account.NumberOfEmployees', dataType: 'Number' },
  { value: 'Account.AnnualRevenue', label: 'Account.AnnualRevenue', dataType: 'Currency' },
  { value: 'Account.BillingStreet', label: 'Account.BillingStreet', dataType: 'Text' },
  { value: 'Account.BillingCity', label: 'Account.BillingCity', dataType: 'Text' },
  { value: 'Account.BillingState', label: 'Account.BillingState', dataType: 'Text' },
  { value: 'Account.BillingPostalCode', label: 'Account.BillingPostalCode', dataType: 'Text' },
  // Financial Account fields - from fields1.json
  { value: 'FinancialAccount.FinServ__FinancialAccountNumber__c', label: 'FinancialAccount.FinServ__FinancialAccountNumber__c', dataType: 'Text' },
  { value: 'FinancialAccount.FinServ__FinancialAccountType__c', label: 'FinancialAccount.FinServ__FinancialAccountType__c', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'FinancialAccount.FinServ__Description__c', label: 'FinancialAccount.FinServ__Description__c', dataType: 'Text Area' },
  { value: 'FinancialAccount.FinServ__Nickname__c', label: 'FinancialAccount.FinServ__Nickname__c', dataType: 'Text' },
  { value: 'FinancialAccount.FinServ__Status__c', label: 'FinancialAccount.FinServ__Status__c', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
  { value: 'FinancialAccount.FinServ__BranchCode__c', label: 'FinancialAccount.FinServ__BranchCode__c', dataType: 'Text' },
  { value: 'FinancialAccount.FinServ__OpenDate__c', label: 'FinancialAccount.FinServ__OpenDate__c', dataType: 'Date' },
  { value: 'FinancialAccount.FinServ__CloseDate__c', label: 'FinancialAccount.FinServ__CloseDate__c', dataType: 'Date' },
  { value: 'FinancialAccount.FinServ__Balance__c', label: 'FinancialAccount.FinServ__Balance__c', dataType: 'Currency' },
  { value: 'FinancialAccount.FinServ__InterestRate__c', label: 'FinancialAccount.FinServ__InterestRate__c', dataType: 'Percent' },
  { value: 'FinancialAccount.FinServ__AccruedInterest__c', label: 'FinancialAccount.FinServ__AccruedInterest__c', dataType: 'Currency' },
  { value: 'FinancialAccount.FinServ__PaymentAmount__c', label: 'FinancialAccount.FinServ__PaymentAmount__c', dataType: 'Currency' },
  { value: 'FinancialAccount.FinServ__PaymentDueDate__c', label: 'FinancialAccount.FinServ__PaymentDueDate__c', dataType: 'Date' },
  { value: 'FinancialAccount.FinServ__TotalCreditLimit__c', label: 'FinancialAccount.FinServ__TotalCreditLimit__c', dataType: 'Currency' },
  { value: 'FinancialAccount.FinServ__LoanAmount__c', label: 'FinancialAccount.FinServ__LoanAmount__c', dataType: 'Currency' },
  // Financial Account Transaction fields - from fields2.json
  { value: 'FinancialAccountTransaction.FinServ__TransactionId__c', label: 'FinancialAccountTransaction.FinServ__TransactionId__c', dataType: 'Text' },
  { value: 'FinancialAccountTransaction.FinServ__Amount__c', label: 'FinancialAccountTransaction.FinServ__Amount__c', dataType: 'Currency' },
  { value: 'FinancialAccountTransaction.FinServ__Description__c', label: 'FinancialAccountTransaction.FinServ__Description__c', dataType: 'Text' },
  { value: 'FinancialAccountTransaction.FinServ__PostDate__c', label: 'FinancialAccountTransaction.FinServ__PostDate__c', dataType: 'Date/Time' },
  { value: 'FinancialAccountTransaction.FinServ__TransactionDate__c', label: 'FinancialAccountTransaction.FinServ__TransactionDate__c', dataType: 'Date/Time' },
  { value: 'FinancialAccountTransaction.FinServ__RunningBalance__c', label: 'FinancialAccountTransaction.FinServ__RunningBalance__c', dataType: 'Currency' },
  { value: 'FinancialAccountTransaction.FinServ__TransactionType__c', label: 'FinancialAccountTransaction.FinServ__TransactionType__c', dataType: 'Picklist', hasDefaultValue: false, isRestricted: false },
];

// Get field metadata by value
const getFieldMetadata = (fieldValue: string): TargetFieldOption | undefined => {
  return TARGET_FIELD_OPTIONS.find(opt => opt.value === fieldValue);
};

// Format options for Select component with datatype display
const getSelectOptions = () => {
  return TARGET_FIELD_OPTIONS.map(opt => {
    const badges: string[] = [];
    if (opt.dataType === 'Picklist') {
      // Always show default value status for picklists
      badges.push(opt.hasDefaultValue ? 'Has Default' : 'No Default');
      // Always show restricted status for picklists
      badges.push(opt.isRestricted ? 'Restricted' : 'Not Restricted');
    }
    return { 
      value: opt.value, 
      label: opt.label,
      dataType: opt.dataType,
      badges: badges.length > 0 ? badges : undefined
    };
  });
};

// Helper to determine field type from target field name
const getFieldType = (targetField: string): string => {
  // Currency fields
  if (targetField.includes('Balance') || targetField.includes('Amount') || 
      targetField.includes('Income') || targetField.includes('Revenue') ||
      targetField.includes('CreditLimit') || targetField.includes('LoanAmount') ||
      targetField.includes('Interest__c') || targetField.includes('Payment')) {
    return 'currency';
  }
  // Date fields
  if (targetField.includes('Date') || targetField.includes('Birthdate')) {
    return 'date';
  }
  // Picklist fields
  if (targetField.includes('Status') || targetField.includes('Type') ||
      targetField.includes('Gender') || targetField.includes('MaritalStatus') ||
      targetField.includes('Language') || targetField.includes('Citizenship') ||
      targetField.includes('TransactionType')) {
    return 'picklist';
  }
  // Number fields
  if (targetField.includes('NumberOf') || targetField.includes('Rate')) {
    return 'number';
  }
  // Percent fields
  if (targetField.includes('InterestRate')) {
    return 'percent';
  }
  // Default to text
  return 'text';
};

// Data fixes organized by field type
const DATA_FIXES_BY_TYPE: Record<string, DataFix[]> = {
  'currency': [
    { id: 'removeCurrency', label: 'Remove currency symbols', example: '$1,234.56 → 1234.56', enabled: true },
    { id: 'convertNotation', label: 'Convert financial notations', example: '1.5M → 1500000', enabled: true },
    { id: 'convertThousands', label: 'Convert from thousands to actual value', example: '75 → 75000', enabled: false },
    { id: 'decimalPlaces', label: 'Convert to 2-decimal values', example: '1234 → 1234.00', enabled: false },
    { id: 'handleNegative', label: 'Handle negative amounts', example: '(500) → -500', enabled: false },
  ],
  'date': [
    { id: 'dateISO', label: 'Standardize to ISO format', example: '12/10/2025 → 2025-12-10', enabled: true },
    { id: 'dateUS', label: 'Standardize to US format', example: '2025-12-10 → 12/10/2025', enabled: false },
    { id: 'dateEU', label: 'Standardize to EU format', example: '12/10/2025 → 10/12/2025', enabled: false },
  ],
  'picklist': [
    { id: 'codesToLabels', label: 'Convert codes to labels', example: 'CHK → Checking, SAV → Savings', enabled: true },
    { id: 'defaultValue', label: 'Set default value for empty fields:', example: '', enabled: false },
    { id: 'trimWhitespace', label: 'Trim whitespace', example: '  Active  → Active', enabled: true },
  ],
  'number': [
    { id: 'removeCommas', label: 'Remove comma separators', example: '1,234 → 1234', enabled: true },
    { id: 'convertNotation', label: 'Convert notations (K/M/B)', example: '1.5K → 1500', enabled: false },
  ],
  'percent': [
    { id: 'removePercent', label: 'Remove percent symbol only', example: '5.25% → 5.25', enabled: true },
    { id: 'percentToDecimal', label: 'Convert percent to decimal', example: '5.25% → 0.0525', enabled: false },
  ],
  'text': [
    { id: 'trimWhitespace', label: 'Trim whitespace', example: '  text  → text', enabled: true },
    { id: 'toUpperCase', label: 'Convert to uppercase', example: 'abc123 → ABC123', enabled: false },
    { id: 'toLowerCase', label: 'Convert to lowercase', example: 'ABC123 → abc123', enabled: false },
    { id: 'toTitleCase', label: 'Convert to title case', example: 'JOHN DOE → John Doe', enabled: false },
  ],
};

// Track which fixes are recommended (enabled by default)
const RECOMMENDED_FIX_IDS = new Set(
  Object.values(DATA_FIXES_BY_TYPE)
    .flat()
    .filter(fix => fix.enabled)
    .map(fix => fix.id)
);

// Get data fixes for a target field based on its type
const getDataFixesForTarget = (targetField: string): DataFix[] => {
  const fieldType = getFieldType(targetField);
  return DATA_FIXES_BY_TYPE[fieldType] || DATA_FIXES_BY_TYPE['text'];
};

interface MappingRowProps {
  mapping: FieldMapping;
  index: number;
  onChange: (index: number, mapping: FieldMapping) => void;
}

function MappingRow({ mapping, index, onChange }: MappingRowProps) {
  const handleEnabledChange = (checked: boolean) => {
    onChange(index, { ...mapping, enabled: checked });
  };

  const handleTargetChange = (targetField: string) => {
    // Get new data fixes for the selected target field
    const newDataFixes = getDataFixesForTarget(targetField);
    onChange(index, { ...mapping, targetField, dataFixes: newDataFixes });
  };

  const handleFixToggle = (fixId: string, enabled: boolean) => {
    const updatedFixes = mapping.dataFixes.map((fix) =>
      fix.id === fixId ? { ...fix, enabled } : fix
    );
    onChange(index, { ...mapping, dataFixes: updatedFixes });
  };

  const handleRadioFixChange = (fixId: string) => {
    // For phone format options, only one can be selected at a time
    const phoneFixIds = ['phoneNational', 'phoneNANP', 'phoneE164'];
    const dateFixIds = ['dateISO', 'dateUS', 'dateEU'];
    const booleanFixIds = ['booleanYN', 'boolean10', 'booleanText'];
    
    let groupIds: string[] = [];
    if (phoneFixIds.includes(fixId)) groupIds = phoneFixIds;
    else if (dateFixIds.includes(fixId)) groupIds = dateFixIds;
    else if (booleanFixIds.includes(fixId)) groupIds = booleanFixIds;
    
    if (groupIds.length > 0) {
      const updatedFixes = mapping.dataFixes.map((fix) =>
        groupIds.includes(fix.id)
          ? { ...fix, enabled: fix.id === fixId }
          : fix
      );
      onChange(index, { ...mapping, dataFixes: updatedFixes });
    }
  };

  const isRadioFix = (fix: DataFix) => {
    const radioGroups = ['phoneNational', 'phoneNANP', 'phoneE164', 'dateISO', 'dateUS', 'dateEU', 'booleanYN', 'boolean10', 'booleanText'];
    return radioGroups.includes(fix.id);
  };

  // Determine radio group name based on fix type
  const getRadioGroupName = (fixId: string) => {
    if (['phoneNational', 'phoneNANP', 'phoneE164'].includes(fixId)) return `phone-format-${index}`;
    if (['dateISO', 'dateUS', 'dateEU'].includes(fixId)) return `date-format-${index}`;
    if (['booleanYN', 'boolean10', 'booleanText'].includes(fixId)) return `boolean-format-${index}`;
    return `radio-${index}`;
  };

  return (
    <div className={`mapping-row ${mapping.enabled ? 'enabled' : 'disabled'}`}>
      <div className="mapping-header">
        <Checkbox
          label=""
          checked={mapping.enabled}
          onChange={(e) => handleEnabledChange(e.target.checked)}
        />
        <span className="source-field">{mapping.sourceField}</span>
        <span className="arrow">→</span>
        <Select
          options={getSelectOptions()}
          value={mapping.targetField}
          onChange={(e) => handleTargetChange(e.target.value)}
          disabled={!mapping.enabled}
        />
      </div>

      {mapping.enabled && mapping.dataFixes.length > 0 && (
        <div className="data-fixes">
          {mapping.dataFixes.map((fix) => (
            <div key={fix.id} className="data-fix-row">
              {isRadioFix(fix) ? (
                <Radio
                  name={getRadioGroupName(fix.id)}
                  label={fix.label}
                  checked={fix.enabled}
                  onChange={() => handleRadioFixChange(fix.id)}
                />
              ) : (
                <Checkbox
                  label={fix.label}
                  checked={fix.enabled}
                  onChange={(e) => handleFixToggle(fix.id, e.target.checked)}
                />
              )}
              {RECOMMENDED_FIX_IDS.has(fix.id) && (
                <span className="recommended-badge">R</span>
              )}
              {fix.example && (
                <span className="fix-example">e.g. {fix.example}</span>
              )}
              {fix.id === 'defaultValue' && fix.enabled && (
                <Input
                  placeholder="Enter default value"
                  className="default-value-input"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FieldMappingScreen() {
  const { wizardData, updateMappings, setCurrentStep, markStepVisited } = useWizard();
  const { mappings } = wizardData;

  const handleMappingChange = (index: number, updatedMapping: FieldMapping) => {
    const newMappings = [...mappings];
    newMappings[index] = updatedMapping;
    updateMappings(newMappings);
  };

  const handlePreviewClick = () => {
    markStepVisited(3);
    setCurrentStep(3);
  };

  return (
    <div className="field-mapping-screen">
      <Card>
        <div className="recommended-note">
          <span className="recommended-note-icon">⚠️</span>
          <span className="recommended-note-text">
            <strong>Recommended fixes are pre-selected.</strong> These data transformations are commonly needed for FIS to FSC migrations. You can customize selections based on your specific data requirements.
          </span>
        </div>
        <div className="mappings-list">
          {mappings.map((mapping, index) => (
            <MappingRow
              key={mapping.sourceField}
              mapping={mapping}
              index={index}
              onChange={handleMappingChange}
            />
          ))}
        </div>
        <div className="preview-button-container">
          <Button variant="brand" onClick={handlePreviewClick}>
            Preview Data
          </Button>
        </div>
      </Card>
    </div>
  );
}

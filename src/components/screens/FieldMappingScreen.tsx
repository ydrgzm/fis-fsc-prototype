import { useWizard } from '../../context/WizardContext';
import type { FieldMapping, DataFix } from '../../context/WizardContext';
import { Card, Checkbox, Radio, Select, Input, Button } from '../ui';
import './FieldMappingScreen.css';

const TARGET_FIELD_OPTIONS = [
  { value: 'FSC.Value', label: 'FSC.Value' },
  { value: 'FSC.Type', label: 'FSC.Type' },
  { value: 'FSC.AcctNumber', label: 'FSC.AcctNumber' },
  { value: 'FSC.Phone', label: 'FSC.Phone' },
  { value: 'FSC.MaxValue', label: 'FSC.MaxValue' },
  { value: 'FSC.Email', label: 'FSC.Email' },
  { value: 'FSC.Date', label: 'FSC.Date' },
  { value: 'FSC.Active', label: 'FSC.Active' },
];

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
    onChange(index, { ...mapping, targetField });
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
    if (phoneFixIds.includes(fixId)) {
      const updatedFixes = mapping.dataFixes.map((fix) =>
        phoneFixIds.includes(fix.id)
          ? { ...fix, enabled: fix.id === fixId }
          : fix
      );
      onChange(index, { ...mapping, dataFixes: updatedFixes });
    }
  };

  const isPhoneFix = (fix: DataFix) => {
    return ['phoneNational', 'phoneNANP', 'phoneE164'].includes(fix.id);
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
          options={TARGET_FIELD_OPTIONS}
          value={mapping.targetField}
          onChange={(e) => handleTargetChange(e.target.value)}
          disabled={!mapping.enabled}
        />
      </div>

      {mapping.enabled && mapping.dataFixes.length > 0 && (
        <div className="data-fixes">
          {mapping.dataFixes.map((fix) => (
            <div key={fix.id} className="data-fix-row">
              {isPhoneFix(fix) ? (
                <Radio
                  name={`phone-format-${index}`}
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

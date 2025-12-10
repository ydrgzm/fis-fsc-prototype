import { useWizard } from '../../context/WizardContext';
import type { LoadConfig, SourceType } from '../../context/WizardContext';
import { Card, Input, Radio, Checkbox } from '../ui';
import './SetupScreen.css';

type LoadType = 'initialLoad' | 'dailyLoad' | 'onDemandLoad';

interface LoadBlockProps {
  title: string;
  subtitle: string;
  loadType: LoadType;
  config: LoadConfig;
  onChange: (loadType: LoadType, config: LoadConfig) => void;
}

function LoadBlock({ title, subtitle, loadType, config, onChange }: LoadBlockProps) {
  const handleEnabledChange = (checked: boolean) => {
    onChange(loadType, { ...config, enabled: checked });
  };

  const handleSourceTypeChange = (sourceType: SourceType) => {
    onChange(loadType, { ...config, sourceType });
  };

  const handleSFTPChange = (field: 'location' | 'id' | 'password', value: string) => {
    onChange(loadType, {
      ...config,
      sftp: { ...config.sftp, [field]: value },
    });
  };

  const handleAPIChange = (value: string) => {
    onChange(loadType, {
      ...config,
      api: { key: value },
    });
  };

  return (
    <div className="load-block">
      <div className="load-block-header">
        <Checkbox
          label=""
          checked={config.enabled}
          onChange={(e) => handleEnabledChange(e.target.checked)}
        />
        <div className="load-block-title">
          <span className="title-text">{title}</span>
          <span className="subtitle-text">{subtitle}</span>
        </div>
      </div>

      {config.enabled && (
        <div className="load-block-content">
          <div className="source-type-options">
            <Radio
              name={`${loadType}-source`}
              label="SFTP"
              checked={config.sourceType === 'sftp'}
              onChange={() => handleSourceTypeChange('sftp')}
            />
            <Radio
              name={`${loadType}-source`}
              label="API"
              checked={config.sourceType === 'api'}
              onChange={() => handleSourceTypeChange('api')}
            />
          </div>

          {config.sourceType === 'sftp' && (
            <div className="sftp-fields">
              <div className="field-row">
                <span className="field-label">Location</span>
                <Input
                  value={config.sftp.location}
                  onChange={(e) => handleSFTPChange('location', e.target.value)}
                  placeholder="secure.ftp.example.com/path"
                />
              </div>
              <div className="field-row">
                <span className="field-label">ID</span>
                <Input
                  value={config.sftp.id}
                  onChange={(e) => handleSFTPChange('id', e.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="field-row">
                <span className="field-label">Password</span>
                <Input
                  type="password"
                  value={config.sftp.password}
                  onChange={(e) => handleSFTPChange('password', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {config.sourceType === 'api' && (
            <div className="api-fields">
              <div className="field-row">
                <span className="field-label">API Key</span>
                <Input
                  value={config.api.key}
                  onChange={(e) => handleAPIChange(e.target.value)}
                  placeholder="Enter API key"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function SetupScreen() {
  const { wizardData, updateSetup } = useWizard();
  const { setup } = wizardData;

  const handleLoadChange = (loadType: LoadType, config: LoadConfig) => {
    updateSetup({
      ...setup,
      [loadType]: config,
    });
  };

  return (
    <Card title="Setup">
      <div className="setup-screen">
        <LoadBlock
          title="Initial Load"
          subtitle="(full load)"
          loadType="initialLoad"
          config={setup.initialLoad}
          onChange={handleLoadChange}
        />
        <LoadBlock
          title="Daily Load"
          subtitle="(delta load)"
          loadType="dailyLoad"
          config={setup.dailyLoad}
          onChange={handleLoadChange}
        />
        <LoadBlock
          title="On-demand"
          subtitle="(delta load)"
          loadType="onDemandLoad"
          config={setup.onDemandLoad}
          onChange={handleLoadChange}
        />
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { Info, Calendar, Clock } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';
import { Card, Button, Radio, Input } from '../ui';
import './RunScreen.css';

export function RunScreen() {
  const { wizardData, updateRun, setShowToast, setToastMessage } = useWizard();
  const { run } = wizardData;
  const [isRunning, setIsRunning] = useState(false);

  const handleModeChange = (mode: 'now' | 'later') => {
    updateRun({ ...run, mode });
  };

  const handleScheduleTypeChange = (scheduleType: 'afterHours' | 'custom') => {
    updateRun({ ...run, scheduleType });
  };

  const handleDateChange = (customDate: string) => {
    updateRun({ ...run, customDate });
  };

  const handleTimeChange = (customTime: string) => {
    updateRun({ ...run, customTime });
  };

  const handleRun = () => {
    setIsRunning(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRunning(false);
      
      if (run.mode === 'now') {
        setToastMessage('Integration job submitted successfully');
      } else {
        const scheduleText = run.scheduleType === 'afterHours' 
          ? '8:00 PM today' 
          : `${run.customDate} at ${run.customTime}`;
        setToastMessage(`Integration scheduled for ${scheduleText}`);
      }
      setShowToast(true);
    }, 1500);
  };

  // Get today's date at 8PM for "after hours" option
  const getAfterHoursDateTime = () => {
    const today = new Date();
    return `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at 8:00 PM`;
  };

  return (
    <div className="run-screen">
      <Card title="Run Now or Run Later">
        <div className="api-limit-notice">
          <Info size={18} className="info-icon" />
          <span>
            Salesforce Bulk API V2: <strong className="remaining">4,356 remaining</strong> out of today's limit of 15,000
          </span>
        </div>

        <div className="run-mode-tabs">
          <button
            className={`mode-tab ${run.mode === 'now' ? 'active' : ''}`}
            onClick={() => handleModeChange('now')}
          >
            Run now
          </button>
          <button
            className={`mode-tab ${run.mode === 'later' ? 'active' : ''}`}
            onClick={() => handleModeChange('later')}
          >
            Run later
          </button>
        </div>

        {run.mode === 'now' && (
          <div className="run-now-content">
            <p className="run-description">
              The data synchronization will begin immediately and is expected to complete in 30–35 minutes.
            </p>
            <Button 
              variant="brand" 
              size="large" 
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning ? 'Running...' : 'Run Integration Now'}
            </Button>
          </div>
        )}

        {run.mode === 'later' && (
          <div className="run-later-content">
            <div className="schedule-options">
              <Radio
                name="schedule-type"
                label={`After business hours (8 PM) — ${getAfterHoursDateTime()}`}
                checked={run.scheduleType === 'afterHours'}
                onChange={() => handleScheduleTypeChange('afterHours')}
              />
              <Radio
                name="schedule-type"
                label="At a custom time"
                checked={run.scheduleType === 'custom'}
                onChange={() => handleScheduleTypeChange('custom')}
              />
            </div>

            {run.scheduleType === 'custom' && (
              <div className="custom-schedule">
                <div className="date-time-inputs">
                  <div className="input-with-icon">
                    <Input
                      type="date"
                      label="Date"
                      value={run.customDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                    <Calendar size={16} className="input-icon" />
                  </div>
                  <div className="input-with-icon">
                    <Input
                      type="time"
                      label="Time"
                      value={run.customTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                    />
                    <Clock size={16} className="input-icon" />
                  </div>
                </div>
                <div className="timezone-notice">
                  <Info size={14} />
                  <span>Timezone: America/Los_Angeles</span>
                </div>
              </div>
            )}

            <Button 
              variant="brand" 
              size="large" 
              onClick={handleRun}
              disabled={isRunning || (run.scheduleType === 'custom' && (!run.customDate || !run.customTime))}
            >
              {isRunning ? 'Scheduling...' : 'Schedule Integration'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

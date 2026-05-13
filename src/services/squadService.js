import { config } from '../config';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const squadService = {
  verifyBiometrics: async (biometricData) => {
    console.log('Verifying biometrics with Squad API...', biometricData);
    
    if (config.useMock) {
      await delay(1500); // Simulate network latency
      
      // Mock logic: 20% chance of being flagged as a ghost worker/duplicate
      const isDuplicate = Math.random() < 0.2;
      const confidenceScore = isDuplicate ? 0.98 : 0.95 + Math.random() * 0.04;
      
      return {
        status: isDuplicate ? 'flagged' : 'verified',
        confidenceScore: confidenceScore.toFixed(4),
        duplicateFlag: isDuplicate,
        timestamp: new Date().toISOString(),
        message: isDuplicate 
          ? 'Potential duplicate found in database. Biometric match confirmed with existing record.' 
          : 'Verification successful. No duplicates found.',
      };
    }

    // Real API call would go here
    // return fetch(`${config.apiBaseUrl}/verify-biometrics`, { ... });
    throw new Error('Real Squad API integration not yet implemented');
  },

  getAnomalyReports: async () => {
    if (config.useMock) {
      await delay(800);
      return [
        {
          id: 'A1',
          employeeName: 'John Doe',
          employeeId: 'EMP001',
          reason: 'Duplicate Biometrics',
          riskScore: 95,
          status: 'pending',
          timestamp: '2026-05-13T10:00:00Z',
        },
        {
          id: 'A2',
          employeeName: 'Jane Smith',
          employeeId: 'EMP002',
          reason: 'Impossible Attendance (Concurrent locations)',
          riskScore: 88,
          status: 'escalated',
          timestamp: '2026-05-13T11:30:00Z',
        },
        {
          id: 'A3',
          employeeName: 'Robert Johnson',
          employeeId: 'EMP045',
          reason: 'Missing Biometric Logs',
          riskScore: 45,
          status: 'pending',
          timestamp: '2026-05-13T09:15:00Z',
        }
      ];
    }
    throw new Error('Real API not implemented');
  }
};

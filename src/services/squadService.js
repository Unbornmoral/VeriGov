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
  },

  getDashboardStats: async () => {
    if (config.useMock) {
      await delay(500);
      return {
        totalEmployees: 12450,
        verifiedEmployees: 11820,
        flaggedAnomalies: 42,
        pendingVerifications: 588,
        verificationRate: 94.9,
      };
    }
    throw new Error('Real API not implemented');
  },

  getAttendanceTrends: async () => {
    if (config.useMock) {
      await delay(600);
      return [
        { name: 'Mon', attendance: 92 },
        { name: 'Tue', attendance: 95 },
        { name: 'Wed', attendance: 94 },
        { name: 'Thu', attendance: 93 },
        { name: 'Fri', attendance: 89 },
        { name: 'Sat', attendance: 45 },
        { name: 'Sun', attendance: 38 },
      ];
    }
    throw new Error('Real API not implemented');
  },

  getAnomalySpikes: async () => {
    if (config.useMock) {
      await delay(700);
      return [
        { name: 'Week 1', spikes: 4 },
        { name: 'Week 2', spikes: 7 },
        { name: 'Week 3', spikes: 12 },
        { name: 'Week 4', spikes: 8 },
        { name: 'Week 5', spikes: 15 },
        { name: 'Week 6', spikes: 9 },
      ];
    }
    throw new Error('Real API not implemented');
  },

  getEmployeeProfile: async (employeeId) => {
    if (config.useMock) {
      await delay(600);
      return {
        id: employeeId || 'EMP001',
        name: 'John Doe',
        department: 'Ministry of Finance',
        role: 'Senior Accountant',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        joinedDate: '2020-03-15',
        status: 'active',
        riskScore: 95,
        verificationHistory: [
          { date: '2026-05-01', status: 'verified', method: 'Fingerprint', confidence: 0.99 },
          { date: '2026-04-15', status: 'verified', method: 'Face', confidence: 0.98 },
          { date: '2026-05-13', status: 'flagged', method: 'Face', confidence: 0.42, reason: 'Duplicate found' },
        ],
        attendanceTimeline: [
          { date: '2026-05-08', status: 'present', checkIn: '08:00 AM', checkOut: '05:00 PM' },
          { date: '2026-05-09', status: 'present', checkIn: '08:15 AM', checkOut: '05:10 PM' },
          { date: '2026-05-10', status: 'absent', checkIn: '-', checkOut: '-' },
          { date: '2026-05-11', status: 'present', checkIn: '07:55 AM', checkOut: '04:55 PM' },
          { date: '2026-05-12', status: 'present', checkIn: '08:05 AM', checkOut: '05:05 PM' },
        ]
      };
    }
    throw new Error('Real API not implemented');
  }
};

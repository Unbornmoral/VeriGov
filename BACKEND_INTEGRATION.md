# GhostCheck - Backend Integration Guide

This document outlines how to integrate the frontend with the real Squad API and backend services.

## 1. Switching Modes

The application uses a configuration-based approach to toggle between mock and real data.

- **File**: `src/config.js`
- **Action**: Set `useMock: false` to enable real API calls.
- **Environment Variables**: Update `apiBaseUrl` and any necessary API keys.

```javascript
export const config = {
  useMock: false, // Set to false for production/integration
  apiBaseUrl: 'https://api.ghostcheck.gov/v1',
  squadApiKey: 'YOUR_ACTUAL_SQUAD_API_KEY',
};
```

## 2. API Service Layer

All API interactions are centralized in `src/services/squadService.js`. 

### Current Placeholder Endpoints

#### `verifyBiometrics(biometricData)`
- **Purpose**: Sends biometric data (face/fingerprint) to verify against the database.
- **Expected Request**: Multipart/form-data or Base64 encoded image.
- **Expected Response**:
```json
{
  "status": "verified" | "flagged",
  "confidenceScore": "0.9850",
  "duplicateFlag": false,
  "timestamp": "ISO-8601 String",
  "message": "String description"
}
```

#### `getDashboardStats()`
- **Purpose**: Fetch overview metrics for the Admin Dashboard.
- **Expected Response**:
```json
{
  "totalEmployees": 12450,
  "verifiedEmployees": 11820,
  "flaggedAnomalies": 42,
  "pendingVerifications": 588,
  "verificationRate": 94.9
}
```

#### `getAttendanceTrends()`
- **Purpose**: Fetch attendance percentage data for the last 7 days.
- **Expected Response**: Array of objects `{ name: 'Day', attendance: number }`.

#### `getAnomalySpikes()`
- **Purpose**: Fetch weekly anomaly counts.
- **Expected Response**: Array of objects `{ name: 'Week X', spikes: number }`.

#### `getAnomalyReports()`
- **Purpose**: Fetch detailed list of flagged employees.
- **Expected Response**: Array of objects `{ id, employeeName, employeeId, reason, riskScore, status, timestamp }`.

#### `resolveAnomaly(anomalyId)` (Placeholder logic in UI)
- **Purpose**: Mark an anomaly as resolved.
- **Expected Request**: POST to `/anomalies/{id}/resolve`.
- **Expected Response**: `{ success: true, message: "Anomaly resolved" }`.

#### `escalateAnomaly(anomalyId)` (Placeholder logic in UI)
- **Purpose**: Escalate an anomaly for further investigation.
- **Expected Request**: POST to `/anomalies/{id}/escalate`.
- **Expected Response**: `{ success: true, message: "Anomaly escalated" }`.

## 3. Integration Tips

1. **Error Handling**: The frontend currently logs errors to the console. Implement more robust UI notifications (e.g., Toast notifications) during integration.
2. **Authentication**: Add JWT or API Key headers to the `fetch` calls in `squadService.js`.
3. **Data Mapping**: If the backend API format differs slightly from the mock data, map the response in the service layer before returning it to the components.
4. **Loading States**: Components already handle `loading` states based on the async service calls.

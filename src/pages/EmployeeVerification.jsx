import React, { useState } from 'react';
import { 
  Fingerprint, 
  Upload, 
  ShieldCheck, 
  ShieldAlert, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { squadService } from '../services/squadService';

const EmployeeVerification = () => {
  const [file, setFile] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleVerify = async () => {
    if (!file) {
      setError("Please upload biometric data (Face or Fingerprint) first.");
      return;
    }

    setVerifying(true);
    setError(null);
    setResult(null);

    try {
      // In a real app, we would send the actual file data
      const mockData = { fileName: file.name, fileSize: file.size };
      const response = await squadService.verifyBiometrics(mockData);
      setResult(response);
    } catch (err) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again or contact support.");
    } finally {
      setVerifying(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <ShieldCheck className="text-government-600" />
          Biometric Employee Verification
        </h2>
        <p className="text-slate-600 mb-8">
          Upload employee biometric data (Face or Fingerprint scan) to verify against the national database and detect ghost workers.
        </p>

        {!result ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-government-300 transition-colors bg-slate-50">
              <input
                type="file"
                id="biometric-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="biometric-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {file ? (
                  <div className="space-y-2">
                    <div className="bg-government-100 p-4 rounded-full text-government-600 mb-2 inline-block">
                      <Fingerprint size={48} />
                    </div>
                    <p className="font-semibold text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-4 inline-block">
                      <Upload size={48} />
                    </div>
                    <p className="font-semibold text-slate-900">Click to upload biometric scan</p>
                    <p className="text-sm text-slate-500 mt-1">Supports Face or Fingerprint images (JPG, PNG)</p>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={verifying || !file}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                verifying || !file 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-government-600 text-white hover:bg-government-700 shadow-lg shadow-government-200'
              }`}
            >
              {verifying ? (
                <>
                  <Loader2 className="animate-spin" />
                  Verifying with Squad API...
                </>
              ) : (
                <>
                  <ShieldCheck size={24} />
                  Run AI Verification
                </>
              )}
            </button>
          </div>
        ) : (
          <div className={`rounded-2xl p-8 border-2 ${
            result.status === 'verified' 
              ? 'bg-emerald-50 border-emerald-100' 
              : 'bg-rose-50 border-rose-100'
          }`}>
            <div className="flex flex-col items-center text-center space-y-4">
              {result.status === 'verified' ? (
                <CheckCircle2 size={64} className="text-emerald-500" />
              ) : (
                <ShieldAlert size={64} className="text-rose-500" />
              )}
              
              <div>
                <h3 className={`text-2xl font-bold ${
                  result.status === 'verified' ? 'text-emerald-900' : 'text-rose-900'
                }`}>
                  {result.status === 'verified' ? 'Verified Successfully' : 'Anomaly Detected!'}
                </h3>
                <p className="text-slate-600 mt-1">{result.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-6">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confidence</p>
                  <p className="text-xl font-bold text-slate-900">{(result.confidenceScore * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
                  <p className={`text-xl font-bold uppercase ${
                    result.status === 'verified' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {result.status}
                  </p>
                </div>
              </div>

              {result.duplicateFlag && (
                <div className="w-full bg-rose-100 p-4 rounded-xl flex items-start gap-3 text-left">
                  <AlertCircle className="text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-rose-900 font-bold text-sm">Ghost Worker Warning</p>
                    <p className="text-rose-700 text-xs mt-0.5">This biometric record matches an existing entry in the database. High risk of duplicate payroll.</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 w-full pt-4">
                <button 
                  onClick={resetForm}
                  className="flex-1 bg-white border border-slate-200 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  New Verification
                </button>
                {result.status === 'flagged' && (
                  <button className="flex-1 bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 shadow-lg shadow-rose-200 transition-colors">
                    Escalate to Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-government-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">How it works</h3>
          <p className="text-government-200 text-sm max-w-xl">
            GhostCheck utilizes the **Squad API**'s advanced facial recognition and fingerprint matching algorithms. Each upload is processed through multiple neural networks to ensure liveness detection and cross-reference with over 10 million civil service records in real-time.
          </p>
        </div>
        <Fingerprint size={120} className="absolute -bottom-10 -right-10 text-government-800 rotate-12" />
      </div>
    </div>
  );
};

export default EmployeeVerification;

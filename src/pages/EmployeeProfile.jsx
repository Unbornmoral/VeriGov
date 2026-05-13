import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  Briefcase, 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { squadService } from '../services/squadService';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await squadService.getEmployeeProfile(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-government-600"></div>
      </div>
    );
  }

  if (!employee) {
    return <div className="text-center p-12 text-slate-500">Employee not found.</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-government-600 transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back to List
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-government-600 to-government-900"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end gap-6">
            <img 
              src={employee.photo} 
              alt={employee.name} 
              className="w-32 h-32 rounded-3xl border-4 border-white shadow-md object-cover bg-white"
            />
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-slate-900">{employee.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  employee.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {employee.status}
                </span>
              </div>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Briefcase size={18} className="text-slate-400" /> {employee.role}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-government-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-government-700 transition-colors shadow-lg shadow-government-100">
                Verify Now
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Edit Details
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-t border-slate-100">
          <div className="p-6 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Building2 size={14} /> Department
            </p>
            <p className="text-slate-900 font-semibold">{employee.department}</p>
          </div>
          <div className="p-6 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={14} /> Joined Date
            </p>
            <p className="text-slate-900 font-semibold">{new Date(employee.joinedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <div className="p-6 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Employee ID
            </p>
            <p className="text-slate-900 font-semibold">{employee.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Risk & History */}
        <div className="lg:col-span-1 space-y-8">
          {/* Risk Card */}
          <div className={`p-6 rounded-3xl border shadow-sm ${
            employee.riskScore > 80 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'
          }`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
              employee.riskScore > 80 ? 'text-rose-900' : 'text-emerald-900'
            }`}>
              <AlertCircle size={20} /> AI Risk Score
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-slate-900">{employee.riskScore}%</div>
              <div className="flex-1 h-3 bg-white/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    employee.riskScore > 80 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${employee.riskScore}%` }}
                />
              </div>
            </div>
            <p className={`text-sm mt-4 font-medium ${
              employee.riskScore > 80 ? 'text-rose-700' : 'text-emerald-700'
            }`}>
              {employee.riskScore > 80 
                ? "This employee has been flagged for multiple anomalies. Immediate investigation recommended." 
                : "This employee maintains a low risk profile with consistent verified records."}
            </p>
          </div>

          {/* Verification History */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-government-600" /> Verification History
            </h3>
            <div className="space-y-6">
              {employee.verificationHistory.map((v, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`mt-1 p-1.5 rounded-lg h-fit ${
                    v.status === 'verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {v.status === 'verified' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                  </div>
                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-slate-900">{v.method} Match</p>
                      <span className="text-xs text-slate-400">{new Date(v.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Confidence: {(v.confidence * 100).toFixed(0)}%</p>
                    {v.reason && <p className="text-xs text-rose-500 font-medium mt-1 italic">"{v.reason}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock size={20} className="text-government-600" /> Attendance Timeline
              </h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Present
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div> Absent
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              {employee.attendanceTimeline.map((day, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-32">
                    <p className="font-bold text-slate-900">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    day.status === 'present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {day.status}
                  </div>
                  <div className="flex-1 flex justify-end gap-8 text-sm">
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Check In</p>
                      <p className="font-bold text-slate-700">{day.checkIn}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">Check Out</p>
                      <p className="font-bold text-slate-700">{day.checkOut}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-government-300 hover:text-government-600 transition-all text-sm">
              Load Previous Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

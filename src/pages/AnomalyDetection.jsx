import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MoreHorizontal, 
  CheckCircle, 
  ArrowUpRight,
  ShieldAlert,
  Calendar,
  User,
  Shield
} from 'lucide-react';
import { squadService } from '../services/squadService';

const AnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const data = await squadService.getAnomalyReports();
        setAnomalies(data);
      } catch (error) {
        console.error("Error fetching anomalies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, []);

  const handleResolve = (id) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    // In a real app, this would call an API
    console.log(`Resolved anomaly ${id}`);
  };

  const handleEscalate = (id) => {
    setAnomalies(prev => prev.map(a => a.id === id ? { ...a, status: 'escalated' } : a));
    // In a real app, this would call an API
    console.log(`Escalated anomaly ${id}`);
  };

  const filteredAnomalies = anomalies.filter(a => {
    const matchesSearch = a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-government-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" />
            Attendance Anomaly Detection
          </h2>
          <p className="text-slate-600">Review and action flagged payroll anomalies detected by AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search employee..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-government-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              className="pl-10 pr-8 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-government-500 bg-white appearance-none cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="escalated">Escalated</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Reason for Anomaly</th>
                <th className="px-6 py-4 font-semibold">Risk Score</th>
                <th className="px-6 py-4 font-semibold">Detected At</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAnomalies.length > 0 ? filteredAnomalies.map((anomaly) => (
                <tr key={anomaly.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{anomaly.employeeName}</div>
                        <div className="text-xs text-slate-400">{anomaly.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <ShieldAlert size={16} className={anomaly.riskScore > 80 ? 'text-rose-500' : 'text-amber-500'} />
                      {anomaly.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            anomaly.riskScore > 90 ? 'bg-rose-500' : 
                            anomaly.riskScore > 70 ? 'bg-amber-500' : 'bg-blue-500'
                          }`} 
                          style={{width: `${anomaly.riskScore}%`}}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{anomaly.riskScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar size={14} />
                      {new Date(anomaly.timestamp).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      anomaly.status === 'escalated' ? 'bg-rose-100 text-rose-600' : 
                      anomaly.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {anomaly.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {anomaly.status !== 'resolved' && (
                        <>
                          <button 
                            onClick={() => handleResolve(anomaly.id)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Resolve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handleEscalate(anomaly.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Escalate"
                          >
                            <Shield size={20} />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    No anomalies found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Total Resolved</h4>
            <p className="text-2xl font-bold text-emerald-700">124</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <ArrowUpRight size={12} /> 12% from last month
            </p>
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
            <Shield size={24} />
          </div>
          <div>
            <h4 className="font-bold text-rose-900">High Risk Active</h4>
            <p className="text-2xl font-bold text-rose-700">8</p>
            <p className="text-xs text-rose-600 mt-1">Requires immediate action</p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <Calendar size={24} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900">Last Scan</h4>
            <p className="text-lg font-bold text-blue-700">Today, 08:30 AM</p>
            <p className="text-xs text-blue-600 mt-1">Next scan in 2 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;

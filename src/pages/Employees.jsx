import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  ExternalLink,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 'EMP001', name: 'John Doe', department: 'Finance', role: 'Senior Accountant', status: 'active' },
    { id: 'EMP002', name: 'Jane Smith', department: 'HR', role: 'HR Manager', status: 'active' },
    { id: 'EMP045', name: 'Robert Johnson', department: 'Operations', role: 'Field Officer', status: 'on-leave' },
    { id: 'EMP102', name: 'Alice Williams', department: 'IT', role: 'System Admin', status: 'active' },
    { id: 'EMP103', name: 'Michael Brown', department: 'Legal', role: 'Legal Counsel', status: 'active' },
  ];

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-government-600" />
            Employee Directory
          </h2>
          <p className="text-slate-600">Manage and view all civil service employees.</p>
        </div>
        <button className="bg-government-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-government-700 transition-colors shadow-lg shadow-government-100">
          <UserPlus size={20} /> Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-government-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white transition-colors">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white transition-colors">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Employee</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-government-100 flex items-center justify-center text-government-600 font-bold text-xs">
                        {e.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{e.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{e.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{e.department}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{e.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      e.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/employees/${e.id}`}
                      className="inline-flex items-center gap-1 text-government-600 hover:text-government-800 font-bold text-sm bg-government-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View Profile <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;

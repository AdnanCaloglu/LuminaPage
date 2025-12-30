import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AlertTriangle, CheckCircle, MapPin, TrendingUp } from 'lucide-react';

const PartnerDashboard: React.FC = () => {
  const scanData = [
    { name: 'Mon', scans: 400 },
    { name: 'Tue', scans: 300 },
    { name: 'Wed', scans: 550 },
    { name: 'Thu', scans: 450 },
    { name: 'Fri', scans: 800 },
    { name: 'Sat', scans: 950 },
    { name: 'Sun', scans: 700 },
  ];

  const statusData = [
    { name: 'Verified', value: 85, color: '#10b981' },
    { name: 'Flagged', value: 10, color: '#f59e0b' },
    { name: 'Counterfeit', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white">Partner Dashboard</h2>
            <p className="text-slate-400">Store ID: #NY-5521 • Status: Active</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition-colors">
                Activate New Batch
             </button>
             <button className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-sm font-medium hover:text-white transition-colors">
                Download Report
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Total Scans</span>
                    <TrendingUp className="text-indigo-400 w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-white">12,450</div>
                <div className="text-xs text-emerald-400 mt-1">+12% vs last week</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Verified Authentic</span>
                    <CheckCircle className="text-emerald-400 w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-white">11,890</div>
                <div className="text-xs text-slate-500 mt-1">95.5% success rate</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Threats Blocked</span>
                    <AlertTriangle className="text-red-400 w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-white">84</div>
                <div className="text-xs text-red-400 mt-1">5 clones detected today</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Active Locations</span>
                    <MapPin className="text-amber-400 w-4 h-4" />
                </div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-slate-500 mt-1">Across 3 cities</div>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Activity Chart */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Weekly Verification Volume</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={scanData}>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                                cursor={{ fill: '#334155' }}
                            />
                            <Bar dataKey="scans" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Security Status Chart */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Security Health</h3>
                <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    {statusData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-slate-400">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
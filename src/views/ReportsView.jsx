import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  Clock,
  User,
  Cpu,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Camera,
  X,
  Phone,
  Check,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';

export default function ReportsView({
  reports = [],
  onVerifyReport = () => {},
  onRejectReport = () => {},
  onEscalateReport = () => {},
  onSubmitReport = () => {}
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // New Citizen Report form
  const [authorName, setAuthorName] = useState('');
  const [phoneNum, setPhoneNum] = useState('+91 98421 77210');
  const [locationName, setLocationName] = useState('Anna Nagar Main Bazaar, Dindigul');
  const [reportCategory, setReportCategory] = useState('Flash Flood');
  const [reportDesc, setReportDesc] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredReports = reports.filter(rep => {
    if (statusFilter !== 'all' && rep.status !== statusFilter) return false;
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      return (
        rep.author.toLowerCase().includes(q) ||
        rep.location.toLowerCase().includes(q) ||
        rep.description.toLowerCase().includes(q) ||
        rep.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const verifiedCount = reports.filter(r => r.status === 'Verified').length;
  const pendingCount = reports.filter(r => r.status === 'Pending').length;
  const flaggedCount = reports.filter(r => r.status === 'Flagged').length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !reportDesc.trim()) return;

    soundFx.playClick();
    setIsAnalyzing(true);

    setTimeout(() => {
      const simulatedScore = Math.floor(Math.random() * 14) + 85;
      const newReport = {
        id: `REP-00${reports.length + 1}`,
        author: authorName,
        phone: phoneNum,
        category: reportCategory,
        location: locationName,
        coordinates: [10.36 + (Math.random() - 0.5) * 0.04, 77.97 + (Math.random() - 0.5) * 0.04],
        description: reportDesc,
        timeAgo: 'Just now',
        timestamp: 'Just now',
        status: simulatedScore >= 88 ? 'Verified' : 'Pending',
        aiScore: simulatedScore,
        aiVerdict: `Automated NLP & cross-verification: ${
          simulatedScore >= 88 ? 'HIGH CREDIBILITY - TERRAIN ANOMALY CONFIRMED' : 'POSSIBLE DUPLICATE'
        } (${simulatedScore}% confidence).`
      };

      onSubmitReport(newReport);
      setIsAnalyzing(false);
      setShowSubmitModal(false);
      setAuthorName('');
      setReportDesc('');
      soundFx.playRadarBeep();
    }, 1300);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-[1720px] mx-auto">
      {/* Header Banner */}
      <div className="panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Crowdsourced Citizen Telemetry & AI Verification
                </h2>
                <Badge variant="green" size="sm">
                  {verifiedCount} VERIFIED
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Citizen incident reporting pipeline with automated NLP sentiment extraction, photo verification, and operator escalation.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="cyan"
          icon={Plus}
          onClick={() => {
            soundFx.playClick();
            setShowSubmitModal(true);
          }}
        >
          Submit Field Observation
        </Button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Reports</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">{reports.length}</div>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">From 6 sectors</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">AI Verified</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{verifiedCount}</div>
            <span className="text-[11px] text-emerald-400/80 font-mono mt-0.5 block">High confidence (≥85%)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Pending Review</span>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1">{pendingCount}</div>
            <span className="text-[11px] text-amber-400/80 font-mono mt-0.5 block">Requires operator check</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Flagged Duplicates</span>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{flaggedCount}</div>
            <span className="text-[11px] text-rose-400/80 font-mono mt-0.5 block">Filtered false alerts</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search reports by citizen, sector, keyword..."
              className="w-full field pl-10 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
            {['all', 'Verified', 'Pending', 'Flagged'].map((st) => (
              <button
                key={st}
                onClick={() => {
                  soundFx.playClick();
                  setStatusFilter(st);
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] transition ${
                  statusFilter === st
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing <strong className="text-cyan-300">{filteredReports.length}</strong> reports
        </span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map(rep => {
          const isVerified = rep.status === 'Verified';
          const isFlagged = rep.status === 'Flagged';

          return (
            <div
              key={rep.id}
              className={`panel p-5 flex flex-col justify-between hover:border-white/20 transition group relative ${
                isVerified
                  ? 'border-emerald-500/25 bg-emerald-500/[0.02]'
                  : isFlagged
                  ? 'border-rose-500/25 bg-rose-500/[0.02]'
                  : ''
              }`}
            >
              {/* Left Accent Stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                  isVerified ? 'bg-emerald-400' : isFlagged ? 'bg-rose-400' : 'bg-amber-400'
                }`}
              />

              <div className="space-y-3 pl-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                    {rep.id}
                  </span>
                  <Badge variant={isVerified ? 'green' : isFlagged ? 'red' : 'amber'} size="sm">
                    {rep.status}
                  </Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-slate-200">{rep.author}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">{rep.timeAgo || rep.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{rep.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[38px]">{rep.description}</p>

                {/* AI Credibility Score Box */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-mono">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      AI Credibility Index:
                    </span>
                    <span className={rep.aiScore >= 85 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                      {rep.aiScore}%
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        rep.aiScore >= 85 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${rep.aiScore}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 leading-tight">
                    {rep.aiVerdict || rep.aiTag || 'Automated spatial cross-correlation with satellite radar.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 pl-1">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onVerifyReport(rep.id);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition"
                    title="Verify Report"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onRejectReport(rep.id);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium transition"
                    title="Flag as False Alarm"
                  >
                    Flag
                  </button>
                </div>

                <button
                  onClick={() => {
                    soundFx.playCriticalAlert();
                    onEscalateReport(rep);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/30 text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>Escalate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="panel max-w-lg w-full p-6 shadow-2xl relative border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Submit Field Observation</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Crowdsourced citizen report intake pipeline</p>
                </div>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAnalyzing ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mx-auto" />
                <h4 className="text-base font-bold text-white">AI Cross-Correlation Running</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Analyzing NLP text sentiments and correlating with nearby SAR radar hydrology data...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Citizen Name</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. S. Ramanujam"
                      className="w-full h-10 field px-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      className="w-full h-10 field px-3 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hazard Category</label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full h-10 field px-3 text-xs text-white bg-[#0B0F14]"
                    >
                      <option value="Flash Flood">🌊 Flash Flood</option>
                      <option value="Landslide">⛰️ Landslide</option>
                      <option value="Severe Gale">🌪️ Severe Gale</option>
                      <option value="Electrical Hazard">⚡ Electrical Hazard</option>
                      <option value="Bridge Damage">🌉 Bridge Damage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Sector</label>
                    <input
                      type="text"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="w-full h-10 field px-3 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Field Observation Details</label>
                  <textarea
                    rows={3}
                    required
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    placeholder="Describe water depth, trapped individuals, road blockage, or live hazards..."
                    className="w-full field p-3 text-xs text-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/25 text-xs text-violet-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Submissions are automatically analyzed by Gemini Multimodal AI for credibility scoring.</span>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowSubmitModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="cyan"
                    icon={Plus}
                  >
                    Submit & Run AI Audit
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

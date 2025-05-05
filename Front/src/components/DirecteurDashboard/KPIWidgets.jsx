const accent = "#d1671b";
const kpis = [
  { label: "Revenu", value: "1,200,000 MAD", change: "+8.2%" },
  { label: "Nouveaux Clients", value: "320", change: "+12" },
  { label: "Performance Staff", value: "92/100", change: "+2" },
];

export default function KPIWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="rounded-2xl p-6 shadow-xl bg-[rgba(24,18,15,0.7)] backdrop-blur-lg border border-white/10 flex flex-col gap-2">
          <span className="text-sm font-medium opacity-70">{kpi.label}</span>
          <span className="text-2xl font-bold" style={{ color: accent }}>{kpi.value}</span>
          <span className="text-xs opacity-60">{kpi.change} ce mois</span>
        </div>
      ))}
    </div>
  );
} 
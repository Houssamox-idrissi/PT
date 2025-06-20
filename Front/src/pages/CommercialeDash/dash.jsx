import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CommercialChartCard() {
  const chartData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 18500 },
    { month: "Mar", sales: 16500 },
    { month: "Apr", sales: 22000 },
    { month: "May", sales: 15500 },
  ];

  const stats = [
    { label: "Total Sales", value: "78.500 DH" },
    { label: "Orders", value: "245" },
    { label: "Clients", value: "112" },
  ];

  return (
    <div className="rounded-2xl p-6 shadow-xl bg-[rgba(24,18,15,0.7)] backdrop-blur-lg border border-white/10 col-span-2 flex flex-col">
      <div className="font-semibold mb-4 text-white text-lg">Commercial Statistics</div>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value) => `${value} DH`} />
            <Bar dataKey="sales" fill="#00BFA5" /> {/* Un vert turquoise pour le côté "commercial" */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-white">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-white/60">{stat.label}</div>
            <div className="text-xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

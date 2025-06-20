import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartCard() {
  const chartData = [
    { month: "Jan", value: 70 },
    { month: "Feb", value: 85 },
    { month: "Mar", value: 65 },
    { month: "Apr", value: 90 },
    { month: "May", value: 55 },
  ];

  const stats = [
    { label: "Occupancy Rate", value: "72%" },
    { label: "Reservations", value: "128" },
    { label: "Total Revenue", value: "24.000 DH" },
  ];

  return (
    <div className="rounded-2xl p-6 shadow-xl bg-[rgba(24,18,15,0.7)] backdrop-blur-lg border border-white/10 col-span-2 flex flex-col">
      <div className="font-semibold mb-4 text-white text-lg">Booking Statistics</div>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="value" fill="orange" />
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

export default function EmployeeTable() {
  return (
    <div className="rounded-2xl p-6 shadow-xl bg-[rgba(24,18,15,0.7)] backdrop-blur-lg border border-white/10 mx-8 mb-8 overflow-x-auto">
      <div className="font-semibold mb-4">Tableau des employés</div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-2 px-4 text-left font-medium">Nom</th>
            <th className="py-2 px-4 text-left font-medium">Poste</th>
            <th className="py-2 px-4 text-left font-medium">Email</th>
            <th className="py-2 px-4 text-left font-medium">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-white/5 transition">
            <td className="py-2 px-4">Ikram</td>
            <td className="py-2 px-4">Directeur</td>
            <td className="py-2 px-4">ikram@agency.com</td>
            <td className="py-2 px-4"><span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">Actif</span></td>
          </tr>
          <tr className="hover:bg-white/5 transition">
            <td className="py-2 px-4">Houssam</td>
            <td className="py-2 px-4">Commercial</td>
            <td className="py-2 px-4">houssam@agency.com</td>
            <td className="py-2 px-4"><span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">En attente</span></td>
          </tr>
          <tr className="hover:bg-white/5 transition">
            <td className="py-2 px-4">Sara</td>
            <td className="py-2 px-4">RH</td>
            <td className="py-2 px-4">sara@agency.com</td>
            <td className="py-2 px-4"><span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400">Inactif</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 
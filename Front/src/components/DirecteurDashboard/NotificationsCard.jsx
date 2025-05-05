export default function NotificationsCard() {
  return (
    <div className="rounded-2xl p-6 shadow-xl bg-[rgba(24,18,15,0.7)] backdrop-blur-lg border border-white/10 flex flex-col">
      <div className="font-semibold mb-2">Notifications</div>
      <ul className="flex-1 flex flex-col gap-2 text-sm">
        <li className="bg-white/10 rounded-lg px-3 py-2">Nouveau rapport disponible</li>
        <li className="bg-white/10 rounded-lg px-3 py-2">3 nouveaux membres dans l'équipe</li>
        <li className="bg-white/10 rounded-lg px-3 py-2">Mise à jour de la politique RH</li>
      </ul>
    </div>
  );
} 
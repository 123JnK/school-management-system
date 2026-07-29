const actions = [
  "➕ Add Student",
  "👨‍🏫 Add Teacher",
  "💰 Collect Fee",
  "📝 Generate Question Paper",
  "📄 Generate Report Card",
  "🎓 School Leaving Certificate",
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white p-4 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
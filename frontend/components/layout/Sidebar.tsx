export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Students",
    "Teachers",
    "Attendance",
    "Fee Management",
    "Transport",
    "Examinations",
    "Question Papers",
    "Study Material",
    "Report Cards",
    "Certificates",
    "Settings",
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item}
            className="cursor-pointer rounded-lg p-3 hover:bg-blue-600 transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
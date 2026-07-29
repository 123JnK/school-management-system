export default function NoticeBoard() {
  const notices = [
    "PTM on Friday at 11:00 AM",
    "Term-1 Examination starts on 5 September",
    "School Fees due before 10 August",
    "Independence Day rehearsal begins Monday",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-5">
        Recent Notices
      </h2>

      <ul className="space-y-3">
        {notices.map((notice, index) => (
          <li
            key={index}
            className="border-b pb-2 text-gray-700"
          >
            • {notice}
          </li>
        ))}
      </ul>
    </div>
  );
}
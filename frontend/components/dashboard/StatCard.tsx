interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

export default function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className={`rounded-xl shadow-lg p-6 text-white ${color}`}>
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
}
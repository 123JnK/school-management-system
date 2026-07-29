export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xl">
        M
      </div>

      <div>
        <h1 className="text-xl font-bold text-blue-700">
          MySchool Platform
        </h1>

        <p className="text-sm text-gray-500">
          Smart School ERP
        </p>
      </div>
    </div>
  );
}
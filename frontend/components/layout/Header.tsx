import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
}
import MainLayout from "@/components/layout/MainLayout";
import StatCard from "@/components/dashboard/StatCard";
import NoticeBoard from "@/components/dashboard/NoticeBoard";
import QuickActions from "@/components/dashboard/QuickActions";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Students"
          value="1250"
          color="bg-blue-600"
        />

        <StatCard
          title="Teachers"
          value="65"
          color="bg-green-600"
        />

        <StatCard
          title="Classes"
          value="40"
          color="bg-purple-600"
        />

        <StatCard
          title="Revenue"
          value="$85,000"
          color="bg-orange-600"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <NoticeBoard />

        <QuickActions />

      </div>
    </MainLayout>
  );
}
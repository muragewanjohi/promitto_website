import React from 'react';

export default function AdminDashboard() {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold text-[#1E40AF] mb-8">Welcome to the Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Properties */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-5xl font-bold text-[#1E40AF]">--</span>
          <span className="mt-2 text-lg text-gray-700">Total Properties</span>
        </div>
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-5xl font-bold text-[#F59E0B]">--</span>
          <span className="mt-2 text-lg text-gray-700">Total Users</span>
        </div>
      </div>
      <div className="mt-12">
        <p className="text-gray-600">This is a simple overview. You can customize this dashboard to show more metrics or quick actions for admins.</p>
      </div>
    </section>
  );
} 
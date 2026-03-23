'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface Stats {
  users: number;
  posts: number;
  sales: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, sales: 0 });
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const token = await user.getIdTokenResult();
      if (!token.claims.admin) {
        router.push('/seller/dashboard');
        return;
      }

      fetchDashboardData();
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Get counts
      const usersSnap = await getDocs(collection(db, 'users'));
      const postsSnap = await getDocs(collection(db, 'posts'));
      const salesSnap = await getDocs(collection(db, 'sales'));

      setStats({
        users: usersSnap.size,
        posts: postsSnap.size,
        sales: salesSnap.size,
      });

      // Get recent users
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'), limit(5));
      const recentSnap = await getDocs(q);

      const usersList: User[] = [];
      recentSnap.forEach((doc) => {
        const data = doc.data();
        usersList.push({
          id: doc.id,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          role: data.role || 'Seller',
        });
      });
      setRecentUsers(usersList);

    } catch (err: any) {
      console.error('Admin dashboard fetch error:', err);
      setError('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked || loading)
    return (
      <div className="flex items-center justify-center h-screen text-cyan-500 text-xl">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-center px-4">
        {error}
      </div>
    );

  const chartData = [
    { name: 'Users', value: stats.users },
    { name: 'Posts', value: stats.posts },
    { name: 'Sales', value: stats.sales },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 border-r border-cyan-500/20 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <a href="#" className="hover:text-cyan-400 transition">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">Users</a>
          <a href="#" className="hover:text-cyan-400 transition">Posts</a>
          <a href="#" className="hover:text-cyan-400 transition">Sales</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(stats).map(([key, value]) => (
            <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Card className="bg-gray-900 border border-cyan-500/20 rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-sm uppercase text-gray-400">{key}</h2>
                  <p className="text-3xl font-bold text-cyan-400">{value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics Chart */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500/20 shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#67e8f9" />
              <YAxis stroke="#67e8f9" />
              <Tooltip />
              <Bar dataKey="value" fill="#22d3ee" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Users Table */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-cyan-500/20 shadow-lg overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">Recent Users</h2>
          {recentUsers.length === 0 ? (
            <p className="text-gray-400">No users found.</p>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-cyan-500/20">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-cyan-500/10 hover:bg-gray-800 transition">
                    <td className="px-4 py-2">{user.firstName} {user.lastName}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';

export default function SellerDashboard() {
  const [stats, setStats] = useState({ posts: 0, sales: 0 });
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const token = await user.getIdTokenResult();
      if (token.claims.admin) {
        router.push('/admin/dashboard'); // admins should not enter seller dashboard
        return;
      }

      fetchSellerStats();
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchSellerStats = async () => {
    try {
      setLoading(true);

      const postsSnap = await getDocs(collection(db, 'posts'));
      const salesSnap = await getDocs(collection(db, 'sales'));

      setStats({
        posts: postsSnap.size, // optionally filter by seller id in real app
        sales: salesSnap.size,
      });
    } catch (err) {
      console.error('Seller dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked || loading)
    return <div className="flex items-center justify-center h-screen text-cyan-500 text-xl">Loading dashboard...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Seller Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border border-cyan-500/20 rounded-2xl shadow-lg">
          <CardContent>
            <h2 className="text-sm text-gray-400">Posts</h2>
            <p className="text-3xl font-bold text-cyan-400">{stats.posts}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border border-cyan-500/20 rounded-2xl shadow-lg">
          <CardContent>
            <h2 className="text-sm text-gray-400">Sales</h2>
            <p className="text-3xl font-bold text-cyan-400">{stats.sales}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
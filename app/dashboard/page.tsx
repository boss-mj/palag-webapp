'use client';

import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/auth/login'); // Not logged in → send to login
        return;
      }

      const token = await user.getIdTokenResult();
      if (token.claims.admin) {
        router.push('/admin/dashboard'); // Admin → admin dashboard
      } else {
        router.push('/seller/dashboard'); // Seller → seller dashboard
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-cyan-500 text-xl">
      Redirecting...
    </div>
  );
}
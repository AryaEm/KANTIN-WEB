'use client';

import { useState } from 'react';
import RegisterStudentForm from './register-student-form';
import RegisterAdminForm from './register-admin-form';
import { User, Store } from 'lucide-react';

export default function RegisterSelector() {
  const [role, setRole] = useState<'siswa' | 'admin'>('siswa');

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setRole('siswa')}
          className={`rounded-xl border p-3 text-sm flex gap-2 justify-center items-center${
            role === 'siswa'
              ? 'border border-teal-500 bg-teal-500/10 text-teal-400 outline-none'
              : 'border border-white/10 text-white/80 outline-none'
          }`}
        >
          <User/>   Siswa  
        </button>

        <button
          onClick={() => setRole('admin')}
          className={`rounded-xl border p-3 text-sm flex gap-2 justify-center items-center${
            role === 'admin'
              ? 'border border-teal-500 bg-teal-500/10 text-teal-400 outline-none'
              : 'border border-white/10 text-white/80 outline-none'
          }`}
        >
          <Store/> Admin Stan
        </button>
      </div>

      {role === 'siswa' ? <RegisterStudentForm /> : <RegisterAdminForm />}
    </>
  );
}

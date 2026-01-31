'use client';

import { useState } from 'react';
import RegisterStudentForm from './register-student-form';
import RegisterAdminForm from './register-admin-form';
import { User, Store } from 'lucide-react';

export default function RegisterSelector() {
  const [role, setRole] = useState<'siswa' | 'admin'>('siswa');

  return (
    <>
      <div className="mb-8 grid grid-cols-2 gap-4">
        <button
          onClick={() => setRole('siswa')}
          className={`group rounded-xl p-4 text-sm font-bold flex flex-col gap-2 items-center transition-all duration-300 ${
            role === 'siswa'
              ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400 text-orange-300'
              : 'bg-white/5 border-2 border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            role === 'siswa' 
              ? 'bg-gradient-to-br from-orange-500 to-yellow-500' 
              : 'bg-white/10 group-hover:bg-white/20'
          }`}>
            <User className={role === 'siswa' ? 'text-white' : 'text-white/60'} size={20} />
          </div>
          <span>Siswa</span>
        </button>

        <button
          onClick={() => setRole('admin')}
          className={`group rounded-xl p-4 text-sm font-bold flex flex-col gap-2 items-center transition-all duration-300 ${
            role === 'admin'
              ? 'bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-400 text-orange-300'
              : 'bg-white/5 border-2 border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
            role === 'admin' 
              ? 'bg-gradient-to-br from-orange-500 to-yellow-500' 
              : 'bg-white/10 group-hover:bg-white/20'
          }`}>
            <Store className={role === 'admin' ? 'text-white' : 'text-white/60'} size={20} />
          </div>
          <span>Admin Stan</span>
        </button>
      </div>

      {role === 'siswa' ? <RegisterStudentForm /> : <RegisterAdminForm />}
    </>
  );
}
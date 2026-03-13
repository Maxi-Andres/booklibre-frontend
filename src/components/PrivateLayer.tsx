import { Outlet } from 'react-router';
import NavBar from './NavBar';

import type { LogProps } from '@/types/authState';



export const PrivateLayer = ({ onLog }: LogProps) => {
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLog={onLog} />
      
      {/* Contenido de cada página */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
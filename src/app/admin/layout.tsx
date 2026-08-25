import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Wrench, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 flex items-center justify-center h-16 border-b border-slate-700">
          <h1 className="text-xl font-bold">Axtech Admin</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/servicios" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <Wrench size={20} />
            <span>Servicio Técnico</span>
          </Link>
          <Link href="/admin/ventas" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <ShoppingCart size={20} />
            <span>Ventas & POS</span>
          </Link>
          <Link href="/admin/usuarios" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors">
            <Users size={20} />
            <span>Usuarios</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-red-600 transition-colors">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-gray-800">Panel de Administración</h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

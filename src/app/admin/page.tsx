import React from "react";
import { 
  Wrench, 
  ShoppingCart, 
  Users, 
  DollarSign 
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Resumen General</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Wrench size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Órdenes Activas</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ventas del Mes</p>
            <p className="text-2xl font-bold text-gray-900">$45,200</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pedidos Online</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className="p-3 rounded-full bg-orange-100 text-orange-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Clientes Nuevos</p>
            <p className="text-2xl font-bold text-gray-900">15</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Órdenes Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="p-4 font-medium border-b">Folio</th>
                <th className="p-4 font-medium border-b">Cliente</th>
                <th className="p-4 font-medium border-b">Equipo</th>
                <th className="p-4 font-medium border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock Data */}
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium text-blue-600">ORD-001</td>
                <td className="p-4 border-b">Juan Pérez</td>
                <td className="p-4 border-b">iPhone 13 Pro</td>
                <td className="p-4 border-b">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                    Diagnosticando
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium text-blue-600">ORD-002</td>
                <td className="p-4 border-b">María López</td>
                <td className="p-4 border-b">MacBook Air M1</td>
                <td className="p-4 border-b">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
                    Reparando
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium text-blue-600">ORD-003</td>
                <td className="p-4 border-b">Carlos Ruiz</td>
                <td className="p-4 border-b">PC Gamer Custom</td>
                <td className="p-4 border-b">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">
                    Listo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

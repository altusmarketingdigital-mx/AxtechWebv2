import React from "react"
import AdminSidebar from "@/components/AdminSidebar"
import { logout } from "@/app/actions/authActions"
import { getSession } from "@/lib/session"
import { LogOut } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">Panel de Administración</h2>
          <div className="flex items-center gap-4">
            {session && (
              <span className="text-xs text-gray-500 hidden md:block truncate max-w-[180px]">
                Sesión: <span className="font-medium text-gray-700">{session.userId.slice(0, 12)}...</span>
              </span>
            )}
            <form action={logout}>
              <button
                type="submit"
                title="Cerrar Sesión"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Salir</span>
              </button>
            </form>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

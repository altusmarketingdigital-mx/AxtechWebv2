import { redirect } from 'next/navigation'
// Redirect to existing service orders page
export default function OrdenesPage() {
  redirect('/admin/servicios')
}

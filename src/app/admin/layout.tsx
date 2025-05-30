import { Sidebar } from '../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="pl-64 min-h-screen">{children}</main>
    </div>
  );
}
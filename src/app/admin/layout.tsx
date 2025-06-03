import { Sidebar } from '../components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      {/* <main className="pl-64 min-h-screen">{children}</main> */}
      <main className="flex-1 min-h-screen p-6 pl-64">
        {children}
      </main>
    </div>
  );
}
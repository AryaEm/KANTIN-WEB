export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="flex min-h-dvh items-center justify-center px-4 bg-primary">
        {children}
      </main>
  );
}

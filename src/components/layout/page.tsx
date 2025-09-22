export function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-8 min-h-[calc(100vh-75px)] max-w-[1280px] mx-auto">
      {children}
    </main>
  );
}

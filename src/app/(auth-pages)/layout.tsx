import "@/app/globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center w-full max-w-5xl mx-auto p-3 sm:p-4 lg:p-5">
        {children}
      </div>
    </main>
  );
}

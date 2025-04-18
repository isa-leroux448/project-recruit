export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <p>Page name</p>
        <a href="/auth/login">Login</a>
      </main>
    </div>
  );
}

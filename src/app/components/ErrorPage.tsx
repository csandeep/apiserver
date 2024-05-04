'use client';

export default function ErrorPage({errorLoading}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center rounded border border-red-400 bg-red-100 px-4 py-2 py-3 text-red-700">
      <p className="text-2xl">{errorLoading}</p>
    </div>
  );
}

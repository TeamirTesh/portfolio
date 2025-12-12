import Link from 'next/link'

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">The Real Mir</h1>
        <p className="text-xl text-gray-600 mb-8">
          This is the personal side of Teamir Teshome. Content coming soon...
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}


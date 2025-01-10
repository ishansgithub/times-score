import LiveMatches from '../components/LiveMatches'

export default function LiveMatchesPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-gray-100 text-center mb-12">Live Matches</h1>
        <LiveMatches />
      </div>
    </main>
  )
}
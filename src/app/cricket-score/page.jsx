import CricketScore from '../components/CricketScore'

export default function CricketScorePage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-gray-100 text-center mb-12">All Cricket Matches</h1>
        <CricketScore />
      </div>
    </main>
  )
}
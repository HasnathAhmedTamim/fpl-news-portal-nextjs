'use client'
import { useState, useEffect } from 'react'
import fetchNews from '@/lib/fetchNews'

const TestSearchPage = () => {
  const [allNews, setAllNews] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSearch = async () => {
    setLoading(true)
    setLogs([])
    
    // Fetch all news first
    addLog('=== Fetching all news ===')
    const all = await fetchNews('', '')
    setAllNews(all)
    addLog(`All news count: ${all.length}`)
    
    // Test search for "arsenal"
    addLog('=== Testing search for "arsenal" ===')
    const arsenalResults = await fetchNews('', 'arsenal')
    setSearchResults(arsenalResults)
    addLog(`Arsenal search results count: ${arsenalResults.length}`)
    
    // Show which items match
    all.forEach((item: any, index: number) => {
      const title = (item.title || '').toLowerCase()
      const team = (item.team || '').toLowerCase()
      const summary = (item.summary || '').toLowerCase()
      const searchTerm = 'arsenal'
      
      const matchesTitle = title.includes(searchTerm)
      const matchesTeam = team.includes(searchTerm)
      const matchesSummary = summary.includes(searchTerm)
      const shouldMatch = matchesTitle || matchesTeam || matchesSummary
      
      if (shouldMatch) {
        addLog(`Item ${index + 1} SHOULD MATCH: "${item.title}" (Team: ${item.team})`)
        addLog(`  - Title match: ${matchesTitle}`)
        addLog(`  - Team match: ${matchesTeam}`) 
        addLog(`  - Summary match: ${matchesSummary}`)
      }
    })
    
    setLoading(false)
  }

  useEffect(() => {
    testSearch()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Test Page</h1>
      
      {loading && <p>Loading...</p>}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Debug Logs</h2>
        <div className="bg-gray-100 p-4 rounded text-sm font-mono max-h-60 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">All News ({allNews.length} items)</h2>
        <div className="grid gap-2 max-h-40 overflow-y-auto">
          {allNews.map((item: any) => (
            <div key={item.id} className="p-2 border rounded">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-600">Team: {item.team}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Search Results for "arsenal" ({searchResults.length} items)</h2>
        <div className="grid gap-2">
          {searchResults.length > 0 ? searchResults.map((item: any) => (
            <div key={item.id} className="p-2 border rounded bg-green-50">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-600">Team: {item.team}</p>
              <p className="text-sm text-gray-500">Summary: {item.summary}</p>
            </div>
          )) : (
            <p className="text-red-500">No search results found!</p>
          )}
        </div>
      </div>
      
      <button 
        onClick={testSearch}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Run Test Again
      </button>
    </div>
  )
}

export default TestSearchPage

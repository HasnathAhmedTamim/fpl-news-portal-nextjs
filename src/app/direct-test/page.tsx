'use client'
import { useState } from 'react'

const DirectApiTest = () => {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testDirectApi = async () => {
    setLoading(true)
    try {
      // Test the actual fetch function
      const fetchNews = (await import('@/lib/fetchNews')).default
      
      console.log('=== Testing Direct API Call ===')
      
      // Test without search
      const allNews = await fetchNews('', '')
      console.log('All news count:', allNews.length)
      
      // Test with search
      const searchResults = await fetchNews('', 'arsenal')
      console.log('Search results count:', searchResults.length)
      console.log('Search results:', searchResults)
      
      setResults({
        all: allNews,
        search: searchResults
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Direct API Test</h1>
      
      <button 
        onClick={testDirectApi}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Direct API Call'}
      </button>
      
      {results && (
        <div className="mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">All News ({results.all.length} items)</h2>
            <div className="grid gap-2 max-h-40 overflow-y-auto">
              {results.all.slice(0, 5).map((item: any) => (
                <div key={item.id} className="p-2 border rounded">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Team: {item.team}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Arsenal Search Results ({results.search.length} items)</h2>
            <div className="grid gap-2">
              {results.search.length > 0 ? results.search.map((item: any) => (
                <div key={item.id} className="p-2 border rounded bg-green-50">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Team: {item.team}</p>
                  <p className="text-sm text-gray-500">Summary: {item.summary.substring(0, 100)}...</p>
                </div>
              )) : (
                <p className="text-red-500">No search results found!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DirectApiTest

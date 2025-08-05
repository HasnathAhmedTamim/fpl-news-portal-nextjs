// Simple test script to verify search logic
const testData = [
  { id: 1, title: "Haaland Fit for Gameweek 1", team: "Manchester City", summary: "Erling Haaland is confirmed fit..." },
  { id: 2, title: "Arsenal Signs New Striker", team: "Arsenal", summary: "Arsenal has signed a new striker..." },
  { id: 3, title: "Saka on Penalties Again?", team: "Arsenal", summary: "Arteta confirms Bukayo Saka..." }
];

const searchTerm = "arsenal";
const filteredResults = testData.filter((item) => {
  const title = (item.title || '').toLowerCase();
  const summary = (item.summary || '').toLowerCase();
  const team = (item.team || '').toLowerCase();
  
  return title.includes(searchTerm) || 
         summary.includes(searchTerm) || 
         team.includes(searchTerm);
});

console.log('Test data:', testData);
console.log('Search term:', searchTerm);
console.log('Filtered results:', filteredResults);
console.log('Expected: 2 items, Actual:', filteredResults.length);

export default function TestLogic() {
  return (
    <div className="p-8">
      <h1>Search Logic Test</h1>
      <p>Check browser console for test results</p>
      <div className="mt-4">
        <h2>Test Data ({testData.length} items):</h2>
        {testData.map(item => (
          <div key={item.id} className="p-2 border rounded mb-2">
            <p><strong>{item.title}</strong></p>
            <p>Team: {item.team}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2>Filtered Results for "arsenal" ({filteredResults.length} items):</h2>
        {filteredResults.map(item => (
          <div key={item.id} className="p-2 border rounded mb-2 bg-green-100">
            <p><strong>{item.title}</strong></p>
            <p>Team: {item.team}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

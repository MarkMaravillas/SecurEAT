import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [recalls, setRecalls] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pantryItems, setPantryItems] = useState([])

  // Fetch food recalls from openFDA API
  const fetchRecalls = async () => {
    setLoading(true)
    setError(null)
    try {
      // openFDA Food Enforcement API - Public access (no API key required)
      const response = await fetch(
        'https://api.fda.gov/food/enforcement.json?limit=10&sort=report_date:desc'
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setRecalls(data.results || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching recalls:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load recalls on component mount
  useEffect(() => {
    fetchRecalls()
  }, [])

  // Add item to pantry
  const addPantryItem = (itemName) => {
    if (itemName.trim()) {
      setPantryItems([...pantryItems, { id: Date.now(), name: itemName, date: new Date().toLocaleDateString() }])
    }
  }

  // Remove item from pantry
  const removePantryItem = (id) => {
    setPantryItems(pantryItems.filter(item => item.id !== id))
  }

  // Render different pages based on navigation
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600">🛡️ SecurEat</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage('home')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setCurrentPage('pantry')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'pantry' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      My Pantry
                    </button>
                    <button
                      onClick={() => setCurrentPage('recalls')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'recalls' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Recalls
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Your Smart Food Safety Assistant
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  SecurEat automatically cross-references your grocery inventory with live government food safety updates to keep your family safe from contaminated food products.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentPage('pantry')}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Start Managing Your Pantry
                  </button>
                  <button
                    onClick={() => setCurrentPage('recalls')}
                    className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
                  >
                    View Recent Recalls
                  </button>
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold mb-2">Digital Pantry</h3>
                  <p className="text-gray-600">Log and track your grocery inventory with our easy-to-use digital pantry dashboard.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-2">Real-Time Alerts</h3>
                  <p className="text-gray-600">Get instant notifications when items in your pantry are subject to food recalls.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="text-4xl mb-4">🏥</div>
                  <h3 className="text-xl font-semibold mb-2">Safety Advisor</h3>
                  <p className="text-gray-600">Receive disposal instructions and health guidance for recalled products.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'pantry':
        return (
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600">🛡️ SecurEat</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage('home')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setCurrentPage('pantry')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'pantry' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      My Pantry
                    </button>
                    <button
                      onClick={() => setCurrentPage('recalls')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'recalls' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Recalls
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">My Digital Pantry</h1>

              {/* Add Item Form */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    id="newItem"
                    placeholder="Enter product name (e.g., Organic Milk, Chicken Breast)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addPantryItem(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('newItem')
                      addPantryItem(input.value)
                      input.value = ''
                    }}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              {/* Pantry Items List */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your Inventory ({pantryItems.length} items)</h2>
                  {pantryItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your pantry is empty. Add items above to get started!</p>
                  ) : (
                    <ul className="space-y-3">
                      {pantryItems.map(item => (
                        <li key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Added: {item.date}</p>
                          </div>
                          <button
                            onClick={() => removePantryItem(item.id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 'recalls':
        return (
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600">🛡️ SecurEat</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage('home')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'home' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setCurrentPage('pantry')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'pantry' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      My Pantry
                    </button>
                    <button
                      onClick={() => setCurrentPage('recalls')}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === 'recalls' ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600'}`}
                    >
                      Recalls
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Food Recalls</h1>
                <button
                  onClick={fetchRecalls}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {/* API Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>API Source:</strong> openFDA Food Enforcement API (Public Access - No API Key Required)
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>Endpoint:</strong> https://api.fda.gov/food/enforcement.json
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading recall data...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
                  <p className="text-red-700 mb-4">{error}</p>
                  <button
                    onClick={fetchRecalls}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Recalls List */}
              {!loading && !error && recalls.length > 0 && (
                <div className="space-y-6">
                  {recalls.map((recall, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{recall.product_description || 'Unknown Product'}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Brand: {recall.recalling_firm || 'Unknown'} | Code: {recall.code_info || 'N/A'}
                          </p>
                        </div>
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {recall.status || 'Recall'}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Reason:</strong> {recall.reason_for_recall || 'Not specified'}</p>
                        <p><strong>Report Date:</strong> {recall.report_date || 'N/A'}</p>
                        <p><strong>Classification:</strong> {recall.classification || 'N/A'}</p>
                        {recall.recall_initiation_date && (
                          <p><strong>Recall Initiation:</strong> {recall.recall_initiation_date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && !error && recalls.length === 0 && (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-gray-600">No recall data available at this time.</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderPage()
}

export default App

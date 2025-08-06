'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../../context/themeContext';
import { 
  FaChartLine, 
  FaArrowLeft, 
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaStar
} from 'react-icons/fa';
import { IoStatsChart, IoTrendingUp } from 'react-icons/io5';

interface PlayerStats {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  totalPoints: number;
  form: number;
  selectedBy: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  saves: number;
  bonus: number;
  ict: number;
  priceChange: number;
  nextFixtures: string[];
  formHistory: number[];
}

const PlayerAnalysisPage = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  // Sample player data (in a real app, this would come from FPL API)
  const [players] = useState<PlayerStats[]>([
    {
      id: 1,
      name: 'Mohamed Salah',
      position: 'MID',
      team: 'LIV',
      price: 12.5,
      totalPoints: 168,
      form: 8.2,
      selectedBy: 45.8,
      goals: 18,
      assists: 12,
      cleanSheets: 0,
      saves: 0,
      bonus: 24,
      ict: 287.5,
      priceChange: 0.3,
      nextFixtures: ['AVL(H)', 'BUR(A)', 'ARS(H)'],
      formHistory: [6, 8, 12, 4, 9, 7]
    },
    {
      id: 2,
      name: 'Erling Haaland',
      position: 'FWD',
      team: 'MCI',
      price: 14.0,
      totalPoints: 189,
      form: 9.8,
      selectedBy: 67.2,
      goals: 24,
      assists: 5,
      cleanSheets: 0,
      saves: 0,
      bonus: 18,
      ict: 198.2,
      priceChange: 0.5,
      nextFixtures: ['WHU(A)', 'LUT(H)', 'EVE(A)'],
      formHistory: [12, 14, 8, 16, 2, 11]
    },
    {
      id: 3,
      name: 'Virgil van Dijk',
      position: 'DEF',
      team: 'LIV',
      price: 6.0,
      totalPoints: 142,
      form: 6.4,
      selectedBy: 23.1,
      goals: 4,
      assists: 2,
      cleanSheets: 14,
      saves: 0,
      bonus: 16,
      ict: 156.8,
      priceChange: -0.1,
      nextFixtures: ['AVL(H)', 'BUR(A)', 'ARS(H)'],
      formHistory: [6, 7, 4, 8, 6, 5]
    },
    {
      id: 4,
      name: 'Alisson',
      position: 'GKP',
      team: 'LIV',
      price: 5.5,
      totalPoints: 134,
      form: 5.2,
      selectedBy: 18.7,
      goals: 0,
      assists: 1,
      cleanSheets: 13,
      saves: 98,
      bonus: 8,
      ict: 89.4,
      priceChange: 0.0,
      nextFixtures: ['AVL(H)', 'BUR(A)', 'ARS(H)'],
      formHistory: [5, 6, 3, 7, 5, 4]
    }
  ]);

  const positions = ['All', 'GKP', 'DEF', 'MID', 'FWD'];
  const teams = ['All', 'LIV', 'MCI', 'ARS', 'TOT', 'CHE', 'MUN', 'NEW'];

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'All' || player.position === selectedPosition;
    const matchesTeam = selectedTeam === 'All' || player.team === selectedTeam;
    return matchesSearch && matchesPosition && matchesTeam;
  });

  const getFormColor = (form: number) => {
    if (form >= 8) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (form >= 6) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (change < 0) return isDarkMode ? 'text-red-400' : 'text-red-600';
    return isDarkMode ? 'text-gray-400' : 'text-gray-600';
  };

  return (
    <div className={`min-h-screen py-8 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/fplservices" 
            className={`inline-flex items-center mb-4 transition-colors duration-200 ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to FPL Services
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <FaChartLine className={`w-8 h-8 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`} />
            <h1 className={`text-3xl md:text-4xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Player Analysis
            </h1>
          </div>
          
          <p className={`text-lg transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Analyze player statistics, form, and performance metrics to make informed decisions.
          </p>
        </div>

        {/* Filters */}
        <div className={`p-6 rounded-xl border mb-8 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Position Filter */}
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              title="Filter by position"
              className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>

            {/* Team Filter */}
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              title="Filter by team"
              className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPosition('All');
                setSelectedTeam('All');
                setSelectedPlayer(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player List */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Players ({filteredPlayers.length})
              </h2>
              
              <div className="space-y-4">
                {filteredPlayers.map((player) => (
                  <div 
                    key={player.id} 
                    onClick={() => setSelectedPlayer(player)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedPlayer?.id === player.id
                        ? isDarkMode 
                          ? 'bg-blue-900/30 border-blue-600' 
                          : 'bg-blue-50 border-blue-300'
                        : isDarkMode 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold transition-colors duration-200 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {player.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-600 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {player.position}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-blue-900 text-blue-200' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {player.team}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className={`block transition-colors duration-200 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Points
                            </span>
                            <span className={`font-medium transition-colors duration-200 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {player.totalPoints}
                            </span>
                          </div>
                          
                          <div>
                            <span className={`block transition-colors duration-200 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Form
                            </span>
                            <span className={`font-medium ${getFormColor(player.form)}`}>
                              {player.form}
                            </span>
                          </div>
                          
                          <div>
                            <span className={`block transition-colors duration-200 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Price
                            </span>
                            <span className={`font-medium transition-colors duration-200 ${
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              £{player.price}m
                            </span>
                          </div>
                          
                          <div>
                            <span className={`block transition-colors duration-200 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Selected
                            </span>
                            <span className={`font-medium transition-colors duration-200 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {player.selectedBy}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 ${getPriceChangeColor(player.priceChange)}`}>
                          {player.priceChange > 0 ? (
                            <FaArrowUp className="w-3 h-3" />
                          ) : player.priceChange < 0 ? (
                            <FaArrowDown className="w-3 h-3" />
                          ) : null}
                          <span className="text-sm font-medium">
                            {player.priceChange > 0 ? '+' : ''}{player.priceChange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Player Details */}
          <div>
            {selectedPlayer ? (
              <div className={`p-6 rounded-xl border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedPlayer.name}
                </h2>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-3 rounded-lg transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-2xl font-bold transition-colors duration-200 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedPlayer.totalPoints}
                    </div>
                    <div className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Total Points
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-lg transition-colors duration-200 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className={`text-2xl font-bold ${getFormColor(selectedPlayer.form)}`}>
                      {selectedPlayer.form}
                    </div>
                    <div className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Form
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="space-y-4">
                  <h3 className={`font-semibold transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Season Stats
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {selectedPlayer.position !== 'GKP' && (
                      <>
                        <div className="flex justify-between">
                          <span className={`transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Goals:
                          </span>
                          <span className={`font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {selectedPlayer.goals}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={`transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Assists:
                          </span>
                          <span className={`font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {selectedPlayer.assists}
                          </span>
                        </div>
                      </>
                    )}
                    
                    {(selectedPlayer.position === 'DEF' || selectedPlayer.position === 'GKP') && (
                      <div className="flex justify-between">
                        <span className={`transition-colors duration-200 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Clean Sheets:
                        </span>
                        <span className={`font-medium transition-colors duration-200 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedPlayer.cleanSheets}
                        </span>
                      </div>
                    )}
                    
                    {selectedPlayer.position === 'GKP' && (
                      <div className="flex justify-between">
                        <span className={`transition-colors duration-200 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Saves:
                        </span>
                        <span className={`font-medium transition-colors duration-200 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {selectedPlayer.saves}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Bonus:
                      </span>
                      <span className={`font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedPlayer.bonus}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        ICT Index:
                      </span>
                      <span className={`font-medium transition-colors duration-200 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {selectedPlayer.ict}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Fixtures */}
                <div className="mt-6">
                  <h3 className={`font-semibold mb-3 transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Next 3 Fixtures
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlayer.nextFixtures.map((fixture, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-blue-900 text-blue-200' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {fixture}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Form History */}
                <div className="mt-6">
                  <h3 className={`font-semibold mb-3 transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Form History (Last 6 GWs)
                  </h3>
                  <div className="flex gap-1">
                    {selectedPlayer.formHistory.map((points, index) => (
                      <div 
                        key={index}
                        className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-medium transition-colors duration-200 ${
                          points >= 8 
                            ? 'bg-green-500 text-white'
                            : points >= 4 
                              ? isDarkMode ? 'bg-yellow-600 text-black' : 'bg-yellow-400 text-black'
                              : 'bg-red-500 text-white'
                        }`}
                      >
                        {points}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-xl border text-center transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <IoStatsChart className={`w-16 h-16 mx-auto mb-4 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-600' : 'text-gray-400'
                }`} />
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Select a Player
                </h3>
                <p className={`transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Click on any player to view detailed statistics and analysis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAnalysisPage;

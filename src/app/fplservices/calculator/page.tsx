'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../../context/themeContext';
import { 
  FaCalculator, 
  FaArrowLeft, 
  FaPlus, 
  FaMinus,
  FaInfoCircle 
} from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';

interface Player {
  id: number;
  name: string;
  position: string;
  team: string;
  price: number;
  points: number;
  selected: boolean;
}

const CalculatorPage = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  // Sample FPL players data (in a real app, this would come from an API)
  const [players] = useState<Player[]>([
    { id: 1, name: 'Mohamed Salah', position: 'MID', team: 'LIV', price: 12.5, points: 8, selected: false },
    { id: 2, name: 'Erling Haaland', position: 'FWD', team: 'MCI', price: 14.0, points: 12, selected: false },
    { id: 3, name: 'Bruno Fernandes', position: 'MID', team: 'MUN', price: 8.5, points: 6, selected: false },
    { id: 4, name: 'Kevin De Bruyne', position: 'MID', team: 'MCI', price: 9.5, points: 7, selected: false },
    { id: 5, name: 'Harry Kane', position: 'FWD', team: 'BAY', price: 11.0, points: 9, selected: false },
    { id: 6, name: 'Bukayo Saka', position: 'MID', team: 'ARS', price: 8.0, points: 5, selected: false },
    { id: 7, name: 'Virgil van Dijk', position: 'DEF', team: 'LIV', price: 6.0, points: 4, selected: false },
    { id: 8, name: 'Alisson', position: 'GKP', team: 'LIV', price: 5.5, points: 3, selected: false },
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget, setBudget] = useState<number>(100.0);
  const [captainId, setCaptainId] = useState<number | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<number | null>(null);

  const addPlayer = (player: Player) => {
    if (selectedPlayers.length < 11 && !selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, { ...player, selected: true }]);
    }
  };

  const removePlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
    if (captainId === playerId) setCaptainId(null);
    if (viceCaptainId === playerId) setViceCaptainId(null);
  };

  const totalCost = selectedPlayers.reduce((sum, player) => sum + player.price, 0);
  const totalPoints = selectedPlayers.reduce((sum, player) => {
    let points = player.points;
    if (player.id === captainId) points *= 2; // Captain gets double points
    return sum + points;
  }, 0);

  const remainingBudget = budget - totalCost;

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
            <FaCalculator className={`w-8 h-8 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <h1 className={`text-3xl md:text-4xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Points Calculator
            </h1>
          </div>
          
          <p className={`text-lg transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Build your team and calculate potential points for the upcoming gameweek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Selection */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Available Players
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.filter(p => !selectedPlayers.find(sp => sp.id === p.id)).map((player) => (
                  <div key={player.id} className={`p-4 rounded-lg border transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className={`font-semibold transition-colors duration-200 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {player.name}
                        </h3>
                        <p className={`text-sm transition-colors duration-200 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {player.position} - {player.team}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold transition-colors duration-200 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          £{player.price}m
                        </p>
                        <p className={`text-sm transition-colors duration-200 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {player.points} pts
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => addPlayer(player)}
                      disabled={selectedPlayers.length >= 11 || remainingBudget < player.price}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        selectedPlayers.length >= 11 || remainingBudget < player.price
                          ? isDarkMode 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <FaPlus className="w-4 h-4" />
                      Add to Team
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Summary */}
          <div className="space-y-6">
            {/* Budget Tracker */}
            <div className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Budget Tracker
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Total Budget:
                  </span>
                  <span className={`font-bold transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    £{budget.toFixed(1)}m
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className={`transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Spent:
                  </span>
                  <span className={`font-bold transition-colors duration-200 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                    £{totalCost.toFixed(1)}m
                  </span>
                </div>
                
                <div className="flex justify-between border-t pt-2">
                  <span className={`transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Remaining:
                  </span>
                  <span className={`font-bold transition-colors duration-200 ${
                    remainingBudget >= 0 
                      ? isDarkMode ? 'text-green-400' : 'text-green-600'
                      : isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                    £{remainingBudget.toFixed(1)}m
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Team */}
            <div className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Team ({selectedPlayers.length}/11)
              </h2>
              
              {selectedPlayers.length === 0 ? (
                <p className={`text-center py-8 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No players selected yet
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedPlayers.map((player) => (
                    <div key={player.id} className={`p-3 rounded-lg border transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className={`font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {player.name}
                            {player.id === captainId && (
                              <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded">C</span>
                            )}
                            {player.id === viceCaptainId && (
                              <span className="ml-2 text-xs bg-gray-500 text-white px-2 py-1 rounded">VC</span>
                            )}
                          </h4>
                          <p className={`text-sm transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {player.position} - £{player.price}m
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {player.id === captainId ? player.points * 2 : player.points} pts
                          </span>
                          <button
                            onClick={() => removePlayer(player.id)}
                            title="Remove player from team"
                            className={`p-1 rounded transition-colors duration-200 ${
                              isDarkMode 
                                ? 'text-red-400 hover:bg-red-900/20' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <FaMinus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Captain Selection */}
                      {selectedPlayers.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => setCaptainId(player.id === captainId ? null : player.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                              player.id === captainId
                                ? 'bg-yellow-500 text-black'
                                : isDarkMode 
                                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Captain
                          </button>
                          <button
                            onClick={() => setViceCaptainId(player.id === viceCaptainId ? null : player.id)}
                            className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                              player.id === viceCaptainId
                                ? 'bg-gray-500 text-white'
                                : isDarkMode 
                                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            Vice
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Points Summary */}
            <div className={`p-6 rounded-xl border transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <IoStatsChart className={`w-6 h-6 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h2 className={`text-xl font-bold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Predicted Points
                </h2>
              </div>
              
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {totalPoints}
                </div>
                <p className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Expected gameweek points
                </p>
              </div>

              {selectedPlayers.length > 0 && (
                <div className={`mt-4 p-3 rounded-lg transition-colors duration-200 ${
                  isDarkMode ? 'bg-blue-800/30' : 'bg-blue-100'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <FaInfoCircle className={`w-4 h-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <span className={`text-sm font-medium transition-colors duration-200 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      Team Analysis
                    </span>
                  </div>
                  <p className={`text-xs transition-colors duration-200 ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-600'
                  }`}>
                    Average points per player: {(totalPoints / selectedPlayers.length).toFixed(1)}
                    <br />
                    Most expensive: £{Math.max(...selectedPlayers.map(p => p.price)).toFixed(1)}m
                    <br />
                    Budget efficiency: {totalCost > 0 ? (totalPoints / totalCost).toFixed(1) : '0'} pts/£m
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;

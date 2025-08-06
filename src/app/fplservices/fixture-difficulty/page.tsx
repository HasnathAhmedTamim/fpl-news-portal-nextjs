'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../../context/themeContext';
import { 
  FaArrowLeft, 
  FaCalendarAlt,
  FaHome,
  FaPlane
} from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';

interface Fixture {
  gameweek: number;
  team: string;
  opponent: string;
  isHome: boolean;
  difficulty: number; // 1-5 scale
}

interface TeamFixtures {
  team: string;
  fixtures: Fixture[];
  averageDifficulty: number;
}

const FixtureDifficultyPage = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  const [selectedGameweeks, setSelectedGameweeks] = useState<number>(5);
  const [sortBy, setSortBy] = useState<'difficulty' | 'team'>('difficulty');

  // Sample fixture data (in a real app, this would come from FPL API)
  const [teamFixtures] = useState<TeamFixtures[]>([
    {
      team: 'LIV',
      fixtures: [
        { gameweek: 28, team: 'LIV', opponent: 'AVL', isHome: true, difficulty: 2 },
        { gameweek: 29, team: 'LIV', opponent: 'BUR', isHome: false, difficulty: 2 },
        { gameweek: 30, team: 'LIV', opponent: 'ARS', isHome: true, difficulty: 4 },
        { gameweek: 31, team: 'LIV', opponent: 'MCI', isHome: false, difficulty: 5 },
        { gameweek: 32, team: 'LIV', opponent: 'SHU', isHome: true, difficulty: 1 }
      ],
      averageDifficulty: 2.8
    },
    {
      team: 'MCI',
      fixtures: [
        { gameweek: 28, team: 'MCI', opponent: 'WHU', isHome: false, difficulty: 2 },
        { gameweek: 29, team: 'MCI', opponent: 'LUT', isHome: true, difficulty: 2 },
        { gameweek: 30, team: 'MCI', opponent: 'EVE', isHome: false, difficulty: 3 },
        { gameweek: 31, team: 'MCI', opponent: 'LIV', isHome: true, difficulty: 4 },
        { gameweek: 32, team: 'MCI', opponent: 'ARS', isHome: false, difficulty: 4 }
      ],
      averageDifficulty: 3.0
    },
    {
      team: 'ARS',
      fixtures: [
        { gameweek: 28, team: 'ARS', opponent: 'BRE', isHome: true, difficulty: 2 },
        { gameweek: 29, team: 'ARS', opponent: 'NEW', isHome: false, difficulty: 3 },
        { gameweek: 30, team: 'ARS', opponent: 'LIV', isHome: false, difficulty: 4 },
        { gameweek: 31, team: 'ARS', opponent: 'TOT', isHome: true, difficulty: 4 },
        { gameweek: 32, team: 'ARS', opponent: 'MCI', isHome: true, difficulty: 5 }
      ],
      averageDifficulty: 3.6
    },
    {
      team: 'SHU',
      fixtures: [
        { gameweek: 28, team: 'SHU', opponent: 'BUR', isHome: true, difficulty: 2 },
        { gameweek: 29, team: 'SHU', opponent: 'LUT', isHome: false, difficulty: 2 },
        { gameweek: 30, team: 'SHU', opponent: 'FUL', isHome: true, difficulty: 3 },
        { gameweek: 31, team: 'SHU', opponent: 'BRE', isHome: false, difficulty: 2 },
        { gameweek: 32, team: 'SHU', opponent: 'LIV', isHome: false, difficulty: 5 }
      ],
      averageDifficulty: 2.8
    }
  ]);

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500 text-white';
      case 2: return isDarkMode ? 'bg-green-600 text-white' : 'bg-green-400 text-white';
      case 3: return isDarkMode ? 'bg-yellow-600 text-black' : 'bg-yellow-400 text-black';
      case 4: return isDarkMode ? 'bg-orange-600 text-white' : 'bg-orange-500 text-white';
      case 5: return 'bg-red-500 text-white';
      default: return isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Very Easy';
      case 2: return 'Easy';
      case 3: return 'Medium';
      case 4: return 'Hard';
      case 5: return 'Very Hard';
      default: return 'Unknown';
    }
  };

  const getAverageDifficultyColor = (avg: number) => {
    if (avg <= 2) return isDarkMode ? 'text-green-400' : 'text-green-600';
    if (avg <= 3) return isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
    if (avg <= 4) return isDarkMode ? 'text-orange-400' : 'text-orange-600';
    return isDarkMode ? 'text-red-400' : 'text-red-600';
  };

  const sortedTeams = [...teamFixtures].sort((a, b) => {
    if (sortBy === 'difficulty') {
      return a.averageDifficulty - b.averageDifficulty;
    }
    return a.team.localeCompare(b.team);
  });

  const getRecommendation = (difficulty: number) => {
    if (difficulty <= 2.5) return { text: 'Excellent fixtures - Consider triple captain or transfers in', color: 'green' };
    if (difficulty <= 3.2) return { text: 'Good fixtures - Safe captaincy options', color: 'yellow' };
    if (difficulty <= 4.0) return { text: 'Tough fixtures - Consider transfers out', color: 'orange' };
    return { text: 'Very difficult fixtures - Avoid or bench players', color: 'red' };
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
            <IoStatsChart className={`w-8 h-8 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <h1 className={`text-3xl md:text-4xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Fixture Difficulty
            </h1>
          </div>
          
          <p className={`text-lg transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Analyze upcoming fixtures and plan your transfers based on fixture difficulty ratings.
          </p>
        </div>

        {/* Controls */}
        <div className={`p-6 rounded-xl border mb-8 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-4">
              <label className={`font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Gameweeks to analyze:
              </label>
              <select
                value={selectedGameweeks}
                onChange={(e) => setSelectedGameweeks(Number(e.target.value))}
                title="Select number of gameweeks to analyze"
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value={3}>Next 3 GWs</option>
                <option value={5}>Next 5 GWs</option>
                <option value={8}>Next 8 GWs</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className={`font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'difficulty' | 'team')}
                title="Sort teams by difficulty or alphabetically"
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="difficulty">Easiest First</option>
                <option value="team">Team Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Difficulty Scale Legend */}
        <div className={`p-6 rounded-xl border mb-8 transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <h2 className={`text-lg font-bold mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Difficulty Scale
          </h2>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map(difficulty => (
              <div key={difficulty} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </div>
                <span className={`text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {getDifficultyText(difficulty)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Teams Fixtures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sortedTeams.map((teamData) => {
            const recommendation = getRecommendation(teamData.averageDifficulty);
            
            return (
              <div key={teamData.team} className={`p-6 rounded-xl border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                {/* Team Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-xl font-bold transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {teamData.team}
                  </h3>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getAverageDifficultyColor(teamData.averageDifficulty)}`}>
                      {teamData.averageDifficulty.toFixed(1)}
                    </div>
                    <div className={`text-sm transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Avg Difficulty
                    </div>
                  </div>
                </div>

                {/* Fixtures */}
                <div className="space-y-3 mb-4">
                  {teamData.fixtures.slice(0, selectedGameweeks).map((fixture) => (
                    <div key={fixture.gameweek} className={`p-3 rounded-lg border transition-colors duration-200 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium transition-colors duration-200 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            GW{fixture.gameweek}
                          </span>
                          <div className="flex items-center gap-2">
                            {fixture.isHome ? (
                              <FaHome className={`w-4 h-4 ${
                                isDarkMode ? 'text-green-400' : 'text-green-600'
                              }`} />
                            ) : (
                              <FaPlane className={`w-4 h-4 ${
                                isDarkMode ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                            )}
                            <span className={`font-medium transition-colors duration-200 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              vs {fixture.opponent}
                            </span>
                            <span className={`text-sm transition-colors duration-200 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              ({fixture.isHome ? 'H' : 'A'})
                            </span>
                          </div>
                        </div>
                        
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${getDifficultyColor(fixture.difficulty)}`}>
                          {fixture.difficulty}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className={`p-3 rounded-lg border-l-4 transition-colors duration-200 ${
                  recommendation.color === 'green' 
                    ? isDarkMode 
                      ? 'bg-green-900/20 border-green-500' 
                      : 'bg-green-50 border-green-500'
                    : recommendation.color === 'yellow'
                      ? isDarkMode 
                        ? 'bg-yellow-900/20 border-yellow-500' 
                        : 'bg-yellow-50 border-yellow-500'
                      : recommendation.color === 'orange'
                        ? isDarkMode 
                          ? 'bg-orange-900/20 border-orange-500' 
                          : 'bg-orange-50 border-orange-500'
                        : isDarkMode 
                          ? 'bg-red-900/20 border-red-500' 
                          : 'bg-red-50 border-red-500'
                }`}>
                  <h4 className={`font-medium mb-1 transition-colors duration-200 ${
                    recommendation.color === 'green' 
                      ? isDarkMode ? 'text-green-400' : 'text-green-700'
                      : recommendation.color === 'yellow'
                        ? isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
                        : recommendation.color === 'orange'
                          ? isDarkMode ? 'text-orange-400' : 'text-orange-700'
                          : isDarkMode ? 'text-red-400' : 'text-red-700'
                  }`}>
                    Recommendation
                  </h4>
                  <p className={`text-sm transition-colors duration-200 ${
                    recommendation.color === 'green' 
                      ? isDarkMode ? 'text-green-300' : 'text-green-600'
                      : recommendation.color === 'yellow'
                        ? isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                        : recommendation.color === 'orange'
                          ? isDarkMode ? 'text-orange-300' : 'text-orange-600'
                          : isDarkMode ? 'text-red-300' : 'text-red-600'
                  }`}>
                    {recommendation.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className={`mt-8 p-6 rounded-xl border transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-900 to-blue-900 border-purple-700' 
            : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
        }`}>
          <h2 className={`text-xl font-bold mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                {sortedTeams.filter(t => t.averageDifficulty <= 2.5).length}
              </div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Teams with Easy Fixtures
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                {sortedTeams.filter(t => t.averageDifficulty > 2.5 && t.averageDifficulty <= 3.5).length}
              </div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Teams with Medium Fixtures
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-red-400' : 'text-red-600'
              }`}>
                {sortedTeams.filter(t => t.averageDifficulty > 3.5).length}
              </div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Teams with Hard Fixtures
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureDifficultyPage;

'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ThemeContext } from '../context/themeContext';
import { 
  FaCalculator, 
  FaChartLine, 
  FaTrophy, 
  FaUsers, 
  FaStar,
  FaArrowRight 
} from 'react-icons/fa';
import { IoStatsChart, IoTrendingUp, IoGameController } from 'react-icons/io5';

const FPLServicesPage = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkMode = themeContext?.isDarkMode || false;

  const services = [
    {
      title: 'Points Calculator',
      description: 'Calculate and predict FPL points for your team based on fixtures, form, and statistics.',
      icon: <FaCalculator className="w-8 h-8" />,
      href: '/fplservices/calculator',
      color: 'blue',
      features: ['Team Value Calculator', 'Gameweek Predictor', 'Transfer Calculator']
    },
    {
      title: 'Player Analysis',
      description: 'Deep dive into player statistics, form analysis, and performance metrics.',
      icon: <FaChartLine className="w-8 h-8" />,
      href: '/fplservices/player-analysis',
      color: 'green',
      features: ['Performance Stats', 'Form Analysis', 'Price Predictions']
    },
    {
      title: 'Fixture Difficulty',
      description: 'Analyze upcoming fixtures and plan your transfers based on fixture difficulty.',
      icon: <IoStatsChart className="w-8 h-8" />,
      href: '/fplservices/fixture-difficulty',
      color: 'purple',
      features: ['Fixture Ratings', 'Team Difficulty', 'Transfer Recommendations']
    },
    // {
    //   title: 'League Manager',
    //   description: 'Manage and track your mini-leagues, compare performance with friends.',
    //   icon: <FaUsers className="w-8 h-8" />,
    //   href: '/fplservices/league-manager',
    //   color: 'orange',
    //   features: ['League Tracking', 'Head-to-Head', 'Performance Comparison']
    // },
    // {
    //   title: 'Captain Picker',
    //   description: 'AI-powered captain recommendations based on form, fixtures, and statistics.',
    //   icon: <FaTrophy className="w-8 h-8" />,
    //   href: '/fplservices/captain-picker',
    //   color: 'yellow',
    //   features: ['Captain Analysis', 'Risk Assessment', 'Historical Performance']
    // },
    // {
    //   title: 'Transfer Planner',
    //   description: 'Plan your transfers strategically with our advanced transfer planning tool.',
    //   icon: <IoTrendingUp className="w-8 h-8" />,
    //   href: '/fplservices/transfer-planner',
    //   color: 'red',
    //   features: ['Multi-week Planning', 'Wildcard Optimizer', 'Budget Management']
    // }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: isDarkMode 
        ? 'from-blue-900 to-blue-800 border-blue-700 hover:border-blue-600' 
        : 'from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300',
      green: isDarkMode 
        ? 'from-green-900 to-green-800 border-green-700 hover:border-green-600' 
        : 'from-green-50 to-green-100 border-green-200 hover:border-green-300',
      purple: isDarkMode 
        ? 'from-purple-900 to-purple-800 border-purple-700 hover:border-purple-600' 
        : 'from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300',
      orange: isDarkMode 
        ? 'from-orange-900 to-orange-800 border-orange-700 hover:border-orange-600' 
        : 'from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300',
      yellow: isDarkMode 
        ? 'from-yellow-900 to-yellow-800 border-yellow-700 hover:border-yellow-600' 
        : 'from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-300',
      red: isDarkMode 
        ? 'from-red-900 to-red-800 border-red-700 hover:border-red-600' 
        : 'from-red-50 to-red-100 border-red-200 hover:border-red-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColor = (color: string) => {
    const iconColorMap = {
      blue: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      green: isDarkMode ? 'text-green-400' : 'text-green-600',
      purple: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      orange: isDarkMode ? 'text-orange-400' : 'text-orange-600',
      yellow: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
      red: isDarkMode ? 'text-red-400' : 'text-red-600'
    };
    return iconColorMap[color as keyof typeof iconColorMap] || iconColorMap.blue;
  };

  return (
    <div className={`min-h-screen py-12 transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            FPL Services
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Powerful tools and analytics to help you dominate your Fantasy Premier League competitions. 
            From transfer planning to captain selection, we've got you covered.
          </p>
          
          {/* Feature highlight banner */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700 text-blue-200' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-blue-700'
          }`}>
            <FaStar className="w-4 h-4" />
            <span className="font-medium">Free Tools • Real-time Data • Expert Analysis</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group block"
            >
              <div className={`h-full p-6 rounded-xl border-2 transition-all duration-200 bg-gradient-to-br ${getColorClasses(service.color)} transform hover:-translate-y-1 hover:shadow-lg`}>
                {/* Service Icon */}
                <div className={`mb-4 ${getIconColor(service.color)}`}>
                  {service.icon}
                </div>

                {/* Service Content */}
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>
                
                <p className={`text-sm mb-4 leading-relaxed transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="mb-4 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={`text-sm flex items-center transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-200 ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Get Started
                  </span>
                  <FaArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 ${
                    getIconColor(service.color)
                  }`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className={`mt-16 text-center p-8 rounded-2xl border transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold mb-4 transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Need More Help?
          </h2>
          <p className={`mb-6 transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Check out our latest FPL news and expert analysis to stay ahead of the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/news"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Latest News
            </Link>
            <Link
              href="/aboutfpl"
              className={`px-6 py-3 rounded-lg border-2 font-medium transition-colors duration-200 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FPLServicesPage;

const fetchNews = async (category: string = "", search: string = "") => {
  try {
    // Build the URL with proper encoding
    const baseUrl = 'https://fpl-news-api.vercel.app/api/latest-news';
    const params = new URLSearchParams();
    
    if (category.trim()) {
      params.append('category', category);
    }
    
    if (search.trim()) {
      params.append('search', search);
    }
    
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response has content before trying to parse JSON
    const text = await response.text();
    if (!text || text.trim() === '') {
      console.warn('Empty response from API');
      return [];
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Response text:', text);
      return [];
    }
    
    // Ensure we always return an array
    let newsArray = [];
    if (Array.isArray(data)) {
      newsArray = data;
    } else if (data && typeof data === 'object') {
      // If it's an object with a data property, return that
      newsArray = Array.isArray(data.data) ? data.data : [];
    } else {
      console.warn('Unexpected data format:', data);
      return [];
    }
    
    // Client-side filtering as fallback since API search doesn't work properly
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      
      const filteredNews = newsArray.filter((item: any) => {
        const title = (item.title || '').toLowerCase();
        const summary = (item.summary || '').toLowerCase();
        const team = (item.team || '').toLowerCase();
        const category = (item.category || '').toLowerCase();
        
        return title.includes(searchTerm) || 
               summary.includes(searchTerm) || 
               team.includes(searchTerm) || 
               category.includes(searchTerm);
      });
      
      return filteredNews;
    }
    
    if (category.trim()) {
      const categoryTerm = category.toLowerCase().trim();
      const filteredNews = newsArray.filter((item: any) => {
        const itemCategory = (item.category || '').toLowerCase();
        return itemCategory.includes(categoryTerm);
      });
      
      return filteredNews;
    }
    
    return newsArray;
    
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return empty array instead of undefined to prevent crashes
    return [];
  }
};

export default fetchNews;

'use client';
import { useState, useEffect } from 'react';

interface ConfidenceScores {
  [category: string]: number;
}

interface ModerationResult {
  flagged: boolean;
  message: string;
  categories?: Record<string, boolean>;
  confidence_scores?: ConfidenceScores;
  error?: string;
}

interface ModeratedItem {
  id: string;
  type: 'stride' | 'post';
  content: string;
  author_id: string;
  created_at: string;
  moderation_result: ModerationResult;
  severity_score?: number;
  processed_at?: string;
}

export default function ModeratedContentList() {
  const [moderatedContent, setModeratedContent] = useState<ModeratedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'flagged' | 'safe'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'severity'>('newest');
  const [isPathwayActive, setIsPathwayActive] = useState<boolean>(true);

  useEffect(() => {
    fetchModeratedContent();
  }, []);

  const fetchModeratedContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/moderation');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check if the response has the expected structure
      if (!result.success) {
        throw new Error(result.error || 'Unknown error occurred');
      }
      
      // Check if Pathway was used based on the message
      setIsPathwayActive(result.message?.includes('Pathway') || false);
      
      // Make sure data exists and is an array before setting state
      if (!result.data || !Array.isArray(result.data)) {
        setModeratedContent([]);
        setError('No moderated content available');
      } else {
        setModeratedContent(result.data);
        setError(null);
      }
    } catch (err) {
      setError(`Failed to load moderated content: ${(err as Error).message}`);
      setModeratedContent([]); // Set empty array to prevent filter errors
    } finally {
      setLoading(false);
    }
  };

  // Sort function
  const sortContent = (a: ModeratedItem, b: ModeratedItem) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === 'severity') {
      const severityA = a.severity_score || (a.moderation_result.flagged ? 50 : 0);
      const severityB = b.severity_score || (b.moderation_result.flagged ? 50 : 0);
      return severityB - severityA;
    }
    return 0;
  };

  // Filter and sort content
  const processedContent = moderatedContent && Array.isArray(moderatedContent) 
    ? moderatedContent
        .filter((item) => {
          if (filterBy === 'all') return true;
          if (filterBy === 'flagged') return item.moderation_result.flagged;
          if (filterBy === 'safe') return !item.moderation_result.flagged;
          return true;
        })
        .sort(sortContent)
    : [];

  const getContentTypeLabel = (type: 'stride' | 'post'): string => {
    return type === 'stride' ? 'Stride (Reel)' : 'Post';
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  const getSeverityLevel = (item: ModeratedItem): 'safe' | 'low' | 'medium' | 'high' => {
    if (!item.moderation_result.flagged) return 'safe';
    
    // If we have a severity score from Pathway
    if (typeof item.severity_score === 'number') {
      if (item.severity_score > 75) return 'high';
      if (item.severity_score > 50) return 'medium';
      if (item.severity_score > 25) return 'low';
      return 'safe';
    }
    
    // Fallback to category-based severity
    const highRiskCategories = ['hate', 'sexual', 'violence', 'self-harm'];
    const mediumRiskCategories = ['harassment', 'offensive'];
    
    for (const category of highRiskCategories) {
      if (item.moderation_result.categories?.[category]) return 'high';
    }
    
    for (const category of mediumRiskCategories) {
      if (item.moderation_result.categories?.[category]) return 'medium';
    }
    
    return 'low';
  };

  const getSeverityClass = (severity: 'safe' | 'low' | 'medium' | 'high'): string => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low':
        return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'safe':
      default:
        return 'bg-green-100 border-green-500 text-green-800';
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">
          Content Moderation Dashboard
          {isPathwayActive && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Pathway Powered</span>
          )}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-2">
          <select 
            className="border text-black rounded p-2"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as 'all' | 'flagged' | 'safe')}
          >
            <option value="all">All Content</option>
            <option value="flagged">Flagged Content</option>
            <option value="safe">Safe Content</option>
          </select>
          
          <select 
            className="border text-black rounded p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'severity')}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="severity">Severity</option>
          </select>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={fetchModeratedContent}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : processedContent.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {error ? 'Error loading content' : 'No content available to display'}
        </div>
      ) : (
        <div className="grid gap-6">
          {processedContent.map((item) => {
            const severity = getSeverityLevel(item);
            const severityClass = getSeverityClass(severity);
            
            return (
              <div key={item.id} className={`border p-4 rounded-lg ${severityClass}`}>
                <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                  <div className="mb-2 md:mb-0">
                    <span className="inline-block px-2 py-1 text-sm rounded bg-gray-200 text-gray-800 mr-2">
                      {getContentTypeLabel(item.type)}
                    </span>
                    <span className="text-sm text-gray-600">{formatDate(item.created_at)}</span>
                    
                    {item.author_id && (
                      <span className="text-sm text-gray-600 ml-2">
                        Author: {item.author_id}
                      </span>
                    )}
                    
                    {item.processed_at && (
                      <div className="text-xs text-gray-500 mt-1">
                        Processed: {formatDate(item.processed_at)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {typeof item.severity_score === 'number' && (
                      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-800 text-sm rounded mr-2">
                        Score: {item.severity_score.toFixed(1)}
                      </span>
                    )}
                    
                    <span className={`inline-block px-3 py-1 ${item.moderation_result.flagged ? 'bg-red-500' : 'bg-green-500'} text-white text-sm font-semibold rounded-full`}>
                      {item.moderation_result.flagged ? 'Flagged' : 'Safe'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className="font-semibold text-lg mb-2">Content:</h3>
                  <p className="bg-white bg-opacity-50 p-3 rounded">{item.content}</p>
                </div>
                
                {item.moderation_result.flagged && (
                  <div className="mt-3">
                    <h3 className="font-semibold text-sm">Reason:</h3>
                    <p className="text-sm">{item.moderation_result.message}</p>
                    
                    {item.moderation_result.categories && Object.keys(item.moderation_result.categories).length > 0 && (
                      <div className="mt-2">
                        <h3 className="font-semibold text-sm">Flagged Categories:</h3>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {Object.entries(item.moderation_result.categories).map(([category, isFlagged]) => 
                            isFlagged && (
                              <span key={category} className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded-full">
                                {category}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                    
                    {item.moderation_result.confidence_scores && (
                      <div className="mt-2">
                        <h3 className="font-semibold text-xs">Confidence Scores:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-1">
                          {Object.entries(item.moderation_result.confidence_scores)
                            .sort(([_, scoreA], [__, scoreB]) => scoreB - scoreA)
                            .slice(0, 4)
                            .map(([category, score]) => (
                              <div key={category} className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${score > 0.5 ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${score * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs ml-1">{category.slice(0, 8)}: {(score * 100).toFixed(0)}%</span>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {item.moderation_result.error && (
                  <div className="mt-2 text-red-600 text-sm">
                    Error: {item.moderation_result.error}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
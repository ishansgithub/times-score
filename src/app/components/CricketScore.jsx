'use client'

import React, { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=10812d1c-bf92-4d8d-8f06-eeae16c1e80d"
      );
      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const handleBtn = () => {
    setSearch(inputData);
    getData();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBtn();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4">
        <div className="pt-12 pb-8 text-center">
          <h1 className="text-4xl font-light text-white tracking-wide mb-2 font-serif">CRICKET LIVE</h1>
          <div className="flex items-center justify-center gap-4 text-white/70">
            <button
              onClick={getData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 text-sm font-light hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search matches..."
              onChange={handleInput}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 pl-12 bg-black border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {isLoading ? (
            <div className="col-span-full text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
            </div>
          ) : data && data.length > 0 ? (
            data.map((curVal, index) => {
              if (curVal.status !== "Match not started") {
                if (
                  search === "" ||
                  curVal.series?.toLowerCase().includes(search.toLowerCase()) ||
                  curVal.t1?.toLowerCase().includes(search.toLowerCase()) ||
                  curVal.t2?.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <div 
                      key={index} 
                      className="bg-black rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-light text-white/90 tracking-wide">{curVal.series}</h3>
                        <p className="text-xs text-white/60 mt-1 font-normal">{curVal.matchType}</p>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="flex-1 text-center">
                            <div className="w-16 h-16 mx-auto bg-black border border-white/10 p-2 mb-3">
                              <img 
                                src={curVal.t1img} 
                                className="w-full h-full object-contain" 
                                alt={curVal.t1}
                                onError={(e) => {
                                  e.target.src = '/placeholder-team.png'
                                }}
                              />
                            </div>
                            <p className="font-light text-white/80 text-sm mb-1">{curVal.t1}</p>
                            <p className="text-lg text-white font-light">{curVal.t1s}</p>
                          </div>
                          
                          <div className="px-4">
                            <span className="text-white/40 text-xl font-light">vs</span>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <div className="w-16 h-16 mx-auto bg-black border border-white/10 p-2 mb-3">
                              <img 
                                src={curVal.t2img} 
                                className="w-full h-full object-contain" 
                                alt={curVal.t2}
                                onError={(e) => {
                                  e.target.src = '/placeholder-team.png'
                                }}
                              />
                            </div>
                            <p className="font-light text-white/80 text-sm mb-1">{curVal.t2}</p>
                            <p className="text-lg text-white font-light">{curVal.t2s}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <p className="text-sm text-white/70 font-light text-center">
                            {curVal.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-white/60 font-light">No matches found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CricketScore;
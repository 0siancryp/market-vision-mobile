import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react";
// Import the hook and interface for recent closed trades
import { useRecentClosedTrades, RecentClosedTrade as ApiRecentClosedTrade } from "@/hooks/useBotData"; 

const RecentTrades = () => {
  // Fetch data using the hook, e.g., get the last 5 trades
  const { data: trades, isLoading, error } = useRecentClosedTrades(5); // Fetches last 5 trades

  // Helper to determine if a trade was profitable based on its PNL string
  const isRecentTradeProfitable = (pnlGbpString: string | undefined): boolean => {
    if (!pnlGbpString) return false;
    // Remove £, +, and check if the remaining number is positive (strictly > 0 for profit)
    const numericValue = parseFloat(pnlGbpString.replace('£', '').replace('+', ''));
    return !isNaN(numericValue) && numericValue > 0; 
  };
  
  // Helper to determine if a trade was a loss
  const isRecentTradeLoss = (pnlGbpString: string | undefined): boolean => {
    if (!pnlGbpString) return false;
    const numericValue = parseFloat(pnlGbpString.replace('£', '').replace('+', ''));
    return !isNaN(numericValue) && numericValue < 0;
  };


  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" /> Recent Trades
          </CardTitle>
          <CardDescription className="text-slate-400">Loading recently closed positions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, index) => ( // Show 3 skeleton loaders
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="h-5 bg-slate-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" /> Recent Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-red-400 py-8">
            <AlertCircle className="w-5 h-5 mr-2" />
            {/* Display the actual error message */}
            Failed to load recent trades: {error.message || "Unknown error"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Recent Trades
        </CardTitle>
        <CardDescription className="text-slate-400">
          Recently closed trading positions ({trades?.length || 0} shown)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trades && trades.length > 0 ? (
            trades.map((trade: ApiRecentClosedTrade, index: number) => { // Use ApiRecentClosedTrade type
              const profitable = isRecentTradeProfitable(trade.pnl_gbp_str);
              const loss = isRecentTradeLoss(trade.pnl_gbp_str); // Check for loss
              return (
              // Using a combination of fields for a more stable key
              <div key={`${trade.coin_name}-${trade.time_ago}-${index}`} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-purple-400/20 text-purple-400 border-purple-400/30">
                      {trade.coin_name} {/* Use coin_name from API */}
                    </Badge>
                    <Badge variant="outline" className="bg-orange-400/20 text-orange-400 border-orange-400/30">
                      {trade.side} {/* API provides 'SELL' for closed trades */}
                    </Badge>
                  </div>
                  <span className="text-xs text-slate-400">{trade.time_ago}</span> {/* API provides time_ago */}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-400">Size: </span>
                    <span className="text-white font-medium">{trade.size}</span>
                    <span className="text-slate-400 ml-3">Entry: </span>
                    <span className="text-white font-medium">{trade.entry_price_gbp}</span>
                    <span className="text-slate-400 ml-3">Exit: </span>
                    <span className="text-white font-medium">{trade.exit_price_gbp}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-600">
                  <div className="flex items-center gap-2">
                    {profitable ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : loss ? ( // Check if it's a loss
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : ( // Neither profit nor loss (e.g. PNL is 0 or not determinable)
                      <Clock className="w-4 h-4 text-gray-400" /> // Or some other neutral icon
                    )}
                    <span className={`font-medium ${profitable ? 'text-green-400' : loss ? 'text-red-400' : 'text-gray-400'}`}>
                      {trade.pnl_gbp_str} {/* Use pnl_gbp_str from API */}
                    </span>
                  </div>
                  <span className={`text-sm ${profitable ? 'text-green-400' : loss ? 'text-red-400' : 'text-gray-400'}`}>
                    {trade.pnl_percentage_str} {/* Use pnl_percentage_str from API */}
                  </span>
                </div>
              </div>
            )})
          ) : (
            <div className="text-center text-slate-400 py-8">
              No recent trades available.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTrades;

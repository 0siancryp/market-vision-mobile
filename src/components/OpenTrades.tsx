import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Button and X are for a close functionality not yet implemented by API
// import { Button } from "@/components/ui/button"; 
// import { X } from "lucide-react"; 
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
// Ensure this path is correct and OpenTrade matches the API response structure
import { useOpenTrades, OpenTrade as ApiOpenTrade } from "@/hooks/useBotData"; 

const OpenTrades = () => {
  const { data: trades, isLoading, error } = useOpenTrades(); // trades should be ApiOpenTrade[]

  // Helper to determine if a trade is profitable based on its PNL string
  const isTradeProfitable = (pnlGbpString: string | undefined): boolean => {
    if (!pnlGbpString) return false;
    // Remove £, +, and check if the remaining number is positive or zero
    const numericValue = parseFloat(pnlGbpString.replace('£', '').replace('+', ''));
    return !isNaN(numericValue) && numericValue >= 0;
  };

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Open Trades
          </CardTitle>
          <CardDescription className="text-slate-400">
            Loading active paper trading positions...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 animate-pulse">
                <div className="h-6 bg-slate-600 rounded w-3/4 mb-3"></div>
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
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Open Trades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center text-red-400 py-8">
            <AlertCircle className="w-5 h-5 mr-2" />
            {/* Display the actual error message */}
            Failed to load open trades: {error.message || "Unknown error"}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Open Trades
        </CardTitle>
        <CardDescription className="text-slate-400">
          Currently active paper trading positions ({trades?.length || 0} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades && trades.length > 0 ? (
            trades.map((trade: ApiOpenTrade, index: number) => { // Use ApiOpenTrade type
              const profitable = isTradeProfitable(trade.pnl_gbp);
              return (
              // Using a combination of fields for a more stable key, or index if all else fails
              <div key={`${trade.coin_symbol}-${trade.entry_price_gbp}-${index}`} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                      {trade.coin_name} {/* Use coin_name from API */}
                    </Badge>
                    {/* Open trades from your bot are BUYs. The 'type' is not explicitly in ApiOpenTrade from /open-trades endpoint */}
                    <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400/30">
                      BUY
                    </Badge>
                  </div>
                  {/* Close button functionality is not yet implemented in the API
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </Button> 
                  */}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Size</p>
                    <p className="text-white font-medium">{trade.size}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Entry Price</p>
                    <p className="text-white font-medium">{trade.entry_price_gbp}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Current Price</p>
                    <p className="text-white font-medium">{trade.current_price_gbp}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                  <div className="flex items-center gap-2">
                    {profitable ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`font-medium ${profitable ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl_gbp}
                    </span>
                  </div>
                  <span className={`text-sm ${profitable ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl_percentage}
                  </span>
                </div>
                 <div className="mt-2 text-xs text-slate-500">
                    Trailing Stop: {trade.trailing_stop_gbp}
                </div>
              </div>
            )})
          ) : (
            <div className="text-center text-slate-400 py-8">
              No open trades available.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTrades;

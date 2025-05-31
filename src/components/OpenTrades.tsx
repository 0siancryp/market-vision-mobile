
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, X, AlertCircle } from "lucide-react";
import { useOpenTrades } from "@/hooks/useBotData";

const OpenTrades = () => {
  const { data: trades, isLoading, error } = useOpenTrades();

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Open Trades
          </CardTitle>
          <CardDescription className="text-slate-400">
            Currently active paper trading positions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 animate-pulse">
                <div className="h-6 bg-slate-600 rounded mb-3"></div>
                <div className="h-4 bg-slate-600 rounded mb-2"></div>
                <div className="h-4 bg-slate-600 rounded"></div>
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
            Failed to load open trades
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
          Currently active paper trading positions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades && trades.length > 0 ? (
            trades.map((trade) => (
              <div key={trade.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                      {trade.coin}
                    </Badge>
                    <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400/30">
                      {trade.type}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Size</p>
                    <p className="text-white font-medium">{trade.size}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Entry Price</p>
                    <p className="text-white font-medium">{trade.entry_price}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Current Price</p>
                    <p className="text-white font-medium">{trade.current_price}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                  <div className="flex items-center gap-2">
                    {trade.profitable ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`font-medium ${trade.profitable ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pnl}
                    </span>
                  </div>
                  <span className={`text-sm ${trade.profitable ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl_percent}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-8">
              No open trades available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTrades;

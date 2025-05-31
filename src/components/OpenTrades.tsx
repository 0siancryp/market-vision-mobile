
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, X } from "lucide-react";

const OpenTrades = () => {
  const trades = [
    {
      id: 1,
      coin: "BTC-USD",
      type: "BUY",
      size: "0.025",
      entryPrice: "£31,245.67",
      currentPrice: "£32,180.43",
      pnl: "+£23.37",
      pnlPercent: "+3.0%",
      profitable: true
    },
    {
      id: 2,
      coin: "ETH-USD",
      type: "BUY",
      size: "0.5",
      entryPrice: "£1,847.23",
      currentPrice: "£1,832.18",
      pnl: "-£7.53",
      pnlPercent: "-0.8%",
      profitable: false
    },
    {
      id: 3,
      coin: "SOL-USD",
      type: "BUY",
      size: "5.0",
      entryPrice: "£87.64",
      currentPrice: "£91.23",
      pnl: "+£17.95",
      pnlPercent: "+4.1%",
      profitable: true
    },
    {
      id: 4,
      coin: "ADA-USD",
      type: "BUY",
      size: "100",
      entryPrice: "£0.342",
      currentPrice: "£0.338",
      pnl: "-£0.40",
      pnlPercent: "-1.2%",
      profitable: false
    }
  ];

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
          {trades.map((trade) => (
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
                  <p className="text-white font-medium">{trade.entryPrice}</p>
                </div>
                <div>
                  <p className="text-slate-400">Current Price</p>
                  <p className="text-white font-medium">{trade.currentPrice}</p>
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
                  {trade.pnlPercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTrades;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

const RecentTrades = () => {
  const trades = [
    {
      id: 1,
      coin: "BTC-USD",
      type: "SELL",
      size: "0.01",
      entryPrice: "£30,850.23",
      exitPrice: "£31,420.67",
      pnl: "+£5.70",
      pnlPercent: "+1.8%",
      profitable: true,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      coin: "ETH-USD",
      type: "SELL",
      size: "0.8",
      entryPrice: "£1,865.44",
      exitPrice: "£1,847.23",
      pnl: "-£14.57",
      pnlPercent: "-1.0%",
      profitable: false,
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      coin: "SOL-USD",
      type: "SELL",
      size: "3.0",
      entryPrice: "£82.15",
      exitPrice: "£89.32",
      pnl: "+£21.51",
      pnlPercent: "+8.7%",
      profitable: true,
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      coin: "AVAX-USD",
      type: "SELL",
      size: "12",
      entryPrice: "£23.67",
      exitPrice: "£22.94",
      pnl: "-£8.76",
      pnlPercent: "-3.1%",
      profitable: false,
      timestamp: "8 hours ago"
    },
    {
      id: 5,
      coin: "DOT-USD",
      type: "SELL",
      size: "15",
      entryPrice: "£4.23",
      exitPrice: "£4.78",
      pnl: "+£8.25",
      pnlPercent: "+13.0%",
      profitable: true,
      timestamp: "12 hours ago"
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400" />
          Recent Trades
        </CardTitle>
        <CardDescription className="text-slate-400">
          Recently closed trading positions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-purple-400/20 text-purple-400 border-purple-400/30">
                    {trade.coin}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-400/20 text-orange-400 border-orange-400/30">
                    {trade.type}
                  </Badge>
                </div>
                <span className="text-xs text-slate-400">{trade.timestamp}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-slate-400">Size: </span>
                  <span className="text-white font-medium">{trade.size}</span>
                  <span className="text-slate-400 ml-3">Entry: </span>
                  <span className="text-white font-medium">{trade.entryPrice}</span>
                  <span className="text-slate-400 ml-3">Exit: </span>
                  <span className="text-white font-medium">{trade.exitPrice}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-600">
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

export default RecentTrades;

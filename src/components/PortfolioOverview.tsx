
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { useBotStatus } from "@/hooks/useBotData";

const PortfolioOverview = () => {
  const { data: botStatus, isLoading } = useBotStatus();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-600 rounded mb-2"></div>
                <div className="h-8 bg-slate-600 rounded mb-2"></div>
                <div className="h-4 bg-slate-600 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Total P/L",
      value: botStatus?.total_pnl ? `£${botStatus.total_pnl.toFixed(2)}` : "£0.00",
      change: botStatus?.total_pnl ? (botStatus.total_pnl > 0 ? `+${Math.abs(botStatus.total_pnl / 100 * 5).toFixed(1)}%` : `-${Math.abs(botStatus.total_pnl / 100 * 5).toFixed(1)}%`) : "0%",
      trend: botStatus?.total_pnl ? (botStatus.total_pnl > 0 ? "up" : "down") : "neutral",
      icon: DollarSign,
      color: botStatus?.total_pnl ? (botStatus.total_pnl > 0 ? "text-green-400" : "text-red-400") : "text-gray-400"
    },
    {
      title: "Open Trades",
      value: botStatus?.open_trades_count?.toString() || "0",
      change: "Active positions",
      trend: "neutral",
      icon: Activity,
      color: "text-blue-400"
    },
    {
      title: "Today's P/L",
      value: botStatus?.daily_pnl ? `£${botStatus.daily_pnl.toFixed(2)}` : "£0.00",
      change: botStatus?.daily_pnl ? (botStatus.daily_pnl > 0 ? `+${Math.abs(botStatus.daily_pnl / 100 * 2).toFixed(1)}%` : `-${Math.abs(botStatus.daily_pnl / 100 * 2).toFixed(1)}%`) : "0%",
      trend: botStatus?.daily_pnl ? (botStatus.daily_pnl > 0 ? "up" : "down") : "neutral",
      icon: TrendingUp,
      color: botStatus?.daily_pnl ? (botStatus.daily_pnl > 0 ? "text-green-400" : "text-red-400") : "text-gray-400"
    },
    {
      title: "Win Rate",
      value: botStatus?.win_rate ? `${botStatus.win_rate.toFixed(0)}%` : "0%",
      change: "Recent trades",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-2">{metric.title}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className={`text-sm ${metric.color} mt-1`}>
                  {metric.change}
                </p>
              </div>
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PortfolioOverview;

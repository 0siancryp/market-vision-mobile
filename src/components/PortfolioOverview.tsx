
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

const PortfolioOverview = () => {
  const metrics = [
    {
      title: "Total P/L",
      value: "£247.83",
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Open Trades",
      value: "12",
      change: "4 BTC, 3 ETH, 5 others",
      trend: "neutral",
      icon: Activity,
      color: "text-blue-400"
    },
    {
      title: "Today's P/L",
      value: "£34.12",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Win Rate",
      value: "67%",
      change: "Last 30 trades",
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

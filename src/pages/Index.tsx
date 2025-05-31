
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Clock } from "lucide-react";
import BotStatus from "@/components/BotStatus";
import PortfolioOverview from "@/components/PortfolioOverview";
import OpenTrades from "@/components/OpenTrades";
import RecentTrades from "@/components/RecentTrades";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Crypto Trading Bot
          </h1>
          <p className="text-slate-400 text-lg">
            Paper Trading Dashboard & Monitoring
          </p>
        </div>

        {/* Bot Status Section */}
        <div className="mb-8">
          <BotStatus />
        </div>

        {/* Portfolio Overview */}
        <div className="mb-8">
          <PortfolioOverview />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Open Trades */}
          <div>
            <OpenTrades />
          </div>

          {/* Recent Trades */}
          <div>
            <RecentTrades />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700">
            <Activity className="w-4 h-4 mr-2" />
            Bot Logs
          </Button>
          <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700">
            <Clock className="w-4 h-4 mr-2" />
            Daily Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

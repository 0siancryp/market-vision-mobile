import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity, Percent, AlertCircle } from "lucide-react"; // Added Percent and AlertCircle
// Import the correct hook for summary metrics
import { useSummaryMetrics, SummaryMetrics } from "@/hooks/useBotData"; // Assuming SummaryMetrics interface is also exported

const PortfolioOverview = () => {
  // Use the useSummaryMetrics hook
  const { data: summaryMetrics, isLoading, error } = useSummaryMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-slate-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-600 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
               <div className="flex items-center justify-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-2" />
                {/* Display a generic error for each card or a central error message */}
                Data N/A
              </div>
              <p className="text-xs text-center text-red-400 mt-1">Error: {error.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Helper function to parse P/L string (e.g., "£-81.91", "+£75.69") to a number for logic
  const parsePnlString = (pnlString: string | undefined): number => {
    if (!pnlString) return 0;
    try {
      return parseFloat(pnlString.replace('£', '').replace('+', ''));
    } catch {
      return 0;
    }
  };
  
  // Prepare metrics data using the data from useSummaryMetrics
  // The API returns these values as pre-formatted strings.
  const totalPnlValue = summaryMetrics?.total_pl_gbp_from_closed || "£0.00";
  const todaysPnlValue = summaryMetrics?.todays_pl_gbp || "£0.00";
  
  const totalPnlNumeric = parsePnlString(totalPnlValue);
  const todaysPnlNumeric = parsePnlString(todaysPnlValue);

  const metrics = [
    {
      title: "Total P/L (Closed Trades)", // From all closed trades in current state
      value: totalPnlValue,
      // The 'change' percentage is complex as it needs a previous period.
      // For now, let's use a static description or remove if not meaningful.
      change: "Based on loaded closed trades", 
      trend: totalPnlNumeric >= 0 ? "up" : "down",
      icon: DollarSign,
      color: totalPnlNumeric >= 0 ? "text-green-400" : "text-red-400"
    },
    {
      title: "Open Trades",
      value: summaryMetrics?.open_trades_count?.toString() || "0",
      change: "Active positions",
      trend: "neutral", // Or derive based on change if you track that
      icon: Activity,
      color: "text-blue-400"
    },
    {
      title: "Today's P/L (Closed)",
      value: todaysPnlValue,
      change: "Based on today's closed trades",
      trend: todaysPnlNumeric >= 0 ? "up" : "down",
      icon: todaysPnlNumeric >=0 ? TrendingUp : TrendingDown,
      color: todaysPnlNumeric >= 0 ? "text-green-400" : "text-red-400"
    },
    {
      title: "Win Rate (Today)",
      value: summaryMetrics?.win_rate_today_percentage || "0%",
      change: "Today's closed trades",
      // Win rate trend might be more complex, default to up or neutral
      trend: "up", 
      icon: Percent, // Using Percent icon
      color: "text-green-400" // Assuming win rate is generally positive aspiration
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
                <p className={`text-xs ${metric.color} mt-1`}> {/* Adjusted to use text-xs for 'change' */}
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

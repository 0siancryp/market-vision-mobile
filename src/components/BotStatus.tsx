import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, CheckCircle, AlertCircle } from "lucide-react";
// Ensure this path is correct and useBotStatus returns data according to ApiBotStatus interface
import { useBotStatus, ApiBotStatus } from "@/hooks/useBotData"; 

const BotStatus = () => {
  // useBotStatus fetches from /status and its data type should be ApiBotStatus
  const { data: apiStatus, isLoading, error } = useBotStatus();
  
  // Derive a simpler 'isRunning' boolean for UI styling
  // The API returns a more descriptive status string.
  const isRunning = apiStatus?.status?.toLowerCase().includes('running');

  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" /> {/* Changed icon color for consistency */}
            Bot Status
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time monitoring of trading bot operations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-2 text-white">Loading bot status...</span>
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
            <Activity className="w-5 h-5 text-red-400" /> {/* Icon indicating error */}
            Bot Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            {/* Display the actual error message from the hook */}
            Failed to load bot status: {error.message || "Unknown error"}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Determine a display status string and badge class
  let displayStatus = "Unknown";
  let statusBadgeClass = "bg-gray-400/20 text-gray-400 border-gray-400/30";
  if (apiStatus?.status) {
    if (isRunning) {
      displayStatus = "Running";
      statusBadgeClass = "bg-green-400/20 text-green-400 border-green-400/30 animate-pulse";
    } else if (apiStatus.status.toLowerCase().includes('offline')) {
      displayStatus = "Offline";
      statusBadgeClass = "bg-red-400/20 text-red-400 border-red-400/30";
    } else {
      displayStatus = apiStatus.status; // Show the full status if not clearly "Running" or "Offline"
    }
  }


  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="w-5 h-5 {isRunning ? 'text-green-400' : 'text-red-400'}" />
          Bot Status
        </CardTitle>
        <CardDescription className="text-slate-400">
          Real-time monitoring of trading bot operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            {/* Visual indicator for running status */}
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <Badge 
                variant="secondary" 
                className={statusBadgeClass}
              >
                {displayStatus}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Last State Update</p>
              {/* Use the 'last_state_update_friendly' field from ApiBotStatus */}
              <p className="text-white font-medium">{apiStatus?.last_state_update_friendly || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-gray-400" /> {/* Changed to gray as it's N/A */}
            <div>
              <p className="text-sm text-slate-400">Uptime</p>
              {/* Uptime is not currently provided by the /status API endpoint */}
              <p className="text-white font-medium">N/A</p> 
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatus;

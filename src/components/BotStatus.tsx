
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useBotStatus } from "@/hooks/useBotData";

const BotStatus = () => {
  const { data: botStatus, isLoading, error } = useBotStatus();
  
  if (isLoading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
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
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-red-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            Failed to load bot status
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          Bot Status
        </CardTitle>
        <CardDescription className="text-slate-400">
          Real-time monitoring of trading bot operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${botStatus?.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <Badge 
                variant="secondary" 
                className={`${botStatus?.status === 'running' ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-red-400/20 text-red-400 border-red-400/30'}`}
              >
                {botStatus?.status || 'Unknown'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Last Update</p>
              <p className="text-white font-medium">{botStatus?.last_update || 'N/A'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Uptime</p>
              <p className="text-white font-medium">{botStatus?.uptime || 'N/A'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatus;

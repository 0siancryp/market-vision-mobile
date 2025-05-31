
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, CheckCircle } from "lucide-react";

const BotStatus = () => {
  const lastUpdate = new Date().toLocaleTimeString();
  
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
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                Running
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Last Update</p>
              <p className="text-white font-medium">{lastUpdate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Uptime</p>
              <p className="text-white font-medium">23h 42m</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotStatus;

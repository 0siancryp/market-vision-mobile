import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useBotStatus, useSummaryMetrics, useOpenTrades } from "@/hooks/useBotData";

const ApiTest = () => {
  const { data: botStatus, isLoading: statusLoading, error: statusError } = useBotStatus();
  const { data: summaryMetrics, isLoading: metricsLoading, error: metricsError } = useSummaryMetrics();
  const { data: openTrades, isLoading: tradesLoading, error: tradesError } = useOpenTrades();

  const testEndpoints = [
    { name: 'Bot Status', data: botStatus, error: statusError, loading: statusLoading },
    { name: 'Summary Metrics', data: summaryMetrics, error: metricsError, loading: metricsLoading },
    { name: 'Open Trades', data: openTrades, error: tradesError, loading: tradesLoading },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">API Test</h2>
      <div className="space-y-4">
        {testEndpoints.map((endpoint) => (
          <Alert
            key={endpoint.name}
            variant={endpoint.error ? "destructive" : endpoint.loading ? "default" : "success"}
            className="p-4"
          >
            <AlertTitle>{endpoint.name}</AlertTitle>
            <AlertDescription>
              {endpoint.loading ? (
                "Loading..."
              ) : endpoint.error ? (
                `Error: ${endpoint.error.message}`
              ) : (
                <pre className="mt-2 p-2 bg-slate-800 rounded text-sm">
                  {JSON.stringify(endpoint.data, null, 2)}
                </pre>
              )}
            </AlertDescription>
          </Alert>
        ))}
      </div>
      <Button 
        onClick={() => window.location.reload()}
        className="mt-4"
      >
        Refresh Tests
      </Button>
    </div>
  );
};

export default ApiTest;

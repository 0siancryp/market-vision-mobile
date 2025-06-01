import { useQuery } from '@tanstack/react-query';

// This should be your current, working HTTPS ngrok URL
const API_BASE_URL = 'https://fitting-goat-terribly.ngrok-free.app'; // Or your latest ngrok URL

// Interface for the actual response from your /status endpoint
export interface ApiBotStatus {
  status: string; // e.g., "Running (API is up, state file exists)"
  last_state_update_raw_timestamp: number;
  last_state_update_friendly: string; // e.g., "2025-06-01 20:00:00 BST"
  message: string;
}

// Interface for the response from your /summary-metrics endpoint
export interface SummaryMetrics {
  total_pl_gbp_from_closed: string; // e.g., "£-81.91" (P/L from all closed trades in state)
  open_trades_count: number;       // e.g., 5
  todays_pl_gbp: string;           // e.g., "£75.69"
  win_rate_today_percentage: string; // e.g., "60%"
}

// Interface for individual open trades, matching your API's /open-trades response
export interface OpenTrade {
  coin_name: string;         // e.g., "Bitcoin"
  coin_symbol: string;       // e.g., "BTC-USD"
  size: string;              // e.g., "0.01"
  entry_price_gbp: string;   // e.g., "£78107.51" (per unit)
  current_price_gbp: string; // e.g., "£78000.00" or "N/A"
  pnl_gbp: string;           // e.g., "+£10.50"
  pnl_percentage: string;    // e.g., "+0.5%"
  trailing_stop_gbp: string; // e.g., "£77000.00"
  // Fields like 'id', 'type', 'profitable', 'timestamp' were removed
  // as the API doesn't provide them in this structure.
  // 'profitable' can be derived from the pnl_gbp string if needed in the UI.
}

// Hook to fetch basic bot status
export const useBotStatus = () => {
  return useQuery<ApiBotStatus, Error>({ // Specify Error type for error object
    queryKey: ['bot-status'],
    queryFn: async (): Promise<ApiBotStatus> => {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (!response.ok) {
        let errorDetail = `Failed to fetch bot status (HTTP ${response.status})`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) { /* ignore parsing error if response isn't json */ }
        throw new Error(errorDetail);
      }
      return response.json();
    },
    refetchInterval: 15000, // Refetch every 15 seconds
  });
};

// NEW Hook to fetch summary metrics for the dashboard's top row
export const useSummaryMetrics = () => {
  return useQuery<SummaryMetrics, Error>({
    queryKey: ['summary-metrics'],
    queryFn: async (): Promise<SummaryMetrics> => {
      const response = await fetch(`${API_BASE_URL}/summary-metrics`);
      if (!response.ok) {
        let errorDetail = `Failed to fetch summary metrics (HTTP ${response.status})`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) { /* ignore parsing error if response isn't json */ }
        throw new Error(errorDetail);
      }
      return response.json();
    },
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

// Hook to fetch the list of open trades
export const useOpenTrades = () => {
  return useQuery<OpenTrade[], Error>({ // Expects an array of OpenTrade
    queryKey: ['open-trades'],
    queryFn: async (): Promise<OpenTrade[]> => {
      const response = await fetch(`${API_BASE_URL}/open-trades`);
      if (!response.ok) {
        let errorDetail = `Failed to fetch open trades (HTTP ${response.status})`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) { /* ignore parsing error if response isn't json */ }
        throw new Error(errorDetail);
      }
      return response.json(); // API should return a flat list of OpenTrade compatible objects
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

// You might also want a hook for recent closed trades if your dashboard displays them dynamically
// from an API endpoint like /recent-closed-trades
export interface RecentClosedTrade {
  coin_name: string;
  side: "SELL"; // Always SELL for closed paper trades in your bot's logic
  size: string;
  entry_price_gbp: string;
  exit_price_gbp: string;
  pnl_gbp_str: string;
  pnl_percentage_str: string;
  time_ago: string;
}

export const useRecentClosedTrades = (limit: number = 5) => {
  return useQuery<RecentClosedTrade[], Error>({
    queryKey: ['recent-closed-trades', limit],
    queryFn: async (): Promise<RecentClosedTrade[]> => {
      const response = await fetch(`${API_BASE_URL}/recent-closed-trades?limit=${limit}`);
      if (!response.ok) {
        let errorDetail = `Failed to fetch recent closed trades (HTTP ${response.status})`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) { /* ignore parsing error if response isn't json */ }
        throw new Error(errorDetail);
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds or as needed
  });
};

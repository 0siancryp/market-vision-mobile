
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'http://56.228.42.105:8000';

export interface BotStatus {
  status: string;
  last_update: string;
  uptime: string;
  total_pnl: number;
  daily_pnl: number;
  open_trades_count: number;
  win_rate: number;
}

export interface OpenTrade {
  id: string;
  coin: string;
  type: 'BUY' | 'SELL';
  size: string;
  entry_price: string;
  current_price: string;
  pnl: string;
  pnl_percent: string;
  profitable: boolean;
  timestamp: string;
}

export const useBotStatus = () => {
  return useQuery({
    queryKey: ['bot-status'],
    queryFn: async (): Promise<BotStatus> => {
      const response = await fetch(`${API_BASE_URL}/status`);
      if (!response.ok) {
        throw new Error('Failed to fetch bot status');
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

export const useOpenTrades = () => {
  return useQuery({
    queryKey: ['open-trades'],
    queryFn: async (): Promise<OpenTrade[]> => {
      const response = await fetch(`${API_BASE_URL}/open-trades`);
      if (!response.ok) {
        throw new Error('Failed to fetch open trades');
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};

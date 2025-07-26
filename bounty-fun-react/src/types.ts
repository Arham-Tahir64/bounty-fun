export type BountyData = {
    id: string;
    title: string;
    description: string;
    reward: number;
    status: 'open' | 'closed';
    timeLeft: string;
    category: string;
    author: string;
    submissions?: number;
  };
  
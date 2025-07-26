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
  
  export type CreateBountyData = {
    title: string;
    description: string;
    reward: number;
    deadline: string;
    category: string;
    files: File[];
  };
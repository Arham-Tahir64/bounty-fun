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

  // Interface for a user profile
export type UserProfile = {
    walletAddress: string; // The public key of the user's wallet
    displayName: string;
    bio: string;
    profilePicture: string; // URL or base64 string of the profile picture
    createdAt: number; // Timestamp of profile creation
    updatedAt: number; // Timestamp of last update
  }
  
  // Interface for profile form data before sending to backend
  export type ProfileFormData = {
    displayName: string;
    bio: string;
    profilePicture: string; // Base64 string for upload
  }
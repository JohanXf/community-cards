// Twitter API integration for checking user eligibility
// This will be used with Supabase Edge Functions for secure API calls

export interface TwitterUser {
  id: string;
  username: string;
  name: string;
  followers_count: number;
  profile_image_url?: string;
  description?: string;
  verified?: boolean;
}

export interface TwitterApiResponse {
  success: boolean;
  user?: TwitterUser;
  error?: string;
}

// Client-side function to check Twitter user eligibility
export async function checkTwitterEligibility(username: string): Promise<TwitterApiResponse> {
  try {
    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '');
    
    // For now, return mock data - will be replaced with actual API call
    // In production, this would call a Supabase Edge Function
    const mockResponse = await new Promise<TwitterApiResponse>((resolve) => {
      setTimeout(() => {
        // Simulate API call delay
        const mockFollowers = Math.floor(Math.random() * 10000) + 500;
        resolve({
          success: true,
          user: {
            id: '123456789',
            username: cleanUsername,
            name: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
            followers_count: mockFollowers,
            profile_image_url: `https://unavatar.io/twitter/${cleanUsername}`,
            description: 'Community contributor and developer',
            verified: mockFollowers > 5000
          }
        });
      }, 1500); // Simulate network delay
    });

    return mockResponse;
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch Twitter user data'
    };
  }
}

// Function to determine role from Twitter bio
export function getRoleFromBio(bio: string = ''): string {
  const lower = bio.toLowerCase();
  if (lower.includes('develop') || lower.includes('engineer') || lower.includes('programmer')) return 'Developer';
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return 'Designer';
  if (lower.includes('content') || lower.includes('creator') || lower.includes('writer')) return 'Content Creator';
  if (lower.includes('teach') || lower.includes('educator') || lower.includes('coach')) return 'Educator';
  if (lower.includes('community') || lower.includes('manager') || lower.includes('advocate')) return 'Community Builder';
  if (lower.includes('marketing') || lower.includes('growth') || lower.includes('brand')) return 'Marketer';
  return 'Community Member';
}
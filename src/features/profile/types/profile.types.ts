export type ProfileThemePreference = 'LIGHT' | 'DARK' | 'SYSTEM';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'LOCAL' | 'GOOGLE';
  theme: ProfileThemePreference;
  emailNotifications: boolean;
  weeklySummary: boolean;
  createdAt: string;
}

export interface UpdateProfilePayload {
  name: string;
  avatarUrl?: string;
  theme?: ProfileThemePreference;
  emailNotifications?: boolean;
  weeklySummary?: boolean;
  currentPassword?: string;
  newPassword?: string;
}


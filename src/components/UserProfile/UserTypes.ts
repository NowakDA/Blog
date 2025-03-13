export interface User {
  email: string;
  username: string;
  bio?: string;
  image?: string;
}

export interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface UserResponse {
  user: {
    email: string;
    username: string;
    bio?: string;
    image?: string;
    token: string;
  };
}

export interface UpdateUserRequest {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  password?: string;
}

// export interface UpdateUserResponse extends UserResponse {}

export interface UserProfileFormValues {
  username: string;
  email: string;
  password?: string;
  bio?: string;
  image?: string;
}

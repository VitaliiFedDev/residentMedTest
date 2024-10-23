import { sendGraphQLRequest } from "./apiService";

interface UserData {
  email: string;
  username: string;
}

interface AuthResponse {
  user: UserData;
}

export const register = async (email: string, password: string, username: string): Promise<AuthResponse> => {
  const mutation = `
    mutation Register($createUserInput: CreateUserInput!) {
      register(createUserInput: $createUserInput) {
        email
        username
      }
    }
  `;

  const variables = {
    createUserInput: {
      email,
      password,
      username
    }
  };

  try {
    const data = await sendGraphQLRequest(mutation, variables);
    return { user: data.register };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const mutation = `
    mutation Login($loginUserInput: LoginUserInput!) {
      login(loginUserInput: $loginUserInput) {
      id
        email
        username
      }
    }
  `;

  const variables = {
    loginUserInput: {
      email,
      password
    }
  };

  try {
    const data = await sendGraphQLRequest(mutation, variables);
    return { user: data.login };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

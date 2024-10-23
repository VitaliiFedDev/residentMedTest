import { sendGraphQLRequest } from "./apiService";

interface UserData {
    id: number;
    email: string;
    username: string;
}

interface UserDataResponse {
    userData: UserData;
}

export const createUserData = async (yearOfStudy: string, specialization: string, state: string, city: string, radius: number, userId: number): Promise<UserDataResponse> => {
    const mutation = `
      mutation CreateUserData($createUserDataInput: CreateUserDataInput!) {
        createUserData(createUserDataInput: $createUserDataInput) {
          id
          email
          username
        }
      }
    `;
  
    const variables = {
        createUserDataInput: {   
            yearOfStudy,
            specialization,
            state,
            city,
            radius,
            userId
        }
    };
  
    try {
      const data = await sendGraphQLRequest(mutation, variables);
      return { userData: data.createUserData };
    } catch (error) {
      console.error('Create user data error:', error);
      throw error;
    }
};
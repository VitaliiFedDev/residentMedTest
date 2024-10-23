const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://residentmedtest-api.onrender.com/graphql';
 
 export async function sendGraphQLRequest(query: string, variables?: any): Promise<any> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });

    const data = await response.json();
  
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
  
    return data.data;
  }
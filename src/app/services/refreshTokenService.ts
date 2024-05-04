"use server";
interface AuthenticationResponseDTO {
  token: string;
  refreshToken: string;
}


export const refreshToken = async (authenticationResponseDTO: AuthenticationResponseDTO) => {
  try {
    const url = 'https://rombiserv.azurewebsites.net/api/User/refresh-token';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(authenticationResponseDTO),
    });

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      const textResponse = await response.text();
      console.error("Server response:", textResponse);
      throw new Error("Unable to refresh token.");
    }
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      if (responseData && Object.keys(responseData).length > 0) {
        return { responseData };
      } else {
        console.error("Empty response from server");
      }
    } else {
      console.error("HTTP error:", response.status);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
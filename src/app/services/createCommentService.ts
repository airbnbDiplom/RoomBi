export interface GuestComments {
    id: number;
    guestIdUser: number;
    apartmentId: number;
    comment?: string;
    dateTime: string;
    rating: number;
  }
  
  export const postGuestComment = async (commentData: GuestComments, token: string) => {
    try {
      const url = "https://roombiserver.azurewebsites.net/api/Chat/guestComments";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(commentData),
      });
  
      if (!response.ok) throw new Error("Unable to post comment.");
      if (response.ok) {
        const responseData = await response.text(); 
        console.log('responseData', responseData);
        if (responseData === "Ok") {
          console.log("Comment posted successfully");
        } else {
          console.error("Unexpected response from server");
        }
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
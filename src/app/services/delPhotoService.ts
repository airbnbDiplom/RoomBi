export const delAvatar = async (fileName: string) => {
  try {
    const url = "https://roombi.space/";
    if (!url) {
      throw new Error("URL is undefined.");
    }

    // Create form data
    const formData = new FormData();
    formData.append('deleteFileName', fileName);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("HTTP error:", response.status);
      throw new Error("Unable to delete avatar.");
    }

    const responseData = await response.json();
    console.log("Response data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
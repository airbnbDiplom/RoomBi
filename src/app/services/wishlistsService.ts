"use server";
export const putWishlists = async (id: number, token: string) => {
  try {
    const url = process.env.NEXT_PUT_WISHLISTS_ID;
    console.log("url--1", url);
    if (url) {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      });
      const responseData = await res.json();
      console.log("putWishlists", responseData);
      return responseData;
    }
  } catch {
    return null;
  }
};

"use server";
export const putWishlists = async (id: number, token: string) => {
  try {
    const url = process.env.NEXT_PUT_WISHLISTS_ID;
    if (url) {
      const res = await fetch(url, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(id),
      });
      console.log("res.json() -----", res);
      const data = await res.json();
      const { key } = data;
      return key;
    }
  } catch {
    return null;
  }
};

export const getWishlists = async (token: string) => {
  try {
    const url = process.env.NEXT_GET_WISHLISTS_ID;
    if (!url) {
      throw new Error("Missing NEXT_GET_WISHLISTS_ID in environment variables");
    }
    const res = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("getWishlists - ", data);
    return data;
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return null;
  }
};
export const deleteWishlists = async (id: number) => {
  try {
    const url = process.env.NEXT_DELETE_WISHLISTS_ID;
    if (!url) {
      throw new Error(
        "Missing NEXT_DELETE_WISHLISTS_ID in environment variables"
      );
    }
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete wishlist");
    }
    return true;
  } catch (error) {
    console.error("Error del wish:", error);
    return null;
  }
};

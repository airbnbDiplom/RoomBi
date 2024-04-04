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
      const data = await res.json();
      const { key } = data;
      return key;
    }
  } catch {
    return null;
  }
};
export const putWishlists2 = async (token: string) => {
  try {
    const url = process.env.NEXT_PUT_WISHLISTS_ID;
    if (url) {
      const res = await fetch(url, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // const { key } = data;
      // return key;
    }
  } catch {
    return null;
  }
};
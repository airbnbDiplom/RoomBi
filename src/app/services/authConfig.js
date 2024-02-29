"use server";
export const authLogin = async (email, password, type) => {
  try {
    const url = process.env.NEXT_URL_LOGIN;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        type: type,
      }),
    });

    return res;
  } catch {
    return null;
  }
};

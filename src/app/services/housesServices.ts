"use server";

const getHouses = async () => {
  const url = process.env.NEXT_GET_APARTAMENTS;

  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(url, {
    next: {
      revalidate: 5000,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  return response.json();
};

const getFirstPageServer = async () => {
  const url = process.env.NEXT_GET_FIRST_PAGE;
  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(url, {
    next: {
      revalidate: 5000,
    },
  });
  if (!response.ok) {
    console.error("getFirstPageServer", response);
    throw new Error("Unable to fetch houses.");
  }

  return response.json();
};

export const getApartamentId = async (id: string) => {
  const url = process.env.NEXT_GET_APARTAMENT_ID;
  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(`${url}${id}`, {
    next: {
      revalidate: 5000,
    },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

export const getFirstPage = async () => {
  const response = await getFirstPageServer();
  return response;
};

export const getAllHouses = async () => {
  const response = await getHouses();
  return response;
};

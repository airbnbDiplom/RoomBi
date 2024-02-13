"use server";
const getMarkers = async () => {
  const url = process.env.NEXT_GET_MARCERS;
  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(url, {
    next: {
      revalidate: 500,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  return response.json();
};

export const getAllMarkers = async () => {
  const response = await getMarkers();
  return response;
};

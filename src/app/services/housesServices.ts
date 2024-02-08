import { CardBiProps } from "../type/type";

const getHouses = async () => {
  const url = process.env.NEXT_GET_APARTAMENT;
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

export const getAllHouses = async () => {
  const response = await getHouses();
  return response;
};

export const getHousId = async (id: string) => {
  const response: CardBiProps[] = await getHouses();
  const hous = response.filter((h) => h.id.toString() === id);
  return hous;
};

export const getHousesBySearch = async (search: string) => {
  const response: CardBiProps[] = await getHouses();
  const hous = response.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );
  return hous;
};

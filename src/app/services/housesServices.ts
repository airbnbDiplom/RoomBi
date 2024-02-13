"use server";
import { CardBiProps, FullRentalItem } from "../type/type";

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

export const getMarkerCard = async (id: number): Promise<FullRentalItem> => {
  const url = process.env.NEXT_GET_MARCERS_CARD;

  if (!url) {
    throw new Error("URL is undefined.");
  }
  const response = await fetch(`${url}/${id}`, {
    method: "POST",
    next: {
      revalidate: 500,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  const data = await response.json();
  console.log("data", data);
  return data as FullRentalItem;
};

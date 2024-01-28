export const getAllHouses = async () => {
  const response = await fetch("http://localhost:3000/api/houses", {
    next: {
      revalidate: 10,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  return response.json();
};

export const getHousId = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/houses?house=${id}`, {
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("Unable to fetch houses.");
  console.log("getHousId");
  return response.json();
};

export const getHousesBySearch = async (search: string) => {
  const response = await fetch(`/api/houses?title=${search}`);
  if (!response.ok) throw new Error("Unable to fetch houses.");
  return response.json();
};

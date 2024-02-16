"use server";

const getHouses = async () => {
  const url = process.env.NEXT_GET_APARTAMENTS;

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
// const getFirstPageServer = async () => {
//   const url = process.env.NEXT_GET_FIRST_PAGE;
//   if (!url) {
//     throw new Error("URL is undefined.");
//   }
//   const response = await fetch(url, {
//     next: {
//       revalidate: 500,
//     },
//   });
//   if (!response.ok) throw new Error("Unable to fetch houses.");
//   return response.json();
// };

const fetch = require("node-fetch");

const getFirstPageServer = async () => {
  const url = process.env.NEXT_GET_FIRST_PAGE;
  if (!url) {
    throw new Error("URL is undefined.");
  }

  const timeout = 20000; // Установите время ожидания в миллисекундах (в данном случае 10 секунд)

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      next: {
        revalidate: 5,
      },
    });

    clearTimeout(timeoutId); // Очистите таймер тайм-аута после получения ответа

    if (!response.ok) {
      throw new Error("Unable to fetch houses.");
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId); // Очистите таймер тайм-аута при возникновении ошибки
    throw error;
  }
};
export const getFirstPage = async () => {
  const response = await getFirstPageServer();
  return response;
};

export const getAllHouses = async () => {
  const response = await getHouses();
  return response;
};

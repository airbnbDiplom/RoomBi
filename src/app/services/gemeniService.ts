"use server";
export async function getKey() {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (API_KEY) {
    return API_KEY;
  } else {
    return "";
  }
}

import { jwtDecode } from "jwt-decode";

// Функція для розкодування токена та отримання часу закінчення (exp)
function decodeTokenAndGetExpiration(token: string): number | null {
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp * 1000; // Перетворюємо секунди в мілісекунди
    }
  } catch (error) {
    console.error("Помилка розкодування токена:", error);
  }
  return null;
}

// Функція для періодичної перевірки терміну дії токена
export function checkTokenExpiration(token: string): boolean {
  const expirationTime = decodeTokenAndGetExpiration(token);

  if (expirationTime) {
    const currentTime = Date.now();
    const currentTimeInMinutes = expirationTime / 60000;
    const tokenExpirationInMinutes = currentTime / 60000;
    const y = tokenExpirationInMinutes - currentTimeInMinutes;
    console.log("Час закінчення токена в хвилинах:", tokenExpirationInMinutes);
    console.log("Поточний час в хвилинах:", currentTimeInMinutes);
    console.log("y", y);

    const r = y + 62;
    console.log("r", r);
    if (r < 0) {
      console.log("Токен скоро закінчиться, перезапитайте його");
      return true;
    } else {
      console.log("Токен закінчився");
      return false;
    }
  } else {
    console.error("Не вдалося отримати термін дії токена");
    return false;
  }
}

// Функція для розкодування токена та отримання часу закінчення (exp)
export const decodeTokenGetId = (token: string): number | null => {
  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.Id) {
      return decodedToken.Id;
    }
  } catch (error) {
    console.error("Помилка розкодування токена:", error);
  }
  return null;
};

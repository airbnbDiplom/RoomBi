import { NextResponse } from "next/server";
import { cardData } from "../../tempData/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const house = searchParams.get("house");
  let currentHouses = cardData;

  if (house) {
    currentHouses = cardData.filter((h) => h.id.toString() === house);
  } else if (title) {
    currentHouses = cardData.filter((h) =>
      h.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  return NextResponse.json(currentHouses);
}

export async function POST(req: Request) {
  const body = await req.json();
  const key = process.env.NEXT_KEY;
  return NextResponse.json({ body, key });
}

// export async function GET(req: Request) {
//     return NextResponse.json(cardData);
//   }

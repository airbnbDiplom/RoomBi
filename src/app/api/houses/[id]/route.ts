import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const headersList = headers();
  const type = headersList.get("Content-Type");

  const cookiesList = cookies();
  const cook = cookiesList.get("My_Cookies")?.value;
  const id = params.id;
  // logic delete house
  redirect("/");
  // тест return NextResponse.json({ id,type,cook});
}

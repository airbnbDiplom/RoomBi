import { Metadata } from "next";
import { getHousId } from "../services/housesServices";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params: { id } }: Props) {
  const hous = await getHousId(id);

  return {
    title: hous[0].title,
  };
}

export default async function Hous({ params: { id } }: Props) {
  const hous = await getHousId(id);
  return (
    <>
      <Link href="/">asd</Link>
      <h1>{hous[0].country}</h1>
      <h1>{hous[0].title}</h1>
    </>
  );
}

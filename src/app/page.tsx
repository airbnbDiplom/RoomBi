import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 style={{ color: "red", fontSize: "50px" }}>AIRBNB</h1>
      <Link href="/posts">Posts</Link>
    </main>
  );
}

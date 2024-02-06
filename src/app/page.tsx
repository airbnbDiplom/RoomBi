import { Image } from "react-bootstrap";
import { getAllHouses } from "./services/housesServices";
import { Header } from "./startComponents/header/Header";
import { Main } from "./startComponents/main/Main";
import { Naw } from "./startComponents/naw/Naw";

// export const dynamic = "force-dynamic";

export default async function Home() {
  const cardData = await getAllHouses();
  return (
    <>
      <div
        className="headerBackgroundWhite  sticky-top ps-lg-5 pe-lg-5 ps-sm-3 pe-sm-3 ps-sx-3 pe-sx-3"
        id="header"
      >
        <Header />
        <Naw />
      </div>
      <main>
        <Main cardData={cardData} />
      </main>
    </>
  );
}

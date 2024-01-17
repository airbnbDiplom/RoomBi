import { Header } from "./startComponents/header/Header";
import { Main } from "./startComponents/main/Main";
import { Naw } from "./startComponents/naw/Naw";

export default function Home() {
  return (
    <>
      <Header />
      <Naw />
      <main>
        <Main />
      </main>
    </>
  );
}

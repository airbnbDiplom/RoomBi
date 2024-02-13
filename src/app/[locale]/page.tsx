import styles from "./page.module.css";
import TranslationsProvider from "@/app/components/TranslationsProvider";
import initTranslations from "../i18n";
import { getAllHouses } from "@/app/services/housesServices";
import { authConfig } from "@/app/configs/auth";
import { getServerSession } from "next-auth";
import { Header } from "@/app/startComponents/header/Header";
import { Naw } from "@/app/startComponents/naw/Naw";
import { HomeParams } from "@/app/type/type";
import { Main } from "@/app/startComponents/main/Main";
import { Footer } from "../startComponents/footer/Footer";

const i18nNamespaces = ["translation"];
export default async function Home({
  params: { locale },
}: {
  params: HomeParams;
}) {
  const { t, resources } = await initTranslations(locale, ["translation"]);
  const session = await getServerSession(authConfig);
  console.log("Home session", session);
  const cardData = await getAllHouses();
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="sticky-top header-Main">
          <Header />
          <Naw />
        </div>
        <main className={styles.main}>
          <Main cardData={cardData} />
        </main>
        <Footer />
      </>
    </TranslationsProvider>
  );
}

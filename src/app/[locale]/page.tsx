import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { authConfig } from "@/app/configs/auth";
import { getFirstPage } from "@/app/services/housesServices";
import { Header } from "@/app/startComponents/header/Header";
import { Main } from "@/app/startComponents/main/Main";
import { Naw } from "@/app/startComponents/naw/Naw";
import { HomeParams } from "@/app/type/type";
import { getServerSession } from "next-auth";
import initTranslations from "../i18n";
import { Footer } from "../startComponents/footer/Footer";
import Loading from "./loading";
import styles from "./page.module.css";

const i18nNamespaces = ["translation"];
export default async function Home({
  params: { locale },
}: {
  params: HomeParams;
}) {
  const { resources } = await initTranslations(locale, ["translation"]);
  const session = await getServerSession(authConfig);
  console.log("Home session", session);

  const firstPage = await getFirstPage();

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className={"header-Main header-Main-sticky"}>
          <Header />
          <Naw />
        </div>
        {firstPage ? (
          <main className={styles.main}>
            <Main cardData={firstPage} />
          </main>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
    </TranslationsProvider>
  );
}

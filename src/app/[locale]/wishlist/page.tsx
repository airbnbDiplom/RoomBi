import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { authConfig } from "@/app/configs/auth";
import { getWishlists } from "@/app/services/wishlistsService";
import { decodeTokenGetId } from "@/app/services/jwtDecoder";
import { MyHeader } from "@/app/[locale]/wishlist/components/MyHeader";
import { Wishlist } from "@/app/[locale]/wishlist/components/Wishlist";
import { getServerSession } from "next-auth";
import initTranslations from "../../i18n";
import { Footer } from "../../startComponents/footer/Footer";
import Loading from "./../loading";
import style from "./components/wishstyle.module.css";
const i18nNamespaces = ["translation"];
interface Props {
  params: {
    id: number;
    locale: string;
  };
}

export default async function GetList({ params: { id, locale } }: Props) {
  const { resources } = await initTranslations(locale, ["translation"]);
  const session = await getServerSession(authConfig);
  let list;
  console.log("GTTGYUYGU&YGIUM777777");
  if (session) {
    if (session.user.name) {
      list = await getWishlists(session.user.name);
    }
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="header-Main">
          <MyHeader />
        </div>
        <div className="header-Main"></div>
        {list ? (
          <main>
            <Wishlist cards={list} />
          </main>
        ) : (
          <Loading />
        )}
        <div className={style.footer}>
          <Footer />
        </div>
      </>
    </TranslationsProvider>
  );
}

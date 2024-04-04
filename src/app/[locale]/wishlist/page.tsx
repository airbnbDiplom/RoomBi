import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { HomeParams } from "@/app/type/type";
import initTranslations from "../../i18n";
 
// import { Message } from "./type";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
const i18nNamespaces = ["translation"];
export default async function Messenger({
  params: { locale },
}: {
  params: HomeParams;
}) {
  const { resources } = await initTranslations(locale, ["translation"]);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="header-Main">
          <h1>qwertyu</h1>
        </div>
      </>
    </TranslationsProvider>
  );
}

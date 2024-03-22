import TranslationsProvider from "@/app/configs/TranslationsProvider";
import { HomeParams } from "@/app/type/type";
import initTranslations from "../../i18n";
import { Main } from "./components/main/Main";
import { Message } from "./type";

const i18nNamespaces = ["translation"];
export default async function Messenger({
  params: { locale },
}: {
  params: HomeParams;
}) {
  const { resources } = await initTranslations(locale, ["translation"]);
  const messages = Message;

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="header-Main">
          <Main messages={messages} />
        </div>
      </>
    </TranslationsProvider>
  );
}

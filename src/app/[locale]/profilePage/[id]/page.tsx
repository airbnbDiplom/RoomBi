// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// interface UserInfo {
//   params: {
//     id: string;
//   };
// }

// const CartItemPage: React.FC<UserInfo> = ({ params }) => {

//   return (
//     <>
//       <div>id: {params.id}</div>
//     </>
//   );
// };

// export default CartItemPage;

"use client"
import TranslationsProvider from '@/app/configs/TranslationsProvider'
import initTranslations from '@/app/i18n'
import { Footer } from '@/app/startComponents/footer/Footer'
import React, { useEffect, useState } from 'react';
import styles from '@/app/[locale]/profilePage/profilePage.module.css'
import { useSession } from 'next-auth/react';
import { decodeTokenAndGetUserDetails, decodeTokenAndGetExpiration } from '@/app/services/jwtDecoder'
import { Session } from 'next-auth';
import NeedAuthPage from '@/app/[locale]/needAuthPage';
import { HeaderUpdateUser } from '@/app/[locale]/accountPage/components/HeadUpdateUser'
import UserInfo from '@/app/[locale]/profilePage/[id]/components/userInfo'

const i18nNamespaces = ['translation']
interface UserInfoProps {
  params: {
    locale: string;
    id: string;
  };
}

const UserInfoPage: React.FC<UserInfoProps> = ({ params }) => {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      const res = await initTranslations(params.locale, ['translation']);
      setResources(res.resources);
    };

    fetchResources();
  }, [params.locale]);

  if (!resources) {
    return null; 
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
      <div >
        <div >
          <HeaderUpdateUser />
        </div>
        <div className={styles.content}>
          <UserInfo locale={params.locale} id={params.id} />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </TranslationsProvider>
  )
}

export default UserInfoPage;
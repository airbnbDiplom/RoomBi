"use client";
import { CardBiProps } from "@/app/type/type";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setApartments } from "../../redux/apartmentsState/apartmentsSlice";
import { CatdList } from "@/app/components/card-list-main/CatdList";
import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
const Main: React.FC<{ cardData: CardBiProps[] }> = ({
  cardData,
}: {
  cardData: CardBiProps[];
}) => {
  const session = useSession();
  // console.log("session", session);
  const dispatch = useAppDispatch();

  const apartments = useRef(false);

  useEffect(() => {
    if (apartments.current === false) {
      dispatch(setApartments(cardData));
    }

    return () => {
      apartments.current = true;
    };
  }, [cardData, dispatch]);
  const isShowMap = useAppSelector((state) => state.appReducer.isMapPage);

  const Map = useMemo(
    () =>
      dynamic(
        () =>
          import("@/app/components/map-main/MapMain").then(
            (mod) => mod.MapMain
          ),
        {
          loading: () => <p>A map is loading</p>,
          ssr: false,
        }
      ),
    []
  );

  if (!isShowMap) {
    return (
      <CatdList />

      // <div>
      //   <CatdList />
      //   {session?.data && (
      //     <div style={{ width: "100vw" }}>
      //       <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
      //         Sing Out
      //       </Link>
      //     </div>
      //   )}
      //   :{<Link href="/api/auth/signin">signin</Link>}
      // </div>
    );
  }
  return <Map />;
};
export { Main };

import type { NextPage } from "next";
import Link from "next/link";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import Logo from "../assets/logo";
import { trpc } from "../utils/trpc";
import DashboardPage from "./dashboard";
import GuestLayout from "../layouts/GuestLayout";
import AuthorizedLayout from "../layouts/AuthorizedLayout";
import { PropsWithChildren } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();


  return (
    <SessionProvider session={session}>
      {status === "loading" ?? (
        <>loading...</>
      )}
      {!session && status != "loading" && (
        <>
          <GuestLayout></GuestLayout>
        </>
      )}

      {session && status == "authenticated" && (
        <DashboardPage></DashboardPage>
      )}
    </SessionProvider>
  );
};


export default Home;

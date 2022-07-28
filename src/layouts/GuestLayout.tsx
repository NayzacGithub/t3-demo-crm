import Head from "next/head";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";

import Logo from "../assets/logo";
import { trpc } from "../utils/trpc";




const GuestLayout = () => {
    return (
        <>
            <Head>
                <title>T3 CRM</title>
                <meta name="description" content="A T3 CRM demo application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
                <div className="py-5">
                    <Logo></Logo>
                </div>
                <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
                    <span>
                        <>
                            Not signed in <br />
                            <button onClick={() => signIn()} className="bg-indigo-600 rounded px-5 py-2 text-white text-center">Sign in</button>
                        </>
                    </span>
                </div>
            </main>
        </>
    );
}

export default GuestLayout;
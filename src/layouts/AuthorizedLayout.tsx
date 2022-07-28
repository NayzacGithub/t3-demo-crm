import Head from "next/head";
import Link from "next/link";

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import Logo from "../assets/logo";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";



const Navigation = ({ session }: any) => {
    const router = useRouter();
    return (
        <nav className="bg-[#2f365f] h-full flex flex-col w-56 items-center">
            <header className="text-indigo-300 font-bold grid mb-4 gap-3 py-5 text-center bg-black/30 w-full">
                {session?.user?.image &&
                    (<img src={session?.user?.image} alt="User image" className="w-[100px] rounded-full mx-auto" />)
                }
                <p>
                    {session?.user?.name}
                </p>
            </header>
            <section id="navlinks" aria-label="Navigation links">
                <ul className="flex flex-col gap-3">

                    <li className={router.pathname.trim() == "/" || router.pathname.trim() == "/dashboard" ? "text-indigo-50" : "text-indigo-300"}>
                        <Link href="/dashboard">
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li className={router.pathname.trim() == "/organizations" ? "text-indigo-50" : "text-indigo-300"}>
                        <Link href="/organizations">
                            <a>Organizations</a>
                        </Link>
                    </li>
                    <li className={router.pathname.trim() == "/contacts" ? "text-indigo-50" : "text-indigo-300"}>
                        <Link href="/contacts">
                            <a>Contacts</a>
                        </Link>
                    </li>
                </ul>

            </section>
            <footer className="text-center mt-auto py-5 text-indigo-50">
                <button onClick={() => signOut({ callbackUrl: `${window.location.origin}` })}>Sign out</button>
            </footer>
        </nav>
    )
}

const AutherizedLayout = ({ children }: PropsWithChildren) => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signOut({ callbackUrl: `${window.location.origin}` });
        },
    });


    return (
        <SessionProvider session={session}>

            <Head>
                <title>T3 CRM</title>
                <meta name="description" content="A T3 CRM demo application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen antialiased">
                <Navigation session={session} expires={""} />
                <main className="flex-1 flex flex-col px-8 py-4 bg-slate-50">
                    {children}
                </main>
            </div>
        </SessionProvider>
    );
}



export default AutherizedLayout;
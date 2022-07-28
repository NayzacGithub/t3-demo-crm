import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { Head } from "next/document";
import AutherizedLayout from "../../layouts/AuthorizedLayout";

const DashboardPage: NextPage = () => {
    return (
        <AutherizedLayout>
            <header className="border-b-2 border-dashed pb-2">
                <p className="text-2xl font-bold text-gray-700 ">Dashboard</p>
            </header>
            <div className="py-2">
                <p className="text-xl">Hey there! welcome to the T3 CRM demo app, designed to help illustrate how <a href="https://create.t3.gg" className=" text-blue-400 underline">The T3 Stack</a> works.</p>
            </div>
        </AutherizedLayout>
    );
}
export default DashboardPage;
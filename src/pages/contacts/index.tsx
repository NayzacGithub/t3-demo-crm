import { NextPage } from "next";
import Link from "next/link";
import AutherizedLayout from "../../layouts/AuthorizedLayout";
import { trpc } from "../../utils/trpc";

const ContactsPage: NextPage = () => {
    const contacts = trpc.useQuery(['contacts.contacts']);

    return (
        <AutherizedLayout>
            <header className="border-b-2 border-dashed py-4">
                <p className="text-3xl font-bold text-gray-700 ">Contacts</p>
            </header>
            <div className="py-4">
                <div className="flex justify-between">
                    <input type="text" className="form-input" placeholder="Search..." />
                    <Link href="/contacts/create">
                        <button className="py-2 px-4 bg-[#2f365f] hover:bg-yellow-500 hover:text-black transition-all text-white rounded-lg">
                            Create Contact
                        </button>
                    </Link>
                </div>
                <div className="bg-white rounded-md shadow overflow-x-auto mt-4">
                    <table className="w-full whitespace-nowrap">
                        <tbody>
                            <tr className="text-left font-bold">
                                <th className="px-6 pt-6 pb-4">Name</th>
                                <th className="px-6 pt-6 pb-4">City</th>
                                <th colSpan={2} className="px-6 pt-6 pb-4">Phone</th>
                            </tr>
                            {contacts.data && contacts.data.map((contact) => (<tr className="hover:bg-gray-100 focus-within:bg-gray-100" key={contact.id}>
                                <td className="border-t">
                                    <a href="" className="px-6 py-4 flex items-center focus:text-indigo-500">
                                        {contact?.first_name} {contact?.last_name}
                                    </a>
                                </td>
                                <td className="border-t">
                                    <a tabIndex={-1} href="" className="px-6 py-4 flex items-center">
                                        {contact?.city}
                                    </a>
                                </td>
                                <td className="border-t">
                                    <a tabIndex={-1} href="" className="px-6 py-4 flex items-center">
                                        {contact?.phone}
                                    </a>
                                </td>
                                <td className="border-t w-px">
                                    <a tabIndex={-1} href="" className="px-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="block w-6 h-6 fill-gray-400">
                                            <polygon points="12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707">

                                            </polygon>
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AutherizedLayout >
    );
}

export default ContactsPage;
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AutherizedLayout from "../../layouts/AuthorizedLayout";
import { UpdateOrganizationInput } from "../../schema/organization.schema";
import { trpc } from "../../utils/trpc";

const ViewOrganizationPage: NextPage = () => {
    const router = useRouter();
    const organizationId = router.query.organizationId as string;
    const organization = trpc.useQuery(['organizations.organization', { organizationId }]);

    const { handleSubmit, register } = useForm<UpdateOrganizationInput>();

    const { mutate } = trpc.useMutation('organizations.updateOrganization', {
        onSuccess({ id }) {
            router.push('/organizations/' + id);
        },
    });
    function onSubmit(values: UpdateOrganizationInput) {
        mutate(values);
    }

    return (
        <AutherizedLayout>
            <header className="border-b-2 border-dashed py-4">
                <p className="text-3xl font-bold text-gray-700 "><Link href="/organizations"><a className="text-indigo-500">Organizations /</a></Link> {organization.data?.name}</p>
            </header>
            <div className="py-4">
                <div className="bg-white shadow-lg rounded w-fit mb-12">
                    <form className="p-4 grid grid-cols-2 gap-4 gap-x-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" {...register('name')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="text" {...register('email')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="phone" className="form-label">Phone:</label>
                            <input type="text" {...register('phone')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input type="text" {...register('address')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="city" className="form-label">City:</label>
                            <input type="text" {...register('city')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="region" className="form-label">Region:</label>
                            <input type="text" {...register('region')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="country" className="form-label">Country:</label>
                            <input type="text" {...register('country')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="postal_code" className="form-label">Postal Code:</label>
                            <input type="text" {...register('postal_code')} className="form-input" />
                        </div>
                        <button className=" py-2 px-4 bg-[#2f365f] hover:bg-yellow-500 hover:text-black transition-all text-white " type="submit">Submit</button>
                    </form>
                </div>
                <h1 className="text-2xl font-bold">
                    Contacts
                </h1>
                <div className="bg-white rounded-md shadow overflow-x-auto mt-4 ">
                    <table className="w-full whitespace-nowrap ">
                        <tbody>
                            <tr className="text-left font-bold">
                                <th className="px-6 pt-6 pb-4">Name</th>
                                <th className="px-6 pt-6 pb-4">City</th>
                                <th colSpan={2} className="px-6 pt-6 pb-4">Phone</th>
                            </tr>
                            {organization.data && organization.data.contacts.map((contact) => (<tr className="hover:bg-gray-100 focus-within:bg-gray-100" key={contact.id}>
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

export default ViewOrganizationPage;
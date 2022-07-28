
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AutherizedLayout from "../../layouts/AuthorizedLayout";
import { CreateContactInput } from "../../schema/organization.schema";

import { trpc } from "../../utils/trpc";

const CreateOrganizationPage: NextPage = () => {
    const { handleSubmit, register } = useForm<CreateContactInput>();
    const router = useRouter();
    const { mutate } = trpc.useMutation('contacts.createContact', {
        onSuccess(data, variables, context) {
            router.push('/contacts');
        },
    });

    const organizations = trpc.useQuery(['organizations.organizations']);

    function onSubmit(values: CreateContactInput) {
        mutate(values);
    }

    return (
        <AutherizedLayout>
            <header className="border-b-2 border-dashed py-4" aria-label="breadcrumps">
                <p className="text-3xl font-bold text-gray-700 "><Link href="/organizations"><a className="text-indigo-500">Organizations /</a></Link> Create</p>
            </header>
            <div className="py-4">
                <div className="bg-white shadow-lg rounded w-fit">
                    <form className="p-4 grid grid-cols-2 gap-4 gap-x-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <label htmlFor="first_name" className="form-label">First Name:</label>
                            <input type="text" {...register('first_name')} className="form-input" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="last_name" className="form-label">Last Name:</label>
                            <input type="text" {...register('last_name')} className="form-input" />
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
                        <div className="grid gap-2">
                            <label htmlFor="organizationId" className="form-label">Organization:</label>
                            <select {...register('organization_id')}>
                                {organizations.data?.map(organization => (
                                    <option key={organization.id} value={organization.id}>{organization.name}</option>
                                ))}
                            </select>
                        </div>
                        <button className=" py-2 px-4 bg-[#2f365f] hover:bg-yellow-500 hover:text-black transition-all text-white " type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </AutherizedLayout>
    );
}

export default CreateOrganizationPage;
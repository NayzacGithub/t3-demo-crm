import { z } from 'zod';

export const createOrganizationSchema = z.object({
    name: z.string(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    address: z.string().nullish(),
    city: z.string().nullish(),
    region: z.string().nullish(),
    country: z.string().nullish(),
    postal_code: z.string().nullish(),
});
export const createContactSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    address: z.string().nullish(),
    city: z.string().nullish(),
    region: z.string().nullish(),
    country: z.string().nullish(),
    postal_code: z.string().nullish(),
    organization_id: z.string(),
});

export const updateOrganizationSchema = z.object({
    organizationId: z.string(),
    name: z.string(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    address: z.string().nullish(),
    city: z.string().nullish(),
    region: z.string().nullish(),
    country: z.string().nullish(),
    postal_code: z.string().nullish(),
});

export type CreateOrganizationInput = z.TypeOf<typeof createOrganizationSchema>;
export type CreateContactInput = z.TypeOf<typeof createContactSchema>;
export type UpdateOrganizationInput = z.TypeOf<typeof updateOrganizationSchema>;


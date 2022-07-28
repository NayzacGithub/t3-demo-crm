import { z } from 'zod';
import { createContactSchema } from '../../schema/organization.schema';
import { createRouter } from './context';


export const contactRouter = createRouter()
    .query('contacts', {
        async resolve({ ctx }) {
            return await ctx.prisma.contact.findMany({
                where: {
                    accountId: ctx.session?.user?.id,
                },
            });
        }
    })
    .mutation('createContact', {
        input: createContactSchema,
        async resolve({ ctx, input }) {
            return await ctx.prisma.contact.create({
                data: {
                    first_name: input.first_name,
                    last_name: input.last_name,
                    email: input.email,
                    phone: input.phone,
                    address: input.address,
                    city: input.city,
                    region: input.region,
                    country: input.country,
                    account: {
                        connect: {
                            id: ctx?.session?.user?.id
                        }
                    },
                    organization: {
                        connect: {
                            id: input.organization_id
                        }
                    }
                },
            });
        }
    });
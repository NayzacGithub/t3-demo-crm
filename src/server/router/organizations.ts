import { z } from 'zod';
import { createOrganizationSchema, updateOrganizationSchema } from '../../schema/organization.schema';
import { createRouter } from './context';

export const organizationsRouter = createRouter()
    .mutation("createOrganization", {
        input: createOrganizationSchema,
        async resolve({ ctx, input }) {
            return await ctx.prisma.organization.create({
                data: { ...input, account: { connect: { id: ctx?.session?.user?.id } } },
            });
        }
    })
    .query("organizations", {
        async resolve({ ctx }) {
            return await ctx.prisma.organization.findMany({
                where: { account: { id: ctx?.session?.user?.id } },
            });
        }
    })
    .query('organization', {
        input: z.object({
            organizationId: z.string()
        }),
        async resolve({ ctx, input }) {
            return await ctx.prisma.organization.findUnique({
                where: {
                    id: input.organizationId,
                },
                include: {
                    contacts: true,
                }
            })
        }
    })
    .mutation('updateOrganization', {
        input: updateOrganizationSchema,
        async resolve({ ctx, input }) {
            return await ctx.prisma.organization.update({
                where: { id: input.organizationId },
                data: { ...input },
            });
        }
    });
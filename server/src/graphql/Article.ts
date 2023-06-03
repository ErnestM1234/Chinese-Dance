import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";   

export const Article = objectType({
    name: "Article",
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("description"); 
        t.nonNull.string("url");
        t.field("postedBy", {
            type: "User",
            resolve(parent, _, context) {
                return context.prisma.link
                    .findUnique({ where: { id: parent.id } })
                    .postedBy();
            },
        });
    },
});

export const ArticleMutation = extendType({
    type: "Mutation",    
    definition(t) {
        t.nonNull.field("create", {
            type: "Article",  
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            async resolve(_, args, context) {
            const { description, url } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot post article without logging in.");
            }

            const newLink = await context.prisma.link.create({
                data: {
                    description,
                    url,
                    postedBy: { connect: { id: userId } },
                },
            });
            return newLink;
            },
        });
        t.nonNull.field("update", {
            type: "Article",  
            args: {
                id: nonNull(intArg()),
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            async resolve(_, args, context) {
            const { id, description, url } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot update article without logging in.");
            }

            const newLink = await context.prisma.link.update({
                where: {id},
                data: {
                    description,
                    url,
                    postedBy: { connect: { id: userId } },
                },
            });

            return newLink;
            },
        });
        t.nonNull.field("delete", {
            type: "Article",  
            args: {
                id: nonNull(intArg())
            },
            async resolve(_, args, context) {
            const { id } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot delete article without logging in.");
            }

            return await context.prisma.link.delete({
                where: {id}
            });
            },
        });
    },
});
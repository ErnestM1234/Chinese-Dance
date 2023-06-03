import { extendType, nonNull, objectType, stringArg } from "nexus";   
import { NexusGenObjects } from "../../nexus-typegen";  

export const Article = objectType({
    name: "Article",
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("description"); 
        t.nonNull.string("url");
        t.field("postedBy", {
            type: "User",
            resolve(parent, args, context) {
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
            resolve(parent, args, context) {
            const { description, url } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot post article without logging in.");
            }

            const newLink = context.prisma.link.create({
                data: {
                    description,
                    url,
                    postedBy: { connect: { id: userId } },
                },
            });

            return newLink;
            },
        });
    },
});
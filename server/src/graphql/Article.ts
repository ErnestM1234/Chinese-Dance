import { Prisma } from "@prisma/client";
import { arg, enumType, extendType, inputObjectType, intArg, list, nonNull, objectType, stringArg } from "nexus";   


export const ArticleOrderByInput = inputObjectType({
    name: "ArticleOrderByInput",
    definition(t) {
        t.field("title", { type: Sort });
        t.field("text", { type: Sort });
        t.field("createdAt", { type: Sort });
    },
});

export const Sort = enumType({
    name: "Sort",
    members: ["asc", "desc"],
});

export const Articles = objectType({
    name: "Articles",
    definition(t) {
        t.nonNull.list.nonNull.field("articles", { type: Article });
        t.nonNull.int("count");
        t.id("id");
    },
});


export const Article = objectType({
    name: "Article",
    definition(t) {
        t.nonNull.int("id"); 
        t.nonNull.string("title"); 
        t.nonNull.string("text");
        t.nonNull.dateTime("createdAt");
        t.field("postedBy", {
            type: "User",
            resolve(parent, _, context) {
                return context.prisma.article
                    .findUnique({ where: { id: parent.id } })
                    .author();
            },
        });
    },
});

export const ArticleQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("article", {
            type: "Article",
            args: {
                id: nonNull(intArg()),
            },
            async resolve (_, args, context) {
                return await context.prisma.article.findUnique({ where: { id: args.id } });
            },
        });
        t.nonNull.field("articles", {
            type: "Articles",
            args: {
                filter: stringArg(),
                skip: intArg(),
                take: intArg(),
                orderBy: arg({ type: list(nonNull(ArticleOrderByInput)) }), 
            },
            async resolve(_, args, context) { 
                const where = args.filter
                    ? {
                          OR: [
                              { title: { contains: args.filter } },
                              { text: { contains: args.filter } },
                          ],
                      }
                    : {};

                const articles = await context.prisma.article.findMany({  
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                    orderBy: args?.orderBy as
                        | Prisma.Enumerable<Prisma.ArticleOrderByWithRelationInput>
                        | undefined,
                });

                const count = await context.prisma.article.count({ where });
                const id = JSON.stringify(args);
                  
                return {
                    articles,
                    count,
                    id,
                };
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
                title: nonNull(stringArg()),
                text: nonNull(stringArg()),
            },
            async resolve(_, args, context) {
            const { title, text } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot post article without logging in.");
            }

            const newArticle = await context.prisma.article.create({
                data: {
                    title,
                    text,
                    author: { connect: { id: userId } },
                },
            });
            return newArticle;
            },
        });
        t.nonNull.field("update", {
            type: "Article",  
            args: {
                id: nonNull(intArg()),
                title: nonNull(stringArg()),
                text: nonNull(stringArg()),
            },
            async resolve(_, args, context) {
            const { id, title, text } = args;
            const { userId } = context;

            if (!userId) {
                throw new Error("Cannot update article without logging in.");
            }

            const updatedArticle = await context.prisma.article.update({
                where: {id},
                data: {
                    title,
                    text,
                    author: { connect: { id: userId } },
                },
            });

            return updatedArticle;
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

            return await context.prisma.article.delete({
                where: {id}
            });
            },
        });
    },
});
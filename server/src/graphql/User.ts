import { Prisma } from "@prisma/client";
import { arg, extendType, intArg, list, nonNull, objectType, stringArg } from "nexus";
import { ArticleOrderByInput } from "./Article";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.nonNull.string("email");
        t.string("bio");
        t.nonNull.list.nonNull.field("links", {
            type: "Link",
            resolve(parent, _, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .links();
            },
        });
        t.nonNull.list.nonNull.field("votes", {
            type: "Link",
            resolve(parent, _, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .votes();
            }
        });
    },
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("user", {
            type: "User",
            args: {
                id: nonNull(intArg()),
            },
            async resolve (_, args, context) {
                return await context.prisma.user.findUnique({ where: { id: args.id } });
            },
        });
    },
});
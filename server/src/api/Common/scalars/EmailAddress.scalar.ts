import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

function serialize(val: string) {
    const regExp = /^[-$^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/;
    const validation = regExp.test(val);
    if (!validation) {
        throw new Error("Invalid EmailAddress");
    }
    return val;
}

function parseValue(value: string) {
    return serialize(value);
}

function parseLiteral(ast) {
    return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
}

export default new GraphQLScalarType({
    name: "EmailAddress",
    description: `EmailAddress... 
    /^[-$^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/
    `,
    serialize,
    parseValue,
    parseLiteral
});
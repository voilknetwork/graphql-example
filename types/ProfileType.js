const graphql = require("graphql")
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = graphql;

const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        cover_image: {type: GraphQLString},
        name:{type: GraphQLString},
        about:{type: GraphQLString},
        location:{type: GraphQLString},
        website:{type: GraphQLString},
        profile_image: {type: GraphQLString}
    })
});

module.exports = { ProfileType }
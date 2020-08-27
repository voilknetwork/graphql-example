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

const FollowType = new GraphQLObjectType({
    name: "FollowType",
    fields: () => ({ 
        follower_count: {type: GraphQLInt}, 
        following_count: {type: GraphQLInt} 
    })
})

module.exports = {FollowType}
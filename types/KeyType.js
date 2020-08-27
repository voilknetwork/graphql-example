const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = graphql;
const KeyType = new GraphQLObjectType({
    name: 'KeyType',
    fields: () => ({
        weight_threshold: { type: GraphQLInt},
        account_auths: { type: GraphQLList(GraphQLList(GraphQLString)) },
        key_auths: {type: GraphQLList(GraphQLList(GraphQLString))}
    })
});
module.exports = { KeyType }
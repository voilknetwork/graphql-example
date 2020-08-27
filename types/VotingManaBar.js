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
const VotingManaBar = new GraphQLObjectType({
    name: 'VotingManaBar',
    fields: () => ({
        current_mana: { type: GraphQLString},
        last_update_time: { type: GraphQLInt}
    })
});

module.exports = {VotingManaBar}
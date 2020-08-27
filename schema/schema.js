const graphql = require("graphql")
const voilk = require("voilk")

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = graphql;
const { AccountType } = require("../types")

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        get_account: {
            type: AccountType,
            args: {
                username: {type: GraphQLString}
            },
            resolve(parent, args){
                return new Promise((resolve, reject) => {
                   voilk.api.getAccounts([args.username], function(err, result) {
                    resolve(result[0])
                  }); 
                })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {}
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: Mutation
})
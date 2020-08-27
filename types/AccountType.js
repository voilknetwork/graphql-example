const graphql = require('graphql')
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

const {ProfileType} = require("./ProfileType")
const {FollowType} = require("./FollowType")
const {VotingManaBar} = require("./VotingManaBar");
const {KeyType} = require("./KeyType")
const AccountType = new GraphQLObjectType({
    name: 'AccountType',
    fields: () => ({
        id: { type: GraphQLInt},
        bitcoin: {
            type: GraphQLString,
            resolve(parent, args){
                //console.log(parent.id)
                let bit = Bitcoin.findOne({userid: parent.id})
                return bit.then(x=> {
                    //console.log(x)
                    return x.address
                })
            }
        },
        bitcoincash: {
            type: GraphQLString,
            resolve(parent, args){
                //console.log(parent.id)

                let bit = BitcoinCash.findOne({userid: parent.id})
                return bit.then(x=> {
                    //console.log(x)
                    return x.address
                })
            }
        },
        name: {type: GraphQLString},
        owner:{type: KeyType},
        active:{type: KeyType},
        posting:{type: KeyType},
        memo_key: {type: GraphQLString},
        json_metadata:{type: ProfileType},
        followers: {
            type: FollowType, 
            resolve(parent, args){
                let trp = new Promise(function(resolve, reject) {
             
                    voilk.api.getFollowCount(parent.name, function(err, result) {
                        //console.log(err, result);
                        resolve(result)
                      });
                })
                return trp.then(tr => {
                    if(tr!==undefined){
                        return tr
                    }
                    else {
                        return {follower_count: 0, following_count: 0}
                    }
                })
            }
        },
        user_followers: {
            type: new GraphQLList(GraphQLString),
            resolve(parent, args){
             let trp = new Promise(function(resolve, reject) {
              
                 voilk.api.getFollowers(parent.name, null, "blog", 500, function(err, result) {
                    if(result){
                        let followers = result.map(follower => {
                            return follower.follower
                        })
                        resolve(followers)
                    }else {
                        resolve(null)
                    }
                    
                });
             })
             return trp.then(tr => {
                 if(tr!==undefined){
                     return tr
                 }
                 else {
                     return null
                 }
             })
            }
        },
        user_following: {
            type: new GraphQLList(GraphQLString),
            resolve(parent, args){
             let trp = new Promise(function(resolve, reject) {
              
                 voilk.api.getFollowing(parent.name, null, "blog", 500, function(err, result) {
                    if(result){
                        let followers = result.map(follower => {
                            return follower.following
                        })
                        resolve(followers)
                    }else {
                        resolve(null)
                    }
                    
                });
             })
             return trp.then(tr => {
                 if(tr!==undefined){
                     return tr
                 }
                 else {
                     return null
                 }
             })
            }
        },
        user_muted: {
            type: new GraphQLList(GraphQLString),
            resolve(parent, args){
             let trp = new Promise(function(resolve, reject) {
              
                 voilk.api.getFollowers(parent.name, null, "ignore", 500, function(err, result) {
                    if(result){
                        let followers = result.map(follower => {
                            return follower.follower
                        })
                        resolve(followers)
                    }else {
                        resolve(null)
                    }
                    
                });
             })
             return trp.then(tr => {
                 if(tr!==undefined){
                     return tr
                 }
                 else {
                     return null
                 }
             })
            }
        },
        user_ignored: {
            type: new GraphQLList(GraphQLString),
            resolve(parent, args){
             let trp = new Promise(function(resolve, reject) {
              
                 voilk.api.getFollowing(parent.name, null, "ignore", 500, function(err, result) {
                    if(result){
                        let followers = result.map(follower => {
                            return follower.following
                        })
                        resolve(followers)
                    }else {
                        resolve(null)
                    }
                    
                });
             })
             return trp.then(tr => {
                 if(tr!==undefined){
                     return tr
                 }
                 else {
                     return null
                 }
             })
            }
        },
        proxy: {type: GraphQLString},
        last_owner_update: {type: GraphQLString},
        last_account_update: {type: GraphQLString},
        created: {type: GraphQLString},
        mined: { type: GraphQLBoolean},
        recovery_account: {type: GraphQLString},
        last_account_recovery: {type: GraphQLString},
        reset_account: {type: GraphQLString},
        comment_count: { type: GraphQLInt},
        lifetime_vote_count: { type: GraphQLInt},
        post_count: { type: GraphQLInt},
        can_vote: { type: GraphQLBoolean},
        voting_manabar: {type: VotingManaBar},
        voting_power: { type: GraphQLInt},
        balance: {type: GraphQLString},
        savings_balance: {type: GraphQLString},
        vsd_balance: {type: GraphQLString},
        vsd_seconds: {type: GraphQLString},
        vsd_seconds_last_update: {type: GraphQLString},
        vsd_last_interest_payment: {type: GraphQLString},
        savings_vsd_balance: {type: GraphQLString},
        savings_vsd_seconds: {type: GraphQLString},
        savings_vsd_seconds_last_update: {type: GraphQLString},
        savings_vsd_last_interest_payment: {type: GraphQLString},
        savings_withdraw_requests: { type: GraphQLInt},
        reward_vsd_balance: {type: GraphQLString},
        reward_voilk_balance: {type: GraphQLString},
        reward_coining_balance: {type: GraphQLString},
        reward_coining_voilk: {type: GraphQLString},
        coining_shares: {type: GraphQLString},
        delegated_coining_shares: {type: GraphQLString},
        received_coining_shares: {type: GraphQLString},
        coining_withdraw_rate: {type: GraphQLString},
        next_coining_withdrawal: {type: GraphQLString},
        withdrawn: { type: GraphQLString},
        to_withdraw: { type: GraphQLString},
        withdraw_routes: { type: GraphQLString},
        curation_rewards: { type: GraphQLString},
        posting_rewards: { type: GraphQLString},
        proxied_vsf_votes: { type: GraphQLList(GraphQLString)},
        witnesses_voted_for: { type: GraphQLString},
        last_post: {type: GraphQLString},
        last_root_post: {type: GraphQLString},
        last_vote_time: {type: GraphQLString},
        post_bandwidth: { type: GraphQLInt},
        pending_claimed_accounts: { type: GraphQLString},
        average_bandwidth: {type: GraphQLString},
        lifetime_bandwidth: {type: GraphQLString},
        last_bandwidth_update: {type: GraphQLString},
        average_market_bandwidth: {type: GraphQLString},
        lifetime_market_bandwidth: {type: GraphQLString},
        last_market_bandwidth_update: {type: GraphQLString},
        coining_balance: {type: GraphQLString},
        reputation: { type: GraphQLString},
        witness_votes: { type: GraphQLList(GraphQLString)}
    })
});
module.exports = { AccountType }
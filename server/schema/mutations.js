const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./types/UserType')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: {type: graphQLString},
        password: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        
      }
    }
  }
})

module.exports = mutation 
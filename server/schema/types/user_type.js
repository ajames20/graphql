const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
});

module.exports = UserType;

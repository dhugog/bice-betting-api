import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import BetService from './app/services/BetService';
import UserService from './app/services/UserService';
import { sequelize } from "./sequelize";

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A system user',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    balance: {
      type: GraphQLFloat
    }
  }
})

const betType = new GraphQLObjectType({
  name: 'Bet',
  description: 'An user bet',
  fields: {
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    user: {
      type: userType
    },
    betAmount: {
      type: GraphQLFloat
    },
    chance: {
      type: GraphQLFloat
    },
    payout: {
      type: GraphQLFloat
    },
    win: {
      type: GraphQLBoolean
    }
  }
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'This is the RootQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: () => UserService.getUsersList()
    },
    user: {
      type: userType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, { id }) => UserService.getUser(id)
    },
    bets: {
      type: new GraphQLList(betType),
      resolve: () => BetService.getBetList()
    },
    bet: {
      type: betType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_, { id }) => BetService.getBet(id)
    },
    bestBetPerUser: {
      type: new GraphQLList(betType),
      args: {
        limit: { type: GraphQLInt }
      },
      resolve: (_, { limit }) => BetService.getBestBetPerUser(limit)
    },
  }
})

const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This is the RootMutation',
  fields: {
    user: {
      type: userType,
      args: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat }
      },
      resolve: (_, args) => UserService.createUser(args)
    },
    placeBet: {
      type: betType,
      args: {
        userId: { type: GraphQLInt },
        betAmount: { type: GraphQLFloat },
        chance: { type: GraphQLFloat },
      },
      resolve: (_, { userId, betAmount, chance }) => BetService.placeBet(userId, betAmount, chance)
    }
  }
})

const schema = new GraphQLSchema({ query: rootQuery, mutation: rootMutation })
const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

sequelize.sync({ force: true }).then(() => {
  const PORT = 4200;

  app.listen(PORT, () => console.log(`Listening on port ${PORT} 🤖`));
});

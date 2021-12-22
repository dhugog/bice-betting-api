# dice-betting-api

A very basic dice betting API

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/dhugog/dice-betting-api # or clone your own fork
$ cd dice-betting-api
$ yarn
$ yarn start
```

Your app should now be running on a GraphiQL server at [localhost:4200/graphql](http://localhost:4200/graphql).

## Query Examples

```js
mutation {
  user(name: "John Doe", balance: 5000) { # create new user
    id
    name
    balance
  }
}
```

```js
mutation { # place a bet
  placeBet(userId: 1, betAmount: 100, chance: 70) {
    id
    win
    payout
  }
}
```

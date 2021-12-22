import { Sequelize } from 'sequelize-typescript';
import { Bet } from './app/models/Bet';
import { User } from './app/models/User';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [User, Bet]
});
import { Bet } from "../models/Bet";
import { User } from "../models/User";
import { Sequelize } from 'sequelize-typescript';
import { Op } from "sequelize";

class BetRepository {
  async getBet(id: number): Promise<Bet | null> {
    return Bet.findByPk(id, { include: [User] });
  }

  async getBetList(): Promise<Bet[]> {
    return Bet.findAll();
  }

  async getBestBetPerUser(limit: number): Promise<Bet[]> {
    return Bet.findAll({
      where: {
        id: {
          [Op.in]: [Sequelize.literal('SELECT id FROM (SELECT id, MAX(betAmount * payout) FROM Bets WHERE win = 1 GROUP BY userId)')]
        }
      },
      order: [
        ['userId', 'ASC']
      ],
      limit
    })
  }

  async createBet(bet: Bet): Promise<Bet> {
    return bet.save();
  }
}

export default new BetRepository();
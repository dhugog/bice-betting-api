import { Bet } from "../models/Bet";
import BetRepository from "../repositories/BetRepository";
import UserRepository from "../repositories/UserRepository";

class BetService {
  async placeBet(userId: number, betAmount: number, chance: number): Promise<Bet> {
    const user = await UserRepository.getUser(userId);

    if (!user) {
      throw new Error(`User ${userId} not found.`);
    }

    if (user.balance < betAmount) {
      throw new Error('Insufficient balance');
    }

    user.balance -= betAmount;

    const result = Math.random() * 100;
    const payout = (100 - chance) / 10 * 1.5;
    const win = result < chance;

    if (win) {
      user.balance += betAmount * payout;
    }

    user.save();

    return BetRepository.createBet(Bet.build({ userId, betAmount, chance, payout, win }));
  }

  async getBestBetPerUser(limit: number): Promise<Bet[]> {
    return BetRepository.getBestBetPerUser(limit);
  }
}

export default new BetService();
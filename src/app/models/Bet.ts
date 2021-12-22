import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table
export class Bet extends Model {
  @ForeignKey(() => User)
  @Column userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column
  betAmount!: number;

  @Column
  chance!: number;

  @Column
  payout!: number;

  @Column
  win!: boolean;
}
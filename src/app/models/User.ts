import { Model, Column, Table, HasMany } from "sequelize-typescript";
import { Bet } from "./Bet";

@Table
export class User extends Model {
  @Column
  name!: string;

  @Column
  balance!: number;

  @HasMany(() => Bet)
  bets!: Bet[];
}
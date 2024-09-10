import { Bank } from 'src/bank/entities/banck.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PayMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payMethods)
  user: User;

  @ManyToOne(() => Bank, (bank) => bank.payMethods)
  bank: Bank;

  @Column()
  cardNumber: string;

  @Column()
  cvv: string;

  @Column()
  experationDate: string;
}

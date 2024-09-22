import { Bank } from '../../bank/entities/banck.entity';
import { Subscription } from '../../subcriptions/entities/subcription.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PayMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

  @Column()
  userId: string

  @Column()
  nameCardHolder: string

  @ManyToOne(() => Bank)
  @JoinColumn({ name: 'bankId', referencedColumnName: 'id'})
  bank: Bank;

  @Column()
  bankId: string

  @Column()
  cardNumber: string;

  @Column()
  cvv: string;

  @Column()
  expirationDate: string;

  @OneToOne(() => Subscription, (subcription) => subcription.payMethod)
  subcription: Subscription
}

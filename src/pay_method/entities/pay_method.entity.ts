import { Bank } from 'src/bank/entities/banck.entity';
import { User } from 'src/users/entities/user.entity';
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
  cardNumber: number;

  @Column()
  cvv: number;

  @Column()
  experationDate: Date;
}

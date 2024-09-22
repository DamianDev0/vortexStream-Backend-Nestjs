import { PayMethod } from '../../pay_method/entities/pay_method.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @OneToOne(() => PayMethod)
  @JoinColumn({ name: 'payMethodId', referencedColumnName: 'id' })
  payMethod?: PayMethod;

  @Column({ default: null })
  payMethodId?: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}

import { PayMethod } from '../../pay_method/entities/pay_method.entity';
import { Role } from '../../common/enum/Roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subcriptions/entities/subcription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  secondName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  bornDate?: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  prefixCountry: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: true, select: false })
  status?: boolean;

  @Column({ nullable: true })
  urlprofile?: string;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @OneToOne(() => PayMethod, (payMethod) => payMethod.user)
  payMethods: PayMethod[];

  @OneToOne(() => Subscription, (subcription) => subcription.user)
  subcription: Subscription[];
}

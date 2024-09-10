import { PayMethod } from 'src/pay_method/entities/pay_method.entity';
import { Role } from '../../common/enum/Roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  urlprofile?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PayMethod, (payMethod) => payMethod.user)
  payMethods: PayMethod[];
}

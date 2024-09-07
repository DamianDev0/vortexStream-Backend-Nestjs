import { Role } from '../../common/enum/Roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  secondName: string;

  @Column()
  lastName: string;

  @Column()
  bornDate: Date;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  username: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column()
  country: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: true })
  status: boolean;

  @Column()
  urlprofile: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

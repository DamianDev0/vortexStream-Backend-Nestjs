import { PayMethod } from '../../pay_method/entities/pay_method.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => PayMethod, (payMethod) => payMethod.bank)
  payMethods?: PayMethod[];
}

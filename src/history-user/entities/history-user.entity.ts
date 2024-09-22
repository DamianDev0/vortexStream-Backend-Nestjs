import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HistoryUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false })
    mediaId: string;

    @Column()
    imgMedia: string;

    @Column()
    mediaTitle: string;

    @Column({ length: 1200 })
    synopsis: string;
    
    @Column()
    rating: number;

    @Column({ nullable: true })
    typeMedia?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: true })
    updatedAt: Date;
}

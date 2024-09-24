import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Favorite {
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
    backdrop_path: string;

    @Column()
    title: string;

    @Column({ length: 1200 })
    overview: string;

    @Column()
    vote_average: number;

    @Column({ nullable: true })
    typeMedia?: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;
}

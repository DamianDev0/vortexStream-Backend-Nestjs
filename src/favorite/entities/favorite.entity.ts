import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    imgMedia: string;

    @Column()
    mediaTitle: string;

    @Column({ length: 1200 })
    synopsis: string;

    @Column()
    raiting: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class SavedLink {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    label!: string;

}
import { Drawer } from "../../drawers/entities/drawer.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

@Entity()
export class Link {
  @PrimaryColumn('varchar', { length: 36 })
  uuid: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-array')
  tags: string[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Drawer, { onDelete: 'CASCADE' })
  drawer: Drawer;

  @BeforeInsert()
  async setUuid() {
    this.uuid = await uuidv5(`${this.url}${this.title}${this.user.email}`, '5c9c9808-cd89-4e7b-8a15-91255399d0bf')
  }

}
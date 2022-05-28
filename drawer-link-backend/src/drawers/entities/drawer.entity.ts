import { User } from "../../users/entities/user.entity";
import { Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne, OneToMany } from "typeorm";
import { v5 as uuidv5 } from 'uuid';
import { Link } from "src/links/entities/link.entity";

@Entity()
export class Drawer {
  @PrimaryColumn('varchar', { length: 36 })
  uuid: string;

  @Column()
  label: string;

  @Column()
  description: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Link, (link) => link.drawer)
  links: Link;

  @BeforeInsert()
  async setUuid() {
    this.uuid = await uuidv5(`${this.label}${this.user.email}`, '80f20104-ca5f-4370-9e0d-1de596ffb941')
  }

}
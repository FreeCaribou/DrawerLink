import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('varchar', { length: 36 })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pseudo: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setUuid() {
    this.uuid = await uuidv5(`${this.email}${this.pseudo}`, '8b011f6c-bb6c-4e93-baa3-df2249abf5bf');
  }

}

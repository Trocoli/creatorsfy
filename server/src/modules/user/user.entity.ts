import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column()
  store!: string
}

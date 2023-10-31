import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Auto {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    modelo!: number

    @Column()
    marca!: string

    @Column()
    año!: number

    @Column()
    precio!: number

    @Column()
    cantidadDisponible!: number

}

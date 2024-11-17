import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("vendors")
  export class Vendor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "varchar", length: 255 })
    name: string;
  
    @Column({ type: "varchar", length: 255, unique: true })
    email: string;
  
    @Column({ type: "varchar", length: 255 })
    address: string;
  
    @Column({ type: "enum", enum: ["pending", "approved", "suspended"], default: "pending" })
    status: "pending" | "approved" | "suspended";
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  
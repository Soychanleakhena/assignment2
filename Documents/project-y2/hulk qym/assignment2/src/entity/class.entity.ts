import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('increment')
  class_id: number;

  @Column({ type: 'varchar', length: 100 })
  class_name: string;

  @Column({ type: 'varchar', length: 100 })
  subject: string;

  @ManyToOne(() => Teacher, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher | null;

  @Column({ type: 'int', nullable: true })
  teacher_id: number | null;
}

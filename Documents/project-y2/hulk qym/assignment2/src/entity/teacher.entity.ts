import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  teacher_id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;
}

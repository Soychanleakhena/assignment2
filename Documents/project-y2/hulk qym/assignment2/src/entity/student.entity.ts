import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @Column({ type: 'varchar', length: 50 })
  last_name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ type: 'date', nullable: true })
  birth_date: string | null;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    enum: ['Male', 'Female', 'Other'],
  })
  gender: 'Male' | 'Female' | 'Other' | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;
}

import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Teacher } from "../entity/teacher.entity";

export const getStudent = async (req: Request, res: Response) => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    
    try {
        const teacher = await teacherRepository.find();
          
        console.log(teacher)
        return res.status(200).json({ message: "Success", teacher });
  
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  };
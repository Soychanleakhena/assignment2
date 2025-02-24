import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Student} from "../entity/student.entity"

export const getStudent = async (req: Request, res: Response) => {
    const studentRepository = AppDataSource.getRepository(Student);
    

    try {
        const student = await studentRepository.find();
          
        console.log(student)
        return res.status(200).json({ message: "Success", student });
  
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  };
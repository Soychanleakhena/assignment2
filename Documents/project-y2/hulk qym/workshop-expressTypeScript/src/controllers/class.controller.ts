import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Student} from "../entity/student.entity"

export const getStudent = async (req: Request, res: Response) => {
    const classRepository = AppDataSource.getRepository(Student);
    

    try {
        const classes = await classRepository.find();
          
        console.log(classes)
        return res.status(200).json({ message: "Success", classes });
  
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal server error!' });
    }
  };
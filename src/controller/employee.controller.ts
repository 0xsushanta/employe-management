import type { Request, Response } from "express";
import { addUserSchema} from "../config/types.js";
import { prismaClient } from "../config/dbconfig.js";
export const addemplye= async (req: Request, res: Response)=>{
    const parseData= addUserSchema.safeParse(req.body)
    if(!parseData.success){
        res.status(400).json("input error while adding employee info")
        return 
    }
    const {email,name,position,salary}= parseData.data
    try {
        const existingEmploye= await prismaClient.employee.findUnique({
            where:{
                email
            }
        })
        if(existingEmploye){
            return res.status(400).json("employee already exists")
        }
        await prismaClient.employee.create({
            data:{
                name,
                email,
                position,
                salary
            }
        })
        return res.status(200).json({msg:"employe created"})
    } catch (error) {
        console.error("add employe error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}
export const viewEmployeeById = async (req:Request,res: Response)=>{
    const { id } = req.params;
    const numericId = Number(id);

    const employee= await prismaClient.employee.findUnique({
        where:{
            id: numericId
        }
    })
    if(!employee){
        res.status(400).json({msg:"user doesnot exists"})
        return
    }
    return res.status(200).json({data: employee})
}
export const getEmployees = async (req: Request,res: Response)=>{
    const page= Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const employees= await prismaClient.employee.findMany({
        skip,
        take: limit,
        orderBy: {createdAt:"desc"}
    })
    res.json({ page, limit, data: employees });
}
export const updateEmploye=  async (req:Request, res:Response)=>{
    try {
        const id = Number(req.params.id);
        const updated= await prismaClient.employee.update({
            where:{
             id   
            },
            data: req.body
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: `Failed to update employee ${error}` });
    }
}
export const deleteEmployee= async (req:Request, res: Response)=>{
    try {
        const id= Number(req.params.id)
        await prismaClient.employee.delete({
            where:{
                id
            }
        })
        return res.status(200).json("emplpoyee deleted succesfully")
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete employee" });
    }
}
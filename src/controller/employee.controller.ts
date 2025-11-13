import type { Request, Response } from "express";
import { addUserSchema } from "../config/types.js";
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
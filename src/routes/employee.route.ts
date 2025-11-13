import express, { Router } from "express";
import { addemplye, getEmployees, updateEmploye, viewEmployeeById} from "../controller/employee.controller.js"
const router: Router = express.Router();
router.post("/add-employee",addemplye)
router.put("/update-employee/:id",updateEmploye)
router.get("/view-employees/:id",viewEmployeeById)
router.get("/view-employees", getEmployees);

export default router
import express, { Router } from "express";
import { addemplye, getEmployees, viewEmployeeById} from "../controller/employee.controller.js"
const router: Router = express.Router();
router.post("/add-employee",addemplye)
router.get("/view-employees/:id",viewEmployeeById)
router.get("/view-employees", getEmployees);

export default router
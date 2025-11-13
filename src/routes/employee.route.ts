import express, { Router } from "express";
import { addemplye, viewEmployeeById} from "../controller/employee.controller.js"
const router: Router = express.Router();
router.post("/add-employee",addemplye)
router.get("/view-employees/:id",viewEmployeeById)
export default router
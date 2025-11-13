import exprss, { Router } from "express"
import { addemplye } from "../controller/employee.controller.js"
const router: Router= exprss.Router()
router.post("/add-employee",addemplye)
export default router
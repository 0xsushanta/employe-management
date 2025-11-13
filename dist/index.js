import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log("server is running on", process.env.PORT);
});
//# sourceMappingURL=index.js.map
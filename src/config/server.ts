import express, { Response, Request, NextFunction, json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

export default class Server {
   app;
   port: Number;
   constructor() {
      this.app = express();
      this.port = Number(process.env.PORT) || 8000;
      this.app.use(json());
      this.app.use(morgan("dev"));
      this.CORS();
      this.routes();
   }

   routes() {
      this.app.get("/", (req: Request, res: Response) => {
         res.json({ successs: true });
      });
   }
   CORS() {
      this.app.use((req: Request, res: Response, next: NextFunction) => {
         res.header("Access-Control-Allow-Origin", "*");
         res.header(
            "Acess-Control-Allow-Headers",
            "Conten-Type, Authorization"
         );
         res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
         next();
      });
   }
   start() {
      this.app.listen(this.port, async () => {
         console.log(
            `Servidor corriendo exitosamente en el puerto ${this.port}`
         );
      });
   }
}

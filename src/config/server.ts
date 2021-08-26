import express, { Response, Request, NextFunction, json } from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import { imageRouter } from "../routes/image.routes";

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
      // const ectLocation = __dirname.slice(0, __dirname.search("src"));
      // this.app.use("/assets", express.static(ectLocation + "/media"));
      this.app.use(imageRouter);
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
         try {
            process.env.MONGODB_URI &&
               (await connect(process.env.MONGODB_URI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
               }));
            console.log("Base de datos sincronizada correctamente");
         } catch (error) {
            console.log("Error al conectarse a la DB", error);
         }
      });
   }
}

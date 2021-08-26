import { Router } from "express";
import Multer from "multer";
import {
   deleteImage,
   getImage,
   getImagesPhotography,
   postImage,
} from "../controllers/image.controllers";

export const imageRouter = Router();

// const storage = Multer.diskStorage({
//    destination: "media",
//    filename: (req: Request, file: Express.Multer.File, callback) => {
//       callback(null, file.originalname);
//    },
// });

const multer = Multer({ storage: Multer.memoryStorage() });

imageRouter.post("/uploadImage", multer.single("file"), postImage);
imageRouter.get("/images", getImagesPhotography);
imageRouter.get("/images/:id", getImage);
imageRouter.delete("/images/:id", deleteImage);

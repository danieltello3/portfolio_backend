import { Router } from "express";
import Multer from "multer";
import {
   createProject,
   deleteProject,
   getProject,
   getProjects,
} from "../controllers/project.controllers";

export const projectRouter = Router();

const multer = Multer({ storage: Multer.memoryStorage() });

projectRouter
   .route("/projects")
   .post(multer.single("file"), createProject)
   .get(getProjects);

projectRouter.route("/project/:id").get(getProject).delete(deleteProject);

import { Request, Response } from "express";
import { Proyecto } from "../models/project";

export const createProject = (req: Request, res: Response) => {};
export const getProjects = async (req: Request, res: Response) => {
   const projects = await Proyecto.find();
   res.status(200).json({
      success: true,
      content: projects,
      message: "lista de todos los proyectos",
   });
};
export const getProject = (req: Request, res: Response) => {};
export const deleteProject = (req: Request, res: Response) => {};

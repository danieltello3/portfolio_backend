import { Request, Response } from "express";
import { Proyecto } from "../models/project";
import { deleteFile, uploadFile } from "../utils/firebase";

export const createProject = async (req: Request, res: Response) => {
   const file = req.file;
   console.log(file);
   const { title, description, link, githubFront, githubBack, imagePath } =
      req.body;
   let githubLinks = {};
   if (githubFront) {
      githubLinks = { ...githubLinks, frontend: githubFront };
   }
   if (githubBack) {
      githubLinks = { ...githubLinks, backend: githubBack };
   }
   console.log(githubLinks);
   try {
      if (file) {
         const url = await uploadFile(file, imagePath);
         const newProject = await Proyecto.create({
            title,
            description,
            link,
            githubLinks,
            image: {
               name: file.originalname,
               path: imagePath,
               url,
            },
         });
         return res.status(201).json({
            success: true,
            content: newProject,
            message: "Proyecto creado exitosamente",
         });
      }
   } catch (error) {
      console.log(error);
      return res
         .status(400)
         .json({ success: true, content: null, message: error });
   }
};
export const getProjects = async (req: Request, res: Response) => {
   const projects = await Proyecto.find();
   res.status(200).json({
      success: true,
      content: projects,
      message: "lista de todos los proyectos",
   });
};
export const getProject = async (req: Request, res: Response) => {
   const { id } = req.params;
   const project = await Proyecto.findById(id);
   if (project) {
      return res.status(200).json({
         success: true,
         content: project,
         message: "proyecto encontrado con exito",
      });
   } else {
      return res.status(200).json({
         success: false,
         content: null,
         message: "proyecto no se encuentra en la bd",
      });
   }
};
export const deleteProject = async (req: Request, res: Response) => {
   const { id } = req.params;
   const deletedProject = await Proyecto.findByIdAndDelete(id);
   if (deletedProject) {
      await deleteFile(deletedProject.image.path, deletedProject.image.name);
      return res.status(200).json({
         success: true,
         content: deletedProject,
         message: "Proyecto eliminado exitosamente",
      });
   } else {
      return res.status(400).json({
         success: false,
         content: null,
         message: "No se encontro el proyecto con el id: " + id,
      });
   }
};

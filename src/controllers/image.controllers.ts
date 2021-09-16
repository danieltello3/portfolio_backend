import { Request, Response } from "express";

import { Imagen } from "../models/project";
import { deleteFile, uploadFile } from "../utils/firebase";

export const postImage = async (req: Request, res: Response) => {
   const { path } = req.body;
   console.log(req.file?.buffer);
   if (!path) {
      return res
         .status(400)
         .json({ success: false, message: "falta agregar el path" });
   }
   if (req.file) {
      const file = req.file;
      console.log(file);
      try {
         const link = await uploadFile(file, String(path));
         //aqui se agrega a la BD
         const newImage = await Imagen.create({
            ...req.body,
            url: link,
            name: file.originalname,
         });

         return res.status(201).json({
            success: true,
            content: newImage,
            message: "archivo subido exitosamente",
         });
      } catch (err) {
         console.log(err);
         return res.status(400).json({ success: false, message: err });
      }
   }
};

export const getImagesPhotography = async (req: Request, res: Response) => {
   const images = await Imagen.find({ path: "photography" });
   return res.status(200).json({
      success: true,
      content: images,
      message: "portafolio de fotos",
   });
};
export const getImage = async (req: Request, res: Response) => {
   const { id } = req.params;
   const image = await Imagen.findById(id);
   return res.status(200).json({
      success: true,
      content: image,
      message: "imagen encontrada",
   });
};
export const deleteImage = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const deletedImage = await Imagen.findByIdAndDelete(id);

      deletedImage && (await deleteFile(deletedImage.path, deletedImage.name));

      return res.status(200).json({
         success: true,
         content: deletedImage,
         message: "imagen eliminada exitosamente",
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({
         success: false,
         content: null,
         message: `Error al elimianr la imagen, ${error} `,
      });
   }
};

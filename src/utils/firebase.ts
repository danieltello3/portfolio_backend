import { Storage } from "@google-cloud/storage";
import { Express } from "express";

import dotenv from "dotenv";
dotenv.config();

const storage = new Storage({
   projectId: process.env.FIREBASE_PROJECT_ID,
   credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
   },
});

const bucket = storage.bucket(String(process.env.FIREBASE_STORAGE_BUCKET_URL));

export const uploadFile = (
   file: Express.Multer.File,
   path: string
): Promise<string> => {
   return new Promise((resolve, reject) => {
      if (!file) {
         reject("No se encontro el archivo");
      }

      const new_file = bucket.file(`${path}/${file.originalname}`);

      const blobStream = new_file.createWriteStream({
         metadata: { contentType: file.mimetype },
         public: true,
      });

      blobStream.on("error", (e) => {
         reject(e.message);
      });

      blobStream.on("finish", () => {
         try {
            const publicUrl = new_file.publicUrl();
            resolve(publicUrl);
         } catch (error) {
            reject(error);
         }
      });
      blobStream.end(file.buffer);
   });
};

export const deleteFile = async (path: string, fileName: string) => {
   try {
      const response = await bucket
         .file(`${path}/${fileName}`)
         .delete({ ignoreNotFound: true });
      return response;
   } catch (error) {
      console.log(error);
      return error;
   }
};

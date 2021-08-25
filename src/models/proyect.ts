import { model, Schema } from "mongoose";

interface IImage {
   name: string;
   location: string;
   date: Number;
   url: string;
}

interface IProyecto {
   title: string;
   image: IImage;
   description: string;
   link?: string;
   githubLinks?: string[];
}

const imageSchema = new Schema<IImage>(
   {
      name: {
         type: Schema.Types.String,
         required: true,
      },
      location: {
         type: Schema.Types.String,
         required: true,
      },
      date: {
         type: Schema.Types.Number,
         required: true,
      },
      url: {
         type: Schema.Types.String,
         required: true,
      },
   },
   { timestamps: false }
);

const proyectoSchema = new Schema<IProyecto>({
   title: {
      type: Schema.Types.String,
      required: true,
   },
   image: {
      type: imageSchema,
      required: true,
   },
   description: {
      type: Schema.Types.String,
      required: true,
   },
   link: { type: Schema.Types.String },
   githubLinks: { type: [Schema.Types.ObjectId] },
});

export const Imagen = model<IImage>("images", imageSchema);
export const Proyecto = model<IProyecto>("proyects", proyectoSchema);

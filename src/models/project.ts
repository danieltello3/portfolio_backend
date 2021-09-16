import { model, Schema } from "mongoose";

interface IImage {
   name: string;
   location?: string;
   width?: number;
   height?: number;
   date?: Number;
   path: string;
   url?: string;
}
interface IProject {
   title: string;
   image: IImage;
   description: string;
   link?: string;
   githubLinks?: Object;
}

interface IGithubLinks {
   frontend?: string;
   backend?: string;
}

interface IMail {
   name: string;
   email: string;
   phone?: number;
   message: string;
}

const githubLinkSchema = new Schema<IGithubLinks>({
   frontend: { type: Schema.Types.String },
   backend: { type: Schema.Types.String },
});

const mailSchema = new Schema<IMail>({
   name: { type: Schema.Types.String, required: true },
   email: { type: Schema.Types.String, required: true },
   phone: { type: Schema.Types.Number },
   message: { type: Schema.Types.String, required: true },
});

const imageSchema = new Schema<IImage>(
   {
      name: {
         type: Schema.Types.String,
         required: true,
      },
      location: {
         type: Schema.Types.String,
      },
      width: {
         type: Schema.Types.Number,
      },
      height: {
         type: Schema.Types.Number,
      },
      date: {
         type: Schema.Types.Number,
      },
      path: {
         type: Schema.Types.String,
         enum: ["projects", "photography"],
         required: true,
      },
      url: {
         type: Schema.Types.String,
         required: true,
      },
   },
   { versionKey: false }
);

const projectSchema = new Schema<IProject>(
   {
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
      githubLinks: { type: githubLinkSchema },
   },
   {
      versionKey: false,
   }
);

export const Imagen = model<IImage>("images", imageSchema);
export const Proyecto = model<IProject>("projects", projectSchema);
export const Mail = model<IMail>("contacts", mailSchema);

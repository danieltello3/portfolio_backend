import { model, Schema } from "mongoose";

interface IImage {
   name: string;
   location?: string;
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

const githubLinkSchema = new Schema<IGithubLinks>({
   frontend: { type: Schema.Types.String },
   backend: { type: Schema.Types.String },
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

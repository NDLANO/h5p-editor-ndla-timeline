import { H5PObject, H5PEditorObject } from "../../H5P";

export const H5P = (window as any).H5P as H5PObject;
export const H5PEditor = (window as any).H5PEditor as H5PEditorObject;
export const t: (
  translationKey: keyof typeof import("../../language/en.json").libraryStrings
) => string = H5PEditor.t.bind(null, "H5PEditor.Timeline");

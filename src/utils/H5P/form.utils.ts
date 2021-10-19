import { H5PEditor } from "../../h5p/H5P.util";
import { H5PField, H5PFieldCommon, H5PFieldGroup } from "../../types/h5p/H5PField";
import { H5PFieldType } from "../../types/h5p/H5PFieldType";

export const getTopicMapField = (semantics: H5PField): H5PField | null => {
  if (!H5PEditor.findSemanticsField) {
    console.error("no H5PEditor.findSemanticsField, finding it manually");
    return getSubfieldByName("eventItems", semantics);
  }

  const topicMapField = H5PEditor.findSemanticsField(
    "eventItems",
    semantics,
  );

  if (!topicMapField) {
    throw new Error("Could not find the `eventItems` field");
  }

  if (Array.isArray(topicMapField)) {
    console.error("`topicMapField` is an array", topicMapField);
    return topicMapField[0];
  }

  return topicMapField;
};

const getSubfieldByName = (name: string, semantics: H5PField): H5PField | null =>{
  if((<H5PFieldCommon>semantics).name === name) {
    return semantics;
  }

  if((<any>semantics).type === H5PFieldType.Group){
    for(const field of (<Array<H5PField>>(<any>semantics).fields)){
      let res = getSubfieldByName(name, field)
      if(res !== null) return res;
    }
  }
  return null;
}
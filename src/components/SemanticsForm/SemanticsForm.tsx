import * as React from "react";
import { H5PEditor, t } from "../../H5P/H5P.util";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { NDLATagsEditorParams } from "../../widgets/NDLATagsEditor.widget";
import { NDLATagsPickerParams } from "../../widgets/NDLATagsPicker.widget";
import styles from "./SemanticsForm.module.scss";

type SemanticsFormProps<Params> = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  onSave: (newParams: Params) => void;
  formClassName?: string;
};

export const SemanticsForm: React.FC<
  SemanticsFormProps<NDLATagsEditorParams | NDLATagsPickerParams>
> = ({ fields, params, parent, onSave, formClassName }) => {
  const generatedFormRef = React.useRef<HTMLDivElement>(null);
  const saveLabel = t("semantics-form_save");
  const [hasRendered, setHasRendered] = React.useState(false);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  React.useEffect(() => {
    if (!generatedFormRef.current || hasRendered) {
      return;
    }

    const $wrapper = H5PEditor.$(generatedFormRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, generatedFormRef, hasRendered]);

  return (
    <form
      className={`${formClassName ?? ""} h5peditor`}
      onSubmit={event => event.preventDefault()}
    >
      <div ref={generatedFormRef} />
      <button
        type="button"
        className={styles.saveButton}
        onClick={() => onSave(params)}
      >
        {saveLabel}
      </button>
    </form>
  );
};

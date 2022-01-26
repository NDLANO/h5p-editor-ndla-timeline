import * as React from "react";
import { H5PEditor } from "../../H5P/H5P.util";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import styles from "./SemanticsForm.module.scss";

export type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  onSave: (newParams: Params) => void;
  formClassName: string;
};

export const SemanticsForm: React.FC<SemanticsFormProps> = ({
  fields,
  params,
  parent,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const $wrapper = H5PEditor.$(wrapperRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, wrapperRef]);

  return <div className={styles.wrapper} ref={wrapperRef} />;
};

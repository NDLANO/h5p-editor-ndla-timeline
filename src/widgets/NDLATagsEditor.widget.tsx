import * as React from "react";
import * as ReactDOM from "react-dom";
import { H5PField, H5PFieldGroup } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { H5P } from "../H5P/H5P.util";
import { EditorTagType } from "../types/EditorTagType";
import { TagEditor } from "../components/TagEditor/TagEditor";
import { fillInMissingTagEditorParamsProperties } from "../utils/H5P/form.utils";

export type NDLATagsEditorParams = {
  tags: Array<EditorTagType>;
};

export class NDLATagsEditor extends H5P.EventDispatcher {
  public field: H5PField;

  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: NDLATagsEditorParams | undefined,
    setValue: H5PSetValue<NDLATagsEditorParams>,
  ) {
    super();
    this.wrapper = NDLATagsEditor.createWrapperElement();
    this.field = semantics;

    ReactDOM.render(
      <TagEditor
        tags={params?.tags ?? []}
        updateTags={tags => setValue(semantics, { tags })}
        params={fillInMissingTagEditorParamsProperties(params)}
        parent={parent}
        tagsField={semantics}
      />,
      this.wrapper,
    );
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-tags-editor` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-tags-editor");
  }

  validate(): boolean {
    return this.wrapper !== null;
  }

  remove(): void {
    /* Can't be empty, must exist */
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}

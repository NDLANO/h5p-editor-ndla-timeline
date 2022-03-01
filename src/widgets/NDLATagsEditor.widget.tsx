import * as React from "react";
import * as ReactDOM from "react-dom";
import { H5PField, H5PFieldGroup } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { H5P } from "../H5P/H5P.util";
import { TagType } from "../types/TagType";
// import { CategoriesWidgetApp } from "../CategoriesWidgetApp";

export type NDLATagsEditorParams = {
  tags: Array<Omit<TagType, "isActive">>;
};

export class NDLATagsEditor extends H5P.EventDispatcher {
  public field: H5PField;

  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: NDLATagsEditorParams,
    setValue: H5PSetValue<NDLATagsEditorParams>,
  ) {
    super();
    this.wrapper = NDLATagsEditor.createWrapperElement();
    this.field = semantics;

    ReactDOM.render(
      // <CategoriesWidgetApp
      //   semantics={semantics}
      //   setValue={updatedParams => setValue(semantics, updatedParams)}
      //   initialParams={params}
      //   parent={parent}
      // />,
      <div />,
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

import * as React from "react";
import * as ReactDOM from "react-dom";
import { NDLATagsPickerApp } from "../apps/NDLATagsPicker.app";
import { H5P } from "../H5P/H5P.util";
import { H5PField, H5PFieldList } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { PickerTagType } from "../types/PickerTagType";

export type NDLATagsPickerParams = {
  tags: Array<PickerTagType>;
};

export class NDLATagsPicker extends H5P.EventDispatcher {
  public field: H5PField;

  private wrapper: HTMLElement;

  private semantics: H5PFieldList & { fieldNameToWatch: string };

  constructor(
    parent: H5PForm,
    semantics: H5PFieldList & { fieldNameToWatch: string },
    params: NDLATagsPickerParams | undefined,
    setValue: H5PSetValue<NDLATagsPickerParams>,
  ) {
    super();
    this.wrapper = NDLATagsPicker.createWrapperElement();
    this.field = semantics;

    console.info("Tags picker", { params, semantics });

    if (!("fieldNameToWatch" in semantics)) {
      throw new Error(
        "Missing field `fieldNameToWatch`. It should be the name of the corresponding editor field",
      );
    }

    ReactDOM.render(
      <NDLATagsPickerApp
        updateTags={tags => setValue(semantics, { tags })}
        tags={params?.tags ?? []}
        fieldNameToWatch={semantics.fieldNameToWatch}
        parent={parent}
        label={semantics.label}
      />,
      this.wrapper,
    );

    this.semantics = semantics;
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-tags-picker` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    this.wrapper.className = `h5p-tags-picker field field-name-${this.semantics.name}`;
  }

  validate(): boolean {
    return this.wrapper !== null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(): void {}

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}

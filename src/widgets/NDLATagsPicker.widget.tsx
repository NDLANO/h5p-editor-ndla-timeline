import * as React from "react";
import * as ReactDOM from "react-dom";
import { NDLATagsPickerApp } from "../apps/NDLATagsPicker.app";
import { H5PFieldList } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { H5PWidget } from "../types/H5P/H5PWidget";
import { IH5PWidget } from "../types/H5P/IH5PWidget";
import { PickerTagType } from "../types/PickerTagType";

type Field = H5PFieldList & { fieldNameToWatch: string };

type Params = Array<PickerTagType>;

export class NDLATagsPicker
  extends H5PWidget<Field, Params>
  implements IH5PWidget
{
  constructor(
    parent: H5PForm,
    field: Field,
    tags: Params | undefined,
    setValue: H5PSetValue<Params>,
  ) {
    super(parent, field, tags, setValue);

    if (!("fieldNameToWatch" in field)) {
      throw new Error(
        "Missing field `fieldNameToWatch`. It should be the name of the corresponding editor field",
      );
    }
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-tags-picker` to.",
      );
      return;
    }

    const { parent, field, params: tags, setValue, wrapper } = this;

    wrapper.classList.add(
      "h5p-tags-picker",
      "field",
      `field-name-${field.name}`,
    );
    containerElement.appendChild(wrapper);

    ReactDOM.render(
      <NDLATagsPickerApp
        storeTags={newTags => setValue(field, newTags)}
        tags={tags ?? []}
        fieldNameToWatch={field.fieldNameToWatch}
        parent={parent}
        label={field.label}
      />,
      wrapper,
    );
  }

  validate(): boolean {
    return this.wrapper !== null;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(): void {}
}

/* eslint-disable no-console */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "../App";
import { H5PField, H5PFieldGroup } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { Params } from "../types/H5P/Params";
import { H5P } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher {
  public field: H5PField;

  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: Params,
    setValue: H5PSetValue,
  ) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();
    this.field = semantics;

    ReactDOM.render(
      <App
        setValue={newParams => setValue(semantics, newParams)}
        semantics={semantics}
        initialParams={params}
        parent={parent}
      />,
      this.wrapper,
    );
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-editor-timeline` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-timeline");
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

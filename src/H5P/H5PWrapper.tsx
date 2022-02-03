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
  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: Params,
    setValue: H5PSetValue,
  ) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

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

  attach([containerElement]: JQuery<HTMLElement>): void {
    console.log("H5PWrapper.attach", containerElement);
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-h5p-editor-timeline");
  }

  appendTo(containerElement: any): void {
    console.log("H5PWrapper.appendTo", containerElement);
    containerElement[0].appendChild(this.wrapper);
    console.log("H5PWrapper.appendTo", "adding class");
    containerElement[0].classList.add("h5p-timeline");
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

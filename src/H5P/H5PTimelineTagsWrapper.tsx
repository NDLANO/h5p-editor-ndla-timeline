/* eslint-disable no-console */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { CategoriesWidgetApp } from "../CategoriesWidgetApp";
import { H5PField, H5PFieldGroup } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { Params } from "../types/H5P/Params";
import { H5P } from "./H5P.util";

export class H5PTimelineTagsWrapper extends H5P.EventDispatcher {
  private wrapper: HTMLElement;

  // private categories: Array<{name:string}> | undefined;
  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: any,
    setValue: H5PSetValue,
  ) {
    super();
    this.wrapper = H5PTimelineTagsWrapper.createWrapperElement();
    // this.categories = parent.parent?.parent?.params.categories;
    
    // console.log("parent", parent)
    // console.log("categories", parent.parent?.parent?.params)
    ReactDOM.render(
      <CategoriesWidgetApp
        setValue={newParams => setValue(semantics, newParams)}
        semantics={semantics}
        initialParams={params}
        parent={parent}
      />
      , this.wrapper,
    );

  }

  attach([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-h5p-editor-timeline-tags");
  }

  appendTo(containerElement: any): void {
    containerElement[0].appendChild(this.wrapper);
    containerElement[0].classList.add("h5p-timeline-tags");
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

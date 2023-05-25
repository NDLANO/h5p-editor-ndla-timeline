import { NDLATagsPicker } from './src/widgets/NDLATagsPicker.widget';
import { H5PField } from './src/types/H5P/H5PField';
import { H5PForm } from './src/types/H5P/H5PForm';

declare class EventDispatcher {
  /**
   * Add new event listener.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   * @param {Object} [thisArg]
   *   Optionally specify the this value when calling listener.
   */
  on: (
    type: string,
    listener: (event: unknown) => void,
    thisArg?: ThisType<unknown>,
  ) => void;

  /**
   * Add new event listener that will be fired only once.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param type
   *   Event type
   * @param listener
   *   Event listener
   * @param thisArg
   *   Optionally specify the this value when calling listener.
   */
  once: (
    type: string,
    listener: (event: unknown) => void,
    thisArg?: ThisType<unknown>,
  ) => void;

  /**
   * Remove event listener.
   * If no listener is specified, all listeners will be removed.
   *
   * @throws {TypeError}
   *   listener must be a function
   * @param {string} type
   *   Event type
   * @param {H5P.EventCallback} listener
   *   Event listener
   */
  off: (type: string, listener: (event: unknown) => void) => void;

  /**
   * Dispatch event.
   *
   * @param {string|H5P.Event} event
   *   Event object or event type as string
   * @param {*} [eventData]
   *   Custom event data(used when event type as string is used as first
   *   argument).
   * @param {Object} [extras]
   * @param {boolean} [extras.bubbles]
   * @param {boolean} [extras.external]
   */
  trigger: (
    event: string | unknown,
    eventData?: unknown,
    extras?: {
      bubbles?: boolean;
      external?: boolean;
    },
  ) => void;
}

declare interface IH5PWrapper {
  attach($wrapper: JQuery<HTMLElement>): void;
}

declare interface IH5PEditorWrapper {
  appendTo($wrapper: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}

export interface H5PEditorObject {
  NDLATagsPicker: typeof NDLATagsPicker;
  widgets: {
    NDLATagsPicker: typeof NDLATagsPicker;
  };
  $: typeof jQuery;
  contentId: string;

  /**
   * Translate text strings.
   *
   * @param library The library name(machineName), or "core".
   * @param key Translation string identifier.
   * @param vars Placeholders and values to replace in the text.
   *
   * @returns Translated string, or a default text if the translation is missing.
   */
  t: (
    library: 'H5PEditor.NDLATimeline' | 'core',
    key: string,
    vars?: Record<string, string>,
  ) => string;

  /**
   * Recursive processing of the semantics chunks.
   *
   * @param semanticsChunk Array of semantics
   * @param params
   * @param $wrapper
   * @param parent
   */
  processSemanticsChunk: (
    semanticsChunk: H5PField | Array<H5PField>,
    params: unknown,
    $wrapper: JQuery<HTMLElement>,
    parent: H5PForm,
  ) => void;

  /**
   * Search for a field or a set of fields. Returns `null` if the field isn't found.
   *
   * @param fieldName
   * @param semanticsStructure
   */
  findSemanticsField: (
    fieldName: string,
    semanticsStructure: H5PField | Array<H5PField>,
  ) => H5PField | Array<H5PField> | null;
}

export interface H5PObject {
  EventDispatcher: typeof EventDispatcher;
  getPath: (path: string, contentId: string) => string;
  createUUID: () => string;
}

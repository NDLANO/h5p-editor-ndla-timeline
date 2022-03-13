export interface IH5PWidget {
  appendTo($container: JQuery<HTMLElement>): void;
  validate(): boolean;
  remove(): void;
}

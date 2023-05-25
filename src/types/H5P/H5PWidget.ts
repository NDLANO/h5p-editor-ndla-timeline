import { H5P } from '../../H5P/H5P.util';
import { H5PField } from './H5PField';
import { H5PForm } from './H5PForm';
import { H5PSetValue } from './H5PSetValue';

export class H5PWidget<
  Field extends H5PField,
  Params,
> extends H5P.EventDispatcher {
  public field: Field;

  protected parent: H5PForm;

  protected params: Params | undefined;

  protected setValue: H5PSetValue<Params>;

  protected wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    field: Field,
    params: Params | undefined,
    setValue: H5PSetValue<Params>,
  ) {
    super();
    this.wrapper = H5PWidget.createWrapperElement();

    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
  }

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement('div');
  }
}

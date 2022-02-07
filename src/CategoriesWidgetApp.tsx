/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { Grid } from "./components/Grid/Grid";
import { H5PField } from "./types/H5P/H5PField";
import { H5PForm } from "./types/H5P/H5PForm";
import { Params } from "./types/H5P/Params";
import {
  fillInMissingParamsProperties,
  getEmptyParams,
} from "./utils/H5P/form.utils";

type CategoriesWidgetAppProps = {
  setValue: (params: Params) => void;
  semantics: H5PField;
  initialParams: Partial<Params> | undefined;
  parent: H5PForm;
};

type CategoriesWidgetAppState = {
  categories: string[],
  selectedCategories: string[],
};

export const CategoriesWidgetApp: React.FC<CategoriesWidgetAppProps> = ({
  setValue,
  semantics,
  initialParams,
  parent,
}) => {
  // const [params, setParams] = React.useState<Params>(
  //   initialParams
  //     ? fillInMissingParamsProperties(initialParams)
  //     : getEmptyParams(),
  // );
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  
  // const categoriesRefersher = setInterval(() => {
  //   console.log("new calculated categories", parent.parent?.parent?.params.categories);
  //   setCategories(parent.parent?.parent?.params.categories);
  // }, 5000);

  // console.log("inital categories", categories);
  // useEffect(() => {
  //   console.log("new categories", categories);
  // }, [categories]);

  // useEffect(() => {
  //   console.log("new parent", parent);
  // }, [parent]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCategories(parent.parent?.parent?.params.categories ?  parent.parent?.parent?.params.categories.map(c => c.name): categories);
    }, 1000);  
    return()=>clearInterval(interval)
  },[]);


  return (
    <div className="field h5p-editor-timeline-tags">
      {/* <label className="h5peditor-label-wrapper" htmlFor="field-tags"> */}
        <span className="h5peditor-label h5peditor-required">Tags</span>
      {/* </label> */}
      <div className="tags">
        
        <div className="h5peditor-field-tag"><select onChange={(value) => {setSelectedCategories([...selectedCategories, value.currentTarget.value]) } }>
            <option value="">Select a tag</option>
            {categories.map((category, index) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      {selectedCategories.map((category, index) => (
        <div className="h5peditor-field-tag" key={category}>
          <span>{category}</span>
        </div>
      ))}
      <div className="h5p-errors"/>
    </div>
    
    
  );
};

// class App extends React.Component<Props> {
//   render(): JSX.Element {
//     const { adjective } = this.props;
//     return (
//       <>
//         <h1>Hi, you&apos;re {adjective}</h1>
//       </>
//     );
//   }
// }

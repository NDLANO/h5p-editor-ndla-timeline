import { Category } from "../Category";
import { Era } from "../Era";
import { EventItemType } from "../EventItemType";

export type Params = {
  showTitleSlide: boolean;
  titleSlide?: EventItemType;
  timelineItems?: Array<EventItemType>;
  categories?: Array<Category>;
  eras?: Array<Era>;
};

import * as React from "react";
import { EventItemType } from "../../types/EventItemType";
import styles from "./EventItem.module.scss";

type EventItemTypeWithoutPositions = Omit<
  EventItemType,
  | "xPercentagePosition"
  | "yPercentagePosition"
  | "widthPercentage"
  | "heightPercentage"
>;

export type EventItemProps = {
  item: EventItemTypeWithoutPositions;
};

export const EventItem: React.FC<EventItemProps> = ({ item }) => {
  return (
    <div className={styles.EventItem}>
      {item.backgroundImage?.path && (
        <img
          className={styles.image}
          src={item.backgroundImage.path}
          alt={item.backgroundImage.path}
        />
      )}

      {item.label !== "" && <div className={styles.inner}>
        <div className={styles.label}>{item.label}</div>
        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}
      </div>}
    </div>
  );
};

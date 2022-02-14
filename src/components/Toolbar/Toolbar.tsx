import * as React from "react";
import { t } from "../../H5P/H5P.util";
import { ToolbarButton } from "../ToolbarButton/ToolbarButton";
import styles from "./Toolbar.module.scss";

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ToolbarButtonType {
  MapColor = "mapColor",
  CreateBox = "createBox",
}

export type ToolBarProps = {
  setActiveTool: (activeTool: ToolbarButtonType | null) => void;
  activeTool: ToolbarButtonType | null;
};

export const Toolbar: React.FC<ToolBarProps> = ({
  setActiveTool,
  activeTool,
}) => {
  const labelTexts = {
    mapColor: t("toolbar-button-type_map-color"),
    createBox: t("toolbar-button-type_create-box"),
  };

  const [activeButton, setActiveButton] = React.useState<string | null>(
    activeTool,
  );

  const setActive = (newValue: ToolbarButtonType): void => {
    setActiveButton(activeButton !== newValue ? newValue : null);
    setActiveTool(activeButton !== newValue ? newValue : null);
  };

  const checkIfActive = React.useCallback(
    (type: ToolbarButtonType) => {
      const activeB = activeButton === type;
      const activeT = activeTool === type;

      if (activeB && activeT) {
        return true;
      }
      if (activeB && !activeT) {
        setActiveButton(activeTool);
        return true;
      }
      return false;
    },
    [activeButton, activeTool],
  );

  return (
    <div className={styles.toolbar}>
      <ToolbarButton
        icon={ToolbarButtonType.MapColor}
        label={labelTexts.mapColor}
        onClick={() => setActive(ToolbarButtonType.MapColor)}
        active={checkIfActive(ToolbarButtonType.MapColor)}
        showActive={false}
      />
      <ToolbarButton
        icon={ToolbarButtonType.CreateBox}
        label={labelTexts.createBox}
        onClick={() => setActive(ToolbarButtonType.CreateBox)}
        active={checkIfActive(ToolbarButtonType.CreateBox)}
        showActive
      />
    </div>
  );
};

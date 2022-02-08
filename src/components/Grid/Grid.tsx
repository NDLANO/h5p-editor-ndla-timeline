import * as React from "react";
import { DraggableType } from "../../types/DraggableType";
import { Element } from "../../types/Element";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import { OccupiedCell } from "../../types/OccupiedCell";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  createTopicMapItem,
  findHeightPercentage,
  findItem,
  findOccupiedCells,
  findWidthPercentage,
  isDraggingLeft,
  isDraggingUp,
  mapTopicMapItemToElement,
  positionIsFree,
  resizeItems,
  scaleX,
  scaleY,
  updateItem,
} from "../../utils/grid.utils";
import { Draggable } from "../Draggable/Draggable";
import { GridIndicator } from "../GridIndicator/GridIndicator";
import { ToolbarButtonType } from "../Toolbar/Toolbar";
import styles from "./Grid.module.scss";

export type GridProps = {
  numberOfColumns: number;
  numberOfRows: number;
  initialItems: Array<DraggableType>;
  updateItems: (items: Array<DraggableType>) => void;
  gapSize: number;
  children?: never;
  setActiveTool: (newValue: ToolbarButtonType | null) => void;
  activeTool: ToolbarButtonType | null;
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
};

export const Grid: React.FC<GridProps> = ({
  numberOfColumns,
  numberOfRows,
  initialItems,
  updateItems,
  gapSize,
  setActiveTool,
  activeTool,
  semantics,
  params,
  parent,
}) => {
  const [size, setSize] = React.useState<Size | null>();
  const [hasRendered, setHasRendered] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<Array<DraggableType>>(initialItems);

  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const [occupiedCells, setOccupiedCells] = React.useState<Array<OccupiedCell>>(
    [],
  );
  const [boxStartIndex, setBoxStartIndex] = React.useState<number | null>(null);
  const [arrowStartIndex, setArrowStartIndex] = React.useState<number | null>(
    null,
  );
  const [currentItemsLength, setCurrentItemsLength] = React.useState<number>(
    items.length,
  );

  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [resizedItemId, setResizedItemId] = React.useState<string | null>();
  const [resizeDirectionLock, setResizeDirectionLock] = React.useState<
    | "horizontal"
    | "horizontal-top"
    | "vertical-left"
    | "vertical"
    | "left"
    | "top"
    | "top-left"
    | "none"
  >("none");
  const [mouseOutsideGrid, setMouseOutsideGrid] =
    React.useState<boolean>(false);
  const [prevIndex, setPrevIndex] = React.useState<number | null>(null);
  const [editedItem, setEditedItem] = React.useState<string | null>();

  const elementRef = React.useRef<HTMLDivElement>(null);

  const setSelected = React.useCallback((newItem: string | null) => {
    setSelectedItem(newItem);
  }, []);

  const getGridIndicatorSize = React.useCallback(() => {
    if (!elementRef.current) {
      return 0;
    }

    const gridIndicator = elementRef.current.querySelector(".grid-indicator");
    if (!gridIndicator) {
      throw new Error("No grid indicators were rendered.");
    }

    const { width } = gridIndicator.getBoundingClientRect();

    /**
     * This number might differ from browser to browser, but it's hopefully (😬) ok.
     * We use it to counteract floating point number errors.
     */
    const numberOfSignificantDigits = 4;

    return (
      Math.round(width * 10 ** numberOfSignificantDigits) /
      10 ** numberOfSignificantDigits
    );

    // The grid's size is updated by external factors,
    // but still affects the grid indicator size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const gridIndicatorSize = React.useMemo(getGridIndicatorSize, [
    gapSize,
    getGridIndicatorSize,
    elementRef.current,
  ]);

  const updateItemSize = React.useCallback(
    (updatedItem: DraggableType, newSize: Size) => {
      if (!size) {
        throw new Error("Grid has no size.");
      }

      const newItems = updateItem(items, updatedItem, size.width, size.height, {
        newSize,
      });

      updateItems(newItems);
      setItems(newItems);

      setOccupiedCells(
        findOccupiedCells(
          items.map(item => mapTopicMapItemToElement(item, size)),
          size.width,
          size.height,
          gapSize,
          gridIndicatorSize,
        ),
      );
    },
    [gapSize, gridIndicatorSize, items, size, updateItems],
  );

  const createGridItemStart = React.useCallback(
    (index: number) => {
      if (activeTool === ToolbarButtonType.CreateBox) {
        setBoxStartIndex(index);
        setIsDragging(true);
      }
      if (activeTool === ToolbarButtonType.CreateArrow) {
        setArrowStartIndex(index);
        setIsDragging(true);
      }
    },
    [activeTool],
  );

  const createGridItemEnd = React.useCallback(() => {
    if (activeTool === ToolbarButtonType.CreateBox) {
      setIsDragging(false);
      setBoxStartIndex(null);
      setCurrentItemsLength(items.length);
      setActiveTool(null);

      if (items[currentItemsLength]) {
        setSelectedItem(items[currentItemsLength].id);
      }
    }
    if (activeTool === ToolbarButtonType.CreateArrow) {
      setIsDragging(false);
      setArrowStartIndex(null);
      setActiveTool(null);
    }
  }, [activeTool, items, setActiveTool, currentItemsLength]);

  const resizeBoxEnd = React.useCallback(() => {
    setPrevIndex(null);
    setResizedItemId(null);
    setBoxStartIndex(null);
    setResizeDirectionLock("none");
  }, []);

  const createBoxEnter = React.useCallback(
    (indicatorIndex: number) => {
      const isCreatingNewBox =
        activeTool === ToolbarButtonType.CreateBox && isDragging;
      if (!isCreatingNewBox) {
        return;
      }

      if (boxStartIndex == null) {
        throw new Error("Box start position is not defined.");
      }

      if (!size) {
        throw new Error("Grid has no size.");
      }

      const dragLeft = isDraggingLeft(
        indicatorIndex,
        boxStartIndex,
        numberOfColumns,
      );
      const dragUp = isDraggingUp(
        indicatorIndex,
        boxStartIndex,
        numberOfColumns,
        numberOfRows,
      );

      // Get x and y percentage position
      const x = dragLeft
        ? indicatorIndex % numberOfColumns
        : boxStartIndex % numberOfColumns;
      const y = dragUp
        ? Math.floor(indicatorIndex / numberOfColumns)
        : Math.floor(boxStartIndex / numberOfColumns);

      const xPercentagePosition = (x / numberOfColumns) * 100;
      const yPercentagePosition = (y / numberOfRows) * 100;

      // Get height percentage
      const yEnd = dragUp
        ? Math.floor(boxStartIndex / numberOfColumns)
        : Math.floor(indicatorIndex / numberOfColumns);
      const yEndPercentagePosition = ((yEnd + 1) / numberOfRows) * 100;

      const heightPercentage = yEndPercentagePosition - yPercentagePosition;

      // Get width percentage
      const indicatorValue = dragLeft ? boxStartIndex + 1 : indicatorIndex + 1;
      const lastIndexOnColumn = indicatorValue % numberOfColumns === 0;

      const xEnd = indicatorValue % numberOfColumns;
      const xEndPercentagePosition = lastIndexOnColumn
        ? 100
        : (xEnd / numberOfColumns) * 100;

      const widthPercentage = xEndPercentagePosition - xPercentagePosition;

      // Create box
      const alreadyAdded =
        items.length !== currentItemsLength &&
        items[currentItemsLength] != null;

      const newItem = createTopicMapItem();
      newItem.xPercentagePosition = xPercentagePosition;
      newItem.widthPercentage = widthPercentage;
      newItem.yPercentagePosition = yPercentagePosition;
      newItem.heightPercentage = heightPercentage;

      const newPosition = {
        x: scaleX(xPercentagePosition, size.width),
        y: scaleY(yPercentagePosition, size.height),
      };
      const newSize = {
        width: scaleX(widthPercentage, size.width),
        height: scaleY(heightPercentage, size.height),
      };

      const lastItem = items[currentItemsLength];
      const posIsFree = positionIsFree(
        newPosition,
        alreadyAdded ? lastItem.id : newItem.id,
        newSize,
        size,
        gapSize,
        gridIndicatorSize,
        occupiedCells,
      );

      if (posIsFree && !alreadyAdded) {
        const newItems = [...items, newItem];

        updateItems(newItems);
        setItems(newItems);
      }

      if (posIsFree && alreadyAdded) {
        if (dragLeft || dragUp) {
          const newItems = updateItem(
            items,
            lastItem,
            size.width,
            size.height,
            { newPosition, newSize },
          );

          updateItems(newItems);
          setItems(newItems);
        } else {
          updateItemSize(lastItem, newSize);
        }
      }
    },
    [
      activeTool,
      isDragging,
      boxStartIndex,
      size,
      numberOfColumns,
      numberOfRows,
      currentItemsLength,
      items,
      gapSize,
      gridIndicatorSize,
      occupiedCells,
      updateItems,
      updateItemSize,
    ],
  );

  const resizeBoxEnter = React.useCallback(
    (indicatorIndex: number) => {
      const isResizing = resizedItemId != null;
      if (!isResizing) {
        return;
      }

      if (boxStartIndex == null) {
        throw new Error("Box start position is not defined.");
      }

      if (!size) {
        throw new Error("Grid has no size.");
      }

      const existingItem = findItem(resizedItemId, items);
      if (!existingItem) {
        throw new Error(
          `Resized item with id "${resizedItemId}" does not exist`,
        );
      }

      const dragLeft =
        indicatorIndex % numberOfColumns <
        (prevIndex ?? indicatorIndex) % numberOfColumns;
      const dragUp = (prevIndex ?? indicatorIndex) >= indicatorIndex;

      const onlyScaleVertically = resizeDirectionLock.includes("horizontal");
      const onlyScaleHorizontally = resizeDirectionLock.includes("vertical");

      const leftHandle = resizeDirectionLock.includes("left");
      const topHandle = resizeDirectionLock.includes("top");

      // Get x and y percentage position
      const x = leftHandle
        ? indicatorIndex % numberOfColumns
        : boxStartIndex % numberOfColumns;

      const y = topHandle
        ? Math.floor(indicatorIndex / numberOfColumns)
        : Math.floor(boxStartIndex / numberOfColumns);

      const xPercentagePosition = onlyScaleVertically
        ? existingItem.xPercentagePosition
        : (x / numberOfColumns) * 100;
      const yPercentagePosition = onlyScaleHorizontally
        ? existingItem.yPercentagePosition
        : (y / numberOfRows) * 100;

      // Get height percentage
      const yEnd = topHandle
        ? Math.floor(
            (boxStartIndex + existingItem.widthPercentage) / numberOfColumns,
          )
        : Math.floor(indicatorIndex / numberOfColumns);
      const yEndPercentagePosition = ((yEnd + 1) / numberOfRows) * 100;

      const heightPercentage = findHeightPercentage(
        onlyScaleHorizontally,
        topHandle,
        dragUp,
        existingItem,
        yPercentagePosition,
        yEndPercentagePosition,
      );

      // Get width percentage
      const indicatorValue = indicatorIndex + 1;
      const lastIndexOnColumn = indicatorValue % numberOfColumns === 0;

      const xEnd = indicatorValue % numberOfColumns;
      const xEndPercentagePosition = lastIndexOnColumn
        ? 100
        : (xEnd / numberOfColumns) * 100;

      const widthPercentage = findWidthPercentage(
        onlyScaleVertically,
        leftHandle,
        dragLeft,
        existingItem,
        xPercentagePosition,
        xEndPercentagePosition,
      );

      const newPosition = {
        x: scaleX(xPercentagePosition, size.width),
        y: scaleY(yPercentagePosition, size.height),
      };
      const newSize = {
        width: scaleX(widthPercentage, size.width),
        height: scaleY(heightPercentage, size.height),
      };

      setPrevIndex(indicatorIndex);

      const posIsFree = positionIsFree(
        newPosition,
        existingItem.id,
        newSize,
        size,
        gapSize,
        gridIndicatorSize,
        occupiedCells,
      );

      if (posIsFree && isResizing) {
        if (leftHandle || topHandle) {
          const newItems = updateItem(
            items,
            existingItem,
            size.width,
            size.height,
            { newPosition, newSize },
          );

          updateItems(newItems);
          setItems(newItems);
        } else {
          updateItemSize(existingItem, newSize);
        }
      }
    },
    [
      resizedItemId,
      boxStartIndex,
      size,
      numberOfColumns,
      numberOfRows,
      items,
      gapSize,
      gridIndicatorSize,
      occupiedCells,
      updateItems,
      resizeDirectionLock,
      updateItemSize,
      prevIndex,
    ],
  );

  const cancelActions = React.useCallback(() => {
    const isCreatingNewBox =
      activeTool === ToolbarButtonType.CreateBox && isDragging;
    const isCreatingNewArrow =
      activeTool === ToolbarButtonType.CreateArrow && isDragging;
    const isResizing = resizedItemId != null;

    if (isCreatingNewBox || isCreatingNewArrow) {
      createGridItemEnd();
    }
    if (isResizing) {
      resizeBoxEnd();
    }
    if (!mouseOutsideGrid) {
      setMouseOutsideGrid(true);
    }
  }, [
    activeTool,
    isDragging,
    resizedItemId,
    createGridItemEnd,
    resizeBoxEnd,
    mouseOutsideGrid,
  ]);

  const activeHoverOnGrid = React.useMemo(() => {
    switch (activeTool) {
      case ToolbarButtonType.CreateBox:
        return true;
      case ToolbarButtonType.CreateArrow:
        return true;
      default:
        return false;
    }
  }, [activeTool]);

  const gridIndicators = React.useMemo(
    () =>
      Array(numberOfColumns * numberOfRows)
        .fill(null)
        .map((_, index) => (
          <GridIndicator
            // eslint-disable-next-line react/no-array-index-key
            key={`grid-indicator-${index}`}
            index={index}
            onMouseDown={createGridItemStart}
            onMouseEnter={indicatorIndex => {
              const isResizing = resizedItemId != null;
              if (isResizing) {
                resizeBoxEnter(indicatorIndex);
              }
              createBoxEnter(indicatorIndex);
            }}
            active={activeHoverOnGrid}
          />
        )),
    // We need to update the value of grid indicators each time `activeTool` or `items`
    // are changed because they affect how the `gridIndicator` click events work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      numberOfColumns,
      numberOfRows,
      activeTool,
      items,
      boxStartIndex,
      activeHoverOnGrid,
      currentItemsLength,
      isDragging,
    ],
  );

  const updateItemPosition = React.useCallback(
    (updatedItem: DraggableType, newPosition: Position) => {
      if (!size) {
        throw new Error("Grid has no size.");
      }

      const newItems = updateItem(items, updatedItem, size.width, size.height, {
        newPosition,
      });

      updateItems(newItems);
      setItems(newItems);

      const elements: Array<Element> = items.map(item =>
        mapTopicMapItemToElement(item, size),
      );

      const newOccupiedCells = findOccupiedCells(
        elements,
        size.width,
        size.height,
        gapSize,
        gridIndicatorSize,
      );

      setOccupiedCells(newOccupiedCells);
    },
    [gapSize, gridIndicatorSize, items, size, updateItems],
  );

  const deleteItem = React.useCallback(
    (id: string) => {
      /* TODO: Add dialog to confirm delete */
      const newItems = items.filter(item => item.id !== id);

      updateItems(newItems);
      setItems(newItems);
      setCurrentItemsLength(newItems.length);
    },
    [items, updateItems],
  );

  const children = React.useMemo(() => {
    if (gapSize == null || gridIndicatorSize == null || size == null) {
      return null;
    }

    return items.map(item => (
      <Draggable
        key={item.id}
        id={item.id}
        initialXPosition={scaleX(item.xPercentagePosition, size.width)}
        initialYPosition={scaleY(item.yPercentagePosition, size.height)}
        updatePosition={newPosition => updateItemPosition(item, newPosition)}
        initialWidth={Math.abs(scaleX(item.widthPercentage, size.width))}
        initialHeight={Math.abs(scaleY(item.heightPercentage, size.height))}
        gapSize={gapSize}
        gridIndicatorSize={gridIndicatorSize}
        gridSize={size}
        occupiedCells={occupiedCells}
        isPreview={isDragging}
        editItem={setEditedItem}
        deleteItem={deleteItem}
        setSelectedItem={setSelected}
        selectedItem={selectedItem}
        startResize={directionLock => {
          const x = Math.floor(
            (item.xPercentagePosition / 100) * numberOfColumns,
          );
          const y = Math.floor((item.yPercentagePosition / 100) * numberOfRows);
          const cellIndex = x + y * numberOfColumns;

          setBoxStartIndex(cellIndex);
          setResizedItemId(item.id);
          setResizeDirectionLock(directionLock);
        }}
        mouseOutsideGrid={mouseOutsideGrid}
        showScaleHandles
        isArrow={false}
      >
        <div />
        {/* <TopicMapItem item={item} /> */}
      </Draggable>
    ));
  }, [
    gapSize,
    gridIndicatorSize,
    size,
    items,
    occupiedCells,
    isDragging,
    deleteItem,
    setSelected,
    selectedItem,
    mouseOutsideGrid,
    updateItemPosition,
    numberOfColumns,
    numberOfRows,
  ]);

  const resize = React.useCallback(() => {
    window.requestAnimationFrame(() => {
      if (!elementRef.current) {
        return;
      }

      const { width, height } = elementRef.current.getBoundingClientRect();

      const isFirstRender = size == null;
      if (!isFirstRender) {
        const scaleFactor = (size?.width ?? 0) / width;

        if (scaleFactor !== 1) {
          setItems(resizeItems(items, scaleFactor));
        }
      }

      setSize({ width, height });
    });
  }, [items, size]);

  React.useEffect(() => {
    if (hasRendered) {
      return;
    }

    const windowClickListener = (event: MouseEvent | TouchEvent): void => {
      const draggableWasClicked = !!(event.target as HTMLElement).closest(
        ".draggable",
      );

      if (!draggableWasClicked) {
        setSelectedItem(null);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousedown", windowClickListener);
    window.addEventListener("touchstart", windowClickListener);

    // Resize once on first render
    resize();
  }, [hasRendered, items, resize, selectedItem, size]);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  React.useEffect(() => {
    resize();

    // The grid's number of rows/columns might be updated by external factors,
    // but still affects the grid indicator size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfColumns, numberOfRows]);

  React.useEffect(() => {
    if (!size) {
      return;
    }

    setOccupiedCells(
      findOccupiedCells(
        items.map(item => mapTopicMapItemToElement(item, size)),
        size.width,
        size.height,
        gapSize,
        gridIndicatorSize,
      ),
    );
  }, [gapSize, gridIndicatorSize, items, size]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={elementRef}
      role="application" /* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role */
      className={styles.grid}
      style={{
        // @ts-expect-error Custom properties should be allowed
        "--gap-size": `${gapSize}px`,
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
        gridTemplateRows: `repeat(${numberOfRows}, 1fr)`,
        cursor: isDragging ? "pointer" : "auto",
      }}
      onMouseUp={() => {
        createGridItemEnd();
        resizeBoxEnd();
      }}
      onMouseLeave={() => cancelActions()}
      onMouseEnter={() => {
        if (mouseOutsideGrid) {
          setMouseOutsideGrid(false);
        }
      }}
    >
      {children}
      {gridIndicators}
      {/* {semantics && editedItem && (''
        // TODO: Move into a modal window
        <TopicMapItemForm
          semantics={semantics}
          params={params}
          parent={parent}
        />
      )} */}
    </div>
  );
};
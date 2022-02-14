import { v4 as uuidV4 } from "uuid";
import { Cell } from "../types/Cell";
import { Element } from "../types/Element";
import { OccupiedCell } from "../types/OccupiedCell";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { arraysHaveSomeOverlap } from "./array.utils";
import { GridItem } from "../types/GridItem";
import { BlockType } from "../types/BlockType";

export const resizeItem = (item: GridItem, scaleFactor: number): GridItem => {
  const resizedItem = {
    ...item,
    height: item.height * scaleFactor,
    width: item.width * scaleFactor,
    x: item.x * scaleFactor,
    y: item.y * scaleFactor,
  };

  return resizedItem;
};

export const resizeItems = (
  items: Array<GridItem>,
  scaleFactor: number,
): Array<GridItem> => items.map(item => resizeItem(item, scaleFactor));

export const calculateXPercentage = (xPx: number, width: number): number => {
  return (xPx / width) * 100;
};

export const calculateYPercentage = (yPx: number, height: number): number => {
  return (yPx / height) * 100;
};

export const updateItem = (
  items: Array<GridItem>,
  updatedItem: GridItem,
  width: number,
  height: number,
  { newPosition, newSize }: { newPosition?: Position; newSize?: Size },
): Array<GridItem> => {
  const newItems = items.map((item: GridItem) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const newItem: GridItem = {
      ...item,
    };

    if (newPosition) {
      newItem.x = calculateXPercentage(newPosition.x, width);
      newItem.y = calculateYPercentage(newPosition.y, height);
    }

    if (newSize) {
      newItem.width = calculateXPercentage(newSize.width, width);
      newItem.height = calculateYPercentage(newSize.height, height);
    }

    return newItem;
  });

  return newItems;
};

export const getAllCells = (
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<Cell> => {
  const cells: Array<Cell> = [];

  const stepSize = gapSize + gridIndicatorSize;
  let currentIndex = 0;

  for (let y = 0; y < gridHeight; y += stepSize) {
    for (let x = 0; x < gridWidth; x += stepSize) {
      cells.push({
        x,
        y,
        index: currentIndex,
      });

      currentIndex += 1;
    }
  }

  return cells;
};

export const cellIsOccupiedByElement = (
  elementPosition: Position,
  elementSize: Size,
  cellPosition: Position,
): boolean =>
  cellPosition.x >= elementPosition.x &&
  cellPosition.x <= elementPosition.x + elementSize.width &&
  cellPosition.y >= elementPosition.y &&
  cellPosition.y <= elementPosition.y + elementSize.height;

export const findCellsElementOccupies = (
  { id, position, size }: Element,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<OccupiedCell> => {
  const allCells = getAllCells(
    gridWidth,
    gridHeight,
    gapSize,
    gridIndicatorSize,
  );

  const occupiedCells = allCells
    .filter(cell => cellIsOccupiedByElement(position, size, cell))
    .map(({ x, y, index }) => ({
      occupiedById: id,
      x,
      y,
      index,
    }));

  return occupiedCells;
};

export const findOccupiedCells = (
  elements: Array<Element>,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<OccupiedCell> => {
  const occupiedCells: Array<OccupiedCell> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    occupiedCells.push(
      ...findCellsElementOccupies(
        element,
        gridWidth,
        gridHeight,
        gapSize,
        gridIndicatorSize,
      ),
    );
  }

  return occupiedCells;
};

export const scaleX = (xPercentage: number, gridWidth: number): number =>
  (gridWidth * xPercentage) / 100;

export const scaleY = (yPercentage: number, height: number): number =>
  (height * yPercentage) / 100;

export const mapGridItemToElement = (
  item: GridItem,
  gridSize: Size,
): Element => ({
  id: item.id,
  position: {
    x: scaleX(item.x, gridSize.width),
    y: scaleY(item.y, gridSize.height),
  },
  size: {
    width: scaleX(item.width, gridSize.width),
    height: scaleY(item.height, gridSize.height),
  },
});

export const positionIsFree = (
  newPosition: Position,
  elementId: string,
  elementSize: Size,
  gridSize: Size,
  gapSize: number,
  gridIndicatorSize: number,
  occupiedCells: Array<OccupiedCell>,
): boolean => {
  const cellsThisElementWillOccupy = findCellsElementOccupies(
    {
      id: elementId,
      position: newPosition,
      size: elementSize,
    },
    gridSize.width,
    gridSize.height,
    gapSize,
    gridIndicatorSize,
  );

  const cellsOccupiedByOtherElements = occupiedCells.filter(
    cell => cell.occupiedById !== elementId,
  );

  const posIsFree = !arraysHaveSomeOverlap(
    cellsOccupiedByOtherElements,
    cellsThisElementWillOccupy,
  );

  return posIsFree;
};

export const coordinatePosToPx = (
  coordinate: number,
  gapSize: number,
  gridIndicatorSize: number,
): number => {
  const stepSize = gapSize + gridIndicatorSize;

  return coordinate * stepSize;
};

export const coordinateSizeToPx = (
  coordinate: number,
  gapSize: number,
  gridIndicatorSize: number,
): number => {
  return coordinate * gridIndicatorSize + (coordinate - 1) * gapSize;
};

export const isDraggingLeft = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
): boolean =>
  boxStartPosition % numberOfColumns >= indicatorIndex % numberOfColumns;

export const isDraggingUp = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
  numberOfRows: number,
): boolean =>
  (Math.floor(boxStartPosition / numberOfColumns) / numberOfRows) * 100 >=
  (Math.floor(indicatorIndex / numberOfColumns) / numberOfRows) * 100;

export const findWidth = (
  onlyScaleVertically: boolean,
  leftHandle: boolean,
  dragLeft: boolean,
  existingItem: GridItem,
  x: number,
  xEnd: number,
): number => {
  if (onlyScaleVertically) {
    return existingItem.width;
  }
  if (leftHandle && !dragLeft) {
    return existingItem.width - (x - existingItem.x);
  }
  if (leftHandle && dragLeft) {
    return existingItem.width + (existingItem.x - x);
  }
  return xEnd - x;
};

export const findHeight = (
  onlyScaleHorizontally: boolean,
  topHandle: boolean,
  dragUp: boolean,
  existingItem: GridItem,
  y: number,
  yEnd: number,
): number => {
  if (onlyScaleHorizontally) {
    return existingItem.height;
  }
  if (topHandle && dragUp) {
    return existingItem.height + (existingItem.y - y);
  }
  if (topHandle && !dragUp) {
    return existingItem.height - (y - existingItem.y);
  }
  return yEnd - y;
};

export const createGridItem = (blockType: BlockType): GridItem => {
  const id = uuidV4();

  const item: GridItem = {
    id,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    type: blockType,
  };

  return item;
};

export const findItem = (
  id: string,
  items: Array<GridItem>,
): GridItem | null => {
  if (!id) {
    return null;
  }

  return items.find(item => item.id === id) ?? null;
};

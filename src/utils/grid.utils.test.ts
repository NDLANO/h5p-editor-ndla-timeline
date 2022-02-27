import fc from "fast-check";
import { Cell } from "../types/Cell";
import { Element } from "../types/Element";
import { GridItem } from "../types/GridItem";
import { OccupiedCell } from "../types/OccupiedCell";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import {
  calculateXPercentage,
  calculateYPercentage,
  cellIsOccupiedByElement,
  coordinatePosToPx,
  findCellsElementOccupies,
  getAllCells,
  positionIsFree,
  resizeItem,
  updateItem,
} from "./grid.utils";

describe(resizeItem.name, () => {
  it("should scale the item down if the scale factor is lower than 1", () => {
    const item: GridItem = {
      id: "test",
      x: 10,
      y: 10,
      width: 20,
      height: 20,
      type: "title",
    };

    const scaleFactor = 0.5;

    const expectedItem: GridItem = {
      id: "test",
      x: 5,
      y: 5,
      width: 10,
      height: 10,
      type: "title",
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should scale the item down if the scale factor is greater than 1", () => {
    const item: GridItem = {
      id: "test",
      x: 10,
      y: 10,
      width: 20,
      height: 20,
      type: "title",
    };

    const scaleFactor = 2;

    const expectedItem: GridItem = {
      id: "test",
      x: 20,
      y: 20,
      width: 40,
      height: 40,
      type: "title",
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should do nothing if the scale factor is 1", () => {
    const item: GridItem = {
      id: "test",
      x: 10,
      y: 10,
      width: 20,
      height: 20,
      type: "title",
    };

    const scaleFactor = 1;

    const expectedItem: GridItem = {
      id: "test",
      x: 10,
      y: 10,
      width: 20,
      height: 20,
      type: "title",
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should handle any number", () =>
    fc.assert(
      fc.property(fc.double(), scaleFactor => {
        const item: GridItem = {
          id: "test",
          x: 10,
          y: 10,
          width: 20,
          height: 20,
          type: "title",
        };

        const expectedItem: GridItem = {
          id: "test",
          x: 10 * scaleFactor,
          y: 10 * scaleFactor,
          width: 20 * scaleFactor,
          height: 20 * scaleFactor,
          type: "title",
        };

        const actualItem = resizeItem(item, scaleFactor);

        expect(actualItem).toEqual(expectedItem);
      }),
      { verbose: true },
    ));
});

describe(calculateXPercentage.name, () => {
  it("should calculate the x value's percentage of the total width", () => {
    const xValue = 10;
    const width = 100;

    const expectedPercentage = 10;
    const actualPercentage = calculateXPercentage(xValue, width);

    expect(actualPercentage).toBe(expectedPercentage);
  });
});

describe(calculateYPercentage.name, () => {
  it("should calculate the y value's percentage of the total height", () => {
    const xValue = 10;
    const height = 100;

    const expectedPercentage = 10;
    const actualPercentage = calculateYPercentage(xValue, height);

    expect(actualPercentage).toBe(expectedPercentage);
  });
});

describe(updateItem.name, () => {
  it("should find the item in the items list and update the position and size based on the grid's width and height", () => {
    const item: GridItem = {
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    };

    const items: Array<GridItem> = [
      item,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem = {
      id: "1",
      x: 5,
      y: 10,
      width: 20,
      height: 20,
      type: "title",
    };

    const actualItems = updateItem(items, item, width, height, {
      newPosition,
      newSize,
    });

    expect(actualItems).toEqual([
      expectedItem,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ]);
  });

  it("should update without changing the list, and without changing the item object itself", () => {
    const item: GridItem = {
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    };

    const items: Array<GridItem> = [
      item,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    updateItem(items, item, width, height, { newPosition, newSize });

    expect(item).toEqual({
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    });

    expect(items[0]).toEqual({
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    });

    expect(items[1]).toEqual({
      id: "2",
      x: 25,
      y: 60,
      width: 65,
      height: 32,
      type: "title",
    });
  });

  it("should be able to update only the size", () => {
    const item: GridItem = {
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    };

    const items: Array<GridItem> = [
      item,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ];

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem: GridItem = {
      id: "1",
      x: 25,
      y: 20,
      width: 20,
      height: 20,
      type: "title",
    };

    const actualItems = updateItem(items, item, width, height, {
      newSize,
    });

    expect(actualItems).toEqual([
      expectedItem,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ]);
  });

  it("should be able to update only the position", () => {
    const item: GridItem = {
      id: "1",
      x: 25,
      y: 20,
      width: 10,
      height: 10,
      type: "title",
    };

    const items: Array<GridItem> = [
      item,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem: GridItem = {
      id: "1",
      x: 5,
      y: 10,
      width: 10,
      height: 10,
      type: "title",
    };

    const actualItems = updateItem(items, item, width, height, {
      newPosition,
    });

    expect(actualItems).toEqual([
      expectedItem,
      {
        id: "2",
        x: 25,
        y: 60,
        width: 65,
        height: 32,
        type: "title",
      },
    ]);
  });
});

describe(findCellsElementOccupies.name, () => {
  /*
    The grid looks like this:
    ([ ] = grid indicator)

    [ ] [ ] [ ] [ ]
    [ ] [ ] [ ] [ ]
    [ ] [ ] [ ] [ ]
    [ ] [ ] [ ] [ ]
  */

  const gapSize = 5;
  const gridIndicatorSize = 10;
  const gridWidth = 55;
  const gridHeight = 55;

  it("should return an array of all the cells that the element occupies (1*1)", () => {
    const element: Element = {
      id: "1",
      position: { x: 0, y: 0 },
      size: { width: 10, height: 10 },
    };

    const expectedCells: Array<OccupiedCell> = [
      {
        occupiedById: "1",
        x: 0,
        y: 0,
        index: 0,
      },
    ];

    const actualCells = findCellsElementOccupies(
      element,
      gridWidth,
      gridHeight,
      gapSize,
      gridIndicatorSize,
    );

    expect(actualCells).toEqual(expectedCells);
  });

  it("should return an array of all the cells that the element occupies (2*2)", () => {
    const element: Element = {
      id: "1",
      position: { x: 0, y: 0 },
      size: { width: 25, height: 25 },
    };

    const expectedCells: Array<OccupiedCell> = [
      {
        occupiedById: "1",
        x: 0,
        y: 0,
        index: 0,
      },
      {
        occupiedById: "1",
        x: 15,
        y: 0,
        index: 1,
      },
      {
        occupiedById: "1",
        x: 0,
        y: 15,
        index: 4,
      },
      {
        occupiedById: "1",
        x: 15,
        y: 15,
        index: 5,
      },
    ];

    const actualCells = findCellsElementOccupies(
      element,
      gridWidth,
      gridHeight,
      gapSize,
      gridIndicatorSize,
    );

    expect(actualCells).toEqual(expectedCells);
  });

  it("should return an array of all the cells that the element occupies (2*1 translated)", () => {
    const element: Element = {
      id: "1",
      position: { x: 30, y: 45 },
      size: { width: 25, height: 10 },
    };

    const expectedCells: Array<OccupiedCell> = [
      {
        occupiedById: "1",
        x: 30,
        y: 45,
        index: 14,
      },
      {
        occupiedById: "1",
        x: 45,
        y: 45,
        index: 15,
      },
    ];

    const actualCells = findCellsElementOccupies(
      element,
      gridWidth,
      gridHeight,
      gapSize,
      gridIndicatorSize,
    );

    expect(actualCells).toEqual(expectedCells);
  });
});

describe(getAllCells.name, () => {
  it("should return exactly as many cells as there should be", () => {
    /*
      The grid looks like this:
      ([ ] = grid indicator)

      [ ] [ ]
      [ ] [ ]
    */
    const gapSize = 5;
    const gridIndicatorSize = 10;
    const gridWidth = 25;
    const gridHeight = 25;

    const expectedCells: Array<Cell> = [
      { x: 0, y: 0, index: 0 },
      { x: 15, y: 0, index: 1 },
      { x: 0, y: 15, index: 2 },
      { x: 15, y: 15, index: 3 },
    ];
    const actualCells = getAllCells(
      gridWidth,
      gridHeight,
      gapSize,
      gridIndicatorSize,
    );

    expect(actualCells).toEqual(expectedCells);
  });
});

describe(cellIsOccupiedByElement.name, () => {
  /*
      We have placed an element in (1, 1) with the dimensions w: 3, h: 3.

      The grid looks like this:
      ([ ] = grid indicator)
      ([x] = our 3*3 element)

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

  const gapSize = 5;
  const gridIndicatorSize = 10;

  const elementPosition: Position = {
    x: 1 * gapSize + 1 * gridIndicatorSize,
    y: 1 * gapSize + 1 * gridIndicatorSize,
  };
  const elementSize: Size = {
    width: 2 * gapSize + 3 * gridIndicatorSize,
    height: 2 * gapSize + 3 * gridIndicatorSize,
  };

  it("should return true if the cell is in the top left corner of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [C] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 1 * gapSize + 1 * gridIndicatorSize,
      y: 1 * gapSize + 1 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is at the top edge of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [C] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 2 * gapSize + 2 * gridIndicatorSize,
      y: 1 * gapSize + 1 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is in the top right corner of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [C] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 3 * gapSize + 3 * gridIndicatorSize,
      y: 1 * gapSize + 1 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is at the right edge of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [C] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 3 * gapSize + 3 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is in the lower right corner of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [C] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 3 * gapSize + 3 * gridIndicatorSize,
      y: 3 * gapSize + 3 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is at the lower edge of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [C] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 2 * gapSize + 2 * gridIndicatorSize,
      y: 3 * gapSize + 3 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is in the lower left corner of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [C] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 1 * gapSize + 1 * gridIndicatorSize,
      y: 3 * gapSize + 3 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is at the left edge of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [C] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 1 * gapSize + 1 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return true if the cell is in the middle of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [X] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 2 * gapSize + 2 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = true;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return false if the cell is above the element", () => {
    /*
      Current cell: C

      [ ] [ ] [C] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 2 * gapSize + 2 * gridIndicatorSize,
      y: 0 * gapSize + 0 * gridIndicatorSize,
    };

    const expected = false;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return false if the cell is to the right of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [C]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 4 * gapSize + 4 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = false;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return false if the cell is below the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [C] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 4 * gapSize + 4 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = false;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });

  it("should return false if the cell is to the left of the element", () => {
    /*
      Current cell: C

      [ ] [ ] [ ] [ ] [ ]
      [ ] [x] [x] [x] [ ]
      [C] [x] [x] [x] [ ]
      [ ] [x] [x] [x] [ ]
      [ ] [ ] [ ] [ ] [ ]
    */

    const cellPosition: Position = {
      x: 0 * gapSize + 0 * gridIndicatorSize,
      y: 2 * gapSize + 2 * gridIndicatorSize,
    };

    const expected = false;
    const actual = cellIsOccupiedByElement(
      elementPosition,
      elementSize,
      cellPosition,
    );

    expect(actual).toBe(expected);
  });
});

describe(positionIsFree.name, () => {
  /*
    We have placed an element in (2, 1) with the dimensions w: 2, h: 3.

    The grid looks like this:
    ([ ] = grid indicator)
    ([x] = our 2*3 element)

        0  15  30  45
     0 [ ] [ ] [ ] [ ]
    15 [ ] [ ] [x] [x]
    30 [ ] [ ] [x] [x]
    45 [ ] [ ] [x] [x]
  */

  const gapSize = 5;
  const gridIndicatorSize = 10;

  const occupiedCells: Array<OccupiedCell> = [
    {
      index: 6,
      occupiedById: "1",
      x: coordinatePosToPx(2, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(1, gapSize, gridIndicatorSize),
    },
    {
      index: 7,
      occupiedById: "1",
      x: coordinatePosToPx(3, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(1, gapSize, gridIndicatorSize),
    },
    {
      index: 10,
      occupiedById: "1",
      x: coordinatePosToPx(2, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(2, gapSize, gridIndicatorSize),
    },
    {
      index: 11,
      occupiedById: "1",
      x: coordinatePosToPx(3, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(2, gapSize, gridIndicatorSize),
    },
    {
      index: 14,
      occupiedById: "1",
      x: coordinatePosToPx(2, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(3, gapSize, gridIndicatorSize),
    },
    {
      index: 15,
      occupiedById: "1",
      x: coordinatePosToPx(3, gapSize, gridIndicatorSize),
      y: coordinatePosToPx(3, gapSize, gridIndicatorSize),
    },
  ];

  const gridSize: Size = { width: 55, height: 55 };
  const elementId = "2";

  it("should return true if the element fits in the proposed location", () => {
    /*
      New element: 2

          0  15  30  45
       0 [2] [2] [ ] [ ]
      15 [2] [2] [x] [x]
      30 [2] [2] [x] [x]
      45 [2] [2] [x] [x]
    */
    const elementSize: Size = { width: 25, height: 55 };
    const newPosition: Position = { x: 0, y: 0 };

    const expected = true;
    const actual = positionIsFree(
      newPosition,
      elementId,
      elementSize,
      gridSize,
      gapSize,
      gridIndicatorSize,
      occupiedCells,
    );

    expect(actual).toBe(expected);
  });

  it("should return false if the element does not fit in the proposed location", () => {
    /*
      New element: 2

          0  15  30  45
       0 [ ] [ ] [ ] [ ]
      15 [ ] [ ] [x] [x]
      30 [ ] [ ] [x] [x]
      45 [2] [2] [x2] [x]
    */
    const elementSize: Size = { width: 40, height: 10 };
    const newPosition: Position = { x: 0, y: 45 };

    const expected = false;
    const actual = positionIsFree(
      newPosition,
      elementId,
      elementSize,
      gridSize,
      gapSize,
      gridIndicatorSize,
      occupiedCells,
    );

    expect(actual).toBe(expected);
  });
});
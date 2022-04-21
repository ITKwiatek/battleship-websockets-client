import { Orientation } from "./OrientationEnum";
import { ShipTypes } from "./ShipTypesEnum";

export class ShipInitialModel {
    ShipType: ShipTypes;
    ShipCount: number;
    Orientation: Orientation;

  constructor(ShipType: ShipTypes, ShipCount: number, Orientation: Orientation) {
    this.ShipType = ShipType
    this.ShipCount = ShipCount
    this.Orientation = Orientation
  }
}

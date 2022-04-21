import { PlayersTurn } from "./PlayersTurnEnum";
import { ShipInitialModel } from "./ShipsInitialModel";

export class GameProperties {
    Player1Id:number;
    Player2Id:number;
    BattleFieldRows:number;
    BattleFieldColumns:number;
    Ships:Array<ShipInitialModel>;
    FirstTurn:PlayersTurn;

  constructor(
    Player1Id: number, 
    Player2Id: number, 
    BattleFieldRows: number, 
    BattleFieldColumns: number, 
    FirstTurn: PlayersTurn,
    Ships:Array<ShipInitialModel>
) {
    this.Player1Id = Player1Id
    this.Player2Id = Player2Id
    this.BattleFieldRows = BattleFieldRows
    this.BattleFieldColumns = BattleFieldColumns
    this.FirstTurn = FirstTurn
    this.Ships = Ships
  }
    
}
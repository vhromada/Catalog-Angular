export class Game {

  id: number;
  name: string;
  wikiEn: string;
  wikiCz: string;
  mediaCount: number;
  crack: boolean;
  serialKey: boolean;
  patch: boolean;
  trainer: boolean;
  trainerData: boolean;
  editor: boolean;
  saves: boolean;
  otherData: string;
  note: string;
  position: number;

  public static getAdditionalData(game: Game): string {
    let result = Game.addBooleanToResult('', game.crack, 'crack');
    result = Game.addBooleanToResult(result, game.serialKey, 'serial key');
    result = Game.addBooleanToResult(result, game.patch, 'patch');
    result = Game.addBooleanToResult(result, game.trainer, 'trainer');
    result = Game.addBooleanToResult(result, game.trainerData, 'data for trainer');
    result = Game.addBooleanToResult(result, game.editor, 'editor');
    result = Game.addBooleanToResult(result, game.saves, 'saves');

    return Game.addStringToResult(result, game.otherData);
  }

  private static addBooleanToResult(result: string, value: boolean, data: string): string {
    if (value) {
      if (result.length == 0) {
        return data.charAt(0).toUpperCase() + data.substring(1);
      }

      return result + ', ' + data;
    }

    return result;
  }

  private static addStringToResult(result: string, data: string): string {
    if (data) {
      return result.length == 0 ? data : result + ', ' + data;
    }

    return result;
  }

}

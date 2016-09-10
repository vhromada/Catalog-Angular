export class Program {

  id: number;
  name: string;
  wikiEn: string;
  wikiCz: string;
  mediaCount: number;
  crack: boolean;
  serialKey: boolean;
  otherData: string;
  note: string;
  position: number;

  public static getAdditionalData(program: Program): string {
    let result = Program.addBooleanToResult('', program.crack, 'crack');
    result = Program.addBooleanToResult(result, program.serialKey, 'serial key');

    return Program.addStringToResult(result, program.otherData);
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

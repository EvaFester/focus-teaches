import { getConfig } from "../config";
import { Spreadsheet } from "./spreadsheet.interface";
import { SpreadsheetDefault } from "./spreadsheet-default";

let spreadsheet: null | Spreadsheet = null

export function getSpreadsheet() {
  if (!spreadsheet) {
    const config = getConfig()
    spreadsheet = new SpreadsheetDefault(
      config.GOOGLE_API_CLIENT_EMAIL,
      config.GOOGLE_API_PRIVATE_KEY,
      config.GOOGLE_API_SPREADSHEET_ID,
    )
  }

  return spreadsheet
}

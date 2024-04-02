import { google, sheets_v4 } from "googleapis";
import { Spreadsheet } from "./spreadsheet.interface";
import { Row } from "./spreadsheet.types";

export class SpreadsheetDefault implements Spreadsheet {
  private sheets: sheets_v4.Sheets

  constructor(
    clientEmail: string,
    privateKey: string,
    private readonly spreadsheetId: string,
  ) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({
      version: 'v4',
      auth,
    });
  }

  public async insert(row: Row) {
    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'A:C',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        }
      })
    } catch (error) {
      console.error('spreadsheet error', error)
    }
  }
}

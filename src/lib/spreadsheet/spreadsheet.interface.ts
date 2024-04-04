import { Row } from "./spreadsheet.types";

export interface Spreadsheet {
  insert(row: Row): Promise<void>
}

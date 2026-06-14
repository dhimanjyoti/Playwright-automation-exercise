// @ts-check
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export class ExcelUtil {
  /**
   * Converts an array of JSON objects into a formatted Excel file.
   * * @param {Array<Object>} dataArray - The extracted data (e.g., product array)
   * @param {string} fileName - The desired name of the excel file
   * @returns {string} - The absolute path where the file was saved
   */
  static exportJsonToExcel(dataArray, fileName = "ExtractedData.xlsx") {
    // output directory
    const outputDir = path.resolve(process.cwd(), "test-results", "exports");

    // Create the directory safely if it doesn't exist yet
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const filePath = path.join(outputDir, fileName);

    // Convert the JSON array into an Excel Worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataArray);

    worksheet["!cols"] = [
      { wch: 45 }, // Column A width (Product Name)
      { wch: 15 }, // Column B width (Product Price)
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Write the file in the hard drive
    XLSX.writeFile(workbook, filePath);

    console.log(`Excel file successfully created at: ${filePath}`);

    return filePath;
  }

  /**
   * Reads an Excel file and converts the first sheet into a JSON array.
   * @param {string} fileName - The name of the excel file to read
   * @returns {Array<Record<string, any>>}
   */
  static readExcelToJson(fileName = "ExtractedData.xlsx") {
    const filePath = path.resolve(
      process.cwd(),
      "test-results",
      "exports",
      fileName,
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `CRITICAL: Excel file not found at ${filePath}. Did the extraction step run?`,
      );
    }

    const workbook = XLSX.readFile(filePath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert back to a clean JSON array
    return XLSX.utils.sheet_to_json(worksheet);
  }
}

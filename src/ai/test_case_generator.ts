// Create a function which will create an excel table with manual test cases based on the array of objects with test case data: testCaseId, name, steps, expectedResult, actualResult, status

// import * as ExcelJS from 'exceljs';

// function createTestCaseExcel(
//   testCases: Array<{
//     testCaseId: string;
//     name: string;
//     steps: string;
//     expectedResult: string;
//     actualResult: string;
//     status: string;
//   }>
// ) {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Test Cases");
//   worksheet.columns = [
//     { header: "Test Case ID", key: "testCaseId", width: 15 },
//     { header: "Name", key: "name", width: 30 },
//     { header: "Steps", key: "steps", width: 50 },
//     { header: "Expected Result", key: "expectedResult", width: 30 },
//     { header: "Actual Result", key: "actualResult", width: 30 },
//     { header: "Status", key: "status", width: 10 },
//   ];
//   testCases.forEach((testCase) => {
//     worksheet.addRow(testCase);
//   });
//   return workbook.xlsx.writeBuffer();
// }

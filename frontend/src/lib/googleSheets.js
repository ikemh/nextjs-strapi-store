// src/lib/googleSheets.js
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const auth = new OAuth2Client({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export async function appendToSheet(data) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = "Sheet1!A1"; // Alterar conforme a necessidade
  const valueInputOption = "RAW";

  const resource = {
    values: [data],
  };

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    return response.data;
  } catch (error) {
    console.error("Error appending to sheet:", error);
    throw new Error("Failed to append data to Google Sheets");
  }
}

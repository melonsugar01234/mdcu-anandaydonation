import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import type { Province, District, SubDistrict } from "@/types/address";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const provincesPath = path.join(
      process.cwd(),
      "src/data/thai_provinces.csv"
    );
    const districtsPath = path.join(
      process.cwd(),
      "src/data/thai_district.csv"
    );
    const subDistrictsPath = path.join(
      process.cwd(),
      "src/data/thai_subdistrict.csv"
    );

    const [provincesFile, districtsFile, subDistrictsFile] = await Promise.all([
      fs.readFile(provincesPath, "utf-8"),
      fs.readFile(districtsPath, "utf-8"),
      fs.readFile(subDistrictsPath, "utf-8"),
    ]);

    const provinces: Province[] = parse(provincesFile, { columns: true });
    const districts: District[] = parse(districtsFile, { columns: true });
    const subDistricts: SubDistrict[] = parse(subDistrictsFile, {
      columns: true,
    });

    return new Response(
      JSON.stringify({ provinces, districts, subDistricts }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return new Response(
      JSON.stringify({ error: "Failed to load address data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

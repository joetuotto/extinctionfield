import { technologyDriversData } from "@/lib/technology-drivers-data";

export const dynamic = "force-static";
export function GET() {
  return Response.json(technologyDriversData, {
    headers: { "Content-Disposition": "attachment; filename=technology-drivers-2026-09-08.json" },
  });
}

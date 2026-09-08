import { changeAtlasData } from "@/lib/change-atlas-data";
export const dynamic = "force-static";
export function GET() {
  return Response.json(changeAtlasData, { headers: { "Content-Disposition": "attachment; filename=change-atlas-2026-09-08.json" } });
}

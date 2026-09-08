import { fieldReconstruction } from "@/lib/field-reconstruction";
export const dynamic = "force-static";
export function GET() {
  return Response.json(fieldReconstruction, { headers: { "Content-Disposition": "attachment; filename=field-reconstruction-2026-09-08.json" } });
}

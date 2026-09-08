import { technologyHistory } from "@/lib/technology-history";

export const dynamic = "force-static";

/** The UI and this downloadable response use the same canonical records. */
export function GET() {
  return Response.json(technologyHistory, {
    headers: { "Content-Disposition": "attachment; filename=technology-history.json" },
  });
}

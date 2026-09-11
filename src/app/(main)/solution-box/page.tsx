import SolutionBoxDirectory from "@/modules/solution-boxes/components/SolutionBoxDirectory";
import { getCombos, safeCatalog } from "@/shared/lib/api/catalog";

export default async function SolutionBoxPage() {
  const boxes = await safeCatalog(getCombos(), []);
  return <SolutionBoxDirectory boxes={boxes} />;
}

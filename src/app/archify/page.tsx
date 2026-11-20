import { ArchifyHubView } from "@/engine/presentation/views/ArchifyHubView";

export const metadata = {
  title: "SCRIPE v6.0 Archify Single Source of Truth Atlas | Docs Portal",
  description:
    "23 verified interactive Archify explainer boards and native architecture, sequence, workflow, ERD, class, lifecycle, dataflow, tree, timeline, and waterfall diagrams across Super Full-Stack, SCRIPE-Backend, and SCRIPE-Frontend.",
};

export default function ArchifyModePage() {
  return <ArchifyHubView initialArtifactId="fullstack-master-explainer" />;
}

import { notFound } from "next/navigation";
import { ArchifyHubView } from "@/engine/presentation/views/ArchifyHubView";
import { ARCHIFY_ARTIFACTS } from "@/data/archify-catalog";

export function generateStaticParams() {
  return ARCHIFY_ARTIFACTS.map((artifact) => ({
    slug: artifact.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artifact = ARCHIFY_ARTIFACTS.find((a) => a.id === slug);
  if (!artifact) {
    return {
      title: "Archify SSOT Not Found | SCRIPE Docs Portal",
    };
  }
  return {
    title: `${artifact.title} | SCRIPE /archify SSOT Mode`,
    description: artifact.description,
  };
}

export default async function ArchifyArtifactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artifact = ARCHIFY_ARTIFACTS.find((a) => a.id === slug);

  if (!artifact) {
    notFound();
  }

  return (
    <ArchifyHubView
      initialArtifactId={artifact.id}
      initialPillar={artifact.pillar}
      initialViewMode="studio"
    />
  );
}

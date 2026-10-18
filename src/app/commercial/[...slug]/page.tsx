import type { Metadata } from "next";
import { CommercialDocsView } from "@/engine/presentation/views/CommercialDocsView";
import { docsContainer } from "@/di";
import { allDocsEn } from "@/locales/docs-registry";

interface Props {
  params: Promise<{ slug: string[] }>;
}

function resolveDocsKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  let value: unknown = allDocsEn;
  for (const part of key.split(".")) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof value === "string" ? value : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawSlug = slug.join("/");
  const fullSlug = rawSlug.startsWith("commercial/")
    ? rawSlug
    : `commercial/${rawSlug}`;
  const page = docsContainer.docsRepository.getPage(fullSlug);

  const title =
    resolveDocsKey(page?.titleKey) || page?.slug || "Commercial Operations";
  const description =
    resolveDocsKey(page?.descriptionKey) ||
    "Commercial and operational documentation for the SCRIPE sports operations platform.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "SCRIPE Commercial Operations",
    },
  };
}

export default async function CommercialDocsSlugPage({ params }: Props) {
  const { slug } = await params;
  const rawSlug = slug.join("/");
  const fullSlug = rawSlug.startsWith("commercial/")
    ? rawSlug
    : `commercial/${rawSlug}`;

  return <CommercialDocsView slug={fullSlug} />;
}

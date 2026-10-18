import type { Metadata } from "next";
import { TechnicalDocsView } from "@/engine/presentation/views/TechnicalDocsView";
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
  const fullSlug = slug.join("/");
  const page = docsContainer.docsRepository.getPage(fullSlug);

  const title =
    resolveDocsKey(page?.titleKey) || page?.slug || "Technical Documentation";
  const description =
    resolveDocsKey(page?.descriptionKey) ||
    "Technical documentation for the SCRIPE sports operations platform.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "SCRIPE Docs Portal",
    },
  };
}

export default async function TechnicalDocsSlugPage({ params }: Props) {
  const { slug } = await params;
  const fullSlug = slug.join("/");

  return <TechnicalDocsView slug={fullSlug} />;
}

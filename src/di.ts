/**
 * Docs Portal — DI Container
 *
 * IMPORTANT: registry.ts MUST be imported BEFORE DocsRepository is instantiated.
 * This ensures all registerPage() calls from every content file have executed,
 * populating the pageRegistry Map inside DocsRepository.ts before any page lookup.
 */

// Side-effect import to register all pages
import "./data/content/registry";

import { DocsRepository } from "./data/repositories/DocsRepository";
import { DocsService } from "./data/services/DocsService";

const docsRepository = new DocsRepository();
const docsService = new DocsService(docsRepository);

export const docsContainer = {
  docsRepository,
  docsService,
};

export { docsRepository, docsService };

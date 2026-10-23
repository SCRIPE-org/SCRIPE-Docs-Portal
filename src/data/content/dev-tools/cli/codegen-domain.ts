// FILE-EXCEPTION: file length
import { registerPage } from "../../../repositories/DocsRepository";
import type { DocSection } from "../../../../domain/entities/DocSection";

const sections: DocSection[] = [
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.intro",
  },
  {
    type: "flowchart",
    nodes: [
      {
            "id": "entity",
            "labelKey": "devTools.cli.codeDomain.nodeEntity",
            "type": "primary"
      },
      {
            "id": "sm",
            "labelKey": "devTools.cli.codeDomain.nodeSm",
            "type": "warning"
      },
      {
            "id": "event",
            "labelKey": "devTools.cli.codeDomain.nodeEvent",
            "type": "info"
      },
      {
            "id": "outbox",
            "labelKey": "devTools.cli.codeDomain.nodeOutbox",
            "type": "success"
      }
],
    connections: [
      {
            "from": "entity",
            "to": "sm",
            "labelKey": "devTools.cli.codeDomain.edgeTransition"
      },
      {
            "from": "sm",
            "to": "event",
            "labelKey": "devTools.cli.codeDomain.edgeRaise"
      },
      {
            "from": "event",
            "to": "outbox",
            "labelKey": "devTools.cli.codeDomain.edgeCapture"
      }
],
  },
  {
    type: "interactive-terminal",
    titleKey: "devTools.cli.codeDomain.termTitle",
    tabs: [
      {
            "tabId": "event",
            "label": "Domain Event",
            "command": "scripe new-event Billing InvoicePaid -p \"InvoiceId:Guid,Amount:decimal\"",
            "outputKey": "devTools.cli.codeDomain.termOutputEvent"
      },
      {
            "tabId": "spec",
            "label": "Ardalis Specification",
            "command": "scripe new-spec Billing Invoice --filter \"status,dateRange,customer\"",
            "outputKey": "devTools.cli.codeDomain.termOutputSpec"
      },
      {
            "tabId": "sm",
            "label": "State Machine DSL",
            "command": "scripe new-state-machine Billing Invoice --spec \"Status:Send=Draft~Sent/Pay=Sent|Overdue~Paid\"",
            "outputKey": "devTools.cli.codeDomain.termOutputSm"
      },
      {
            "tabId": "contract",
            "label": "Cross-Module Contract",
            "command": "scripe new-contract Billing CustomerContract",
            "outputKey": "devTools.cli.codeDomain.termOutputContract"
      }
],
  },
  {
    type: "heading",
    level: 2,
    titleKey: "devTools.cli.codeDomain.title",
    id: "command-reference",
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewEvent",
    id: "new-event",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewEventDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-event <module> <event> -p "<properties>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-event Billing InvoiceIssued -p "InvoiceId:Guid,TenantId:Guid,TotalAmount:decimal"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Owning domain module"
      ],
      [
            "<event>",
            "string (required)",
            "-",
            "Event record name (e.g., InvoiceIssued)"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Comma-separated Name:Type properties"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview event contract without writing"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewSpec",
    id: "new-spec",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewSpecDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-spec <module> <entity> --filter "<filters>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-spec Billing Invoice --filter "status,client,search"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity name for specification queries"
      ],
      [
            "--filter <filters>",
            "string (comma-separated)",
            "-",
            "Filter predicates to scaffold into query specification"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview specification class"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewValidator",
    id: "new-validator",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewValidatorDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-validator <module> <command> -p "<properties>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-validator Billing CreateInvoice -p "Title:required:maxLength(200),Amount:greaterThan(0)"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<command>",
            "string (required)",
            "-",
            "Command to validate (e.g., CreateInvoice)"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Property validation rules DSL"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview FluentValidation class"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewEnum",
    id: "new-enum",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewEnumDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-enum <module> <name> "<values>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-enum Billing InvoiceStatus "Draft,Sent,Paid,Overdue,Cancelled"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Enum type name"
      ],
      [
            "<values>",
            "string (comma-separated)",
            "-",
            "Enum member identifiers"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview enum declaration"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewStateMachine",
    id: "new-state-machine",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewStateMachineDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-state-machine <module> <entity> --spec "<spec>" [--dry-run]\n\n# Real-world usage:\n$ scripe new-state-machine Billing Invoice --spec "Status:Send=Draft~Sent/MarkPaid=Sent|Overdue~Paid"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Entity possessing the enum state field"
      ],
      [
            "--spec <spec>",
            "string (DSL)",
            "-",
            "State transition DSL: \"Field:Action=From~To/Action2=From1|From2~To\""
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "Validate state states against entity property DSL"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview state machine and generated xUnit tests"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdNewContract",
    id: "new-contract",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdNewContractDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe new-contract <module> <name> [--dry-run]\n\n# Real-world usage:\n$ scripe new-contract Billing CustomerReadContract`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Owning module exposing the contract"
      ],
      [
            "<name>",
            "string (required)",
            "-",
            "Contract interface and summary record name"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview contract files"
      ]
],
  },
  {
    type: "heading",
    level: 3,
    titleKey: "devTools.cli.codeDomain.cmdEvolveEntity",
    id: "evolve-entity",
  },
  {
    type: "paragraph",
    contentKey: "devTools.cli.codeDomain.cmdEvolveEntityDesc",
  },
  {
    type: "code",
    language: "bash",
    filename: "Syntax & Example",
    code: `$ scripe evolve-entity <module> <entity> -p "<properties>" [--dry-run]\n\n# Real-world usage:\n$ scripe evolve-entity Billing Invoice -p "TaxExemptReason:string?,DiscountPercentage:decimal:default(0)"`,
  },
  {
    type: "table",
    headers: ["Parameter / Flag", "Type", "Default", "Description"],
    rows: [
      [
            "<module>",
            "string (required)",
            "-",
            "Target module"
      ],
      [
            "<entity>",
            "string (required)",
            "-",
            "Target entity to evolve"
      ],
      [
            "-p, --properties <props>",
            "string (DSL)",
            "-",
            "New property definitions to append to Entity & EF configuration"
      ],
      [
            "--dry-run",
            "boolean",
            "false",
            "Preview AST property modifications"
      ]
],
  },
  {
    type: "info",
    variant: "info",
    titleKey: "devTools.cli.codeDomain.title",
    contentKey: "devTools.cli.codeDomain.description",
  },
];

registerPage({
  slug: "dev-tools/cli/codegen-domain",
  titleKey: "devTools.cli.codeDomain.title",
  descriptionKey: "devTools.cli.codeDomain.description",
  category: "dev-tools",
  order: 3,
  sections,
  relatedSlugs: ["dev-tools/cli/scaffolding-module", "dev-tools/cli/scaffolding-blueprint", "dev-tools/cli/codegen-application"],
  lastUpdated: "2026-03-03",
});

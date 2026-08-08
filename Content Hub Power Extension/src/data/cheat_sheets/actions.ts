import type { CheatSheetDefinition } from '../cheat_sheet_registry.js';

export const ACTIONS_CHEAT_SHEET: CheatSheetDefinition = {
  id: 'actions',
  title: 'Actions',
  description: 'Action types, configuration fields, worker behavior and dynamic context values for Sitecore Content Hub actions.',
  iconClass: 'icon--lightning-bolt-outline',
  iconColor: 'rgb(222, 83, 224)',
  categoryOrder: ['overview', 'types', 'behavior'],
  entries: [
    // ── Overview ─────────────────────────────────────────────────────────────
    {
      id: 'ac-what',
      category: 'overview',
      title: 'What is an action?',
      description: 'Actions are components that perform a specific task. They can be triggered manually through the UI, by a trigger, or via API. Actions can execute individually or in bulk.',
      tags: ['action', 'overview', 'trigger', 'api', 'bulk'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/actions.html',
    },
    {
      id: 'ac-lifecycle',
      category: 'overview',
      title: 'Action lifecycle',
      description: 'When an action fires it is added to a queue, picked up by an action worker, executed, and the result is recorded in the audit log.',
      snippet:
`1. Triggered — via UI, trigger, or API
2. Queued    — added to the actions queue
             — visible in Manage > Stats > Current activity
3. Picked up — action worker processes the action
4. Executed  — the action logic runs
5. Audited   — result recorded in the action audit log`,
      tags: ['action', 'lifecycle', 'queue', 'worker', 'audit'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/actions.html',
    },
    {
      id: 'ac-bulk',
      category: 'overview',
      title: 'Bulk vs single execution',
      description: 'In single execution mode each target entity triggers one action execution. Bulk execution processes all affected targets at once — for example, all entities selected in a mass-edit operation.',
      tags: ['bulk', 'single', 'mass edit', 'execution mode'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/actions.html',
    },
    {
      id: 'ac-context-values',
      category: 'overview',
      title: 'Dynamic context values',
      description: 'Headers and body values in messaging action types support display-template syntax to inject entity property values and relation identifiers at execution time.',
      warning: 'Headers collection limit: 64 KB. Values collection limit: 256 KB. Exceeding either causes the action to fail and logs a failed attempt in the audit log.',
      snippet:
`// Reference a property:
{Title}           → the entity's Title property value

// Reference a relation (returns identifier(s)):
{MyRelation}      → "identifier1|identifier2"

// Multiple values use | as separator:
{Tags}            → "tag1|tag2|tag3"

// Self-relation format:
{SelfRel}         → "parent1|parent2; child1|child2"

// Resolve config from a Setting:
{Category.Name.property}   e.g. {Actions.Event.connectionString}

// DELETE events: context is empty — no property values are available`,
      tags: ['context', 'values', 'headers', 'template', 'dynamic', 'property', 'relation', 'setting'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },

    // ── Types ─────────────────────────────────────────────────────────────────
    {
      id: 'ac-type-script',
      category: 'types',
      title: 'Type: Action script',
      description: 'Executes a predefined Content Hub script. Select the script and assign it to one or more execution phases (Pre-commit, Validation, Security, Audit, Post).',
      tags: ['action type', 'script', 'action script', 'phases'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-api',
      category: 'types',
      title: 'Type: API call',
      description: 'Makes an HTTP request to any external API endpoint. Supports bulk execution. Configure the URL, method, headers, and body values using dynamic context syntax.',
      note: 'API call actions do not support multi-language properties.',
      tags: ['action type', 'api call', 'http', 'external', 'rest', 'webhook'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-azure-eventhub',
      category: 'types',
      title: 'Type: Azure event hub',
      description: 'Sends a message to an external Azure Event Hub. Configure the connection string and event hub name. Headers and body values support dynamic context syntax.',
      snippet:
`// Required fields:
Connection string  — fixed value or resolved from a Setting
EventHub           — name of the hub

// Resolve from a Setting:
{Actions.MyCategory.connectionString}
{Actions.MyCategory.eventHub}

// Note: Setting properties are case-sensitive and cannot contain periods.
// Request headers and variables cannot resolve from Settings.`,
      tags: ['action type', 'azure', 'event hub', 'messaging', 'external'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-azure-servicebus',
      category: 'types',
      title: 'Type: Azure service bus',
      description: 'Sends a message to an external Azure Service Bus queue or topic. Supports bulk execution.',
      snippet:
`// Required fields:
Connection string  — fixed value or resolved from a Setting
Destination type   — Queue | Topic
Destination        — queue or topic name (+ subscription for Topic)`,
      tags: ['action type', 'azure', 'service bus', 'queue', 'topic', 'messaging'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-m-servicebus',
      category: 'types',
      title: 'Type: M Azure service bus',
      description: 'Sends a message to the Content Hub internal service bus. No external infrastructure required — the connection string is automatically provided by the platform.',
      snippet:
`// Connection strings are auto-provided:
Hub in   → write endpoint  (copy link from action config)
Hub out  → read-only endpoint (copy link from action config)

// Destination types:
Queue   — queue name for consuming messages
Topic   — topic + subscription name`,
      tags: ['action type', 'm azure service bus', 'internal', 'queue', 'topic', 'messaging'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-print',
      category: 'types',
      title: 'Type: Print entity generation',
      description: 'Generates a PDF from a list of entities using a print template. Configure the target entity definition and the template.',
      snippet:
`// Required fields:
Definition  — entity definition to print
Template    — predefined print template`,
      tags: ['action type', 'print', 'pdf', 'entity generation'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-reporting',
      category: 'types',
      title: 'Type: Reporting channel',
      description: 'Logs an entry to the system reporting pipeline, viewable in Manage > Reporting logs. Use this to track custom business events and build analytics charts.',
      note: 'To create charts for logged events, add the event types to the PredefinedEventTypes setting first.',
      tags: ['action type', 'reporting', 'reporting channel', 'analytics', 'events', 'charts'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },
    {
      id: 'ac-type-state-machine',
      category: 'types',
      title: 'Type: Start state machine',
      description: 'Automatically starts a State flow. Specify which State flow to start — only a single state flow can be selected per action.',
      tags: ['action type', 'state machine', 'state flow', 'workflow'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-types.html',
    },

    // ── Behavior ─────────────────────────────────────────────────────────────
    {
      id: 'ac-worker',
      category: 'behavior',
      title: 'Action worker behavior',
      description: 'Action workers process actions asynchronously. Content Hub uses adaptive scaling: processing speeds can vary, queued tasks may take longer during heavy load, and work can appear to complete in batches. These are all expected behaviors.',
      note: 'Dynamic scaling is system-managed and cannot be configured through the UI. If processing appears delayed, check Manage > Stats > Current activity and the action audit logs.',
      tags: ['worker', 'behavior', 'scaling', 'async', 'queue', 'background', 'performance'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/action-worker-behavior.html',
    },
    {
      id: 'ac-auditing',
      category: 'behavior',
      title: 'Auditing',
      description: 'Every action execution result is recorded in the action audit log. Download logs by selecting a date interval; the download generates a download order accessible immediately or shareable via email.',
      snippet:
`Access audit logs:
  Manage > Stats > Current activity  — live queue view
  Manage > Reporting logs            — historical logs

Download: select a date interval → generates a download order`,
      tags: ['auditing', 'audit log', 'logs', 'monitoring', 'download'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/actions.html',
    },
  ],
};

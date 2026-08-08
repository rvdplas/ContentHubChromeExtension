import type { CheatSheetDefinition } from '../cheat_sheet_registry.js';

export const TRIGGERS_CHEAT_SHEET: CheatSheetDefinition = {
  id: 'triggers',
  title: 'Triggers',
  description: 'Trigger objectives, execution types, condition configuration and gotchas for Sitecore Content Hub triggers.',
  iconClass: 'icon--lightning-bolt-cog-outline',
  iconColor: 'rgb(156, 39, 176)',
  categoryOrder: ['overview', 'configuration', 'conditions', 'tips'],
  entries: [
    // ── Overview ─────────────────────────────────────────────────────────────
    {
      id: 'tr-what',
      category: 'overview',
      title: 'What is a trigger?',
      description: 'Triggers automatically execute a set of actions after specific events and under specific conditions. They are evaluated for every create, update, and delete event in Content Hub and run asynchronously to prevent UI delays.',
      note: 'Some calculated property updates caused by task dependencies do not invoke triggers. See Event listening for details.',
      tags: ['trigger', 'overview', 'events', 'actions', 'asynchronous'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/triggers.html',
    },
    {
      id: 'tr-anatomy',
      category: 'overview',
      title: 'Trigger anatomy',
      description: 'A trigger consists of conditions (the criteria under which it fires) and actions (what it does). Conditions evaluate entity definitions and their properties; actions represent the work to perform.',
      snippet:
`Trigger
├── Conditions     — entity definition + property + clause (AND / OR, nestable)
└── Actions        — what to execute, assigned per phase
    ├── Pre-commit  (In Process only)
    ├── Validation  (In Process only)
    ├── Security    (In Process only)
    ├── Audit       (In Process only)
    └── Post        (In Process and In Background)`,
      tags: ['trigger', 'anatomy', 'conditions', 'actions', 'phases'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/triggers.html',
    },

    // ── Configuration ─────────────────────────────────────────────────────────
    {
      id: 'tr-fields',
      category: 'configuration',
      title: 'General tab fields',
      description: 'Fields configured on the General tab when creating or editing a trigger.',
      snippet:
`Name            — human-readable label for the trigger
Description     — explains what the trigger does
Objective       — Entity creation | Entity modification | Entity deletion
Object type(s)  — one or more entity definitions to react to (or "Any")
Execution type  — In Background | In Process`,
      tags: ['trigger', 'fields', 'general', 'name', 'objective', 'execution type'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-objectives',
      category: 'configuration',
      title: 'Objectives',
      description: 'The objective defines which event the trigger reacts to.',
      snippet:
`Entity creation     — fires when a new entity is saved for the first time
Entity modification — fires when an existing entity is updated
Entity deletion     — fires when an entity is deleted`,
      tags: ['trigger', 'objective', 'creation', 'modification', 'deletion', 'event'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-exec-background',
      category: 'configuration',
      title: 'Execution type — In Background',
      description: 'Actions run asynchronously in a background job. Actions can only be assigned to the Post phase. This is the recommended default for most use cases.',
      note: 'In Background is the recommended default for most use cases.',
      tags: ['execution type', 'background', 'async', 'post', 'out of process'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-exec-inprocess',
      category: 'configuration',
      title: 'Execution type — In Process',
      description: 'Actions run synchronously in real time. Supports all five action phases, enabling pre-commit data mutation, validation rejection, and security enforcement.',
      warning: 'Do not use In Process for UI-related interactions or any time-consuming operations.',
      snippet:
`Available phases for In Process triggers:
  Pre-commit  — before the event executes; the only phase that can mutate data
  Validation  — throw ValidationException to reject
  Security    — throw SecurityException to deny
  Audit       — after data is finalized
  Post        — after the event is fully complete`,
      tags: ['execution type', 'in process', 'sync', 'real time', 'phases', 'pre-commit', 'validation'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },

    // ── Conditions ────────────────────────────────────────────────────────────
    {
      id: 'tr-conditions-basic',
      category: 'conditions',
      title: 'Condition structure',
      description: 'Conditions filter which entities cause the trigger to fire. Each condition targets a property on an entity definition and evaluates it with a clause.',
      snippet:
`Entity definition  → select a definition or "Any definition"
  └── Property     → choose a property (or relation)
       └── Clause  → equals / contains / changed / is empty / …
            └── Value(s)

Tip: "Match case" is available for Contains and similar clauses.`,
      tags: ['conditions', 'entity definition', 'property', 'clause', 'filter'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-conditions-logic',
      category: 'conditions',
      title: 'Logical operators and groups',
      description: 'Multiple conditions on an entity definition can be combined with AND (all must match, default) or OR (any must match). Conditions can be promoted to groups for complex nested logic, including groups within groups.',
      snippet:
`// AND — all conditions must be true (default):
Status == "Approved" AND ContentType == "Image"

// OR — at least one must be true:
Title contains "Draft" OR Status == "Draft"

// Groups — promote a condition to create nested logic:
(Status == "Approved" AND ContentType == "Image")
OR
(Status == "Final" AND Title contains "PROD")`,
      tags: ['conditions', 'and', 'or', 'logic', 'groups', 'nesting', 'boolean'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-conditions-advanced',
      category: 'conditions',
      title: 'Advanced mode (JSON)',
      description: 'On the Conditions tab, click Advanced mode to view and edit the full conditional logic as a JSON document. Useful for debugging complex nesting or copying logic between triggers.',
      tags: ['conditions', 'advanced mode', 'json', 'debug', 'copy'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },

    // ── Tips ─────────────────────────────────────────────────────────────────
    {
      id: 'tr-tip-deleted-background',
      category: 'tips',
      title: 'Gotcha: Entity deleted + In Background',
      description: 'A trigger with objective "Entity deleted" set to execute In Background will not execute its actions.',
      warning: 'When the background trigger fires the entity is already deleted, so condition evaluation has no data to work with. Use In Process for deletion triggers that must take action.',
      tags: ['gotcha', 'deletion', 'background', 'entity deleted', 'warning'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/create-a-trigger.html',
    },
    {
      id: 'tr-tip-calculated-props',
      category: 'tips',
      title: 'Gotcha: Calculated properties',
      description: 'Some calculated property updates caused by task dependencies do not invoke triggers, even when the trigger condition matches that property.',
      note: 'See the Event listening documentation for the complete list of events that do and do not invoke triggers.',
      tags: ['gotcha', 'calculated properties', 'task dependencies', 'event listening'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/event-listening.html',
    },
  ],
};

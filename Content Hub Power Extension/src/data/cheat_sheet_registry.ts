import { SCRIPTING_CHEAT_SHEET } from './cheat_sheets/scripting.js';
import { TRIGGERS_CHEAT_SHEET } from './cheat_sheets/triggers.js';
import { ACTIONS_CHEAT_SHEET }  from './cheat_sheets/actions.js';

export type CheatSheetCategory =
  | 'script-types' | 'mclient' | 'context' | 'snippets' | 'restrictions'
  | 'overview' | 'configuration' | 'conditions' | 'tips'
  | 'types' | 'behavior';

export interface CheatSheetEntry {
  id: string;
  category: CheatSheetCategory;
  title: string;
  description: string;
  note?: string;
  warning?: string;
  snippet?: string;
  tags: string[];
  docsUrl?: string;
}

export interface CheatSheetDefinition {
  id: string;
  title: string;
  description: string;
  iconClass: string;
  iconColor: string;
  categoryOrder?: CheatSheetCategory[];
  entries: CheatSheetEntry[];
}

// Add new cheat sheets here — the page discovers them automatically.
export const CHEAT_SHEET_REGISTRY: CheatSheetDefinition[] = [
  SCRIPTING_CHEAT_SHEET,
  TRIGGERS_CHEAT_SHEET,
  ACTIONS_CHEAT_SHEET,
];

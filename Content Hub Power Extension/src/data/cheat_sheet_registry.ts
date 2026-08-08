import { SCRIPTING_CHEAT_SHEET } from './cheat_sheets/scripting.js';

export type CheatSheetCategory = 'script-types' | 'mclient' | 'context' | 'snippets';

export interface CheatSheetEntry {
  id: string;
  category: CheatSheetCategory;
  title: string;
  description: string;
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
  entries: CheatSheetEntry[];
}

// Add new cheat sheets here — the page discovers them automatically.
export const CHEAT_SHEET_REGISTRY: CheatSheetDefinition[] = [
  SCRIPTING_CHEAT_SHEET,
];

import {
  CHEAT_SHEET_REGISTRY,
  type CheatSheetCategory,
  type CheatSheetDefinition,
  type CheatSheetEntry,
} from '../data/cheat_sheet_registry.js';

const CATEGORY_LABELS: Record<CheatSheetCategory, string> = {
  'script-types': 'Script Types',
  mclient:        'MClient',
  context:        'Context',
  snippets:       'Snippets',
};

function initialize(): void {
  const params = new URLSearchParams(window.location.search);
  const sheetId = params.get('sheet');
  const container = document.getElementById('container');
  if (!container) return;

  if (sheetId) {
    const sheet = CHEAT_SHEET_REGISTRY.find((s) => s.id === sheetId);
    if (sheet) {
      renderSheetView(container, sheet);
      document.title = `${sheet.title} — Content Hub Power Extension`;
      return;
    }
  }

  renderIndexView(container);
}

// ── Index view ───────────────────────────────────────────────────────────────

function renderIndexView(container: HTMLElement): void {
  const heading = document.createElement('h1');
  heading.className = 'page-title';
  heading.textContent = 'Cheat Sheets';

  const grid = document.createElement('div');
  grid.className = 'sheet-index';

  for (const sheet of CHEAT_SHEET_REGISTRY) {
    grid.appendChild(buildSheetCard(sheet));
  }

  container.appendChild(heading);
  container.appendChild(grid);
}

function buildSheetCard(sheet: CheatSheetDefinition): HTMLElement {
  const card = document.createElement('button');
  card.className = 'sheet-card';
  card.type = 'button';

  const icon = document.createElement('span');
  icon.className = `icon ${sheet.iconClass}`;
  icon.style.backgroundColor = sheet.iconColor;
  icon.setAttribute('aria-hidden', 'true');

  const title = document.createElement('span');
  title.className = 'sheet-card-title';
  title.textContent = sheet.title;

  const desc = document.createElement('span');
  desc.className = 'sheet-card-desc';
  desc.textContent = sheet.description;

  const entryCount = document.createElement('span');
  entryCount.className = 'sheet-card-count';
  entryCount.textContent = `${sheet.entries.length} entries`;

  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(entryCount);

  card.addEventListener('click', () => {
    window.location.search = `?sheet=${encodeURIComponent(sheet.id)}`;
  });

  return card;
}

// ── Sheet view ───────────────────────────────────────────────────────────────

function renderSheetView(container: HTMLElement, sheet: CheatSheetDefinition): void {
  const categories = [...new Set(sheet.entries.map((e) => e.category))] as CheatSheetCategory[];
  let activeCategory: CheatSheetCategory = categories[0];
  let searchText = '';

  const backLink = document.createElement('a');
  backLink.className = 'back-link';
  backLink.href = 'cheatsheet.html';
  backLink.textContent = '← All Cheat Sheets';

  const heading = document.createElement('h1');
  heading.className = 'page-title';

  const icon = document.createElement('span');
  icon.className = `icon ${sheet.iconClass}`;
  icon.style.backgroundColor = sheet.iconColor;
  icon.setAttribute('aria-hidden', 'true');
  heading.appendChild(icon);
  heading.append(sheet.title);

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'search-bar';
  searchInput.placeholder = 'Search entries…';
  searchInput.setAttribute('aria-label', 'Search entries');

  const tabNav = document.createElement('nav');
  tabNav.className = 'tab-nav';
  tabNav.setAttribute('aria-label', 'Categories');

  const entryList = document.createElement('div');
  entryList.className = 'entry-list';

  function renderEntries(): void {
    entryList.textContent = '';
    const term = searchText.toLowerCase();

    const displayEntries = term
      ? sheet.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(term) ||
            e.description.toLowerCase().includes(term) ||
            e.tags.some((t) => t.toLowerCase().includes(term))
        )
      : sheet.entries.filter((e) => e.category === activeCategory);

    if (displayEntries.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty-message';
      empty.textContent = 'No entries match your search.';
      entryList.appendChild(empty);
      return;
    }

    for (const entry of displayEntries) {
      entryList.appendChild(buildEntryCard(entry, term));
    }
  }

  function buildTabs(): void {
    tabNav.textContent = '';
    for (const cat of categories) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab-btn' + (cat === activeCategory && !searchText ? ' active' : '');
      btn.textContent = CATEGORY_LABELS[cat];
      btn.addEventListener('click', () => {
        activeCategory = cat;
        searchText = '';
        searchInput.value = '';
        buildTabs();
        renderEntries();
      });
      tabNav.appendChild(btn);
    }
  }

  searchInput.addEventListener('input', () => {
    searchText = searchInput.value.trim();
    buildTabs();
    renderEntries();
  });

  buildTabs();
  renderEntries();

  container.appendChild(backLink);
  container.appendChild(heading);
  container.appendChild(searchInput);
  container.appendChild(tabNav);
  container.appendChild(entryList);
}

function buildEntryCard(entry: CheatSheetEntry, searchTerm: string): HTMLElement {
  const card = document.createElement('article');
  card.className = 'entry-card';

  if (searchTerm) {
    const badge = document.createElement('span');
    badge.className = `category-badge category-${entry.category}`;
    badge.textContent = CATEGORY_LABELS[entry.category];
    card.appendChild(badge);
  }

  const title = document.createElement('h3');
  title.className = 'entry-title';
  title.textContent = entry.title;
  card.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'entry-description';
  desc.textContent = entry.description;
  card.appendChild(desc);

  if (entry.snippet) {
    const snippetBlock = document.createElement('div');
    snippetBlock.className = 'snippet-block';

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = entry.snippet;
    pre.appendChild(code);

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = 'Copy';
    copyBtn.setAttribute('aria-label', `Copy snippet for ${entry.title}`);
    copyBtn.addEventListener('click', () => copySnippet(entry.snippet!, copyBtn));

    snippetBlock.appendChild(pre);
    snippetBlock.appendChild(copyBtn);
    card.appendChild(snippetBlock);
  }

  if (entry.docsUrl) {
    const link = document.createElement('a');
    link.className = 'docs-link';
    link.href = entry.docsUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Official docs ↗';
    card.appendChild(link);
  }

  return card;
}

function copySnippet(text: string, btn: HTMLButtonElement): void {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'Failed';
  });
}

document.addEventListener('DOMContentLoaded', () => initialize());

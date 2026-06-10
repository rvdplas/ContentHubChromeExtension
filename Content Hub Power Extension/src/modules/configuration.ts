export const dataKey = "custom_buttons_config";
export const customLinkDataKey = "custom_links_config";

type StorageCallback = (items: Record<string, unknown>) => void;

export function tryGetConfig(
  key: string,
  callback: StorageCallback
): void {
  window.chrome.storage.sync.get([key], callback);
}

export function saveConfig(key: string, value: unknown): void {
  window.chrome.storage.sync.set({ [key]: value });
}

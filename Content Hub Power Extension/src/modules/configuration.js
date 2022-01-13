export const dataKey = "custom_buttons_config";

export async function tryGetConfig(key, callback) {
  return await chrome.storage.sync.get([key], callback);
}

export function saveConfig(key, value) {
  return chrome.storage.sync.set({ [key]: value });
}

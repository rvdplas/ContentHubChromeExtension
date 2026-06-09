export const dataKey = "custom_buttons_config";

export async function tryGetConfig(key, callback) {
  return await window.chrome.storage.sync.get([key], callback);
}

export function saveConfig(key, value) {
  return window.chrome.storage.sync.set({ [key]: value });
}

export function createPromise<T>(
  func: (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => void
  ) => void
): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      func(resolve, reject);
    } catch (e) {
      reject(e);
    }
  });
}

// get last segment from url
export function getLastSegment(url: string): string {
  return url.substr(url.lastIndexOf("/") + 1);
}

// replace placeholder in string from two-dimension array
export function replaceTemplate(
  template: string,
  args: [string, string | null][]
): string {
  args.forEach((element) => {
    template = template.replace(
      "{" + element[0] + "}",
      String(element[1])
    );
  });

  return template;
}

// check if string is empty
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.length === 0;
}

// create new tab and redirect to url
export function createTab(url: string): void {
  window.chrome.tabs.create({ url });
}

export function addClickEvent(
  elementId: string,
  callback: (event: Event) => void
): void {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`element with id "${elementId}" not found`);
  element.addEventListener("click", callback);
}

// ** External Imports
import { isBrowser } from "es-toolkit/predicate";
import { onMounted, ref, watch } from "vue";

const STORAGE_KEY = "calculator-theme";

function getStored(): boolean {
  if (!isBrowser()) return true;

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "dark") return true;

  if (stored === "light") return false;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true;
  }

  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return false;
  }

  return true;
}

function applyDarkClass(isDark: boolean) {
  if (!isBrowser()) return;

  const html = document.documentElement;

  isDark ? html.classList.add("dark") : html.classList.remove("dark");
}

const isDark = ref(getStored());

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value;
  }

  // prettier-ignore
  watch(isDark, (value) => {
    applyDarkClass(value);

    if (!isBrowser()) return;

    localStorage.setItem(STORAGE_KEY, value ? "dark" : "light");
  });

  onMounted(() => {
    applyDarkClass(isDark.value);
  });

  return { isDark, toggle };
}

// ** External Imports
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { defineComponent, nextTick } from "vue";

function resetDom() {
  document.documentElement.className = "";
  window.localStorage.clear();
}

async function mountThemeComponent() {
  const { useTheme } = await import("@/composables/useTheme");

  const TestThemeComponent = defineComponent({
    template: `<button type="button" @click="toggle">Toggle</button>`,
    setup() {
      return useTheme();
    },
  });

  return mount(TestThemeComponent);
}

describe("useTheme", () => {
  beforeEach(() => {
    vi.resetModules();
    resetDom();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
    }));
  });

  test("it should default to dark when localStorage is empty", async () => {
    await mountThemeComponent();
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("it should read initial value from localStorage (light)", async () => {
    window.localStorage.setItem("calculator-theme", "light");

    await mountThemeComponent();
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  test("it should read initial value from localStorage (dark)", async () => {
    window.localStorage.setItem("calculator-theme", "dark");

    await mountThemeComponent();
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("it should toggle theme and persist to localStorage", async () => {
    const wrapper = await mountThemeComponent();

    await nextTick();
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    await wrapper.get("button").trigger("click");
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("calculator-theme")).toBe("light");

    await wrapper.get("button").trigger("click");
    await nextTick();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("calculator-theme")).toBe("dark");
  });
});

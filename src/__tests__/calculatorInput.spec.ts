// ** External Imports
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

// ** Local Imports
import App from "@/App.vue";
import HistoryRow from "@/components/HistoryRow.vue";
import { useCalculatorInput } from "@/composables/useCalculatorInput";
import { useCalculatorStore } from "@/stores/calculator";

const KeyboardTestWrapper = defineComponent({
  setup() {
    useCalculatorInput();
    return () => h("div");
  },
});

function findButtonByText(wrapper: ReturnType<typeof mount>, text: string) {
  return wrapper.findAll("button").find((b) => b.text().trim() === text);
}

describe("calculator button clicks", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  function mountApp() {
    const pinia = createPinia();

    const wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    });

    const store = useCalculatorStore(pinia);

    return { wrapper, store, pinia };
  }

  it("updates expression when digit button is clicked", async () => {
    const { wrapper, store } = mountApp();

    const digit7 = findButtonByText(wrapper, "7");

    expect(digit7).toBeDefined();

    await digit7!.trigger("click");

    expect(store.expression).toBe("7");
  });

  it("appends to expression when multiple buttons are clicked", async () => {
    const { wrapper, store } = mountApp();

    const one = findButtonByText(wrapper, "1");
    const plus = findButtonByText(wrapper, "+");
    const two = findButtonByText(wrapper, "2");

    await one!.trigger("click");
    await plus!.trigger("click");
    await two!.trigger("click");

    expect(store.expression).toBe("1+2");
  });

  it("clears expression when C is clicked", async () => {
    const { wrapper, store } = mountApp();

    store.pushExpression("1+2");

    const clearBtn = findButtonByText(wrapper, "C");

    await clearBtn!.trigger("click");

    expect(store.expression).toBe("");
  });

  it("evaluates and adds to history when = is clicked", async () => {
    const { wrapper, store } = mountApp();

    store.replaceExpression("2+3");

    const equalsBtn = findButtonByText(wrapper, "=");

    await equalsBtn!.trigger("click");

    expect(store.expression).toBe("5");
    expect(store.history).toHaveLength(1);
    expect(store.history[0]?.result).toBe("5");
    expect(store.history[0]?.expression).toBe("2+3");
  });
});

describe("calculator keyboard (outside input)", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("calls handleEquals on Enter when window receives keydown", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useCalculatorStore(pinia);

    mount(KeyboardTestWrapper, { global: { plugins: [pinia] } });

    store.replaceExpression("3+4");

    await new Promise((r) => setTimeout(r, 0));

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
    );

    expect(store.history).toHaveLength(1);
    expect(store.history[0]?.result).toBe("7");
  });

  it("removes last character on Backspace when target is not input", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useCalculatorStore(pinia);

    mount(KeyboardTestWrapper, { global: { plugins: [pinia] } });

    store.replaceExpression("123");

    await new Promise((r) => setTimeout(r, 0));

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }),
    );

    expect(store.expression).toBe("12");
  });

  it("pushes digit when number key is pressed and target is not input", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useCalculatorStore(pinia);

    mount(KeyboardTestWrapper, { global: { plugins: [pinia] } });

    await new Promise((r) => setTimeout(r, 0));

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "5", bubbles: true }),
    );

    expect(store.expression).toBe("5");
  });
});

describe("calculator history", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Clear All button clears history", async () => {
    const pinia = createPinia();
    const wrapper = mount(App, { global: { plugins: [pinia] } });
    const store = useCalculatorStore(pinia);

    store.addToHistory("1+2", "3");
    store.addToHistory("2×3", "6");

    const clearAll = wrapper.find('button[aria-label="Clear All"]');

    await clearAll.trigger("click");

    expect(store.history).toHaveLength(0);
  });
});

describe("HistoryRow", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("replaces expression when row is clicked", async () => {
    const pinia = createPinia();
    const store = useCalculatorStore(pinia);

    store.replaceExpression("99");

    const wrapper = mount(HistoryRow, {
      props: { index: 0, expression: "1+2", result: "3" },
      global: { plugins: [pinia] },
    });

    const row = wrapper.find(".rounded-lg");

    await row.trigger("click");

    expect(store.expression).toBe("1+2");
  });

  it("removes item from history when delete button is clicked", async () => {
    const pinia = createPinia();
    const store = useCalculatorStore(pinia);

    store.addToHistory("1+2", "3");
    store.addToHistory("4+5", "9");

    const wrapper = mount(HistoryRow, {
      props: { index: 0, expression: "1+2", result: "3" },
      global: { plugins: [pinia] },
    });

    await wrapper.find(".rounded-lg").trigger("mouseenter");
    await wrapper.vm.$nextTick();

    const deleteBtn = wrapper.find('button[aria-label="Delete"]');

    await deleteBtn.trigger("click");

    expect(store.history).toHaveLength(1);
    expect(store.history[0]?.expression).toBe("4+5");
  });
});

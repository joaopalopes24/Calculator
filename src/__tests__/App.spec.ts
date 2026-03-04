// ** External Imports
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, expect, it } from "vitest";

// ** Local Imports
import App from "@/App.vue";

describe("App", () => {
  it("mounts and renders the calculator", () => {
    const wrapper = mount(App, {
      global: { plugins: [createPinia()] },
    });

    expect(wrapper.text()).toContain("Clear All");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });
});

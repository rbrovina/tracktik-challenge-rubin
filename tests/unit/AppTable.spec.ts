import { shallowMount } from "@vue/test-utils";
import AppTable from "@/components/AppTable.vue";
import Vue from "vue";
import flushPromises from "flush-promises";
import axios from "axios";

jest.mock("axios");

const mockData = [
  { id: 1, logo: "logo1.png", images: ["image1.png"] },
  { id: 2, logo: "logo2.png", images: ["image2.png"] },
];

const headers = [{ text: "Name", value: "name" }];

describe("AppTable.vue", () => {
  let wrapper: any;

  beforeEach(async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: mockData,
      headers: { "x-total-count": 2 },
    });

    wrapper = shallowMount(AppTable, {
      propsData: {
        resource: "Clients",
        headers,
        onDetailsClick: jest.fn(),
      },
    });

    await flushPromises();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data on options change", async () => {
    wrapper.vm.options = { itemsPerPage: 5, page: 1 };
    await Vue.nextTick();
    expect(axios.get).toBeCalledWith(
      `https://tracktik-challenge.staffr.com/Clients?_page=1&_limit=5&q=`
    );
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.entities).toHaveLength(2);
  });

  it("closes the filter modal when close button is clicked", async () => {
    wrapper.setData({ filterModal: true });
    await Vue.nextTick();
    const closeButton = wrapper.find("v-btn");
    await closeButton.trigger("click");
    expect(wrapper.vm.filterModal).toBe(false);
  });

  it("updates table data based on search input", async () => {
    wrapper.setData({ search: "search term" });
    await Vue.nextTick();
    expect(wrapper.vm.options.page).toBe(1);
    expect(axios.get).toBeCalledWith(
      `https://tracktik-challenge.staffr.com/Clients?_page=1&_limit=5&q=search term`
    );
  });

  it("changes pages correctly", async () => {
    wrapper.vm.options = { itemsPerPage: 5, page: 2 };
    await wrapper.vm.$nextTick();
    expect(axios.get).toBeCalledWith(
      `https://tracktik-challenge.staffr.com/Clients?_page=2&_limit=5&q=`
    );
  });
});

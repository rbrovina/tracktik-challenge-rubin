import { shallowMount } from "@vue/test-utils";
import Profile from "@/components/Profile.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify)

jest.mock("axios");

const mockUser = {
  username: "testuser",
  email: "testuser@example.com",
  givenName: "Test",
  locale: "en-US",
};

describe("Profile.vue", () => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let wrapper: any; // TODO: Find a way to remove the eslint-disable for this warning
  let vuetify = new Vuetify();

  beforeEach(async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUser });
    wrapper = shallowMount(Profile, { vuetify });
    await Vue.nextTick();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches user data on mount", async () => {
    expect(axios.get).toHaveBeenCalledWith(
      "https://tracktik-challenge.staffr.com/me"
    );
    expect(wrapper.vm.user).toEqual(mockUser);
  });

  it("displays the correct given name", async () => {
    wrapper.setData({ dialog: true });
    await Vue.nextTick();
    const givenNameText = wrapper.text();
    expect(givenNameText).toContain("Test");
  });
});

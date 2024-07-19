import { shallowMount } from '@vue/test-utils';
import Profile from '@/components/Profile.vue';
import axios from 'axios';
import Vue from 'vue';

jest.mock('axios');

const mockUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  givenName: 'Test',
  locale: 'en-US',
};

describe('Profile.vue', () => {
  let wrapper: any;

  beforeEach(async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUser });
    wrapper = shallowMount(Profile);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches user data on mount', async () => {
    expect(axios.get).toHaveBeenCalledWith('https://tracktik-challenge.staffr.com/me');
    expect(wrapper.vm.user).toEqual(mockUser);
  });

  it('opens the dialog when avatar is clicked', async () => {
    const avatar = wrapper.find('.iconName');
    await avatar.trigger('click');
    expect(wrapper.vm.dialog).toBe(true);
  });

  it('closes the dialog when close button is clicked', async () => {
    wrapper.setData({ dialog: true });
    await Vue.nextTick();
    const closeButton = wrapper.find('v-btn');
    await closeButton.trigger('click');
    expect(wrapper.vm.dialog).toBe(false);
  });

});

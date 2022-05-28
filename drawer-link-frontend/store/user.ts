export const state: any = () => ({
  user: null,
});

export const mutations = {
  set(state: any, user: any) {
    state.user = user;
  },

  logout(state: any) {
    state.user = null;
  },
}
import { defineStore } from "pinia";

export const useLoadingState = defineStore("loading", {
  state: () => {
    return {
      isLoading: false,
      isProcessing: false,
    };
  },
});

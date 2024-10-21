// 메인 페이지에서 쓸 데이터 요청 및 저장하는 곳
import { fn } from "@/utils/apiFunc";
import { create } from "zustand";

const useMainStore = create((set) => ({
  mainData: [],
  setMainData: async () => {
    let result = await fn.main();
    set({ mainData: result });
  },
}));

export default useMainStore;

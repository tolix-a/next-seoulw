import { create } from "zustand";


const useSearchStore = create((set) => ({
  searchWord: '',
  setSearchWord: (word) => set({searchWord: word}),
  results: [],
  setResults: (newResults) => set((state) => {
    const exist = state.results.map(result => result.value);
    const rere = newResults.reduce((acc, result) => {
      if (!exist.includes(result)) {
        acc.push({ value: result, timestamp: Date.now() });
      } else {
        const existIndex = acc.findIndex(r => r.value === result);
        if (existIndex !== -1) {
          acc[existIndex].timestamp = Date.now();
        }
      }
      return acc;
    }, [...state.results]);

    if (rere.length > 10) {
      rere.shift();
    }
    const sortResults = rere.sort((a, b) => a.timestamp - b.timestamp);

    document.cookie = `results=${JSON.stringify(sortResults)}; path=/;`;
    return { results: sortResults };
  }),

  readCookie : () => set(() => {
    const cookievalue = document.cookie.split(';').find(row => row.includes('results='));
    if (cookievalue) {
      return {results: JSON.parse(cookievalue.split('=')[1]) || [] };
    } else {
      return { results: [] };
    }
  }),

  deleteC: (value) => {
    const cookievalue = document.cookie.split(';').find(row => row.includes('results=')).trim()
    let results = [];

    if (cookievalue) {
      results = JSON.parse(cookievalue.split('=')[1]) || [];
      const updatedR = results.filter(result => result.value !== value);
      document.cookie = `results=${JSON.stringify(updatedR)}; path=/;`
      set({ results: updatedR});
    }
  },



  // 최근 본 공연 관련 상태
  recentPerformances: [],
  setRecentPerformance: (performance) => set((state) => {
    const updatedPerformances = state.recentPerformances.filter(
      (p) => p.mt20id !== performance.mt20id // mt20id를 기준으로 중복 제거
    );
    
    updatedPerformances.push(performance);
    if (updatedPerformances.length > 10) {
      updatedPerformances.pop();
    }

    document.cookie = `recentPerformances=${JSON.stringify(updatedPerformances)}; path=/;`;
    return { recentPerformances: updatedPerformances };
  }),

  readCookie2: () => set(() => {
    const cookievalue = document.cookie.split(';').find(row => row.includes('recentPerformances='));
    if (cookievalue) {
      return { recentPerformances: JSON.parse(cookievalue.split('=')[1]) || [] };
    } else {
      return { recentPerformances: [] };
    }
  }),

  deleteX: (mt20id) => {
    const cookievalue = document.cookie.split(';').find(row => row.includes('recentPerformances='));
    let performances = [];
    
    if (cookievalue) {
      performances = JSON.parse(cookievalue.split('=')[1]) || [];
      const updatedPer = performances.filter(performance => performance.mt20id !== mt20id);
      document.cookie = `recentPerformances=${JSON.stringify(updatedPer)}; path=/;`;
      set({ recentPerformances: updatedPer });
    }
  }
}));




export default useSearchStore
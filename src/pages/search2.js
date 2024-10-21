import React, { useEffect, useState } from 'react'
import searchStyle from '@/styles/search.module.scss'
import useSearchStore from '../store/search_store';
import Card from '@/components/Card';
import { useRouter } from 'next/router';
import { fn } from '@/utils/apiFunc';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';
import TopButton from '@/components/TopButton';

function Search2() {
  const {results} = useSearchStore();
  const [functionData, setFunctionData] = useState({
    titleData:[],
    venueData:[]
  });
  const router = useRouter();
  const { query } = router.query;
  const searchWord = useSearchParams()
  let b = searchWord.get('query')
console.log(b);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setPage(1); // 페이지를 첫 번째로 초기화
    setFunctionData({ titleData: [], venueData: [] }); // 결과 초기화
    setHasMore(true); // 더 가져올 데이터가 있다고 초기화
    // handleSearch(1); // 첫 페이지의 결과를 가져오기
  }, [query]); // 쿼리 변화 감지

  const handleSearch = async (pageNum) => {
    setLoading(true);
    const data = await fn.search(b, pageNum);

    // if(data.titleData){
    //   // setFunctionData((state)=>({...state, titleData:[...state.titleData, ...data.titleData]}))
    //   setFunctionData((state)=>({...state, titleData: data.titleData}))
    // }
    // if(data.venueData){
    //   // setFunctionData((state)=>({...state, venueData:[...state.venueData, ...data.venueData]}))
    //   setFunctionData((state)=>({...state, venueData:data.venueData}))
    // }

    


    if (data.length === 0) {
      setHasMore(false);
    } else {
      setFunctionData((prevData) => ({
        titleData: [...prevData.titleData, ...(data.titleData || [])],
        venueData: [...prevData.venueData, ...(data.venueData || [])]
      }));
    }

    setLoading(false);
  };

  

  useEffect(() => {
    handleSearch(page);
  }, [page]);

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore]);
  
  console.log(functionData)

  // return<></>

  // if(!functionData)<></>;


  return (
    
    <div className={`search ${searchStyle.search}`}>
      { functionData.titleData.length || functionData.venueData.length ? (
      <>
        <h2>검색 결과</h2>
        <div className={searchStyle.thousand}>
          {functionData?.titleData.map((item,i) => (
            <figure key={i}>
              <Card item={item}/>
            </figure>
          ))}
        </div>
      </>
      ) : ''
      }

      {
        loading ? <Loading/> :
        functionData.titleData.length === 0 && functionData.venueData.length === 0 ? (
          <>
            <h2>검색 결과</h2>
            <div className={searchStyle.none}>
              <p>검색 결과가 없습니다.</p>
            </div>
          </> 
        ) : ''
      }
      <TopButton/>
    </div>
  )
}

export default Search2
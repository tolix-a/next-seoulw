import React, { useEffect, useState, useRef } from 'react'
import searchStyle from '@/styles/search.module.scss'
import useSearchStore from '../store/search_store';
import Card from '@/components/Card';
import { useRouter } from 'next/router';
import { fn } from '@/utils/apiFunc';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';

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

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    setPage(1);
    setFunctionData({ titleData: [], venueData: [] });
    setHasMore(true);
  }, [query]);

  const handleSearch = async (pageNum) => {
    setLoading(true);
    let data = await fn.search(b, pageNum);

    if (!data.titleData) {
      setHasMore(false);
    } else {
      setFunctionData((prevData) => ({
        titleData: [...prevData.titleData, ...(data.titleData || [])],
        // venueData: [...prevData.venueData, ...(data.venueData || [])]
      }));
    }
    setLoading(false);
  };
  

  useEffect(() => {
    handleSearch(page);
  }, [page,query]);
  
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && hasMore && !loading && functionData.titleData.length > 0) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasMore, loading, functionData.titleData]);

  console.log(functionData)


  return (
    
    <div className={`search ${searchStyle.search}`}>
      {/* { functionData.titleData.length || functionData.venueData.length ? ( */}
      { functionData.titleData.length ? (
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
        functionData.titleData.length === 0 ? (
        // functionData.titleData.length === 0 && functionData.venueData.length === 0 ? (
          <>
            <h2>검색 결과</h2>
            <div className={searchStyle.none}>
              <p>검색 결과가 없습니다.</p>
            </div>
          </> 
        ) : ''
      }

      {/* <div ref={loadMoreRef} style={{ height: '30px' }} /> */}
      {hasMore && <div ref={loadMoreRef} style={{ height: '20px' }} />}
    </div>
  )
}

export default Search2
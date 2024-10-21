import React, { useEffect, useState } from 'react';

const TopButton = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [x, setX] = useState();
  
    const toggleVisibility = () => {
      if (window.scrollY  > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
  
    useEffect(() => {
        const device = document.querySelector('main');
        setX(device.offsetWidth)

      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);



    return (
        <button 
        onClick={scrollToTop} 
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '100px',
          right: `calc(51% - ${x/2}px)`,
          width: '50px',
          height: '50px',
          padding: '10px',
          zIndex: '3',
          fontSize:'1.2rem',
          backgroundColor:'rgb(255,75,119)',
          color: '#fff',
          borderRadius: '99px',
          cursor: 'pointer',
        }}
      >
        ↑
      </button>
  )
}

export default TopButton
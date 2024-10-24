import React from 'react'
import bookpStyle from '@/styles/bookpage.module.scss'

function bookpage() {
  return (
    <div className={bookpStyle.bookpage}>
      <div>
        <p>6<span>/50</span></p>
        <button>전체 삭제</button>
      </div>

      <ul>
        <li>
          <img src='./assets/images/poster_07.jpg'/>
          <p>뮤지컬 (지킬앤 하이드) jeky & Hyde</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
        <li>
          <img src='./assets/images/poster_04.jpg'/>
          <p>뮤지컬 (클로버)</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
        <li>
          <img src='./assets/images/poster_07.jpg'/>
          <p>뮤지컬 (지킬앤 하이드) jeky & Hyde</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
        <li>
          <img src='./assets/images/poster_07.jpg'/>
          <p>뮤지컬 (지킬앤 하이드) jeky & Hyde</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
        <li>
          <img src='./assets/images/poster_04.jpg'/>
          <p>뮤지컬 (클로버)</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
        <li>
          <img src='./assets/images/poster_07.jpg'/>
          <p>뮤지컬 (지킬앤 하이드) jeky & Hyde</p>
          <button><img src='./assets/icons/heart_pink.svg'/></button>
        </li>
      </ul>
    </div>
  )
}

export default bookpage
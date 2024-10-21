import React from 'react'
import loadingStyle from '@/styles/loading.module.scss'


function Loading() {
  return (
    <div className={loadingStyle.loading}>
        <div className={loadingStyle.loader}></div>
    </div>
  )
}

export default Loading
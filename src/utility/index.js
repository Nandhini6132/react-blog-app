import React from 'react'

export  const WordCount = (para,count) => {
    if(para.length>count){
      para = para.substring(0,count)+ '...'
    }
  return para
}


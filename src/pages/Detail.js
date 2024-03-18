import { doc, getDoc } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'

const Detail = ({setActive}) => {
  const {id}= useParams()
  const [blogDetail, setBlogDetail]= useState()

  useEffect(()=>{
    id && getBlogDetail()
  },[id])

  const getBlogDetail=async()=>{
    {console.log(id)}
    const docRef = doc(db, 'blogs',id);
    const  blogDetailData = await getDoc(docRef)
    setBlogDetail(blogDetailData.data())
    setActive(null)
  }

  console.log(blogDetail)
  if (blogDetail) {
    console.log('hhkhkjhky78iu');
}
else{
  console.log('nooo')
}
  return (
    <div>
    <div style={{height:'500px', position:'relative'}}>
    <div style={{backgroundImage:`url('${blogDetail?.imgUrl}')`, backgroundSize:'cover', backgroundRepeat:'no-repeat', height:'100%'}}>
      <div className="overlay"></div>
      <div className="title d-flex flex-column" style={{position:'absolute', bottom:'20%', width:'100%', textAlign:'center', color:'white', }}>
        <span><small>{blogDetail?.timestamp.toDate().toDateString()}</small></span>
        <span style={{fontSize:'xxx-large'}}>{blogDetail?.title} </span>
      </div>
     </div>
    </div>

     <div className="container-fluid mt-5">
      <div className="container text-start">
          <div>
          <p>
          {blogDetail?.timestamp.toDate().toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} :{blogDetail?.auther}
          </p>
          <hr />
          <div>
            <p>{blogDetail?.description}</p>
          </div>
          </div>
      </div>
     </div>
    </div>
  )
}

export default Detail
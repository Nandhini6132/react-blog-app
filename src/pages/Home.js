import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { WordCount } from "../utility";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import {swal} from 'sweetalert'

const Home = ({user}) => {
  const userId = user?.uid
  console.log(userId)
  //Getting blogs from firestore
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    async function getBlog() {
      const q = query(collection(db, "blogs"));
      const shot = await getDocs(q);
      let a = [];
      shot.forEach((doc) => {
        a.push({id:doc.id, ...doc.data() });
        {console.log(doc.id)}
      });
      setBlogs(a);
    }
    return getBlog;
  }, []);

  console.log(blogs);

  const handleDelete=async(id)=>{
    console.log(id)
    await deleteDoc(doc(db,'blogs',id))
  }

  return (
    <>
      <div className="container-fluid pb-4 pt-4">
        <div className="container padding">
          <div className="blogs">
            <div>
             
             
              <div className="row ">
                <div className="col-md-8">
                <h2 className="text-start">Daily Blogs</h2>
                <hr />
                  <div className="mt-5">
                  {blogs?.map((item, i) => (
                    
                    <div class="card mb-5 border-0" style={{height:'300px'}}>
                      {console.log(item.id)}
                      <div class="row g-0" style={{height:'300px'}}>
                        <div class="col-md-6"  style={{ height: "100%" }}>
                          <img
                            src={item.imgUrl}
                            class="img-fluid rounded-start "
                            alt="Astro img"
                            style={{ height: "100%",width:'100%' }}
                          />
                        </div>
                        <div class="col-md-6">
                          <div class="card-body pb-0">
                            <h5 class="card-title">{item.categories}</h5>
                            <div className="text-justify mt-4 text-start">
                              <p class="card-text mb-0"> Posted on:
                                <small class="text-body-secondary">
                                  {item.timestamp.toDate().toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                                </small>
                              </p>
                              <p>Posted by: <small  class="text-body-secondary">{item.auther}</small></p>
                            </div>
                           <div className="">
                           <p class="card-text text-start">
                              {WordCount(item.description, 250)}
                            </p>
                           </div>
                         <div className="d-flex mt-2 justify-content-between me- mb-2">
                            <Link to={`/details/${item.id}`}><button className="btn btn-secondary">Read more</button></Link>

                            {userId && item.userId === userId && (
                                 <div className="d-flex gap-3">
                                 <MdDelete onClick={()=>handleDelete(item.id)} style={{color:'#e92b2b', fontSize:'xx-large',cursor:'pointer'}}/>
                                 <Link to={`/update/${item.id}`}>
                                  <MdEdit  style={{color:'#2436c1', fontSize:'xx-large',cursor:'pointer'}}/>
                                 </Link>
                                 </div>
                            )}
                     

                         </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

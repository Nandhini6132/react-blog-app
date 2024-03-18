import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import {swal} from 'sweetalert'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddEditBlog = ({ user, setActive }) => {
  const category = ["Technology", "Astrology", "Science", "Fiction", "Journal"];
  const initialState = {
    title: "",
    tags: [],
    trending: "",
    categories: "",
    description: "",
  };
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload" + progress + "%");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(form);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTag = (event, selectedTags) => {
    if (Array.isArray(selectedTags)) {
      setForm({ ...form, tags: tags });
    } else {
      console.error("Selected tags are not an array:", selectedTags);
    }
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };
  const handleCategory = (e) => {
    setForm({ ...form, categories: e.target.value });
  };

  //Update the blog
  const { id } = useParams();
  useEffect(() => {
    id && updateBlog();
  }, [id]);
  const updateBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      try {
        await addDoc(collection(db, "blogs"), {
          ...form,
          timestamp: serverTimestamp(),
          auther: user.displayName,
          userId: user.uid,
        });
        // swal('You Have created a blog', 'success')
        
        console.log("ujhhb");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await updateDoc(doc(db, "blogs", id), {
          ...form,
          timestamp: serverTimestamp(),
          auther: user.displayName,
          userId: user.uid,
        });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const { title, tags, trending, categories, description } = form;
  return (
    <>
      <div className="container">
        <h2 className="mt-4">{id ? "Update Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="text"
              name="title"
              class="form-control"
              id="title"
              placeholder="Title"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div class="mb-3">
            <Stack spacing={3} sx={{ width: "1005" }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={tagOptions}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Multiple values"
                    name={tags}
                    onChange={handleTag}
                  />
                )}
              />
            </Stack>
          </div>

          <div className="mb-3 d-flex">
            <FormControl
              className="d-flex flex-row w-100"
              value={trending}
              onChange={handleTrending}
              name="trending"
            >
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                className="d-flex flex-row"
              >
                IsTrending?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                className="d-flex flex-row ms-auto"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="mb-3">
            <select
              class="form-select"
              aria-label="Default select example"
              name="categories"
              onChange={handleCategory}
            >
              <option selected>Please select category</option>
              {category.map((a) => (
                <option value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="Description"
                value={description}
                onChange={handleChange}
                name="description"
                style={{ height: "100px" }}
              ></textarea>
            </div>
          </div>

          <div className="mb-3">
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupFile01">
                Upload
              </label>
              <input
                type="file"
                class="form-control"
                id="inputGroupFile01"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={progress !== null && progress < 100}
            >
              {id ? "Update" : " Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const tagOptions = [
  {
    title: "Tech",
  },
  { title: "Entertainment" },
];
export default AddEditBlog;

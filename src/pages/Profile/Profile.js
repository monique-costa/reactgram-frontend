import './Profile.css'

import {uploads} from '../../utils/config';

// components
import Message from '../../components/Message/Message';
import {Link} from 'react-router-dom';
import {BsFillEyeFill, BsPencilFill, BsXLg} from 'react-icons/bs';

// hooks
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

// redux
import { getUserDetails, profile } from '../../slices/userSlice';
import { addListener } from '@reduxjs/toolkit';
import { publishPhoto, resetMessage } from '../../slices/photoSlice';

const Profile = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {user, loading} = useSelector((state) => state.user);
  const {user: userAuth} = useSelector((state) => state.auth);
  const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const photoData = {
      title,
      image
    };

    const formData = new FormData();
    Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));
    formData.append("photo", formData);

    dispatch(publishPhoto(formData));

    setTitle("");

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  }; 

  if (loading) {
    return <p>Carregando...</p>
  };

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}

        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      {(id === userAuth._id) && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu</h3>

            <form onSubmit={handleSubmit}>
              <label>
                <span>T??tulo da foto:</span>
                <input type="text" name="title" placeholder='Insira um t??tulo' value={title || ""} onChange={(e) => setTitle(e.target.value)}/>
              </label>

              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile}/>
              </label>

              {!loadingPhoto && <input type="submit" value="Enviar" />}
              {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
              {errorPhoto && <Message msg={errorPhoto} type="error"/> }
              {messagePhoto && <Message msg={messagePhoto} type="success"/> }
            </form>
          </div>
        </>
      )}
    </div>
  )
};

export default Profile
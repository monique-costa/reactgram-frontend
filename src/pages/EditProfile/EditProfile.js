import './EditProfile.css'

import {uploads} from '../../utils/config';

// hooks
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

// redux
import {profile, resetMessage, updateProfile} from '../../slices/userSlice';

// components
import Message from '../../components/Message/Message'

const EditProfile = () => {
    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleFile = (e) => {
        const image = e.target.files[0];

        setPreviewImage(image);
        setProfileImage(image);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const userData = {
            name
        };

        if(profileImage){
            userData.profileImage = profileImage;
        };

        if(bio){
            userData.bio = bio;
        };        
        
        if(password){
            userData.password = password;
        };

        const formData = new FormData();

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

        formData.append("user", userFormData);

        await dispatch(updateProfile(formData));

        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000);
    }

  return (
    <div id="edit-profile">
        <h2>Editar seu perfil</h2>
        <p className='subtitle'>Altere seus dados, selecione uma imagem de perfil e adicione mais informações sobre você.</p>

        {(user.profileImage || previewImage) && (
            <img src={
                previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
            } alt={user.name} className='profile-image'/>
        )}

        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" name='name' placeholder='Nome' value={name || ""} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <span>E-mail:</span>
                <input type="email" name="email" placeholder='E-mail' value={email || ""} disabled />
            </label>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" name="img" onChange={(e) => handleFile(e)}/>
            </label>
            <label>
                <span>Bio:</span>
                <textarea name="bio" placeholder='Fale mais sobre você' value={bio || ""} onChange={(e) => setBio(e.target.value)}/>
            </label>
            <label>
                <span>Alterar senha:</span>
                <input type="password" name="password" placeholder='Sua nova senha' onChange={(e) => setPassword(e.target.value)}/>
            </label>

            {!loading && <input type="submit" value="Enviar" />}
            {loading && <input type="submit" value="Aguarde..." disabled />}
            {error && <Message msg={error} type="error"/> }
            {message && <Message msg={message} type="success"/> }
        </form>
    </div>
  )
}

export default EditProfile
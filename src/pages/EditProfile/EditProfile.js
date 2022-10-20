import './EditProfile.css'

const EditProfile = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <div id="edit-profile">
        <h2>Editar seu perfil</h2>
        <p className='subtitle'>Altere seus dados, selecione uma imagem de perfil e adicione mais informações sobre você.</p>

        {/* Preview da imagem */}

        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" name='name' placeholder='Nome' />
            </label>
            <label>
                <span>E-mail:</span>
                <input type="email" name="email" placeholder='E-mail' disabled />
            </label>
            <label>
                <span>Imagem do perfil:</span>
                <input type="file" name="img" />
            </label>
            <label>
                <span>Bio:</span>
                <textarea name="bio" placeholder='Fale mais sobre você'/>
            </label>
            <label>
                <span>Alterar senha:</span>
                <input type="password" name="password" placeholder='Sua nova senha'/>
            </label>
            <input type="submit" value="Enviar" />
        </form>
    </div>
  )
}

export default EditProfile
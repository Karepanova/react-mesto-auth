import React from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

 const [urlAvatar, setUrlAvatar] = React.useState('');
 const avatarRef = React.useRef();

 React.useEffect(() => {
  setUrlAvatar('');
 }, [isOpen]);

 function handleChange() {
  setUrlAvatar(avatarRef.current.value);
 }

 function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  onUpdateAvatar({
   avatar: urlAvatar /* Значение инпута, полученное с помощью рефа */,
  });
 }

 return (
  <PopupWithForm
   title="Обновить аватар"
   name="edit-form-avatar"
   popup="avatar-form"
   isOpen={isOpen}
   onClose={onClose}
   onSubmit={handleSubmit}
  >
   <input
    value={urlAvatar}
    ref={avatarRef}
    className="popup__info popup__info_avatar"
    id="link-avatar"
    name="avatar"
    placeholder="Ссылка на картинку"
    type="url"
    required
    onChange={handleChange}
   />
   <span className="popup__error" id="link-avatar-error"> </span>
   <button className="popup__button popup__button_invalid" type="submit">Сохранить</button>
  </PopupWithForm>
 )
}

export default EditAvatarPopup;
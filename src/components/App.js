import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/api.js";

import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
 const [selectedCard, setSelectedCard] = React.useState({});
 const [currentUser, setCurrentUser] = React.useState({});
 const [cards, setCards] = React.useState([]);

 React.useEffect(() => {
  api.getUserData()
   .then((data) => {
    setCurrentUser(data);
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }, []);

 React.useEffect(() => {
  //монтирование (рождение)
  api.getArrayCards()
   .then((data) => {
    setCards(data);
   })
   .catch((err) => {
    console.log(`Ошибка сервера ${err}`)
   });
 }, []);

 function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
  //document.querySelector('.popup_avatar-form').classList.add('popup_opened');
 }

 function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
  //document.querySelector('.popup_edit-profile').classList.add('popup_opened');
 }

 function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
  //document.querySelector('.popup_new-card').classList.add('popup_opened');
 }

 // закрытие попапов
 function closeAllPopups() {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setSelectedCard({});
 }

 function handleCardClick(card) {
  setSelectedCard(card);
 }

 function handleUpdateUser(data) {
  api.editUserProfile(data)
   .then((dataProfile) => {
    setCurrentUser(dataProfile);
    closeAllPopups();
  })
 }

 function handleUpdateAvatar(data) {
  api.editAvatar(data)
   .then((dataAvatar) => {
    setCurrentUser(dataAvatar);
    closeAllPopups();
   })
 }

 function handleAddPlaceSubmit(data) {
  api.addNewCard(data)
   .then((dataNewCard) => {
    setCards([...cards, dataNewCard]);
    closeAllPopups();
 })
 }


 function handleCardLike(card) {
  // Снова проверяем, есть ли уже лайк на этой карточке
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Отправляем запрос в API и получаем обновлённые данные карточки
  api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
   // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
   const newCards = cards.map((c) => c._id === card._id ? newCard : c);
   // Обновляем стейт
   setCards(newCards);
  });
 }


 function handleCardDelete(card) {
  api.delCard(card._id)
   .then(() => {
    const data = cards.filter(function(i) {
     return i._id !== card._id;
    });
    setCards(data);
   })
 }


 return (
  <CurrentUserContext.Provider value={currentUser}>
   <div>
    <div className="container">
     <div className="page">
      <Header/>
      <Main
       onEditProfile={handleEditProfileClick}
       onAddPlace={handleAddPlaceClick}
       onEditAvatar={handleEditAvatarClick}
       onCardClick={handleCardClick}
       cards={cards}
       onCardLike={handleCardLike}
       onCardDelete={handleCardDelete}
      />
      <Footer/>
     </div>
    </div>


    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>



    <PopupWithForm
     title="Вы уверены?"
     name=""
     popup="confirm"
     onClose={closeAllPopups}
    >
     <button className="popup__button" type="submit" value="Да">Да</button>
    </PopupWithForm>

    <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={Object.keys(selectedCard).length !== 0}/>

   </div>
  </CurrentUserContext.Provider>
 );

}

export default App;

import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import Profile from './Profile';
import SearchUser from './SearchUser';
import { db } from '../firebase';
import { child, get } from "firebase/database";
import Placeholder from './images/avatar_placeholder.png';
import AddFriend from './images/add-friend-svgrepo-com.svg';
import { useStateValue } from './contexts/StateProvider';

const Home = () => {

const { logout, currentUser } = useAuth();
const navigate = useNavigate();
const [photoURL, setPhotoURL] = useState();
const [profileToggle, setProfileToggle] = useState(false);
const [addFriendToggle, setAddFriendToggle] = useState(false);
const [toggle, setToggle] = useState();
const [{user}, dispatch] = useStateValue();

useEffect(() =>{
  if(!user?.photoURL) {
    setPhotoURL(Placeholder);
  } else {
    setPhotoURL(user?.photoURL);
  }

  writeUserData(user?.uid, user?.displayName, user?.email);
  // console.log(user);
  // console.log({user});

},[currentUser]);

useEffect(() =>{
  if(!user?.photoURL) {
    setPhotoURL(Placeholder);
  } else {
    setPhotoURL(user?.photoURL);
  }
},[user?.photoURL]);

function writeUserData(userId, displayName, email) {

  const db_ref = db.ref();
  get(child(db_ref, `users/${userId}`)).then((snapshot) => {
    if (!snapshot.exists()) {
      db_ref.child('users/' + userId).set({
        photoUrl: "",
        displayName: displayName,
        Bio: "",
        Gender: "Prefer not to say",
        email: email
      })
    } 
  }).catch((error) => {
    console.error(error);
  });
}

function handleLogout() {
    alert('Youve been logged out');
    logout();
    navigate("/");
}

const toggleProfileHandler = () => {
  setProfileToggle(!profileToggle);

  if(addFriendToggle) {
    setAddFriendToggle(!addFriendToggle);
    // setToggle(toggle);
    }
}

const toggleAddFriendHandler = () => {
  setAddFriendToggle(!addFriendToggle);
  if(profileToggle) {
  setProfileToggle(!profileToggle);
  // setToggle(toggle);
  }
}
const toggleHandler = () => {
setToggle(toggle);

}

useEffect(() =>{
  if(!addFriendToggle && !profileToggle) {
    setToggle(true);
  }
  else {
    setToggle(false);
  }
},[profileToggle, addFriendToggle]);
  return (

    <div className='home__container'> 
        <h1> Homepage </h1>
        <div className='main__menu'>
          <div className='side-menu__bar'>
            <p>side menu </p>


            <div className='side-bar__icon' id="profile__icon" onClick={toggleProfileHandler}>
        
            </div>

            <div className='side-bar__icon' id="add-friend__icon" onClick={toggleAddFriendHandler}>

            </div>

            <button onClick={handleLogout} type='submit'>Logout</button>
        
          </div>

          {/* <div className='side-bar__panel'> */}

          {profileToggle &&(
          <Profile /> )}

          {/* {!toggle &&(
            <div className='chat-list__container'>

              <h1> THIS IS THE CHAT LIST CONTAINER</h1>

            </div>

            )} */}
          
          
          {addFriendToggle &&(
          <SearchUser /> )}


{/* </div> */}
{toggle &&(
<div className='chat__container'>

  <h1> FRIENDS CONTAINER </h1>

  

</div>

)}    
<div className='chat__container'>

  <h1> Chat container </h1>

  

</div>

        </div>
    </div>

  )
}

export default Home
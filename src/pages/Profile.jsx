import {useState, useEffect } from "react"
import {getAuth , updateProfile} from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import {db} from '../firebase.config'
import {updateDoc,doc} from 'firebase/firestore'
import {toast} from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
 
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const {name,email} = formData
  const navigate = useNavigate()

  const onLogout = ()=>{
    auth.signOut()
    navigate('/')
  }

  const onsubmit = async ()=>{
    try {
      if(auth.currentUser.displayName !==name){
        //update display name fb
        await updateProfile(auth.currentUser,{
          displayName:name
        })
        //update in firestore
        const userRef = doc(db,'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          name:name
        })
      }
    } catch (error) {
      toast.error('could not update profile details')
    }
  }

  const onChange= (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
 
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Log Out
        </button>
      </header>

      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          changeDetails && onsubmit()
          setChangeDetails((prevState)=> !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>

      <div className="profileCard">
        <form >
          <input 
          type="text" 
          id="name"
          className={
            !changeDetails ?
             "profileName"
            : "profileNameActive"
          } 
          disabled={!changeDetails}
          value={name}
          onChange={onChange}
          />

<input 
          type="text" 
          id="email"
          className={
            !changeDetails ?
             "profileEmail"
            : "profileEmailActive"
          } 
          disabled={!changeDetails}
          value={email}
          onChange={onChange}
          />
        </form>
      </div>
    </div>
  )

}

export default Profile

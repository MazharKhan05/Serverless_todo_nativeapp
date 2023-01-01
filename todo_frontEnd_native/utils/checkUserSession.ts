import { rejects } from "assert";
import * as SecureStore from "expo-secure-store";
import { resolve } from "path";
import { cognitoPool } from "../utils/cognito-pool";


 const checkSession =  async () => {
    const userSession = {
        isLoggedIn: false,
        authToken: ''
    }
    const loggedInUserToken = await SecureStore.getItemAsync("authToken");  //await SecureStore.getItemAsync("authToken")
      const user = cognitoPool.getCurrentUser();
      if(user){
        let isSessionValid = false
        let userId_token;
        user.getSession((err, session)=>{
            console.log('session validity: ' + session.isValid());
            if(err){
                console.log('err with session...', err)
            }
            userId_token = session?.getIdToken().getJwtToken()
            if(userId_token && userId_token !== "")isSessionValid = true
        })
        console.log('cognitoSessionUserToken', userId_token)
        if(loggedInUserToken === String(userId_token)){
            userSession.authToken = userId_token;
            userSession.isLoggedIn = true
            return userSession
        };
      }
      if (user === null) return userSession //No user loggedIn
  }

  export const userSignout = async ()=>{
    console.log('logout clicked...')
    const user = cognitoPool.getCurrentUser();
    let error='';
    let signOutErr='';
    if(user){
        user.getSession((err, session)=>{
              
            user.globalSignOut({
                onSuccess: (res)=>{
                    console.log('user successfully logged out...', res)
                },
                onFailure: (err:Error)=>{
                    signOutErr = String(err)
                    console.log('user log out failed...', err)
                }
            }) // invalidates/destroys the session tokens for userSession
            user.signOut()  //clears out the userSession
            if(err)error =err;
        })
        if(error === '' && signOutErr === ''){
            await SecureStore.deleteItemAsync("authToken")
        }
    }
  }
  export default checkSession;
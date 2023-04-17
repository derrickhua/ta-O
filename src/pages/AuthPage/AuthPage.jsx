import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function AuthPage({setUser}) {
    return (
        <>
            <h1>Sign Up</h1>    
            <SignUpForm setUser={setUser}/>
        </>
        )
    
  }
  
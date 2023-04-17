import { checkToken } from "../../utilities/usersService";

export default function OrderHistoryPage() {

    async function handleCheckToken() {
      let expDate = await checkToken()
      console.log(expDate)
    }

    return (
    <>
      <h1>Order History Page</h1>    
      <button onClick={ handleCheckToken }>Check When My Login Expires</button>
    </>
    );
  }
  
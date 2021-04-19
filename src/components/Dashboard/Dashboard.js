import { useContext } from "react"
import { UserContext } from "../../UserContext"

const Dashboard = () => {
  const [user] = useContext(UserContext)
  console.log(user)

  return ( 
    <h1>Welcome, {user.username}</h1>
   )
}
 
export default Dashboard
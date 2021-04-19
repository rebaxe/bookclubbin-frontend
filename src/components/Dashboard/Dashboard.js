import { Button } from "@material-ui/core"
import { useContext } from "react"
import { useHistory } from "react-router"
import { UserContext } from "../../UserContext"

const Dashboard = () => {
  const [user] = useContext(UserContext)
  const history = useHistory()
  console.log(user)

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <Button onClick={() => {history.push('/search')}}>Search</Button>
    </div>
   )
}
 
export default Dashboard
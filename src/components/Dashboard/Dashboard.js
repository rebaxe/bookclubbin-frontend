import { useContext } from 'react'
import { UserContext } from '../../UserContext'

const Dashboard = () => {
  const [user] = useContext(UserContext)

  return (
    <div>
      <h1>Happy to see you BookClubbin', {user.username}!</h1>
    </div>
   )
}
 
export default Dashboard
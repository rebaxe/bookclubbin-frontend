import {ReactComponent as Reader} from './images/reader.svg'

const Home = () => {
  return ( 
    <div className="homePage">
      <div className="svg-reader">
       <Reader style={{height: '60vh', padding: '10vh'}} />
      </div>
    </div>
   );
}
 
export default Home

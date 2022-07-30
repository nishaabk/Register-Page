import { Link } from "react-router-dom";
const Home = () => {

    const logout =  () => {

    }
 
    return (
        <section>
            <h1>Home</h1>
            <br />
            
            <br />
            
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            
            
            <Link to="/linkpage">Go to the link page</Link>
            <br />
            
            
            <br />
            
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}
 
export default Home
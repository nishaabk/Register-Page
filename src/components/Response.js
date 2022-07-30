import { Link } from "react-router-dom"
const Response = () => {
    return (
        <section>
            <h1>Response Page</h1>
            <br />
            <p>You must have been assigned an Response role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}
export default Response
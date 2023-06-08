import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
            <Link className="navbar__link" to="/letter">Write A Letter</Link>
            </li>
            <li className="navbar__item">
            <Link className="navbar__link" to="/library">Letter Library</Link>
            </li>
            <li className="navbar__item">
            <Link className="navbar__link" to="/contact">Manage Contacts</Link>
            </li>
            {
                (localStorage.getItem("auth_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("auth_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}

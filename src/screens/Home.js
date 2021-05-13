import { Link } from "react-router-dom";
import {isLoggedInVar, logUserOut} from "../apollo"

function Home(){
    return(
        <div>
            <h1>Welcome</h1>
            <Link to="/create-account">
                <button >Add User</button>
            </Link>
            <Link to="/createAccount">
            <button >Add equipment</button>
            </Link>
            <button onClick={() => logUserOut()}>Log out now!</button>
        </div>
    );
}

export default Home;
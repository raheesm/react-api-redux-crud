import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const View = () => {
    const {vid} = useParams();

    const users = useSelector(state=>state.app.users)
    const sUser = users.find(user=>user.id===vid)
    return ( 
        <main>
            <h1>{sUser.name}</h1>
            <p>{sUser.age}</p>
            <p>{sUser.gender}</p>
            <p>{sUser.email}</p>
        </main>
     );
}
 
export default View;
import '../Styles/Home.css';
import { useNavigate} from 'react-router-dom'; 

const HomePage = () =>{
    const navigate = useNavigate();

    return (
         <div>
            <p>
                Hello Test!!
            </p>
         </div>
    );
}
export default HomePage;
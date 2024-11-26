import { Typography } from '@mui/material';
import '../Styles/Portfolio.css';
import { useNavigate} from 'react-router-dom'; 
import { Container, Row, Col } from 'react-bootstrap';
import pic1 from "../Assets/Manpreet.png";
import pic2 from "../Assets/fire.png";

const PortfolioPage = () =>{

    const navigate = useNavigate();

    const handleGitHub = () => {
        window.open('https://github.com/Nickdoctor', '_blank');
    };

    const handleLinkedIn = () => {
        window.open('https://www.linkedin.com/in/nicolas-gugliemo-5776631b9/', '_blank');
    };

    return (
<div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }} // Light background for full page
        >
            <div className="container text-center">
                <div className="card p-4 shadow-lg">
                    <h2 className="card-title mb-4">Portfolio</h2>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <div>
                                <Typography>
                                    GlambyManpreet.net
                                </Typography>
                            </div>
                        </Col>
                        <Col md={6} className="text-center">
                            <img
                                src={pic1}
                                alt="Manpreet"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: "400px" }}
                            />
                        </Col>
                        <Col md={6} className="text-center">
                            <img
                                src={pic2}
                                alt="fire"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: "400px" }}
                            />
                        </Col>
                        <Col md={6}>
                            <div>
                                <Typography>
                                    Fire detection using computer vision
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
export default PortfolioPage;
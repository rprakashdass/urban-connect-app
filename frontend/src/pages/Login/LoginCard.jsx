import PropTypes from 'prop-types';

const LoginCard = ({title, link}) => {
    return (
        <a href={link} >
            <div className='gap-3 primary p-4' style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div className='object-fit-fill'><img src="/favicon.png" width={60}/></div>
                <h4> {title} </h4>
            </div>
        </a>
    );
}

LoginCard.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
}


const Login = () => {
    const containerStyle = {
        margin: "2% 10%",
    }

    return (
        <section style={containerStyle}>
            <div className="row gap-5 justify-content-center">
                <div className="col-md-3 p-4">
                    <LoginCard
                        title="Department"
                        link="/login"
                    />
                </div>
                <div className="col-md-3 p-4">
                    <LoginCard
                        title="Employee"
                        link="#employee"
                    />
                </div>
                <div className="col-md-3 p-4">
                    <LoginCard
                        title="Agency"
                        link="#agency"
                    />
                </div>
            </div>
        </section>
    );
}



export default Login;
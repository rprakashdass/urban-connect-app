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

export default LoginCard;
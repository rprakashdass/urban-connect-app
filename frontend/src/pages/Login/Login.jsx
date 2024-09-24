import LoginCard from "./LoginCard";

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
                        link="#department"
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
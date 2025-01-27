import UseAuth from "../../Hooks/UseAuth";

const DashboardHome = () => {
    const {user} = UseAuth()
    // console.log(user)
    return (
        <div>
            {/* hello {user} */}

            hellooo
        </div>
    );
};

export default DashboardHome;
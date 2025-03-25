import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <>
            <h1>Welcome to dashboard</h1>
            <button style={{ background: "red" }} onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard
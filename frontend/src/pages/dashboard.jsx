import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("auth_token_login");
  const redirect = useNavigate();
  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  const logout = () => {
    localStorage.removeItem("auth_token_login");
    return redirect("/");
  };

  return (
    <div className=" grid place-self-center h-screen ">
      <button onClick={logout} className=" btn btn-success btn-lg">
        Logout 👋🏾
      </button>
    </div>
  );
};

export default Dashboard;

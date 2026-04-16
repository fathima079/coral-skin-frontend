<<<<<<< HEAD
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const role = localStorage.getItem("role");

    if ( role !== "admin" )
        return <Navigate to="/"/>;


    return children;

}

=======
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {

    const role = localStorage.getItem("role");

    if ( role !== "admin" )
        return <Navigate to="/"/>;


    return children;

}

>>>>>>> 2ec2d8f07764667d1cb3efdf808e30e6e1ae9d32
export default AdminRoute;
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer); // eslint-disable-line @typescript-eslint/no-explicit-any
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Account/Signin" />;
}}
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminProtectedRoute = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/Dorja" />;
};

export default AdminProtectedRoute;

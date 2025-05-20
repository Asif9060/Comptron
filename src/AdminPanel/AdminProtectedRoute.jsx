import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminProtectedRoute = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    // List of admin email addresses - as a fallback
    const adminEmails = [
        "admin@comptron.com",
        "admin@example.com",
        // Add other admin emails as needed
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            
            // Check admin status - either from localStorage flag or email list
            const adminFlag = localStorage.getItem("isAdmin") === "true";
            const userEmail = currentUser ? currentUser.email : null;
            const isAdminEmail = userEmail && adminEmails.includes(userEmail);
            
            if (currentUser && (adminFlag || isAdminEmail)) {
                console.log("User is admin:", userEmail);
                setIsAdmin(true);
            } else {
                console.log("User is not admin:", userEmail);
                setIsAdmin(false);
            }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) return <p>Loading...</p>;

    if (!user) {
        console.log("No user authenticated, redirecting to login");
        return <Navigate to="/Dorja" />;
    }
    
    if (!isAdmin) {
        console.log("User not admin, redirecting to unauthorized");
        return <Navigate to="/unauthorized" />;
    }
    
    return children;
};

export default AdminProtectedRoute;

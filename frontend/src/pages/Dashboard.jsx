import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import axios from "axios";
// import DefaultImage from "../assets/images/profile.png"; 
const API_URL = process.env.REACT_APP_SITE_URL;

const Dashboard = () => {
      const [profile, setProfile] = useState(null);
      const [users, setUsers] = useState([]);
      const [products, setProducts] = useState([]);
      const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const usersRes = await axios.get(`${API_URL}/users`);
            const productsRes = await axios.get(`${API_URL}/products`);

            setUsers(usersRes.data);
            console.log('usersRes', usersRes)
            setProducts(productsRes.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load dashboard data. Please try again later.");
        }
        };

        fetchData();
    }, []);

  
    useEffect(() => {
    let timeout;

    const resetTimer = () => {

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.clear();
        toast.error("Session expired due to inactivity. Please log in again."); 
        navigate("/login");
      }, 5 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

   useEffect(() => {
    const checkSession = () => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("userToken");
        const expiry = localStorage.getItem("tokenExpiry");

        if (!token || !expiry || new Date() > new Date(expiry)) {
        toast.error("Session expired. Please log in again."); 
        localStorage.removeItem("userToken");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("user");
        navigate("/login"); 
        return;
        }

        if (user) {
        setProfile(JSON.parse(user));
        } else {
        navigate("/login");
        }
    };

    checkSession();

    const interval = setInterval(checkSession, 30 * 1000);

    return () => clearInterval(interval);
    }, [navigate]);

    // Example data transformations
    const roleData = [
        { name: "Admin", value: users.filter(u => u.role === "Admin").length },
        { name: "User", value: users.filter(u => u.role === "User").length },
        { name: "Tenent", value: users.filter(u => u.role === "Tenent").length },
    ];

    const brandData = products.reduce((acc, p) => {
        acc[p.brand] = (acc[p.brand] || 0) + 1;
        return acc;
    }, {});
    const brandChartData = Object.entries(brandData).map(([brand, count]) => ({ name: brand, value: count }));
    
    if (error) {
        return <p className="text-danger">{error}</p>;
    }
    
    console.log("profile",profile);
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//   const expiry = localStorage.getItem("tokenExpiry");
//     if (!token || !expiry || new Date() > new Date(expiry)) {
//       toast.error("Session expired. Please log in again.");  // ✅ show alert
//       localStorage.removeItem("userToken");
//       localStorage.removeItem("tokenExpiry");
//       navigate("/login"); // redirect without refreshing browser
//       return;
//     }

//    axios.get(`${API_URL}/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then(res => setProfile(res.data))
//         .catch(err => {
//         if (err.response && err.response.status === 403) {
//             toast.error("Session expired. Please log in again.");
//             localStorage.removeItem("userToken");
//             localStorage.removeItem("tokenExpiry");
//             navigate("/login"); 
//         } else {
           
//             toast.error("Profile fetch failed.");
//         }
//     });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   }

  return (
    <>
      {/* Profile Section */}
      <div className=" mt-4">
         <div className="card shadow-sm mb-3">
          <div className="card-body">
           <h4 className="card-title">Dashboard</h4>
          </div>
        </div>
        <div className="d-flex">
            <div className="col me-2">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4>User Roles</h4>
                        <PieChart width={400} height={300}>
                            <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </div>
            <div className="col ms-2">
                <div className="card shadow-sm">
                    <div className="card-body">
                        
                        {/* Products by Brand */}
                        <h4>Products by Brand</h4>
                        <BarChart width={500} height={300} data={brandChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </div>

        </div>
        
        

      </div>
  
    </>
    
  )
}

export default Dashboard
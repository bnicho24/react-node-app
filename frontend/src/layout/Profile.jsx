import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PopupModal from "../component/PopupModal";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import DefaultImage from "../assets/images/profile.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_SITE_URL;


const Profile = () => {
     const [profile, setProfile] = useState(null);
    
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: profile?.name || "",
        email: profile?.email || "",
        role: profile?.role || "User",
    });
     const [passwordFormData, setPasswordFormData] = useState({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmPassword: "",
    });
    const [previewUrl, setPreviewUrl] = useState();
    const [isPwdValid, setIsPwdValid] = useState(false);
 
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleUpdate = () => {
        setFormData({
            name: profile?.name || "",
            email: profile?.email || "",
            role: profile?.role || "User",
        });
        console.log("role", profile?.role )
        setShowModal(true)
    }
     const handleClose = () => setShowModal(false);

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("userToken");
        try {
        const res = await axios.put(`${API_URL}/users/profile`, formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
            console.log("put res", res)
            toast.success(res.data.message);
            setProfile(formData);
            localStorage.setItem("user", JSON.stringify(formData));
        } catch (err) {
            console.log("put err", err)
        toast.error(err.response.data);
        }
        console.log("Profile updated!");
        setShowModal(false);
    };

    const handleProfilePicture = async (e) => {
        
       const file = e.target.files[0];
        if (!file) return;

        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            toast.error("File size exceeds 5MB limit");
            return;
        }

        // Local preview
        setPreviewUrl(URL.createObjectURL(file));

        const formImageData = new FormData();
        formImageData.append("profile_picture", file);

        const token = localStorage.getItem("userToken");

        try {
            const res = await axios.put(`${API_URL}/users/profile/picture`, formImageData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            });

            toast.success("Profile image updated successfully");

            // Update profile state
            setProfile((prev) => ({
            ...prev,
            profile_picture: res.data.profile_picture,
            }));

            localStorage.setItem(
            "user",
            JSON.stringify({ ...profile, profile_picture: res.data.profile_picture })
            );

            // Replace preview with actual server URL
            setPreviewUrl(`${API_URL}${res.data.profile_picture}`);
        } catch (error) {
            toast.error(error.response?.data || "Network error");
        }
    }

     const handlePasswordChange = (e) => {
         const { name, value } = e.target;
        setPasswordFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "ConfirmPassword") {
        setIsPwdValid(value !== passwordFormData.NewPassword);
        }
        // setFormErrors((prevErrors) => ({
        // ...prevErrors,
        // [name]: error,
        // }));
    };
    const handlePasswordSubmit = async () => {
   
    if (passwordFormData.NewPassword !== passwordFormData.ConfirmPassword) {
      setIsPwdValid(true);
      return;
    }
    const token = localStorage.getItem("userToken");
    try {
      const res = await axios.put(
        `${API_URL}/profile/password`,
        {
          currentPassword: passwordFormData.CurrentPassword,
          newPassword: passwordFormData.NewPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message);
      setPasswordFormData({ CurrentPassword: "", NewPassword: "", ConfirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data || "Error updating password");
    }
  };

    console.log("profile",profile);
    console.log("formData",formData);
  return (
    <>
    <div className=" mt-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex">
                <div className="col border-end">
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={
                                previewUrl ||
                                (profile?.profile_picture ? `${API_URL}${profile.profile_picture}` : DefaultImage)
                            }
                            alt="Profile"
                            className="rounded-circle mb-3"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />
                        <input
                            type="file"
                            className="hidefile"
                            style={{ display: "none" }}
                            id="profileUploadInput"
                            accept="image/*"
                            onChange={handleProfilePicture}
                        />

                        <label
                            htmlFor="profileUploadInput"
                            className="bg-white img-circle shadow uploadoption"
                            style={{
                            position: "absolute",
                            bottom: "15px",
                            right: "0px",
                            cursor: "pointer",
                            padding: "5px",
                            borderRadius: "50%",
                            }}
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </label>
                        </div>
                    
                    <h4 className="card-title">Profile Details</h4>
                    <p><strong>Name:</strong> {profile?.name}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Role:</strong> {profile?.role}</p>
                    <p><strong>Joined:</strong> {new Date(profile?.created_at).toLocaleString()}</p>
                    <div>
                        <button type="button" className="btn btn-outline-success" onClick={handleUpdate}>Edit Profile</button>
                    </div>
                </div>
                <div className="col px-3">
                    <div>
                        <h4 className="mb-4">Change Password</h4>
                    </div>
                    <Form>
                    <div className="mb-2">
                        <Form.Label>
                        Enter Current Password <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                        <Form.Control
                            type="password"
                            name="CurrentPassword"
                            placeholder="Enter "
                            value={passwordFormData.CurrentPassword}
                            onChange={handlePasswordChange}
                            className="form-control form-control-sm"
                            
                        />

                        </div>
                       
                    </div>
                    <div className="col-lg-12 mb-2">
                        <Form.Label>
                        Enter New Password <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                        <Form.Control
                            type="password"
                            name="NewPassword"
                            placeholder="Enter "
                            value={passwordFormData.NewPassword}
                            onChange={handlePasswordChange}
                            className="form-control form-control-sm"
                        />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <Form.Label>
                        Enter New Confirm Password{" "}
                        <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="position-relative">
                        <Form.Control
                            type="password"
                            name="ConfirmPassword"
                            placeholder="Enter "
                            value={passwordFormData.ConfirmPassword}
                            onChange={handlePasswordChange}
                            className="form-control form-control-sm"
                        />
                        
                        </div>
                        
                        {isPwdValid && (
                        <div className="invalid-feedback d-block">
                            Confirm password doesn't match
                        </div>
                        )}
                    </div>
                    <div className="col-lg-12 d-flex justify-content-end mt-2">
                        <Button variant="primary" onClick={handlePasswordSubmit}>
                        Save
                        </Button>
                    </div>
                    </Form>
                        
                </div>
            </div>
            
          </div>
        </div>
      </div>
      <PopupModal
        show={showModal}
        title="Edit Profile"
        onClose={handleClose}
        onSave={handleSave}
      >
         <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </PopupModal>
    </>
  )
}

export default Profile
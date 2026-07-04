import React, { useContext } from "react";
import "../styles/userUpdate.css";
import { Upload } from "lucide-react";
import { Save } from "lucide-react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const UserUpdate = () => {
  const {
    authUser,
    setAuthUser,
    selectedImage,
    setSelectedImage,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const handleProfileSetting = async (e) => {
    e.preventDefault();

    let userName = e.target.userName.value;
    let bio = e.target.bio.value;

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("bio", bio);

    if (selectedImage) {
      formData.append("profilePic", selectedImage);
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        "https://task-management-backend-o7m3.onrender.com/api/auth/user/update-profile",
        formData,
        {
          withCredentials: true,
        },
      );

      setAuthUser(data.user);
      toast.success(data.message);
      e.target.reset();
      setSelectedImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-page">
      <form onSubmit={handleProfileSetting}>
        <div className="update-page-top">
          <h2>Profile Settings</h2>
          <p>Update your profile information and manage your account.</p>
        </div>

        <div className="update-page-bottom">
          <div className="update-page-bottom-1">
            <div className="update-page-bottom-1-1">
              <p>Profile Picture</p>
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : authUser?.profilePic || "/avatar_icon.png"
                }
                alt="Profile preview"
              />
              <label htmlFor="avatar" className="avatar-upload-label">
                <div className="upload-file">
                  <input
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    type="file"
                    hidden
                    id="avatar"
                    accept=".png, .jpeg, .jpg"
                  />
                  <Upload />
                  Change Photo
                </div>
              </label>
            </div>

            <div className="update-page-bottom-1-2">
              <div className="form-in">
                <div className="form-fields">
                  <label htmlFor="userName">Full Name</label>
                  <input
                    id="userName"
                    type="text"
                    name="userName"
                    placeholder={authUser?.userName || "Your name"}
                  />
                </div>
                <div className="form-fields">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder={authUser?.bio || "Tell us about yourself"}
                    maxLength={100}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="update-page-bottom-2">
            <button type="submit" disabled={loading}>
              <Save />
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;

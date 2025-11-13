import GenericWindow from "./generic-window";
import ProfilePic from "../assets/profile.jpg";

const Profile = () => {

  return (
    <div className="flex items-center justify-center h-full">
      {/* Profile Window */}
        <div className="flex items-center justify-center h-full">
          <img
            src={ProfilePic}
            alt="Blake Eldridge"
            className="rounded-lg object-cover w-64 h-64"
          />
        </div>
    </div>
  );
};

export default Profile;

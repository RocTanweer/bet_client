import { useState } from "react";

import { ProfileDetails } from "../../layouts/profileDetails";
import { ProfileDetailsEdit } from "../../layouts/profileDetailsEdit";
import { FlexBox } from "../../layouts/flexBox";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
      }}
    >
      {!isEditing ? (
        <ProfileDetails setIsEditing={setIsEditing} />
      ) : (
        <ProfileDetailsEdit setIsEditing={setIsEditing} />
      )}
    </FlexBox>
  );
}

export default Profile;

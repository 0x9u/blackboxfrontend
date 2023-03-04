import React, { FC } from "react";
import Button from "../../components/buttonComponent";
import { useNavigate } from "react-router-dom";

const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen ">
      <div className="m-auto space-y-2">
        <div className="space-y-10 text-center text-8xl font-semibold">
          <p>😭</p>
          <p>
            404 <span className="font-medium">Not Found</span>
          </p>
        </div>
          <Button type="button" value="Back to main page" onClick={() => navigate("/")}></Button>
      </div>
    </div>
  );
};

export default NotFound;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navigate = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(props.to, props.from, props.replace);
  });
  return <></>;
};

export default Navigate;

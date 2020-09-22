import React from "react";
import Progress from "./Progress";

const ProgressLoader = (props) => {
  let isValid = props.isTrue;
  const [isLoading, setIsLoading] = React.useState(true);
  const callFakeAPI = () => {
    if (document.readyState === "complete") {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    callFakeAPI();
  }, [isValid]);

  return <Progress isAnimating={isLoading ? isLoading : isValid} />;
};

export default ProgressLoader;

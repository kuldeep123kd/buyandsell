import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* *** This Function is used to scroll the page to top when new page renders *** */

function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/404") window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}

export default ScrollToTop;
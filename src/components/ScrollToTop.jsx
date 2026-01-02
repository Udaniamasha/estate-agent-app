import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll the main window
    window.scrollTo(0, 0);
    
    // 2. Scroll the HTML/Body element (Backup for some browsers)
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;
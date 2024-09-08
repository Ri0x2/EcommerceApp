import { useEffect, useRef } from "react";
import { ArrowUp } from 'phosphor-react';
const ScrollToTop = () => {
  const scrollIconRef = useRef();

  const handleScrollIcon = () => {
    window.scrollTo({ top: 0 });
  };

  const handleWindowScroll = () => {
    if (window.scrollY >= document.documentElement.clientHeight) {
      scrollIconRef.current.classList.add("animate-go-up", "right-[15px]");
      scrollIconRef.current.classList.remove("right-[-50px]");
    } else {
      scrollIconRef.current.classList.remove("animate-go-up", "right-[15px]");
      scrollIconRef.current.classList.add("right-[-50px]");
    }
  };
  useEffect(() => {
    if (window.location.pathname == "/") {
      window.addEventListener("scroll", handleWindowScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);
  return (
    <div
      ref={scrollIconRef}
      onClick={handleScrollIcon}
      className="w-11 h-11 fixed bottom-[10px] right-[-50px] cursor-pointer duration-300 scroll-icon text-[30px] flex justify-center items-center hover:-translate-y-4 hover:bg-Secondary1 bg-Secondary rounded-full text-Text2 z-[1000]"
    >
        <ArrowUp size={32} />
    </div>
  );
};

export default ScrollToTop;
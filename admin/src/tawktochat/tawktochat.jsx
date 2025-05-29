import React, { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Chèn mã nhúng của Tawk.to
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/66ecd214e5982d6c7bb13572/1i86h98ss";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return <></>;
};

export default TawkToChat;

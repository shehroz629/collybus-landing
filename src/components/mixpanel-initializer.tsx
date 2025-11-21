"use client";

import { useEffect } from "react";

// Production token
const MIXPANEL_TOKEN = "9a450838f22921c823ae625793e996fa";

const MixpanelInitializer = () => {
  useEffect(() => {
    if (
      MIXPANEL_TOKEN &&
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined"
    ) {
      import("mixpanel-browser")
        .then((mod) => {
          const mp = mod.default ?? mod;
          mp.init(MIXPANEL_TOKEN, {
            autocapture: true,
            track_pageview: true,
          });
        })
        .catch(() => {
          // no-op
        });
    }
  }, []);

  return null; // This component doesn't render anything visible
};

export default MixpanelInitializer;

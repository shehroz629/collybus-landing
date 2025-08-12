"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

// Production token
const MIXPANEL_TOKEN = "9a450838f22921c823ae625793e996fa";

const MixpanelInitializer = () => {
  useEffect(() => {
    if (
      MIXPANEL_TOKEN &&
      process.env.NODE_ENV === "production" &&
      typeof window !== "undefined"
    ) {
      mixpanel.init(MIXPANEL_TOKEN, {
        autocapture: true,
        track_pageview: true,
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render anything visible
};

export default MixpanelInitializer;

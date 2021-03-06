export const data = {
  routes: [
    {
      id: 0,
      title: "not humble",
      path: "/not-humble",
      video: "featured-video.mp4",
    },
    {
      id: 1,
      title: "bleeping easy",
      path: "/bleeping-easy",
      video: "easy.mp4",
    },
    {
      id: 2,
      title: "make it zero",
      path: "/make-it-zero",
      video: "make-it-zero.mp4",
    },
    {
      id: 3,
      title: "it takes an island",
      path: "/it-takes-an-island",
      video: "it-takes-an-island.mp4",
    },
    {
      id: 4,
      title: "50 beaches",
      path: "/50-beaches",
      video: "50-beaches.mp4",
    },
  ],
  accordian: [
    {
      id: 0,
      title: "Pre-Production",
      results: [
        "Creative Development",
        "Writing",
        "Creative Development",
        "Writing",
        "Storyboards",
        "Art Direction",
        "Creative Direction",
        "Location Scouting",
        "Casting",
      ],
    },
    {
      id: 1,
      title: "Video Production",
      results: [
        "Principle Photography",
        "Production Management",
        "Crew",
        "Dailies",
        "LTO-Archiving",
      ],
    },
    {
      id: 2,
      title: "Post-Production",
      results: [
        "Colour correction",
        "Offline editing",
        "Online editing",
        "VFX",
        "Animation and motion graphics",
        "Closed captioning and subtitles",
        "Descriptive video",
        "Dailies",
        "Quality control",
        "LTO Archiving",
      ],
    },
    {
      id: 3,
      title: "Audio Post-Production",
      results: [
        "We work with some amazing partners who provide:",
        "Sound Design",
        "SFX",
        "Music",
        "Sound Mix",
      ],
    },
  ],
  animation: {
    variants: {
      initial: {
        opacity: 0,
        y: 72,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.6, 0.05, -0.01, 0.9],
        },
      },
    },
    ease: [0.6, 0.05, -0.01, 0.9],
    options: {
      triggerOnce: true,
      rootMargin: "-100px",
    },
  },
};

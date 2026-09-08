export const gallery = [
  "A world of imagination",
  "Finding our voices",
  "Together in the spotlight",
  "The joy of rehearsal",
  "Stories taking shape",
  "A moment on stage",
  "Learning through play",
  "Behind the curtain",
  "Our next chapter",
].map((title, index) => ({
  id: index,
  title,
  src: [
    "/assets/children.svg",
    "/assets/teens.svg",
    "/assets/stage.svg",
    "/assets/workshop.svg",
  ][index % 4],
  alt: `Illustrated theatre placeholder: ${title.toLowerCase()}`,
}));

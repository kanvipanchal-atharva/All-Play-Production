export const events = [
  "Theatre Productions",
  "Student Performances",
  "Rehearsals",
  "Drama Workshops",
  "Cultural Celebrations",
  "Guest Sessions",
  "Behind-the-Scenes Moments",
].map((title, index) => ({
  id: index,
  title,
  date: "Date to be confirmed",
  category: ["On stage", "Young voices", "In the making"][index % 3],
  image: ["/assets/stage.svg", "/assets/teens.svg", "/assets/workshop.svg"][
    index % 3
  ],
  description:
    "Sample content · A space for future stories from our creative community.",
  highlights:
    "This is a sample highlights preview. Approved event photographs, descriptions and dates will be added here after confirmation.",
  images: ["/assets/stage.svg", "/assets/workshop.svg"],
}));

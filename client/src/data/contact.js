export const contact = {
  brand: "All Play Productions",
  founder: "Mrs. Varshaa Raane",
  phone: "",
  whatsapp: "",
  email: "",
  venue: "",
  timings: "",
  instagram: "https://www.instagram.com/allplayproductions/",
  founderInstagram: "https://www.instagram.com/p/C31wMODRgZk/",
  whatsappMessage:
    "Hello All Play Productions! I would like to enquire about your theatre programs.",
  canonical: "https://example.com/",
};
export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`
  : "#contact";

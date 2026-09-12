export const contact = {
  brand: "All Play Productions",
  founder: "Mrs. Varsha Rane",
  phone: "+91 9082244109",
  additionalPhones: ["+91 9930255054", "+91 9167967756"],
  filmPhones: ["+91 8655040059", "+91 9930255054"],
  whatsapp: "",
  email: "allplayproductionsworkshops@gmail.com",
  venue: "The Village Art & Culture Center, Kora Kendra Hall, behind Golden Delicacy Restaurant, Shimpoli Road (opposite Reliance Mall), Shimpoli, Borivali (W)",
  timings: "",
  instagram: "https://www.instagram.com/allplayproductions/",
  founderInstagram: "https://www.instagram.com/p/C31wMODRgZk/",
  whatsappMessage:
    "Hello All Play Productions! I would like to enquire about your theatre programs.",
  canonical: "https://example.com/",
};
export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`
  : "/contact#contact";

export type GalleryPhoto = { url: string; alt: string; urdu: string };
export type GalleryVideo = { url: string; webm: string; title: string; urdu: string; poster: string };

const photo = (n: number) => `/media/photo-${n}.jpeg`;

export const galleryPhotos: GalleryPhoto[] = [
  { url: photo(1), alt: "Quran teacher guiding an online lesson", urdu: "استاد آن لائن سبق پڑھا رہے ہیں" },
  { url: photo(2), alt: "Student reciting the Quran in an online class", urdu: "طالب علم آن لائن کلاس میں تلاوت کر رہا ہے" },
  { url: photo(3), alt: "One-to-one Quran lesson on a laptop", urdu: "لیپ ٹاپ پر ایک بہ ایک قرآن کلاس" },
  { url: photo(4), alt: "Child learning Noorani Qaida online", urdu: "بچہ آن لائن نورانی قاعدہ سیکھ رہا ہے" },
  { url: photo(5), alt: "Quran study session with the academy", urdu: "اکیڈمی کی قرآن کلاس" },
  { url: photo(6), alt: "Teacher explaining Tajweed rules on screen", urdu: "استاد اسکرین پر تجوید کے قواعد سمجھا رہے ہیں" },
  { url: photo(7), alt: "Student practising memorization with a teacher", urdu: "طالب علم استاد کے ساتھ حفظ کی مشق کر رہا ہے" },
  { url: photo(8), alt: "Online Islamic studies session in progress", urdu: "آن لائن اسلامی تعلیم کی کلاس" },
  { url: photo(9), alt: "Focused Quran reading session at home", urdu: "گھر میں قرآن پڑھنے کی کلاس" },
  { url: photo(10), alt: "Quran class for adults over video call", urdu: "بڑوں کے لیے ویڈیو کال پر قرآن کلاس" },
  { url: photo(11), alt: "Learning Arabic letters in an online lesson", urdu: "آن لائن سبق میں عربی حروف کی تعلیم" },
];

export const galleryVideos: GalleryVideo[] = [
  { url: "/media/video-12.mp4", webm: "/media/video-12.webm", title: "Inside a live Quran class", urdu: "لائیو قرآن کلاس کی جھلک", poster: photo(1) },
  { url: "/media/video-13.mp4", webm: "/media/video-13.webm", title: "Tajweed practice with the teacher", urdu: "استاد کے ساتھ تجوید کی مشق", poster: photo(6) },
  { url: "/media/video-14.mp4", webm: "/media/video-14.webm", title: "Students in class", urdu: "کلاس میں طلبہ", poster: photo(4) },
  { url: "/media/video-15.mp4", webm: "/media/video-15.webm", title: "Memorization session", urdu: "حفظ کی کلاس", poster: photo(7) },
];

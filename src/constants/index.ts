import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
export const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export const selectData = [
  { value: "file", label: "File" },
  { value: "url", label: "Url" },
];

export const shareButtons = [
  {
    Button: FacebookShareButton,
    Icon: FacebookIcon,
  },
  {
    Button: TwitterShareButton,
    Icon: TwitterIcon,
  },
  {
    Button: LinkedinShareButton,
    Icon: LinkedinIcon,
  },
  {
    Button: ViberShareButton,
    Icon: ViberIcon,
  },
  {
    Button: TelegramShareButton,
    Icon: TelegramIcon,
  },
  {
    Button: EmailShareButton,
    Icon: EmailIcon,
  },
];

export const dummyQrCode =
  "https://firebasestorage.googleapis.com/v0/b/next-blog-3024e.appspot.com/o/5cee45fc-5e1b-4716-a241-6e549cca6955?alt=media&token=41da16e9-e301-43b6-a9e2-3a348a61720a";

import { RiDashboardFill } from "react-icons/ri";
import { TbBooks } from "react-icons/tb";
import { HiUsers } from "react-icons/hi2";
import { MdCategory, MdRateReview } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

export const userNavRoutes = [
  {
    path: "/library",
    label: "Library",
  },
  {
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    path: "/browse-books",
    label: "Browse Books",
  },
  {
    path: "/tutorials",
    label: "Tutorials",
  },
];

export const adminSidebarRoutes = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    path: "/admin/books",
    label: "Books",
    icon: <TbBooks />,
  },
  {
    path: "/admin/users",
    label: "Users",
    icon: <HiUsers />,
  },
  {
    path: "/admin/genres",
    label: "Genres",
    icon: <MdCategory />,
  },
  {
    path: "/admin/reviews",
    label: "Reviews",
    icon: <MdRateReview />,
  },
  {
    path: "/admin/tutorials",
    label: "Tutorials",
    icon: <BiSolidVideos />,
  },
];

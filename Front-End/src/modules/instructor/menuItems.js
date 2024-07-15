import { HiChartBar, HiTemplate, HiOutlineChartSquareBar, HiOutlineClock, HiBookOpen, HiUserGroup, HiCash, HiSupport } from "react-icons/hi";


export const menuItems = [
    { title: "Dashboard", path: "/instructor/dashboard", icon: HiTemplate },
    {
        title: "Analytics", path: "/instructor/analytics", icon: HiChartBar,
        subMenu: [
            { title: "Performance", path: "/instructor/analytics/performance", icon: HiOutlineChartSquareBar },
            { title: "Recent Activities", path: "/instructor/analytics/recent-activities", icon: HiOutlineClock }
        ]
    },
    { title: "Courses", path: "/instructor/courses", icon: HiBookOpen },
    { title: "Student Management", path: "/instructor/student-management", icon: HiUserGroup },
    { title: "Finance Management", path: "/instructor/finance-management", icon: HiCash },
    { title: "Support & Feedback", path: "/instructor/support-feedback", icon: HiSupport }
];

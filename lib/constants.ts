import { StaticImageData } from "next/image";
import e_img1 from "../app/public/images/event1.png"
import e_img2 from "../app/public/images/event2.png"
import e_img3 from "../app/public/images/event3.png"
import e_img4 from "../app/public/images/event4.png"
import e_img5 from "../app/public/images/event5.png"
import e_img6 from "../app/public/images/event6.png"

export type EventItem = {
    image: string | StaticImageData;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string
}


export const events: EventItem[] = [
    {
        slug: "react-conf-2024",
        image: e_img1,
        title: "React Conf 2024",
        location: "San Francisco, CA",
        date: "March 15, 2024",
        time: "9:00 AM - 6:00 PM",
    },
    {
        slug: "nextjs-summit",
        image: e_img2,
        title: "Next.js Summit",
        location: "Austin, TX",
        date: "April 22, 2024",
        time: "10:00 AM - 5:00 PM",
    },
    {
        slug: "javascript-world",
        image: e_img3,
        title: "JavaScript World Conference",
        location: "New York, NY",
        date: "May 8, 2024",
        time: "8:30 AM - 7:00 PM",
    },
    {
        slug: "ai-hackathon-2024",
        image: e_img4,
        title: "AI Innovation Hackathon",
        location: "Seattle, WA",
        date: "June 14-16, 2024",
        time: "48 Hours",
    },
    {
        slug: "web3-developer-meetup",
        image: e_img5,
        title: "Web3 Developer Meetup",
        location: "Miami, FL",
        date: "July 20, 2024",
        time: "6:00 PM - 9:00 PM",
    },
    {
        slug: "fullstack-conference",
        image: e_img6,
        title: "Full Stack Conference",
        location: "Denver, CO",
        date: "August 12, 2024",
        time: "9:00 AM - 6:00 PM",
    },
    {
        slug: "devops-unleashed",
        image: e_img1,
        title: "DevOps Unleashed",
        location: "Chicago, IL",
        date: "September 5, 2024",
        time: "8:00 AM - 5:30 PM",
    },
    {
        slug: "mobile-dev-summit",
        image: e_img2,
        title: "Mobile Development Summit",
        location: "Los Angeles, CA",
        date: "October 18, 2024",
        time: "9:30 AM - 6:00 PM",
    },
    {
        slug: "cybersecurity-conference",
        image: e_img3,
        title: "Cybersecurity Conference",
        location: "Boston, MA",
        date: "November 2, 2024",
        time: "8:00 AM - 7:00 PM",
    },
    {
        slug: "data-science-hackathon",
        image: e_img4,
        title: "Data Science Hackathon",
        location: "San Diego, CA",
        date: "December 7-9, 2024",
        time: "72 Hours",
    },
    {
        slug: "cloud-native-meetup",
        image: e_img5,
        title: "Cloud Native Meetup",
        location: "Portland, OR",
        date: "January 15, 2025",
        time: "6:30 PM - 9:00 PM",
    },
    {
        slug: "frontend-masters",
        image: e_img6,
        title: "Frontend Masters Conference",
        location: "Nashville, TN",
        date: "February 28, 2025",
        time: "9:00 AM - 5:00 PM",
    },
];
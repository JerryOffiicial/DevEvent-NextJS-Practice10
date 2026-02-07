import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import pin_image from "../app/public/icons/pin.svg"
import calender_image from "../app/public/icons/calendar.svg"
import clock_image from "../app/public/icons/clock.svg"

interface Props {
    title: string;
    image: string | StaticImageData;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
    return (
        <Link href={`/events/${slug}`} id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div className="flex flex-row gap-2">
                <Image src={pin_image} alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>

            <p className="title">{title}</p>

            <div className="datetime">
                <div>
                    <Image src={calender_image} alt="calender" width={14} height={14} />
                    <p>{date}</p>
                </div>
                <div>
                    <Image src={calender_image} alt="time" width={14} height={14} />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard
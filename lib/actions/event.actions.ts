'use server';
import connectDB from "../mongodb";
import Event from '@/database/event.model'

// Must be at the top to mark this as a server action

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug });
        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();  // lean method is important to make this on=bject raw 

    } catch {
        return []
    }
}


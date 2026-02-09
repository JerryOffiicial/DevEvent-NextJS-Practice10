import { Schema, model, models, Document, Types } from 'mongoose';

/**
 * TypeScript interface for Booking document
 * Extends Mongoose Document for full type safety
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string): boolean {
          // RFC 5322 compliant email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

/**
 * Pre-save hook to validate event reference
 * Ensures the eventId corresponds to an existing Event document
 * Throws error if event does not exist in the database
 */
bookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isModified('eventId')) {
    try {
      // Dynamically import Event model to avoid circular dependencies
      const Event = models.Event || (await import('./event.model')).default;
      
      // Check if the event exists
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error('Event not found. Cannot create booking for non-existent event.'));
      }
    } catch (error) {
      return next(new Error('Failed to validate event reference.'));
    }
  }

  next();
});

// Create index on eventId for faster query performance
bookingSchema.index({ eventId: 1 });

// Compound index for finding bookings by event and email
bookingSchema.index({ eventId: 1, email: 1 });

// Prevent model recompilation in Next.js hot reload
const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);

export default Booking;

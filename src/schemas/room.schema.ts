import { z } from "zod";

export const roomSchema = z.object({
  roomName: z.string().min(3, "Room name must be at least 3 characters"),
  roomNumber: z.string().min(1, "Room number is required"),
  facilities: z
    .array(z.string().min(1, "Facility name is required"))
    .min(1, "At least one facility is required"),
  sleeps: z
    .any()
    .refine(val => typeof val === "number", {
      message: "Sleeps must be a number"
    })
    .refine(val => val >= 1, { message: "At least 1 guest" })
    .refine(val => val <= 20, { message: "Maximum 20 guests allowed" }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(z.string())
    .min(1, "At least 1 image is required")
    .max(5, "You can upload up to 5 images"),
  rates: z
    .array(
      z.object({
        duration: z.string().min(1, "Duration is required"),
        rate: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Rate must be a valid number")
      })
    )
    .min(1, "At least one rate is required"),
  hotelId: z.string().min(1, "Hotel ID is required"),
});

export type RoomInput = z.infer<typeof roomSchema>;

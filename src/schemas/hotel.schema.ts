import { z } from "zod";

export const hotelSchema = z.object({
    name: z.string().min(3, "Hotel name must be at least 3 characters"),
    facilities: z
        .array(z.string()
        .min(1, "Facility name is required"))
        .min(1, "At least one facility is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    images: z
        .array(z.string())
        .min(1, "At least 1 image is required")
        .max(3, "You can upload up to 3 images"),
    documents: z
        .array(z.string())
        .min(1, "At least 1 document is required")
        .max(3, "You can upload up to 3 documents"),
});

export type HotelInput = z.infer<typeof hotelSchema>;

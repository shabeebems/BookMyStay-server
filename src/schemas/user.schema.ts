import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email format"),
        mobile: z
        .string()
        .min(8, "Mobile must be at least 8 digits")
        .regex(/^\d+$/, "Mobile must contain only digits"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        address: z.object({
        city: z.string().min(2, "City must be at least 2 characters"),
        state: z.string().min(2, "State must be at least 2 characters"),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional(), 
});

export const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
    role: z.string().optional()
});

export type RegisterInput = z.infer<typeof registerSchema>;

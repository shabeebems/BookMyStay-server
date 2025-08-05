import { z } from 'zod';

/**
 * Register Schema
 */
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

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Login Schema
 */
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Email Schema (Used for Forgot Password / Resend OTP)
 */
export const emailSchema = z.object({
    email: z.string().email("Invalid email format"),
    role: z.string().optional()
});

export type EmailInput = z.infer<typeof emailSchema>;

/**
 * Profile Update Schema
 */
export const profileUpdateSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    mobile: z
        .string()
        .min(8, "Mobile must be at least 8 digits")
        .regex(/^\d+$/, "Mobile must contain only digits"),
    address: z.object({
        city: z.string().min(2, "City must be at least 2 characters"),
        state: z.string().min(2, "State must be at least 2 characters"),
    }),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

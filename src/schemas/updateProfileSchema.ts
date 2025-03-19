import { z } from 'zod';

import { usernameValidation } from './signupSchema';

// Update Profile Schema
export const updateProfileSchema = z.object({
  username: usernameValidation.optional(),

  email: z.string().email({ message: 'Invalid email address' }).optional(),

  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character')
    .optional(),

  profileImage: z.string().url({ message: 'Invalid URL for profile image' }).optional(),
});

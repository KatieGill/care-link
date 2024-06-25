import { z } from "zod";

const roleSchema = z.enum(["care_seeker", "care_provider"]);

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  zip_code: z.number().nullable(),
  role: roleSchema.nullable(),
  number_of_children: z.number().nullable(),
  years_experience: z.number().nullable(),
  pay: z.number().nullable(),
  bio: z.string().nullable(),
  image_url: z.string().nullable(),
  number_of_links: z.number().nullable(),
});

export const usersSchema = z.array(userSchema);

export const userDataSchema = z.object({
  token: z.string(),
  data: userSchema,
});

export const userCredentialsSchema = z.object({
  user: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const conversationSchema = z.object({
  id: z.number(),
  sender_id: z.number(),
  recipient_id: z.number(),
  created_at: z.date(),
});

export const messageSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  body: z.string(),
  read: z.boolean(),
  created_at: z.date(),
});

export const conversationDataSchema = z.object({
  conversation: conversationSchema,
  messages: z.array(messageSchema),
});

export type User = z.infer<typeof userSchema>;
export type UserCredentials = z.infer<typeof userCredentialsSchema>;
export type Role = z.infer<typeof roleSchema>;
export type UserFormInput = {
  first_name: string | null | undefined;
  last_name: string | null | undefined;
  username: string | null | undefined;
  zip_code: string | null | undefined;
  number_of_children: string | null | undefined;
  years_experience: string | null | undefined;
  pay: string | null | undefined;
  bio: string | null | undefined;
};

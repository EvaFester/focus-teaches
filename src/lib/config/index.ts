import { z } from 'zod'

const envSchema = z.object({
  TG_BOT_TOKEN: z.string().trim().min(1, { message: "required" }),
  TG_CHAT_ID: z.string().trim().min(1, { message: "required" }),
  TIMEZONE: z.string().trim().min(1, { message: "required" }),
  GOOGLE_API_CLIENT_EMAIL: z.string().trim().min(1, { message: "required" }),
  GOOGLE_API_PRIVATE_KEY: z.string().trim().min(1, { message: "required" }),
  GOOGLE_API_SPREADSHEET_ID: z.string().trim().min(1, { message: "required" }),
})

type EnvSchema = z.infer<typeof envSchema>

let config: EnvSchema | null = null

export function getConfig() {
  if (!config) {
    config = envSchema.parse(process.env)
    console.log('Env schema is parsed')
  }

  return config
}


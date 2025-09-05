import { NextResponse } from "next/server"

export async function GET() {
  // Hardcoded credentials from the curl command
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const serviceSid = process.env.TWILIO_SERVICE_SID

  const hasCredentials = !!accountSid && !!authToken && !!serviceSid

  return NextResponse.json({
    hasCredentials,
    accountSidExists: !!accountSid,
    authTokenExists: !!authToken,
    serviceSidExists: !!serviceSid,
  })
}

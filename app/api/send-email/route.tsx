import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {

    resend.emails.send({
        from:'....',
        to:'aaronperezdev@gmail.com',
        subject:'....',
        react: <WelcomeTemplate />
    })
    return Response.json({ message: 'Email sent successfully' })
}
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Coach } from "@/models/coach";
import { checkAPIKey } from "@/util/checkAPIkey";
import { sendAccountRequest } from "@/lib/sendEmails";

export async function POST(request: Request) {
    try {
        await connectDB()
        if (!checkAPIKey(request)) {
            return NextResponse.json({ success: false, error: 'Invalid or missing API key' }, { status: 401 });
        }
        const body = await request.json();
        const coach = new Coach(body)
        await coach.save()
        sendAccountRequest(body)
        return NextResponse.json({ success: true, data: coach }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

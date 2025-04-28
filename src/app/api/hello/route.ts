import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ success: true, data: "hello world" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

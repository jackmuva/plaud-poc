import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		console.log(body);
		return NextResponse.json(
			{ status: 200 }
		)
	} catch (error) {
		console.error("[RECORDING]", error);
		return NextResponse.json(
			{
				detail: (error as Error).message,
			},
			{
				status: 500,
			},
		);
	}
}

import { NextResponse, NextRequest } from "next/server";


// export async function GET() {
//     const userData = [{id: 1, name: "hassan"}];
//     return NextResponse.json(userData)
// }

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    const user = { id: parseInt(params.id), name: "Alice" };
    return NextResponse.json(user)
}


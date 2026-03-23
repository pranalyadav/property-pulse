import connectDB from "@/config/database";

export const GET = async (request) => {
    await connectDB();
    try {
        return new Response(JSON.stringify({ message: 'Hello World' }), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response('Something went wrong', { status: 500 })
    }
};
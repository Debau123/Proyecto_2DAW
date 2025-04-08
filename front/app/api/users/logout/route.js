export async function POST(req) {
    return new Response(null, {
      status: 200,
      headers: {
        'Set-Cookie': 'sessionToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      },
    });
  }
  
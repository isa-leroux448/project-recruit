export function checkAPIKey(request: Request): boolean {
    const authorizationHeader = request.headers.get('Authorization');
    return authorizationHeader === `Bearer ${process.env.API_KEY}`;
}
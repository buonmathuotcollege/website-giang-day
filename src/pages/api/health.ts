import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any)?.runtime?.env || (process as any)?.env || {};
  return new Response(JSON.stringify({
    ok: true,
    status: "healthy",
    has_d1: !!env?.DB,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*"
    }
  });
};

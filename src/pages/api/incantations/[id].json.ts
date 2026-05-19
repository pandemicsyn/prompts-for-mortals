import { getCollection } from "astro:content";

export async function GET({ params }: { params: { id?: string } }) {
  const id = params.id;
  const entry = (await getCollection("incantations")).find(item => item.data.id === id);

  if (!entry) {
    return new Response(JSON.stringify({ error: "Prompt not found" }), {
      status: 404,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  return new Response(JSON.stringify({ id: entry.data.id, prompt: (entry.body ?? "").trim() }), {
    headers: {
      "cache-control": "public, max-age=300",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/*
SQL Table: 
id (primary key) => shortened URL
original_url 
*/

export const POST = async (req) => {
  // Handle "POST" method, from the request body get the original URL from frontend and store in original_url and generate a shortened url using nano-id
  // console.log(req);

  const body = await req.json();
  const { original_url } = body;
  const id = nanoid(6);

  // connect supabase SQL table to insert the values (id: original_url)

  const { data, error } = await supabase
    .from("urls")
    .insert([{ id, original_url }])
    .single();

  // handle error 500

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
  const base = process.env.BASE;
  const shortURL = `${base}/${id}`;

  return new Response(JSON.stringify({ newURL: shortURL }), {
    status: 200,
  });
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const gasUrl = "https://script.google.com/macros/s/AKfycbzU6jpN3cwDw4OhaRwu0XHf61WEqEN6M5_Y9W2mGsCu6ciZCz6aY-EkEtPgx8t8DCZLkQ/exec";

    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await gasRes.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Proxy Error", detail: String(err) });
  }
}

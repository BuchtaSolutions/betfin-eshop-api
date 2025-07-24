export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const gasUrl = "https://script.google.com/macros/s/AKfycbzE77IhsH3ukmu66w4_FP-ZlNfH6rC86RkfOJ7879M85oJ_58xCl0J9fV6ovz0JbjnUaQ/exec";
    const gasRes = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await gasRes.text();

    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(502).json({
        error: "GAS did not return valid JSON",
        htmlPreview: text.slice(0, 300), // náhled co přišlo
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Proxy Error", detail: String(err) });
  }
}


export default async function handler(req, res) {
  const { text } = req.body;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: `請將下列日文翻譯成中文：\n${text}` }],
        temperature: 0.5
      })
    });
    const data = await response.json();
    res.status(200).json({ translation: data.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: '翻譯失敗：' + err.message });
  }
}

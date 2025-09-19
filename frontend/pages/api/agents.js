
export default async function handler(req, res) {
  const { agent, prompt } = req.body;

  // Placeholder logic
  res.status(200).json({
    reply: `This is a simulated reply from the ${agent} agent to your prompt: "${prompt}"`
  });
}

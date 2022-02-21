import { AwesomeQR } from 'awesome-qr'
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query.data

  if (data === undefined) {
    return res
      .status(400)
      .send('Bad request; format your request like /api/qr?data=your_data')
  }

  const logo = fs.readFileSync(
    path.join(process.cwd(), 'public', 'ph_logo_block.png')
  )

  const buffer = await new AwesomeQR({
    text: `${data}`,
    size: 1000,
    logoImage: logo,
    logoScale: 0.2,
    logoMargin: 18,
    logoCornerRadius: 1
  }).draw()

  // Alternative: ph_logo_margin.png, logoScale: 0.25, no logoMargin

  res.setHeader('Content-Type', 'image/png')
  res.send(buffer)
}

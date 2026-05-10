# tobtonn.com — โปรแกรมคำนวณดอกเบี้ยทบต้น

เว็บแอปคำนวณดอกเบี้ยทบต้นภาษาไทย พร้อมกราฟและตารางรายปี

## Tech Stack

- Next.js 15 + App Router + TypeScript
- Tailwind CSS v4
- Recharts
- Static export สำหรับ Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build
```

ไฟล์ static จะอยู่ใน `out/` — deploy ไป Cloudflare Pages โดยชี้ build output ไปที่โฟลเดอร์นี้

import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'متد مجاز نیست' });

  const { symbol, name, lastPrice, historyData, unit } = req.body;

  console.log({
    symbol: req.body?.symbol,
    currentPrice: req.body?.lastPrice,
    body: req.body,
  });

  if (!symbol || lastPrice === undefined) {
    return res.status(400).json({ error: 'اطلاعات ناقص است' });
  }

  const apiKey = process.env['GEMINI_API_KEY'];
  if (!apiKey) {
    return res.status(500).json({ error: 'کلید API تنظیم نشده است' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: { responseMimeType: 'application/json' },
    });

    const prompt = `
      تو یک سیستم تحلیل‌گر تکنیکال و فاندامنتال فوق حرفه‌ای برای بازار مالی وب‌سایت "ارزیاب" هستی.
      داده‌های دارایی: نام: ${name || symbol} | نماد: ${symbol} | قیمت فعلی: ${unit == 'تومان' ? Number(lastPrice.replaceAll(',', '')) / 10 : lastPrice} ${unit}
      تاریخچه ۳۰ روز اخیر: ${JSON.stringify(historyData?.slice(0, 30) || [])}

      بر اساس این مقادیر، تحلیل خود را دقیقاً در قالب فرمت JSON زیر به زبان فارسی پاسخ بده و هیچ متن اضافه‌ای ننویس:
      {
        "sentiment": "صعودی" یا "نزولی" یا "خنثی",
        "sentiment_score": یک عدد صحیح بین 0 تا 100 که قدرت روند را نشان دهد,
        "short_term_trend": "یک پیش‌بینی بسیار کوتاه (حداکثر ۵ کلمه) از حرکت بعدی",
        "volatility": "شدید" یا "عادی" یا "پایین",
        "summary": "یک متن تحلیل روان، تخصصی و در عین حال قابل فهم به زبان فارسی در حدود ۳ الی ۴ جمله متناسب با داده‌ها.",
        "support_level": "عدد سطح حمایت اصلی",
        "resistance_level": "عدد سطح مقاومت اصلی",
        "risk_level": "کم" یا "متوسط" یا "زیاد"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonOutput = JSON.parse(text);
    return res.status(200).json(jsonOutput);
  } catch (error: any) {
    console.error('Gemini Error:', error);

    const isRateLimited =
      error?.status === 429 ||
      error?.message?.includes('429') ||
      error?.message?.includes('quota') ||
      error?.message?.includes('Too Many Requests');

    if (isRateLimited) {
      return res.status(429).json({
        error: 'محدودیت درخواست هوش مصنوعی اعمال شده است.',
      });
    }

    return res.status(500).json({
      error: 'خطای سیستمی در پردازش هوش مصنوعی',
    });
  }
}

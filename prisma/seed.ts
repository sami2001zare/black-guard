import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'مدیر سیستم',
      role: 'admin',
    },
  });
  console.log('Admin user created');

  const faqs = [
  {
    questionEn: 'What types of security services do you offer?',
    questionFa: 'چه نوع خدمات امنیتی ارائه می‌دهید؟',
    questionAr: 'ما هي أنواع الخدمات الأمنية التي تقدمونها؟',
    answerEn: '<p>We offer a comprehensive range of services including executive protection, residential security, event security, security consulting, close protection training, and counter-surveillance.</p>',
    answerFa: '<p>ما طیف کاملی از خدمات شامل حفاظت از مدیران، امنیت منازل، امنیت رویدادها، مشاوره امنیتی، آموزش حفاظت نزدیک و ضد نظارت را ارائه می‌دهیم.</p>',
    answerAr: '<p>نقدم مجموعة شاملة من الخدمات بما في ذلك حماية التنفيذيين والأمن السكني وأمن الفعاليات والاستشارات الأمنية والتدريب على الحماية القريبة ومكافحة المراقبة.</p>',
    category: 'general',
    order: 1,
    published: true,
  },
  {
    questionEn: 'Are your guards licensed and insured?',
    questionFa: 'آیا نگهبانان شما دارای مجوز و بیمه هستند؟',
    questionAr: 'هل حراسكم مرخصون ومؤمن عليهم؟',
    answerEn: '<p>Yes, all our personnel are fully licensed and insured. We hold all necessary permits including firearm carry licenses, non-lethal weapon permits, and private security company licenses.</p>',
    answerFa: '<p>بله، تمام پرسنل ما دارای مجوز کامل و بیمه هستند. ما دارای کلیه مجوزهای لازم از جمله مجوز حمل سلاح گرم، مجوز حمل گاز و مجوز تأسیس شرکت امنیتی خصوصی هستیم.</p>',
    answerAr: '<p>نعم، جميع أفرادنا مرخصون ومؤمن عليهم بالكامل. لدينا جميع التراخيص اللازمة بما في ذلك تراخيص حمل الأسلحة النارية وتصاريح الأسلحة غير القاتلة وتراخيص شركات الأمن الخاصة.</p>',
    category: 'security',
    order: 2,
    published: true,
  },
];

    for (const faq of faqs) {
    // Check if exists by questionEn
    const existing = await prisma.faq.findFirst({
        where: { questionEn: faq.questionEn },
    });

    if (existing) {
        await prisma.faq.update({
        where: { id: existing.id },
        data: faq,
        });
    } else {
        await prisma.faq.create({ data: faq });
    }
    }



    const teamMembers = [
  {
    nameEn: 'Col. Mohammad Reza Karimi (Ret.)',
    nameFa: 'سرهنگ محمد رضا کریمی (بازنشسته)',
    nameAr: 'العقيد محمد رضا كريمي (متقاعد)',
    roleEn: 'Director of Operations',
    roleFa: 'مدیر عملیات',
    roleAr: 'مدير العمليات',
    credEn: 'Former IRGC Special Forces, 22 years',
    credFa: 'نیروهای ویژه سابق سپاه، ۲۲ سال',
    credAr: 'قوات خاصة سابقة في الحرس الثوري، ٢٢ سنة',
    order: 1,
    published: true,
  },
  {
    nameEn: 'Sara Ahmadi',
    nameFa: 'سارا احمدی',
    nameAr: 'سارة أحمدي',
    roleEn: 'Head of Intelligence',
    roleFa: 'رئیس اطلاعات',
    roleAr: 'رئيسة الاستخبارات',
    credEn: 'Ex‑Military Intelligence, MSc Security',
    credFa: 'اطلاعات نظامی سابق، کارشناسی ارشد امنیت',
    credAr: 'استخبارات عسكرية سابقة، ماجستير أمن',
    order: 2,
    published: true,
  },
  {
    nameEn: 'Hamid Soroush',
    nameFa: 'حمید سروش',
    nameAr: 'حميد سروش',
    roleEn: 'Training Commander',
    roleFa: 'فرمانده آموزش',
    roleAr: 'قائد التدريب',
    credEn: 'Certified Firearms & Tactics Instructor',
    credFa: 'مربی معتبر سلاح و تاکتیک',
    credAr: 'مدرب معتمد في الأسلحة النارية والتكتيكات',
    order: 3,
    published: true,
  },
];

for (const member of teamMembers) {
  // Use nameEn as unique identifier
  const existing = await prisma.teamMember.findFirst({
    where: { nameEn: member.nameEn },
  });

  if (existing) {
    await prisma.teamMember.update({
      where: { id: existing.id },
      data: member,
    });
  } else {
    await prisma.teamMember.create({ data: member });
  }
}



const defaultAbout = {
  id: 'about',
  titleEn: 'About Us',
  titleFa: 'درباره ما',
  titleAr: 'معلومات عنا',
  contentEn: '<p>Welcome to our company. We provide professional security services.</p>',
  contentFa: '<p>به شرکت ما خوش آمدید. ما خدمات امنیتی حرفه‌ای ارائه می‌دهیم.</p>',
  contentAr: '<p>مرحباً بكم في شركتنا. نقدم خدمات أمنية احترافية.</p>',
  published: true,
};

await prisma.about.upsert({
  where: { id: 'about' },
  update: defaultAbout,
  create: defaultAbout,
});





}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
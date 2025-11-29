import { 
  Code, Database, Users, Palette, Heart, Building2, 
  Calculator, Microscope, Megaphone, GraduationCap, 
  Stethoscope, Briefcase, Wrench, PenTool, Scale,
  LineChart, Shield, Plane, Camera, Music,
  Laptop, Cpu
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// Holland Code (RIASEC) Framework
export type HollandCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface HollandScores {
  R: number; // Realistic
  I: number; // Investigative
  A: number; // Artistic
  S: number; // Social
  E: number; // Enterprising
  C: number; // Conventional
}

export interface HollandTypeInfo {
  code: HollandCode;
  name: string;
  nameUz: string;
  nameRu: string;
  description: string;
  descriptionUz: string;
  descriptionRu: string;
  traits: string[];
  traitsUz: string[];
  traitsRu: string[];
  color: string;
}

export const hollandTypes: Record<HollandCode, HollandTypeInfo> = {
  R: {
    code: 'R',
    name: 'Realistic',
    nameUz: 'Realistik',
    nameRu: 'Реалистичный',
    description: 'You prefer hands-on work with tools, machines, and physical activities. You value practical results and tangible outcomes.',
    descriptionUz: "Siz asboblar, mashinalar va jismoniy faoliyat bilan amaliy ish qilishni afzal ko'rasiz. Amaliy natijalar va aniq natijalarga qiymat berasiz.",
    descriptionRu: 'Вы предпочитаете практическую работу с инструментами, машинами и физическую активность. Цените практические результаты.',
    traits: ['Practical', 'Mechanical', 'Physical', 'Athletic', 'Nature-loving'],
    traitsUz: ['Amaliy', 'Mexanik', 'Jismoniy', 'Sportchi', 'Tabiatni sevuvchi'],
    traitsRu: ['Практичный', 'Механический', 'Физический', 'Спортивный', 'Любящий природу'],
    color: 'hsl(var(--chart-1))'
  },
  I: {
    code: 'I',
    name: 'Investigative',
    nameUz: 'Tadqiqotchi',
    nameRu: 'Исследовательский',
    description: 'You enjoy analyzing problems, conducting research, and understanding complex systems. You value knowledge and intellectual challenges.',
    descriptionUz: "Siz muammolarni tahlil qilish, tadqiqot o'tkazish va murakkab tizimlarni tushunishni yoqtirasiz. Bilim va intellektual qiyinchiliklarni qadraysiz.",
    descriptionRu: 'Вам нравится анализировать проблемы, проводить исследования и понимать сложные системы. Цените знания и интеллектуальные вызовы.',
    traits: ['Analytical', 'Curious', 'Independent', 'Logical', 'Precise'],
    traitsUz: ['Tahlilchi', "Qiziquvchan", 'Mustaqil', 'Mantiqiy', 'Aniq'],
    traitsRu: ['Аналитический', 'Любопытный', 'Независимый', 'Логичный', 'Точный'],
    color: 'hsl(var(--chart-2))'
  },
  A: {
    code: 'A',
    name: 'Artistic',
    nameUz: 'Ijodkor',
    nameRu: 'Артистичный',
    description: 'You thrive in creative environments where you can express yourself through art, design, writing, or performance.',
    descriptionUz: "Siz san'at, dizayn, yozuv yoki ijro orqali o'zingizni ifodalay oladigan ijodiy muhitlarda rivojlanasiz.",
    descriptionRu: 'Вы процветаете в творческой среде, где можете выразить себя через искусство, дизайн, писательство или выступления.',
    traits: ['Creative', 'Original', 'Expressive', 'Imaginative', 'Intuitive'],
    traitsUz: ['Ijodkor', 'Original', 'Ifodali', 'Xayolparast', 'Intuitiv'],
    traitsRu: ['Творческий', 'Оригинальный', 'Выразительный', 'Имеющий воображение', 'Интуитивный'],
    color: 'hsl(var(--chart-3))'
  },
  S: {
    code: 'S',
    name: 'Social',
    nameUz: 'Ijtimoiy',
    nameRu: 'Социальный',
    description: 'You excel at helping, teaching, and working with others. You value cooperation and making a positive impact on people\'s lives.',
    descriptionUz: "Siz boshqalarga yordam berish, o'qitish va ular bilan ishlashda ustasiz. Hamkorlik va odamlar hayotiga ijobiy ta'sir ko'rsatishni qadraysiz.",
    descriptionRu: 'Вы преуспеваете в помощи, обучении и работе с другими. Цените сотрудничество и положительное влияние на жизнь людей.',
    traits: ['Helpful', 'Friendly', 'Empathetic', 'Patient', 'Cooperative'],
    traitsUz: ['Yordamchi', "Do'stona", 'Hamdard', 'Sabr-toqatli', 'Hamkorlikdagi'],
    traitsRu: ['Помогающий', 'Дружелюбный', 'Эмпатичный', 'Терпеливый', 'Готовый к сотрудничеству'],
    color: 'hsl(var(--chart-4))'
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    nameUz: 'Tadbirkor',
    nameRu: 'Предприимчивый',
    description: 'You enjoy leading, persuading, and managing others. You are ambitious and value achievement and influence.',
    descriptionUz: "Siz boshqalarni boshqarish, ishontirish va boshqarishdan zavq olasiz. Siz ambitsiyali va yutuq va ta'sirni qadraysiz.",
    descriptionRu: 'Вам нравится руководить, убеждать и управлять другими. Вы амбициозны и цените достижения и влияние.',
    traits: ['Persuasive', 'Ambitious', 'Confident', 'Energetic', 'Competitive'],
    traitsUz: ['Ishontiruvchi', 'Ambitsiyali', "O'ziga ishonchli", 'Energik', 'Raqobatbardosh'],
    traitsRu: ['Убедительный', 'Амбициозный', 'Уверенный', 'Энергичный', 'Конкурентный'],
    color: 'hsl(var(--chart-5))'
  },
  C: {
    code: 'C',
    name: 'Conventional',
    nameUz: 'Tartibli',
    nameRu: 'Конвенциональный',
    description: 'You prefer organized, detail-oriented work with clear procedures. You value accuracy, stability, and efficiency.',
    descriptionUz: "Siz aniq tartiblarga ega tashkil etilgan, tafsilotlarga e'tibor beradigan ishni afzal ko'rasiz. Aniqlik, barqarorlik va samaradorlikni qadraysiz.",
    descriptionRu: 'Вы предпочитаете организованную, ориентированную на детали работу с четкими процедурами. Цените точность, стабильность и эффективность.',
    traits: ['Organized', 'Detail-oriented', 'Reliable', 'Efficient', 'Methodical'],
    traitsUz: ['Tartibli', "Tafsilotchi", 'Ishonchli', 'Samarali', 'Metodik'],
    traitsRu: ['Организованный', 'Внимательный к деталям', 'Надежный', 'Эффективный', 'Методичный'],
    color: 'hsl(var(--primary))'
  }
};

export interface QuizOption {
  text: string;
  textUz: string;
  textRu: string;
  scores: Partial<HollandScores>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionUz: string;
  questionRu: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When faced with a problem, what's your natural approach?",
    questionUz: "Muammoga duch kelganingizda, sizning tabiiy yondashuvingiz qanday?",
    questionRu: "Столкнувшись с проблемой, какой ваш естественный подход?",
    options: [
      { 
        text: "Build or fix something physical to solve it", 
        textUz: "Muammoni hal qilish uchun biror narsani yasash yoki ta'mirlash",
        textRu: "Построить или починить что-то физическое для её решения",
        scores: { R: 3 } 
      },
      { 
        text: "Research and analyze data to find the root cause", 
        textUz: "Asosiy sababni topish uchun ma'lumotlarni tadqiq qilish va tahlil qilish",
        textRu: "Исследовать и анализировать данные для поиска первопричины",
        scores: { I: 3 } 
      },
      { 
        text: "Brainstorm creative, out-of-the-box solutions", 
        textUz: "Ijodiy, kutilmagan yechimlarni o'ylab topish",
        textRu: "Придумывать креативные, нестандартные решения",
        scores: { A: 3 } 
      },
      { 
        text: "Discuss with others and seek collaborative solutions", 
        textUz: "Boshqalar bilan muhokama qilish va hamkorlikdagi yechimlarni izlash",
        textRu: "Обсудить с другими и искать совместные решения",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 2,
    question: "Which school subject did you enjoy most?",
    questionUz: "Qaysi maktab fanini eng ko'p yoqtirdingiz?",
    questionRu: "Какой школьный предмет вам нравился больше всего?",
    options: [
      { 
        text: "Shop class, engineering, or physical education", 
        textUz: "Mehnat, muhandislik yoki jismoniy tarbiya",
        textRu: "Труд, инженерия или физкультура",
        scores: { R: 3 } 
      },
      { 
        text: "Science, math, or research projects", 
        textUz: "Fan, matematika yoki tadqiqot loyihalari",
        textRu: "Наука, математика или исследовательские проекты",
        scores: { I: 3 } 
      },
      { 
        text: "Art, music, drama, or creative writing", 
        textUz: "San'at, musiqa, drama yoki ijodiy yozuv",
        textRu: "Искусство, музыка, театр или творческое письмо",
        scores: { A: 3 } 
      },
      { 
        text: "History, social studies, or psychology", 
        textUz: "Tarix, ijtimoiy fanlar yoki psixologiya",
        textRu: "История, обществознание или психология",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 3,
    question: "In a group project, what role do you naturally take?",
    questionUz: "Guruh loyihasida siz qanday rol olasiz?",
    questionRu: "В групповом проекте какую роль вы естественно берёте на себя?",
    options: [
      { 
        text: "The one who does the hands-on work", 
        textUz: "Amaliy ishni bajaruvchi",
        textRu: "Тот, кто делает практическую работу",
        scores: { R: 2, C: 1 } 
      },
      { 
        text: "The researcher who gathers and analyzes information", 
        textUz: "Ma'lumotlarni to'plovchi va tahlil qiluvchi tadqiqotchi",
        textRu: "Исследователь, который собирает и анализирует информацию",
        scores: { I: 3 } 
      },
      { 
        text: "The leader who delegates and motivates the team", 
        textUz: "Jamoani yo'naltiruvchi va rag'batlantiruv rahbar",
        textRu: "Лидер, который распределяет задачи и мотивирует команду",
        scores: { E: 3 } 
      },
      { 
        text: "The organizer who creates schedules and tracks progress", 
        textUz: "Jadval tuzuvchi va rivojlanishni kuzatuvchi tashkilotchi",
        textRu: "Организатор, который составляет расписание и отслеживает прогресс",
        scores: { C: 3 } 
      },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to spend your free time?",
    questionUz: "Bo'sh vaqtingizni qanday o'tkazishni afzal ko'rasiz?",
    questionRu: "Как вы предпочитаете проводить свободное время?",
    options: [
      { 
        text: "Building, crafting, or fixing things", 
        textUz: "Biror narsani yasash, hunarmandchilik yoki ta'mirlash",
        textRu: "Строить, мастерить или чинить вещи",
        scores: { R: 3 } 
      },
      { 
        text: "Reading, learning, or solving puzzles", 
        textUz: "O'qish, o'rganish yoki bosh qotirishlar yechish",
        textRu: "Читать, учиться или решать головоломки",
        scores: { I: 3 } 
      },
      { 
        text: "Creating art, music, or writing", 
        textUz: "San'at, musiqa yaratish yoki yozish",
        textRu: "Создавать искусство, музыку или писать",
        scores: { A: 3 } 
      },
      { 
        text: "Volunteering or helping friends/family", 
        textUz: "Ko'ngillilik yoki do'stlar/oilaga yordam berish",
        textRu: "Волонтёрство или помощь друзьям/семье",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 5,
    question: "What type of work environment appeals to you most?",
    questionUz: "Qanday ish muhiti sizni ko'proq jalb qiladi?",
    questionRu: "Какая рабочая среда вас привлекает больше всего?",
    options: [
      { 
        text: "Outdoors or in a workshop/lab with tools and equipment", 
        textUz: "Ochiq havoda yoki asboblar bilan ustaxona/laboratoriyada",
        textRu: "На улице или в мастерской/лаборатории с инструментами",
        scores: { R: 3 } 
      },
      { 
        text: "A quiet office or research facility", 
        textUz: "Tinch ofis yoki tadqiqot muassasasi",
        textRu: "Тихий офис или исследовательский центр",
        scores: { I: 2, C: 1 } 
      },
      { 
        text: "A dynamic, creative studio or flexible space", 
        textUz: "Dinamik, ijodiy studiya yoki moslashuvchan makon",
        textRu: "Динамичная, творческая студия или гибкое пространство",
        scores: { A: 3 } 
      },
      { 
        text: "A busy office with lots of team interaction", 
        textUz: "Jamoaviy aloqa ko'p bo'lgan faol ofis",
        textRu: "Оживлённый офис с активным командным взаимодействием",
        scores: { S: 2, E: 1 } 
      },
    ],
  },
  {
    id: 6,
    question: "What motivates you most in your work?",
    questionUz: "Ishingizda sizni nima ko'proq rag'batlantiradi?",
    questionRu: "Что мотивирует вас больше всего в работе?",
    options: [
      { 
        text: "Seeing tangible results from my efforts", 
        textUz: "Mehnatingdan aniq natijalarni ko'rish",
        textRu: "Видеть ощутимые результаты своих усилий",
        scores: { R: 3 } 
      },
      { 
        text: "Discovering new knowledge or solving complex problems", 
        textUz: "Yangi bilimlarni kashf qilish yoki murakkab muammolarni yechish",
        textRu: "Открывать новые знания или решать сложные проблемы",
        scores: { I: 3 } 
      },
      { 
        text: "Expressing myself and creating something unique", 
        textUz: "O'zimni ifodalash va noyob narsa yaratish",
        textRu: "Выражать себя и создавать что-то уникальное",
        scores: { A: 3 } 
      },
      { 
        text: "Making a positive difference in people's lives", 
        textUz: "Odamlar hayotiga ijobiy ta'sir ko'rsatish",
        textRu: "Приносить позитивные изменения в жизни людей",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 7,
    question: "How do you feel about taking risks?",
    questionUz: "Xavf-xatarga qanday munosabatdasiz?",
    questionRu: "Как вы относитесь к риску?",
    options: [
      { 
        text: "I prefer calculated risks with clear outcomes", 
        textUz: "Men aniq natijalari bilan hisoblab chiqilgan xavflarni afzal ko'raman",
        textRu: "Предпочитаю просчитанные риски с понятными результатами",
        scores: { R: 1, C: 2 } 
      },
      { 
        text: "I take risks if backed by data and research", 
        textUz: "Agar ma'lumotlar va tadqiqotlar bilan asoslangan bo'lsa, xavf qilaman",
        textRu: "Рискую, если это подкреплено данными и исследованиями",
        scores: { I: 3 } 
      },
      { 
        text: "I embrace risks for creative or innovative opportunities", 
        textUz: "Ijodiy yoki innovatsion imkoniyatlar uchun xavfni qabul qilaman",
        textRu: "Готов рисковать ради творческих или инновационных возможностей",
        scores: { A: 2, E: 1 } 
      },
      { 
        text: "I enjoy taking business/financial risks for potential rewards", 
        textUz: "Potensial mukofotlar uchun biznes/moliyaviy xavf qilishdan zavq olaman",
        textRu: "Мне нравится идти на бизнес/финансовые риски ради потенциальной награды",
        scores: { E: 3 } 
      },
    ],
  },
  {
    id: 8,
    question: "Which task sounds most appealing?",
    questionUz: "Qaysi vazifa sizga ko'proq yoqadi?",
    questionRu: "Какая задача кажется вам наиболее привлекательной?",
    options: [
      { 
        text: "Operating machinery or working with tools", 
        textUz: "Mashinalarni boshqarish yoki asboblar bilan ishlash",
        textRu: "Управлять оборудованием или работать с инструментами",
        scores: { R: 3 } 
      },
      { 
        text: "Analyzing data and writing a research report", 
        textUz: "Ma'lumotlarni tahlil qilish va tadqiqot hisobotini yozish",
        textRu: "Анализировать данные и писать исследовательский отчёт",
        scores: { I: 3 } 
      },
      { 
        text: "Designing a marketing campaign or brand identity", 
        textUz: "Marketing kampaniyasi yoki brend identifikatsiyasini loyihalash",
        textRu: "Разрабатывать маркетинговую кампанию или фирменный стиль",
        scores: { A: 2, E: 1 } 
      },
      { 
        text: "Training new employees or teaching a class", 
        textUz: "Yangi xodimlarni o'qitish yoki dars berish",
        textRu: "Обучать новых сотрудников или вести занятия",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 9,
    question: "How do you prefer to communicate?",
    questionUz: "Qanday muloqot qilishni afzal ko'rasiz?",
    questionRu: "Как вы предпочитаете общаться?",
    options: [
      { 
        text: "Through actions and demonstrations", 
        textUz: "Harakatlar va namoyishlar orqali",
        textRu: "Через действия и демонстрации",
        scores: { R: 3 } 
      },
      { 
        text: "Through written reports and documentation", 
        textUz: "Yozma hisobotlar va hujjatlar orqali",
        textRu: "Через письменные отчёты и документацию",
        scores: { I: 2, C: 1 } 
      },
      { 
        text: "Through visual presentations and storytelling", 
        textUz: "Vizual taqdimotlar va hikoya qilish orqali",
        textRu: "Через визуальные презентации и рассказы",
        scores: { A: 3 } 
      },
      { 
        text: "Through one-on-one conversations and discussions", 
        textUz: "Yakka-yakka suhbatlar va muhokamalar orqali",
        textRu: "Через личные беседы и обсуждения",
        scores: { S: 3 } 
      },
    ],
  },
  {
    id: 10,
    question: "What's your approach to rules and structure?",
    questionUz: "Qoidalar va tuzilmaga qanday yondashuvingiz bor?",
    questionRu: "Каков ваш подход к правилам и структуре?",
    options: [
      { 
        text: "I follow practical rules that make sense", 
        textUz: "Men mantiqiy amaliy qoidalarga amal qilaman",
        textRu: "Следую практичным правилам, которые имеют смысл",
        scores: { R: 2, C: 1 } 
      },
      { 
        text: "I question rules and seek evidence-based approaches", 
        textUz: "Men qoidalarni so'roqlayman va dalillarga asoslangan yondashuvlarni izlayman",
        textRu: "Ставлю правила под сомнение и ищу подходы, основанные на доказательствах",
        scores: { I: 3 } 
      },
      { 
        text: "I prefer flexibility and dislike rigid structures", 
        textUz: "Men moslashuvchanlikni afzal ko'raman va qattiq tuzilmalarni yoqtirmayman",
        textRu: "Предпочитаю гибкость и не люблю жёсткие структуры",
        scores: { A: 3 } 
      },
      { 
        text: "I appreciate order and well-defined procedures", 
        textUz: "Men tartib va aniq belgilangan tartiblarni qadrlayman",
        textRu: "Ценю порядок и чётко определённые процедуры",
        scores: { C: 3 } 
      },
    ],
  },
  {
    id: 11,
    question: "When making decisions, you primarily rely on:",
    questionUz: "Qaror qabul qilayotganda, asosan nimaga tayansiz?",
    questionRu: "Принимая решения, вы в первую очередь полагаетесь на:",
    options: [
      { 
        text: "Practical experience and common sense", 
        textUz: "Amaliy tajriba va sog'lom fikr",
        textRu: "Практический опыт и здравый смысл",
        scores: { R: 3 } 
      },
      { 
        text: "Logic, data, and thorough analysis", 
        textUz: "Mantiq, ma'lumotlar va chuqur tahlil",
        textRu: "Логику, данные и тщательный анализ",
        scores: { I: 3 } 
      },
      { 
        text: "Intuition and gut feelings", 
        textUz: "Intuitiv his va ichki ovoz",
        textRu: "Интуицию и внутреннее чувство",
        scores: { A: 3 } 
      },
      { 
        text: "Input from others and consensus", 
        textUz: "Boshqalarning fikri va kelishuv",
        textRu: "Мнения других и консенсус",
        scores: { S: 2, E: 1 } 
      },
    ],
  },
  {
    id: 12,
    question: "What achievement would make you most proud?",
    questionUz: "Qanday yutuq sizni eng ko'p faxrlantiradi?",
    questionRu: "Какое достижение заставило бы вас гордиться больше всего?",
    options: [
      { 
        text: "Building something with my own hands", 
        textUz: "O'z qo'llarim bilan biror narsa yasash",
        textRu: "Построить что-то своими руками",
        scores: { R: 3 } 
      },
      { 
        text: "Making a scientific discovery or breakthrough", 
        textUz: "Ilmiy kashfiyot yoki yutuqqa erishish",
        textRu: "Сделать научное открытие или прорыв",
        scores: { I: 3 } 
      },
      { 
        text: "Creating an award-winning piece of art or design", 
        textUz: "Mukofotga loyiq san'at asari yoki dizayn yaratish",
        textRu: "Создать отмеченное наградами произведение искусства или дизайна",
        scores: { A: 3 } 
      },
      { 
        text: "Starting and growing a successful business", 
        textUz: "Muvaffaqiyatli biznesni boshlash va rivojlantirish",
        textRu: "Начать и развить успешный бизнес",
        scores: { E: 3 } 
      },
    ],
  },
];

export interface Career {
  id: number;
  title: string;
  titleUz: string;
  titleRu: string;
  hollandCode: string;
  salary: string;
  growth: string;
  demand: 'Very High' | 'High' | 'Moderate';
  icon: LucideIcon;
  description: string;
  descriptionUz: string;
  descriptionRu: string;
  pros: string[];
  prosUz: string[];
  prosRu: string[];
  cons: string[];
  consUz: string[];
  consRu: string[];
  skills: string[];
  relatedFields: string[];
  topUniversities: string[];
}

export const careers: Career[] = [
  // Realistic (R)
  {
    id: 1,
    title: "Civil Engineer",
    titleUz: "Qurilish Muhandisi",
    titleRu: "Инженер-строитель",
    hollandCode: "RIC",
    salary: "$70,000 - $120,000",
    growth: "+7% (Above average)",
    demand: "High",
    icon: Building2,
    description: "Design, build, and maintain infrastructure projects like roads, bridges, and buildings.",
    descriptionUz: "Yo'llar, ko'priklar va binolar kabi infratuzilma loyihalarini loyihalash, qurish va saqlash.",
    descriptionRu: "Проектировать, строить и обслуживать инфраструктурные проекты: дороги, мосты, здания.",
    pros: ["Job stability", "Tangible impact", "Good salary", "Diverse projects"],
    prosUz: ["Ish barqarorligi", "Aniq ta'sir", "Yaxshi maosh", "Turli loyihalar"],
    prosRu: ["Стабильность работы", "Ощутимое влияние", "Хорошая зарплата", "Разнообразные проекты"],
    cons: ["Long project timelines", "Site work in all weather", "High responsibility"],
    consUz: ["Uzoq loyiha muddatlari", "Har qanday ob-havoda maydon ishi", "Yuqori mas'uliyat"],
    consRu: ["Длительные сроки проектов", "Работа на объекте в любую погоду", "Высокая ответственность"],
    skills: ["AutoCAD", "Structural Analysis", "Project Management", "Mathematics"],
    relatedFields: ["Civil Engineering", "Structural Engineering", "Urban Planning"],
    topUniversities: ["MIT", "Stanford", "UC Berkeley"]
  },
  {
    id: 2,
    title: "Mechanical Engineer",
    titleUz: "Mexanika Muhandisi",
    titleRu: "Инженер-механик",
    hollandCode: "RIE",
    salary: "$75,000 - $130,000",
    growth: "+9% (Above average)",
    demand: "High",
    icon: Wrench,
    description: "Design and develop mechanical systems, from engines to manufacturing equipment.",
    descriptionUz: "Dvigatellardan ishlab chiqarish uskunalarigacha mexanik tizimlarni loyihalash va ishlab chiqish.",
    descriptionRu: "Проектировать и разрабатывать механические системы: от двигателей до производственного оборудования.",
    pros: ["Versatile career", "Innovation opportunities", "Strong demand"],
    prosUz: ["Ko'p qirrali martaba", "Innovatsiya imkoniyatlari", "Kuchli talab"],
    prosRu: ["Универсальная карьера", "Возможности для инноваций", "Высокий спрос"],
    cons: ["Complex calculations", "Continuous learning required"],
    consUz: ["Murakkab hisob-kitoblar", "Doimiy o'rganish talab qilinadi"],
    consRu: ["Сложные расчёты", "Требуется постоянное обучение"],
    skills: ["CAD/CAM", "Thermodynamics", "Material Science", "Problem Solving"],
    relatedFields: ["Mechanical Engineering", "Aerospace Engineering", "Robotics"],
    topUniversities: ["MIT", "Georgia Tech", "University of Michigan"]
  },
  // Investigative (I)
  {
    id: 3,
    title: "Software Engineer",
    titleUz: "Dasturiy Ta'minot Muhandisi",
    titleRu: "Инженер-программист",
    hollandCode: "IRC",
    salary: "$110,000 - $180,000",
    growth: "+22% (Much faster than average)",
    demand: "Very High",
    icon: Code,
    description: "Design, develop, and maintain software applications and systems.",
    descriptionUz: "Dasturiy ta'minot ilovalari va tizimlarini loyihalash, ishlab chiqish va saqlash.",
    descriptionRu: "Проектировать, разрабатывать и поддерживать программные приложения и системы.",
    pros: ["High salary", "Remote work options", "Creative problem-solving", "Continuous learning"],
    prosUz: ["Yuqori maosh", "Masofaviy ish imkoniyatlari", "Ijodiy muammolarni hal qilish", "Doimiy o'rganish"],
    prosRu: ["Высокая зарплата", "Возможность удалённой работы", "Творческое решение проблем", "Постоянное обучение"],
    cons: ["Long hours sometimes", "Rapid technology changes", "Can be sedentary"],
    consUz: ["Ba'zan uzun soatlar", "Tez texnologiya o'zgarishlari", "O'tirish ko'p bo'lishi mumkin"],
    consRu: ["Иногда долгие часы", "Быстрые изменения технологий", "Сидячий образ жизни"],
    skills: ["Programming", "Problem Solving", "Git", "Agile", "System Design"],
    relatedFields: ["Computer Science", "Software Engineering", "Information Technology"],
    topUniversities: ["Stanford", "MIT", "Carnegie Mellon"]
  },
  {
    id: 4,
    title: "Data Scientist",
    titleUz: "Ma'lumotlar Olimi",
    titleRu: "Специалист по данным",
    hollandCode: "IRC",
    salary: "$95,000 - $150,000",
    growth: "+36% (Much faster than average)",
    demand: "Very High",
    icon: Database,
    description: "Analyze complex data to help organizations make better decisions.",
    descriptionUz: "Tashkilotlarga yaxshiroq qarorlar qabul qilishda yordam berish uchun murakkab ma'lumotlarni tahlil qilish.",
    descriptionRu: "Анализировать сложные данные, чтобы помочь организациям принимать лучшие решения.",
    pros: ["High demand", "Diverse industries", "Impact on business decisions", "Intellectual challenge"],
    prosUz: ["Yuqori talab", "Turli sanoatlar", "Biznes qarorlariga ta'sir", "Intellektual qiyinchilik"],
    prosRu: ["Высокий спрос", "Разнообразные отрасли", "Влияние на бизнес-решения", "Интеллектуальный вызов"],
    cons: ["Requires strong math skills", "Data cleaning can be tedious"],
    consUz: ["Kuchli matematika ko'nikmalari talab qilinadi", "Ma'lumotlarni tozalash zerikarli bo'lishi mumkin"],
    consRu: ["Требуются сильные математические навыки", "Очистка данных может быть утомительной"],
    skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization", "SQL"],
    relatedFields: ["Data Science", "Statistics", "Computer Science", "Mathematics"],
    topUniversities: ["UC Berkeley", "Stanford", "Harvard", "MIT"]
  },
  {
    id: 5,
    title: "Biomedical Engineer",
    titleUz: "Biomedikal Muhandis",
    titleRu: "Биомедицинский инженер",
    hollandCode: "IRS",
    salary: "$85,000 - $130,000",
    growth: "+10% (Faster than average)",
    demand: "High",
    icon: Microscope,
    description: "Develop medical devices and equipment to improve patient care.",
    descriptionUz: "Bemorlarni parvarishlashni yaxshilash uchun tibbiy qurilmalar va uskunalarni ishlab chiqish.",
    descriptionRu: "Разрабатывать медицинские устройства и оборудование для улучшения ухода за пациентами.",
    pros: ["Meaningful work", "Innovation-driven", "Growing field"],
    prosUz: ["Mazmunli ish", "Innovatsiyaga asoslangan", "O'sib borayotgan soha"],
    prosRu: ["Значимая работа", "Ориентация на инновации", "Растущая область"],
    cons: ["Regulatory challenges", "Long development cycles"],
    consUz: ["Tartibga solish qiyinchiliklari", "Uzoq ishlab chiqish davrlari"],
    consRu: ["Регуляторные сложности", "Длительные циклы разработки"],
    skills: ["Biology", "Engineering", "Medical Devices", "Regulatory Affairs"],
    relatedFields: ["Biomedical Engineering", "Electrical Engineering", "Medicine"],
    topUniversities: ["Johns Hopkins", "MIT", "Georgia Tech"]
  },
  // Artistic (A)
  {
    id: 6,
    title: "UX/UI Designer",
    titleUz: "UX/UI Dizayner",
    titleRu: "UX/UI Дизайнер",
    hollandCode: "AIE",
    salary: "$70,000 - $130,000",
    growth: "+23% (Much faster than average)",
    demand: "Very High",
    icon: Palette,
    description: "Create intuitive, beautiful user interfaces for digital products.",
    descriptionUz: "Raqamli mahsulotlar uchun intuitiv, chiroyli foydalanuvchi interfeyslarini yaratish.",
    descriptionRu: "Создавать интуитивные, красивые пользовательские интерфейсы для цифровых продуктов.",
    pros: ["Creative work", "High demand", "Remote opportunities", "Visible impact"],
    prosUz: ["Ijodiy ish", "Yuqori talab", "Masofaviy imkoniyatlar", "Ko'rinadigan ta'sir"],
    prosRu: ["Творческая работа", "Высокий спрос", "Удалённые возможности", "Видимый результат"],
    cons: ["Subjective feedback", "Tight deadlines", "Stakeholder management"],
    consUz: ["Sub'ektiv fikr-mulohazalar", "Qattiq muddatlar", "Manfaatdor tomonlarni boshqarish"],
    consRu: ["Субъективная обратная связь", "Сжатые сроки", "Управление заинтересованными сторонами"],
    skills: ["Figma", "User Research", "Prototyping", "Visual Design", "Interaction Design"],
    relatedFields: ["Design", "Human-Computer Interaction", "Psychology"],
    topUniversities: ["Stanford", "Carnegie Mellon", "Rhode Island School of Design"]
  },
  {
    id: 7,
    title: "Architect",
    titleUz: "Arxitektor",
    titleRu: "Архитектор",
    hollandCode: "AIR",
    salary: "$75,000 - $140,000",
    growth: "+3% (Average)",
    demand: "Moderate",
    icon: Building2,
    description: "Design buildings and structures that are functional, safe, and aesthetically pleasing.",
    descriptionUz: "Funksional, xavfsiz va estetik jihatdan yoqimli binolar va inshootlarni loyihalash.",
    descriptionRu: "Проектировать функциональные, безопасные и эстетически привлекательные здания и сооружения.",
    pros: ["Creative expression", "Lasting legacy", "Diverse projects"],
    prosUz: ["Ijodiy ifoda", "Doimiy meros", "Turli loyihalar"],
    prosRu: ["Творческое самовыражение", "Долговечное наследие", "Разнообразные проекты"],
    cons: ["Long education path", "Project-based income", "Economic sensitivity"],
    consUz: ["Uzoq ta'lim yo'li", "Loyihaga asoslangan daromad", "Iqtisodiy sezgirlik"],
    consRu: ["Долгий путь обучения", "Проектный доход", "Чувствительность к экономике"],
    skills: ["AutoCAD", "3D Modeling", "Building Codes", "Sustainability", "Project Management"],
    relatedFields: ["Architecture", "Urban Design", "Interior Design"],
    topUniversities: ["MIT", "Harvard GSD", "Columbia"]
  },
  {
    id: 8,
    title: "Graphic Designer",
    titleUz: "Grafik Dizayner",
    titleRu: "Графический дизайнер",
    hollandCode: "AER",
    salary: "$45,000 - $85,000",
    growth: "+3% (Average)",
    demand: "Moderate",
    icon: PenTool,
    description: "Create visual content for brands, publications, and digital media.",
    descriptionUz: "Brendlar, nashrlar va raqamli media uchun vizual kontent yaratish.",
    descriptionRu: "Создавать визуальный контент для брендов, публикаций и цифровых медиа.",
    pros: ["Creative freedom", "Diverse clients", "Freelance opportunities"],
    prosUz: ["Ijodiy erkinlik", "Turli mijozlar", "Frilanser imkoniyatlari"],
    prosRu: ["Творческая свобода", "Разнообразные клиенты", "Фриланс возможности"],
    cons: ["Competitive field", "Client revisions", "Variable income"],
    consUz: ["Raqobatbardosh soha", "Mijozlarning tuzatishlari", "O'zgaruvchan daromad"],
    consRu: ["Конкурентная область", "Правки клиентов", "Переменный доход"],
    skills: ["Adobe Creative Suite", "Typography", "Branding", "Layout Design"],
    relatedFields: ["Graphic Design", "Visual Communication", "Fine Arts"],
    topUniversities: ["RISD", "Parsons", "Pratt Institute"]
  },
  // Social (S)
  {
    id: 9,
    title: "Teacher / Professor",
    titleUz: "O'qituvchi / Professor",
    titleRu: "Учитель / Профессор",
    hollandCode: "SAI",
    salary: "$45,000 - $100,000",
    growth: "+4% (Average)",
    demand: "High",
    icon: GraduationCap,
    description: "Educate and inspire students at various educational levels.",
    descriptionUz: "Turli ta'lim darajalarida talabalarni o'qitish va ilhomlantirish.",
    descriptionRu: "Обучать и вдохновлять студентов на различных уровнях образования.",
    pros: ["Meaningful impact", "Job security", "Summer breaks", "Intellectual stimulation"],
    prosUz: ["Mazmunli ta'sir", "Ish xavfsizligi", "Yozgi ta'tillar", "Intellektual rag'batlantirish"],
    prosRu: ["Значимое влияние", "Стабильность работы", "Летние каникулы", "Интеллектуальная стимуляция"],
    cons: ["Lower pay (K-12)", "Administrative burden", "Challenging students"],
    consUz: ["Past maosh (K-12)", "Ma'muriy yuk", "Qiyin talabalar"],
    consRu: ["Низкая зарплата (K-12)", "Административная нагрузка", "Сложные студенты"],
    skills: ["Communication", "Patience", "Subject Expertise", "Curriculum Development"],
    relatedFields: ["Education", "Subject Specialization", "Educational Psychology"],
    topUniversities: ["Harvard", "Stanford", "Teachers College Columbia"]
  },
  {
    id: 10,
    title: "Healthcare Professional",
    titleUz: "Sog'liqni Saqlash Mutaxassisi",
    titleRu: "Медицинский работник",
    hollandCode: "SIR",
    salary: "$55,000 - $150,000",
    growth: "+13% (Much faster than average)",
    demand: "Very High",
    icon: Stethoscope,
    description: "Provide medical care and support to patients in various healthcare settings.",
    descriptionUz: "Turli sog'liqni saqlash muassasalarida bemorlarga tibbiy yordam va qo'llab-quvvatlash.",
    descriptionRu: "Оказывать медицинскую помощь и поддержку пациентам в различных медицинских учреждениях.",
    pros: ["Job security", "Helping others", "Diverse specializations", "Good compensation"],
    prosUz: ["Ish xavfsizligi", "Boshqalarga yordam berish", "Turli ixtisosliklar", "Yaxshi kompensatsiya"],
    prosRu: ["Стабильность работы", "Помощь другим", "Разнообразные специализации", "Хорошая компенсация"],
    cons: ["Emotional demands", "Long hours", "High stress"],
    consUz: ["Hissiy talablar", "Uzun soatlar", "Yuqori stress"],
    consRu: ["Эмоциональные требования", "Долгие часы", "Высокий стресс"],
    skills: ["Clinical Skills", "Empathy", "Communication", "Critical Thinking"],
    relatedFields: ["Nursing", "Medicine", "Public Health"],
    topUniversities: ["Johns Hopkins", "UCSF", "Duke"]
  },
  {
    id: 11,
    title: "HR Manager",
    titleUz: "HR Menejeri",
    titleRu: "HR Менеджер",
    hollandCode: "SEC",
    salary: "$65,000 - $120,000",
    growth: "+6% (Average)",
    demand: "High",
    icon: Users,
    description: "Manage recruitment, employee relations, and organizational development.",
    descriptionUz: "Yollash, xodimlar munosabatlari va tashkiliy rivojlanishni boshqarish.",
    descriptionRu: "Управлять набором персонала, отношениями с сотрудниками и организационным развитием.",
    pros: ["People-focused", "Strategic role", "Diverse responsibilities"],
    prosUz: ["Odamlarga yo'naltirilgan", "Strategik rol", "Turli mas'uliyatlar"],
    prosRu: ["Ориентация на людей", "Стратегическая роль", "Разнообразные обязанности"],
    cons: ["Conflict resolution", "Policy enforcement", "Layoff responsibilities"],
    consUz: ["Nizolarni hal qilish", "Siyosatni amalga oshirish", "Ishdan bo'shatish mas'uliyatlari"],
    consRu: ["Разрешение конфликтов", "Применение политики", "Обязанности по увольнению"],
    skills: ["Recruitment", "Employment Law", "Communication", "Conflict Resolution"],
    relatedFields: ["Human Resources", "Business Administration", "Psychology"],
    topUniversities: ["Cornell", "Michigan", "USC"]
  },
  // Enterprising (E)
  {
    id: 12,
    title: "Product Manager",
    titleUz: "Mahsulot Menejeri",
    titleRu: "Продуктовый менеджер",
    hollandCode: "EIS",
    salary: "$100,000 - $180,000",
    growth: "+10% (Faster than average)",
    demand: "Very High",
    icon: Briefcase,
    description: "Lead product development from conception to launch, balancing business and user needs.",
    descriptionUz: "Mahsulot ishlab chiqishni kontseptsiyadan ishga tushirishgacha boshqarish, biznes va foydalanuvchi ehtiyojlarini muvozanatlash.",
    descriptionRu: "Руководить разработкой продукта от концепции до запуска, балансируя бизнес-цели и потребности пользователей.",
    pros: ["Strategic role", "High compensation", "Cross-functional work", "Impact on product"],
    prosUz: ["Strategik rol", "Yuqori kompensatsiya", "Ko'p funktsiyali ish", "Mahsulotga ta'sir"],
    prosRu: ["Стратегическая роль", "Высокая компенсация", "Кросс-функциональная работа", "Влияние на продукт"],
    cons: ["High pressure", "Balancing stakeholders", "Ambiguous metrics"],
    consUz: ["Yuqori bosim", "Manfaatdor tomonlarni muvozanatlash", "Noaniq ko'rsatkichlar"],
    consRu: ["Высокое давление", "Баланс интересов", "Неоднозначные метрики"],
    skills: ["Leadership", "Communication", "Strategy", "Technical Understanding", "Analytics"],
    relatedFields: ["Business Administration", "Computer Science", "Engineering"],
    topUniversities: ["Stanford GSB", "Harvard Business School", "Wharton"]
  },
  {
    id: 13,
    title: "Marketing Manager",
    titleUz: "Marketing Menejeri",
    titleRu: "Маркетинг менеджер",
    hollandCode: "EAS",
    salary: "$70,000 - $140,000",
    growth: "+10% (Faster than average)",
    demand: "High",
    icon: Megaphone,
    description: "Develop and execute marketing strategies to promote products and services.",
    descriptionUz: "Mahsulot va xizmatlarni targ'ib qilish uchun marketing strategiyalarini ishlab chiqish va amalga oshirish.",
    descriptionRu: "Разрабатывать и реализовывать маркетинговые стратегии для продвижения продуктов и услуг.",
    pros: ["Creative + strategic", "Measurable results", "Diverse industries"],
    prosUz: ["Ijodiy + strategik", "O'lchanadigan natijalar", "Turli sanoatlar"],
    prosRu: ["Творческий + стратегический", "Измеримые результаты", "Разнообразные отрасли"],
    cons: ["Campaign pressure", "Proving ROI", "Rapid changes"],
    consUz: ["Kampaniya bosimi", "ROI ni isbotlash", "Tez o'zgarishlar"],
    consRu: ["Давление кампаний", "Доказательство ROI", "Быстрые изменения"],
    skills: ["Digital Marketing", "Analytics", "Brand Management", "Content Strategy"],
    relatedFields: ["Marketing", "Communications", "Business"],
    topUniversities: ["Northwestern Kellogg", "Columbia", "NYU Stern"]
  },
  {
    id: 14,
    title: "Entrepreneur / Business Owner",
    titleUz: "Tadbirkor / Biznes Egasi",
    titleRu: "Предприниматель / Владелец бизнеса",
    hollandCode: "ECS",
    salary: "Varies widely",
    growth: "+5% (Average)",
    demand: "High",
    icon: LineChart,
    description: "Start and grow your own business, taking on risk for potential rewards.",
    descriptionUz: "O'z biznesingizni boshlash va rivojlantirish, potentsial mukofotlar uchun xavf qabul qilish.",
    descriptionRu: "Начать и развивать собственный бизнес, принимая риски ради потенциальной награды.",
    pros: ["Independence", "Unlimited potential", "Creative freedom", "Building something yours"],
    prosUz: ["Mustaqillik", "Cheksiz potensial", "Ijodiy erkinlik", "O'zingizning narsangizni yaratish"],
    prosRu: ["Независимость", "Неограниченный потенциал", "Творческая свобода", "Создание чего-то своего"],
    cons: ["Financial risk", "Long hours", "Uncertainty", "All responsibilities"],
    consUz: ["Moliyaviy xavf", "Uzun soatlar", "Noaniqlik", "Barcha mas'uliyatlar"],
    consRu: ["Финансовый риск", "Долгие часы", "Неопределённость", "Все обязанности"],
    skills: ["Business Planning", "Leadership", "Finance", "Sales", "Resilience"],
    relatedFields: ["Business Administration", "Finance", "Industry-specific knowledge"],
    topUniversities: ["Stanford GSB", "Harvard Business School", "MIT Sloan"]
  },
  {
    id: 15,
    title: "Lawyer",
    titleUz: "Advokat",
    titleRu: "Юрист",
    hollandCode: "EIC",
    salary: "$80,000 - $200,000+",
    growth: "+6% (Average)",
    demand: "High",
    icon: Scale,
    description: "Represent and advise clients on legal matters, from corporate law to litigation.",
    descriptionUz: "Mijozlarni huquqiy masalalarda vakillik qilish va maslahat berish, korporativ huquqdan sudlashuvgacha.",
    descriptionRu: "Представлять и консультировать клиентов по юридическим вопросам: от корпоративного права до судебных разбирательств.",
    pros: ["High earning potential", "Intellectual challenge", "Prestigious", "Diverse specializations"],
    prosUz: ["Yuqori daromad potensiali", "Intellektual qiyinchilik", "Nufuzli", "Turli ixtisosliklar"],
    prosRu: ["Высокий потенциал заработка", "Интеллектуальный вызов", "Престижно", "Разнообразные специализации"],
    cons: ["Long hours", "High stress", "Competitive", "Expensive education"],
    consUz: ["Uzun soatlar", "Yuqori stress", "Raqobatbardosh", "Qimmat ta'lim"],
    consRu: ["Долгие часы", "Высокий стресс", "Конкурентная среда", "Дорогое образование"],
    skills: ["Legal Research", "Negotiation", "Writing", "Critical Thinking", "Public Speaking"],
    relatedFields: ["Law", "Political Science", "Business"],
    topUniversities: ["Yale Law", "Harvard Law", "Stanford Law"]
  },
  // Conventional (C)
  {
    id: 16,
    title: "Accountant / Financial Analyst",
    titleUz: "Buxgalter / Moliyaviy Tahlilchi",
    titleRu: "Бухгалтер / Финансовый аналитик",
    hollandCode: "CIE",
    salary: "$55,000 - $120,000",
    growth: "+6% (Average)",
    demand: "High",
    icon: Calculator,
    description: "Manage financial records, analyze data, and provide financial guidance.",
    descriptionUz: "Moliyaviy yozuvlarni boshqarish, ma'lumotlarni tahlil qilish va moliyaviy ko'rsatmalar berish.",
    descriptionRu: "Управлять финансовыми записями, анализировать данные и давать финансовые рекомендации.",
    pros: ["Job stability", "Clear career path", "Diverse industries", "Work-life balance"],
    prosUz: ["Ish barqarorligi", "Aniq martaba yo'li", "Turli sanoatlar", "Ish-hayot muvozanati"],
    prosRu: ["Стабильность работы", "Чёткий карьерный путь", "Разнообразные отрасли", "Баланс работы и жизни"],
    cons: ["Seasonal workload", "Regulatory complexity", "Can be repetitive"],
    consUz: ["Mavsumiy ish yuki", "Tartibga solish murakkabligi", "Takroriy bo'lishi mumkin"],
    consRu: ["Сезонная нагрузка", "Сложность регулирования", "Может быть однообразной"],
    skills: ["Excel", "Financial Modeling", "Tax Knowledge", "Attention to Detail"],
    relatedFields: ["Accounting", "Finance", "Business Administration"],
    topUniversities: ["Wharton", "Chicago Booth", "NYU Stern"]
  },
  {
    id: 17,
    title: "Project Manager",
    titleUz: "Loyiha Menejeri",
    titleRu: "Проектный менеджер",
    hollandCode: "CES",
    salary: "$75,000 - $130,000",
    growth: "+7% (Above average)",
    demand: "High",
    icon: Briefcase,
    description: "Plan, execute, and close projects on time and within budget.",
    descriptionUz: "Loyihalarni o'z vaqtida va byudjet doirasida rejalashtirish, bajarish va yakunlash.",
    descriptionRu: "Планировать, выполнять и завершать проекты вовремя и в рамках бюджета.",
    pros: ["Versatile skills", "Leadership role", "High demand", "Clear milestones"],
    prosUz: ["Ko'p qirrali ko'nikmalar", "Rahbarlik roli", "Yuqori talab", "Aniq bosqichlar"],
    prosRu: ["Универсальные навыки", "Руководящая роль", "Высокий спрос", "Чёткие этапы"],
    cons: ["Deadline pressure", "Multiple stakeholders", "Scope changes"],
    consUz: ["Muddat bosimi", "Ko'plab manfaatdor tomonlar", "Qamrov o'zgarishlari"],
    consRu: ["Давление сроков", "Множество заинтересованных сторон", "Изменения объёма"],
    skills: ["Planning", "Risk Management", "Communication", "Agile/Scrum", "Budgeting"],
    relatedFields: ["Project Management", "Business Administration", "Engineering"],
    topUniversities: ["Stanford", "MIT", "Northwestern"]
  },
  {
    id: 18,
    title: "Database Administrator",
    titleUz: "Ma'lumotlar Bazasi Administratori",
    titleRu: "Администратор баз данных",
    hollandCode: "CIR",
    salary: "$70,000 - $120,000",
    growth: "+8% (Above average)",
    demand: "High",
    icon: Database,
    description: "Manage and secure organizational databases, ensuring data integrity and availability.",
    descriptionUz: "Tashkilot ma'lumotlar bazalarini boshqarish va himoya qilish, ma'lumotlar yaxlitligi va mavjudligini ta'minlash.",
    descriptionRu: "Управлять и защищать базы данных организации, обеспечивая целостность и доступность данных.",
    pros: ["Job security", "Technical skills valued", "Remote options"],
    prosUz: ["Ish xavfsizligi", "Texnik ko'nikmalar qadrlanadi", "Masofaviy imkoniyatlar"],
    prosRu: ["Стабильность работы", "Ценятся технические навыки", "Удалённые возможности"],
    cons: ["On-call responsibilities", "Complex troubleshooting", "Continuous learning"],
    consUz: ["Chaqiruvga tayyor bo'lish mas'uliyatlari", "Murakkab muammolarni bartaraf etish", "Doimiy o'rganish"],
    consRu: ["Дежурства по вызову", "Сложное устранение неполадок", "Постоянное обучение"],
    skills: ["SQL", "Database Security", "Performance Tuning", "Backup/Recovery"],
    relatedFields: ["Computer Science", "Information Systems", "Data Management"],
    topUniversities: ["Carnegie Mellon", "UC Berkeley", "Georgia Tech"]
  },
  // Additional diverse careers
  {
    id: 19,
    title: "Pilot",
    titleUz: "Uchuvchi",
    titleRu: "Пилот",
    hollandCode: "RCE",
    salary: "$80,000 - $200,000+",
    growth: "+6% (Average)",
    demand: "High",
    icon: Plane,
    description: "Operate aircraft to transport passengers and cargo safely.",
    descriptionUz: "Yo'lovchilar va yuklarni xavfsiz tashish uchun havo kemalarini boshqarish.",
    descriptionRu: "Управлять воздушным судном для безопасной перевозки пассажиров и грузов.",
    pros: ["Travel opportunities", "High salary", "Exciting work", "Job satisfaction"],
    prosUz: ["Sayohat imkoniyatlari", "Yuqori maosh", "Hayajonli ish", "Ish qoniqishi"],
    prosRu: ["Возможности путешествий", "Высокая зарплата", "Захватывающая работа", "Удовлетворённость работой"],
    cons: ["Irregular schedule", "Time away from home", "High responsibility"],
    consUz: ["Tartibsiz jadval", "Uydan uzoqda vaqt", "Yuqori mas'uliyat"],
    consRu: ["Нерегулярный график", "Время вдали от дома", "Высокая ответственность"],
    skills: ["Flying Skills", "Navigation", "Decision Making", "Communication"],
    relatedFields: ["Aviation", "Aerospace Engineering", "Military"],
    topUniversities: ["Embry-Riddle", "Purdue", "US Air Force Academy"]
  },
  {
    id: 20,
    title: "Cybersecurity Analyst",
    titleUz: "Kiberxavfsizlik Tahlilchisi",
    titleRu: "Аналитик кибербезопасности",
    hollandCode: "ICR",
    salary: "$80,000 - $140,000",
    growth: "+32% (Much faster than average)",
    demand: "Very High",
    icon: Shield,
    description: "Protect organizations from cyber threats and security breaches.",
    descriptionUz: "Tashkilotlarni kiber tahdidlar va xavfsizlik buzilishlaridan himoya qilish.",
    descriptionRu: "Защищать организации от киберугроз и нарушений безопасности.",
    pros: ["High demand", "Exciting challenges", "Good salary", "Remote options"],
    prosUz: ["Yuqori talab", "Hayajonli qiyinchiliklar", "Yaxshi maosh", "Masofaviy imkoniyatlar"],
    prosRu: ["Высокий спрос", "Захватывающие задачи", "Хорошая зарплата", "Удалённые возможности"],
    cons: ["High stress", "Continuous learning", "On-call duties"],
    consUz: ["Yuqori stress", "Doimiy o'rganish", "Chaqiruvga tayyor bo'lish"],
    consRu: ["Высокий стресс", "Постоянное обучение", "Дежурства по вызову"],
    skills: ["Security Tools", "Network Security", "Risk Assessment", "Incident Response"],
    relatedFields: ["Cybersecurity", "Computer Science", "Information Systems"],
    topUniversities: ["Carnegie Mellon", "Georgia Tech", "MIT"]
  },
  {
    id: 21,
    title: "Photographer / Videographer",
    titleUz: "Fotograf / Videograf",
    titleRu: "Фотограф / Видеограф",
    hollandCode: "AER",
    salary: "$35,000 - $90,000",
    growth: "+4% (Average)",
    demand: "Moderate",
    icon: Camera,
    description: "Capture and create visual content for various purposes and clients.",
    descriptionUz: "Turli maqsadlar va mijozlar uchun vizual kontentni suratga olish va yaratish.",
    descriptionRu: "Снимать и создавать визуальный контент для различных целей и клиентов.",
    pros: ["Creative work", "Flexible schedule", "Diverse projects", "Self-expression"],
    prosUz: ["Ijodiy ish", "Moslashuvchan jadval", "Turli loyihalar", "O'z-o'zini ifodalash"],
    prosRu: ["Творческая работа", "Гибкий график", "Разнообразные проекты", "Самовыражение"],
    cons: ["Irregular income", "Equipment costs", "Competitive market"],
    consUz: ["Tartibsiz daromad", "Jihozlar xarajatlari", "Raqobatbardosh bozor"],
    consRu: ["Нерегулярный доход", "Затраты на оборудование", "Конкурентный рынок"],
    skills: ["Photography", "Video Editing", "Lighting", "Post-processing"],
    relatedFields: ["Photography", "Film", "Media Arts"],
    topUniversities: ["UCLA", "NYU Tisch", "RISD"]
  },
  {
    id: 22,
    title: "Music Producer / Composer",
    titleUz: "Musiqa Prodyuseri / Bastakor",
    titleRu: "Музыкальный продюсер / Композитор",
    hollandCode: "AES",
    salary: "$40,000 - $120,000+",
    growth: "+6% (Average)",
    demand: "Moderate",
    icon: Music,
    description: "Create, produce, and arrange music for various media and artists.",
    descriptionUz: "Turli media va san'atkorlar uchun musiqa yaratish, ishlab chiqarish va tartibga solish.",
    descriptionRu: "Создавать, продюсировать и аранжировать музыку для различных медиа и артистов.",
    pros: ["Creative fulfillment", "Industry diversity", "Passive income potential"],
    prosUz: ["Ijodiy bajarilish", "Sanoat xilma-xilligi", "Passiv daromad potensiali"],
    prosRu: ["Творческое удовлетворение", "Разнообразие индустрии", "Потенциал пассивного дохода"],
    cons: ["Unpredictable income", "Long hours", "Highly competitive"],
    consUz: ["Bashorat qilib bo'lmaydigan daromad", "Uzun soatlar", "Juda raqobatbardosh"],
    consRu: ["Непредсказуемый доход", "Долгие часы", "Высокая конкуренция"],
    skills: ["Music Production", "Audio Engineering", "Composition", "Music Theory"],
    relatedFields: ["Music Production", "Audio Engineering", "Composition"],
    topUniversities: ["Berklee", "Juilliard", "USC Thornton"]
  },
];

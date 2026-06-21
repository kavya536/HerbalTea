import { Leaf, Smile, Apple, Microscope, Coffee, Sun, Sprout } from 'lucide-react';

export const TOPICS = [
  { name: 'All', icon: Leaf },
  { name: 'Wellness', icon: Smile },
  { name: 'Nutrition', icon: Apple },
  { name: 'Research', icon: Microscope },
  { name: 'Detox', icon: Coffee },
  { name: 'Lifestyle', icon: Sun },
  { name: 'Ingredients', icon: Sprout }
];

export const ARTICLES = [
  {
    id: 1,
    tag: "RESEARCH",
    title: "What Science Says About Hibiscus Tea",
    desc: "Studies suggest hibiscus may support healthy blood pressure and heart wellness.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 18, 2025",
    readTime: "6 min read",
    img: "/blog/blog1.png",
    content: {
      intro: "In today's fast-paced world, more people are turning to nature for balance. Hibiscus tea—rooted in ancient traditions and backed by modern research—offers a simple yet powerful way to support your cardiovascular health. From calming stress to boosting immunity, each cup is a step toward a healthier you.",
      benefitsTitle: "The Benefits Of Hibiscus Tea",
      benefits: [
        "Packed with antioxidants like anthocyanins",
        "Supports healthy blood pressure levels naturally",
        "Promotes better liver health and digestion",
        "Naturally caffeine-free and tartly refreshing"
      ],
      researchTitle: "What Research Says",
      research: [
        { name: "Blood Pressure", text: "Multiple studies show hibiscus tea can lower systolic and diastolic blood pressure." },
        { name: "Cholesterol", text: "May help balance blood lipid levels and support overall heart health." },
        { name: "Liver Health", text: "Antioxidants in hibiscus protect the liver from toxins and oxidative stress." },
        { name: "Immunity", text: "Rich in Vitamin C, it naturally fortifies the immune system against infections." }
      ],
      howToUseTitle: "How To Use Hibiscus Tea",
      howToUse: [
        "Start your morning with a refreshing iced hibiscus tea.",
        "Sip a warm cup in the afternoon instead of sugary drinks.",
        "Drink consistently for 6 weeks to experience cardiovascular benefits.",
        "Combine with ginger or mint for an extra flavor boost."
      ],
      tipsTitle: "Daily Heart Tips",
      tips: [
        { title: "Hydrate Mindfully", desc: "Sip warm hibiscus tea throughout the day to keep your body balanced." },
        { title: "Choose Natural", desc: "Pick blends with real hibiscus flowers and no artificial flavors." },
        { title: "Listen To Your Heart", desc: "Pair your tea with a brisk walk to maximize cardiovascular health." },
        { title: "Make It A Ritual", desc: "Create a calm afternoon ritual to naturally lower your daily stress levels." }
      ],
      conclusion: "Hibiscus tea is more than just a beautiful crimson beverage — it's a daily wellness ritual that specifically supports your heart and immunity. Make it a part of your daily routine and experience the benefits of nature's healing power."
    }
  },
  {
    id: 2,
    tag: "NUTRITION",
    title: "Antioxidants In Everyday Wellness",
    desc: "Understanding antioxidants and how they protect your cells naturally.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 14, 2025",
    readTime: "5 min read",
    img: "/blog/blog2.png",
    content: {
      intro: "Antioxidants are your body's internal defense system against free radicals and oxidative stress. By incorporating antioxidant-rich herbal teas into your daily regimen, you provide your cells with the essential protection they need to age gracefully, fight off disease, and maintain vibrant energy levels.",
      benefitsTitle: "The Power Of Antioxidants",
      benefits: [
        "Neutralize harmful free radicals in the body",
        "Reduce cellular inflammation and oxidative stress",
        "Promote radiant, youthful-looking skin",
        "Boost overall immune system functionality"
      ],
      researchTitle: "Top Antioxidant Herbs",
      research: [
        { name: "Green Tea", text: "Contains EGCG, a potent catechin known to enhance metabolic and cellular health." },
        { name: "Rooibos", text: "Rich in aspalathin, an antioxidant unique to this South African herb." },
        { name: "Turmeric", text: "Curcumin provides powerful anti-inflammatory and antioxidant benefits." },
        { name: "Peppermint", text: "Loaded with rosmarinic acid, helping protect cells and ease digestion." }
      ],
      howToUseTitle: "Maximizing Antioxidant Intake",
      howToUse: [
        "Steep your tea for at least 5 minutes to release maximum compounds.",
        "Add a squeeze of lemon to help your body absorb the antioxidants better.",
        "Drink 2-3 cups of varying herbal blends throughout your day.",
        "Avoid adding dairy, as proteins can bind to antioxidants and reduce absorption."
      ],
      tipsTitle: "Antioxidant Lifestyle Tips",
      tips: [
        { title: "Eat The Rainbow", desc: "Combine your herbal tea with a diet rich in colorful fruits and vegetables." },
        { title: "Limit Toxins", desc: "Reduce exposure to processed foods and environmental pollutants." },
        { title: "Stay Active", desc: "Moderate exercise naturally boosts your body's own antioxidant enzymes." },
        { title: "Consistent Rituals", desc: "Make drinking antioxidant tea a daily, non-negotiable habit for long-term health." }
      ],
      conclusion: "Antioxidants are not just a buzzword; they are essential for cellular longevity. By consciously choosing herbal teas rich in these protective compounds, you are actively investing in your long-term vitality and everyday wellness."
    }
  },
  {
    id: 3,
    tag: "LIFESTYLE",
    title: "Creating A Tea Ritual For Better Sleep",
    desc: "Simple bedtime tea rituals to calm your mind and improve sleep quality.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 12, 2025",
    readTime: "6 min read",
    img: "/blog/blog_3.png",
    content: {
      intro: "In a world that rarely powers down, a bedtime tea ritual serves as a gentle signal to your nervous system that it is time to rest. The simple act of boiling water, steeping soothing herbs, and inhaling the fragrant steam can profoundly lower cortisol levels and prepare your body for deep, restorative sleep.",
      benefitsTitle: "Benefits Of Bedtime Tea",
      benefits: [
        "Naturally lowers heart rate and blood pressure before bed",
        "Reduces anxiety and racing thoughts",
        "Improves the depth and quality of REM sleep",
        "Soothes the digestive tract after evening meals"
      ],
      researchTitle: "Herbs For Deep Rest",
      research: [
        { name: "Chamomile", text: "Contains apigenin, an antioxidant that binds to receptors in your brain promoting sleepiness." },
        { name: "Valerian Root", text: "Often referred to as 'nature's Valium' for its powerful sedative qualities." },
        { name: "Lavender", text: "Aromatherapy and consumption both significantly decrease anxiety and improve sleep." },
        { name: "Lemon Balm", text: "Reduces stress and promotes a sense of calm, especially when combined with chamomile." }
      ],
      howToUseTitle: "Crafting Your Sleep Ritual",
      howToUse: [
        "Begin your tea ritual 60 to 90 minutes before your intended bedtime.",
        "Dim the lights in your home while your tea is steeping.",
        "Sip your tea slowly, away from screens or digital distractions.",
        "Pair your tea with a light stretching routine or reading a physical book."
      ],
      tipsTitle: "Sleep Hygiene Tips",
      tips: [
        { title: "Digital Detox", desc: "Put away phones and tablets at least an hour before sleep." },
        { title: "Cool Environment", desc: "Keep your bedroom temperature cool, around 65°F (18°C), for optimal rest." },
        { title: "Consistent Timing", desc: "Try to drink your tea and go to bed at the exact same time every night." },
        { title: "Mindful Breathing", desc: "Practice 4-7-8 breathing while holding your warm mug to relax instantly." }
      ],
      conclusion: "Quality sleep is the foundation of true wellness. By integrating a dedicated, screen-free herbal tea ritual into your evenings, you reclaim your nights and ensure you wake up rejuvenated, clear-headed, and ready for the day."
    }
  },
  {
    id: 4,
    tag: "INGREDIENTS",
    title: "Moringa Benefits Explained",
    desc: "The supergreen with incredible nutritional and healing properties.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 10, 2025",
    readTime: "6 min read",
    img: "/blog/blog_4.png",
    content: {
      intro: "Often referred to as the 'Miracle Tree,' Moringa oleifera is an unparalleled nutritional powerhouse. Native to parts of Africa and Asia, nearly every part of the tree is edible. Moringa leaf tea delivers a massive dose of vitamins, minerals, and amino acids, providing sustained, jitter-free energy and profound cellular nourishment.",
      benefitsTitle: "The Superpower Of Moringa",
      benefits: [
        "Provides 7x more Vitamin C than oranges",
        "Contains all 9 essential amino acids (rare for a plant)",
        "Dramatically reduces systemic inflammation",
        "Balances blood sugar and supports sustained energy"
      ],
      researchTitle: "Moringa In Science",
      research: [
        { name: "Nutrient Density", text: "Moringa leaves contain 15 times more potassium than bananas and 17 times more calcium than milk." },
        { name: "Anti-Inflammatory", text: "Isothiocyanates found in moringa are proven to effectively reduce inflammation." },
        { name: "Blood Sugar", text: "Studies indicate daily consumption of moringa powder can significantly lower fasting blood sugar levels." },
        { name: "Brain Health", text: "High levels of vitamins E and C combat oxidative degradation in the brain." }
      ],
      howToUseTitle: "How To Enjoy Moringa",
      howToUse: [
        "Steep moringa leaves in hot (not boiling) water to preserve its delicate vitamins.",
        "Mix moringa powder into your morning smoothies for a superfood kick.",
        "Drink it mid-morning as a caffeine-free alternative to coffee.",
        "Add a touch of honey or lemon to balance its earthy, matcha-like flavor."
      ],
      tipsTitle: "Energy & Vitality Tips",
      tips: [
        { title: "Morning Fuel", desc: "Replace your second cup of coffee with Moringa tea for crash-free energy." },
        { title: "Post-Workout", desc: "The high protein and amino acid content makes it excellent for muscle recovery." },
        { title: "Daily Greens", desc: "Use it as a 'green insurance policy' on days when you don't eat enough vegetables." },
        { title: "Synergistic Pairing", desc: "Pair Moringa with black pepper or turmeric to increase nutrient absorption." }
      ],
      conclusion: "Moringa is a true gift of nature, offering a dense, accessible source of complete nutrition. Integrating Moringa tea into your lifestyle is one of the easiest and most effective ways to elevate your daily energy, immunity, and overall health."
    }
  },
  {
    id: 5,
    tag: "WELLNESS",
    title: "Stress Relief Through Herbal Blends",
    desc: "Herbal ingredients that help your body relax and manage daily stress.",
    author: "Ananya Sharma",
    authorImg: "https://i.pravatar.cc/150?img=32",
    date: "May 8, 2025",
    readTime: "6 min read",
    img: "/blog/blog_5.png",
    content: {
      intro: "Chronic stress is an epidemic in modern society, manifesting as tension, fatigue, and burnout. Adaptogenic herbs and calming botanicals have been used for millennia to restore equilibrium. These powerful plants don't just mask stress—they fundamentally alter how your endocrine system responds to tension, promoting genuine, lasting calm.",
      benefitsTitle: "Benefits Of Anti-Stress Herbs",
      benefits: [
        "Regulate cortisol (the primary stress hormone)",
        "Soothe the central nervous system instantly",
        "Improve focus and mental clarity under pressure",
        "Relieve physical tension in muscles and the gut"
      ],
      researchTitle: "Nature's Stress Relievers",
      research: [
        { name: "Ashwagandha", text: "A premier adaptogen proven to lower cortisol levels and reduce symptoms of anxiety." },
        { name: "Holy Basil (Tulsi)", text: "Helps the body cope with environmental and emotional stress while lifting mood." },
        { name: "Passionflower", text: "Increases GABA in the brain, effectively lowering brain activity and inducing relaxation." },
        { name: "Peppermint", text: "Acts as a muscle relaxant and pain reliever, perfect for tension headaches." }
      ],
      howToUseTitle: "Creating A Calm Routine",
      howToUse: [
        "Keep stress-relief tea bags at your desk for tense work moments.",
        "Inhale the steam deeply before drinking—aromatherapy is half the cure.",
        "Take a 10-minute 'tea break' away from your computer screen.",
        "Drink adaptogenic teas daily, as their benefits compound over time."
      ],
      tipsTitle: "Stress Management Tips",
      tips: [
        { title: "Breathe Deeply", desc: "Take five deep diaphragmatic breaths before your first sip of tea." },
        { title: "Physical Release", desc: "Do a quick body scan to release clenched jaws or raised shoulders." },
        { title: "Set Boundaries", desc: "Learn to say no. Protecting your time is vital for stress reduction." },
        { title: "Nature Immersion", desc: "Drink your calming tea outside. Nature lowers stress hormones instantly." }
      ],
      conclusion: "You don't have to navigate modern stress alone. By partnering with adaptogenic and calming herbal blends, you equip your body with the natural tools it needs to remain centered, grounded, and resilient, no matter what the day brings."
    }
  },
  {
    id: 6,
    tag: "RECIPES",
    title: "Golden Herbal Latte Recipe",
    desc: "A soothing turmeric latte recipe to nourish your body and mind.",
    author: "Kavya Menon",
    authorImg: "https://i.pravatar.cc/150?img=5",
    date: "May 6, 2025",
    readTime: "4 min read",
    img: "/blog/blog_6.png",
    content: {
      intro: "The Golden Latte, rooted in Ayurvedic tradition, is a warming, anti-inflammatory elixir perfect for any time of day. Featuring turmeric as its star ingredient, this vibrant golden drink is deeply comforting, incredibly delicious, and medicinal. Here is our favorite way to craft this healing beverage at home.",
      benefitsTitle: "The Magic Of Golden Milk",
      benefits: [
        "Potent anti-inflammatory properties from curcumin",
        "Boosts immunity and helps fend off colds",
        "Warms the digestive tract and improves gut health",
        "Provides a comforting, caffeine-free energy lift"
      ],
      researchTitle: "The Key Ingredients",
      research: [
        { name: "Turmeric", text: "The active compound, curcumin, is one of the strongest natural anti-inflammatories known." },
        { name: "Black Pepper", text: "Contains piperine, which increases the absorption of curcumin by up to 2,000%." },
        { name: "Ginger", text: "Aids digestion, reduces nausea, and adds a warming, spicy kick." },
        { name: "Coconut Oil/Fat", text: "Turmeric is fat-soluble, meaning you need a healthy fat for your body to absorb it." }
      ],
      howToUseTitle: "The Perfect Recipe",
      howToUse: [
        "Whisk 1 tsp turmeric, 1/4 tsp ginger, and a pinch of black pepper in a saucepan.",
        "Add 1 cup of almond or oat milk and 1/2 tsp of coconut oil.",
        "Heat gently on a low simmer for 5 minutes—do not let it boil.",
        "Pour into a mug, stir in 1 tsp of raw honey, and sprinkle with cinnamon."
      ],
      tipsTitle: "Latte Crafting Tips",
      tips: [
        { title: "Prep A Paste", desc: "Make a bulk turmeric paste to keep in the fridge for instant daily lattes." },
        { title: "Spice It Up", desc: "Add cardamom or nutmeg for extra depth and a richer flavor profile." },
        { title: "Sweeten Smartly", desc: "Wait until the latte cools slightly before adding raw honey to preserve its enzymes." },
        { title: "Evening Ritual", desc: "Drink this an hour before bed—the warmth and spices promote incredibly deep sleep." }
      ],
      conclusion: "Crafting a Golden Herbal Latte is an act of self-care. It forces you to slow down, engage your senses, and nourish your body with ancient medicine. Enjoy this vibrant elixir whenever you need a moment of warmth and healing."
    }
  }
];

import { JournalPost } from './types';

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "1",
    slug: "benefits-hibiscus-tea",
    title: "Benefits of Hibiscus Tea",
    excerpt: "Discover how this vibrant crimson infusion supports heart health, digestion, and overall vitality.",
    content: "Hibiscus tea is a delicious tart beverage that has been enjoyed across various cultures for centuries. Scientifically known as Hibiscus sabdariffa, the deep red calyces of the flower are loaded with antioxidants, particularly anthocyanins. Research suggests that daily consumption of hibiscus tea may support healthy blood pressure levels, improve digestive health, and boost metabolic functions.\n\nTo prepare the perfect cup, steep dried hibiscus flowers in boiling water for 5 to 7 minutes. You can enjoy it hot or chilled as an iced tea with a splash of honey or a squeeze of fresh lime.",
    image: "/blog/blog1.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-18",
    category: "Wellness",
    readTime: "7 min read"
  },
  {
    id: "2",
    slug: "natural-ways-reduce-stress",
    title: "Natural Ways to Reduce Stress",
    excerpt: "Incorporate calming herbs, breathing exercises, and mindful moments into your hectic schedule.",
    content: "In our fast-paced modern lives, chronic stress can take a major toll on both physical and mental health. Fortunately, nature provides powerful solutions in the form of adaptogenic herbs and mindfulness rituals. Herbs like Ashwagandha, Chamomile, and Holy Basil (Tulsi) work with your body's endocrine system to balance cortisol levels and promote calm.\n\nIn addition to herbal remedies, committing just 5 minutes a day to conscious diaphragmatic breathing or a quiet walk in nature can reset your nervous system and bring immediate relief.",
    image: "/blog/blog_5.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-14",
    category: "Wellness",
    readTime: "6 min read"
  },
  {
    id: "3",
    slug: "morning-detox-tea-ritual",
    title: "Morning Detox Tea Ritual",
    excerpt: "Kickstart your metabolism and cleanse your system with this refreshing, antioxidant-rich morning brew.",
    content: "How you begin your day sets the tone for your entire wellness journey. A warm morning detox brew stimulates liver function, jumpstarts metabolism, and aids hydration after hours of sleep. Blending fresh ginger, lemon juice, dandelion root, and a pinch of cayenne pepper in warm water creates a cleansing tonic rich in vitamin C and digestive enzymes.\n\nMake this a mindful ritual: sit quietly, feel the warmth of the mug, and inhale the steam before taking your first sip.",
    image: "/blog/blog_6.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-12",
    category: "Recipes",
    readTime: "4 min read"
  },
  {
    id: "4",
    slug: "why-herbal-tea-matters",
    title: "Why Herbal Tea Matters",
    excerpt: "Unpacking the historical, scientific, and therapeutic significance of dried herbs in modern wellness.",
    content: "For thousands of years, herbal infusions have been used as primary medicinal remedies. Today, scientific studies continue to validate what ancient wisdom always knew: plants are powerful medicine. Unlike caffeinated teas, herbal teas (tisanes) are derived from dried fruits, flowers, barks, or roots, delivering concentrated vitamins and phytocompounds.\n\nWhether you are seeking sleep support, digestive aid, or immune reinforcement, there is an herbal blend crafted specifically for your body's unique requirements.",
    image: "/blog/blog2.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-10",
    category: "Research",
    readTime: "5 min read"
  },
  {
    id: "5",
    slug: "moringa-benefits-explained",
    title: "Moringa Benefits Explained",
    excerpt: "Learn why this nutritional powerhouse is referred to as the 'miracle tree' by health experts worldwide.",
    content: "Moringa oleifera, often called the drumstick tree, is one of the most nutrient-dense plants on earth. Native to parts of India and Africa, its leaves contain high levels of vitamin A, C, and E, as well as calcium, potassium, and iron. Incorporating moringa into your diet helps fight inflammation, supports brain health, and protects the liver.\n\nMoringa tea has a pleasant, earthy green taste similar to matcha, making it a perfect morning or afternoon pick-me-up.",
    image: "/blog/blog_4.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-08",
    category: "Ingredients",
    readTime: "6 min read"
  },
  {
    id: "6",
    slug: "building-healthy-wellness-habits",
    title: "Building Healthy Wellness Habits",
    excerpt: "A step-by-step guide to cultivating sustainable daily routines that elevate your mental and physical wellbeing.",
    content: "Wellness is not a temporary destination; it is a collection of daily habits. Creating a sustainable healthy lifestyle requires starting small. Instead of overhaul your entire routine overnight, focus on adding one positive habit—like drinking an extra glass of water or reading for 10 minutes—until it becomes second nature.\n\nTrack your progress, celebrate small wins, and remember that consistency is always more important than perfection.",
    image: "/blog/blog_3.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-06",
    category: "Lifestyle",
    readTime: "8 min read"
  }
];

export async function getJournalPosts(): Promise<JournalPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return JOURNAL_POSTS;
}

export async function getJournalPostById(id: string): Promise<JournalPost | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return JOURNAL_POSTS.find(post => post.id === id);
}

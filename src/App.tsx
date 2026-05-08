import { useState } from 'react'
import './App.css'
import GlassIcons from './GlassIcons.jsx'

type UseCase = 'study' | 'coding' | 'design' | 'editing' | 'gaming'
type BudgetTier = 'budget' | 'value' | 'performance' | 'premium'

type Laptop = {
  name: string
  priceRange: string
  cpu: string
  ram: string
  storage: string
  gpu: string
  reason: string
}

type RecommendationResult = {
  mainPick: string
  recommendedSpecs: string
  expectedBudget: string
  simpleExplanation: string
  beginnerTip: string
  laptops: Laptop[]
}

const useCases = [
  {
    id: 'study',
    icon: '🎓',
    color: 'blue',
    label: 'Study',
    title: 'Study',
    subtitle: 'Class, assignments, online learning',
    description:
      'For students who mainly use Google Docs, PowerPoint, online classes, browsing, and YouTube.',
  },
  {
    id: 'coding',
    icon: '💻',
    color: 'purple',
    label: 'Coding',
    title: 'Coding',
    subtitle: 'VS Code, web, Python, database',
    description:
      'For programming, web development, database projects, Python, Java, and multitasking.',
  },
  {
    id: 'design',
    icon: '🎨',
    color: 'indigo',
    label: 'Design',
    title: 'Design',
    subtitle: 'Figma, Canva, Photoshop',
    description:
      'For UI/UX design, graphic design, Figma, Canva, Photoshop, Illustrator, and creative work.',
  },
  {
    id: 'editing',
    icon: '🎬',
    color: 'orange',
    label: 'Editing',
    title: 'Editing',
    subtitle: 'CapCut, Premiere, DaVinci',
    description:
      'For video editing, content creation, CapCut, Premiere Pro, DaVinci Resolve, and export work.',
  },
  {
    id: 'gaming',
    icon: '🎮',
    color: 'green',
    label: 'Gaming',
    title: 'Gaming',
    subtitle: 'Casual games and 3A titles',
    description:
      'For Valorant, Minecraft, Roblox, Genshin, GTA, Cyberpunk, Elden Ring, and other games.',
  },
] as const

const budgets = [
  {
    id: 'budget',
    label: 'Budget Saver',
    range: 'RM 1500 - RM 2500',
    description: 'Lowest cost, enough for basic needs.',
  },
  {
    id: 'value',
    label: 'Best Value',
    range: 'RM 2500 - RM 3500',
    description: 'Balanced price and performance.',
  },
  {
    id: 'performance',
    label: 'Performance',
    range: 'RM 3500 - RM 5000',
    description: 'Better speed, display, GPU, or cooling.',
  },
  {
    id: 'premium',
    label: 'Premium',
    range: 'RM 5000+',
    description: 'High-end experience for long-term use.',
  },
] as const

const mockRecommendations: Record<UseCase, Record<BudgetTier, RecommendationResult>> = {
  study: {
    budget: {
      mainPick: 'Basic Student Laptop',
      recommendedSpecs: 'Intel i3 / Ryzen 3, 8GB RAM, 256GB or 512GB SSD, integrated graphics',
      expectedBudget: 'RM 1500 - RM 2500',
      simpleExplanation:
        'For study and assignments, you do not need a gaming laptop. A basic laptop with SSD storage is enough for online classes, documents, and browsing.',
      beginnerTip:
        'Avoid laptops with only 4GB RAM or HDD storage. They may feel slow even for simple school work.',
      laptops: [
        {
          name: 'Acer Aspire 3',
          priceRange: 'RM 1700 - RM 2400',
          cpu: 'Intel i3 / Ryzen 3',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Affordable and suitable for basic student tasks.',
        },
        {
          name: 'ASUS Vivobook Go',
          priceRange: 'RM 1600 - RM 2300',
          cpu: 'Ryzen 3 / Intel i3',
          ram: '8GB',
          storage: '256GB / 512GB SSD',
          gpu: 'Integrated',
          reason: 'Good entry-level option for online learning and documents.',
        },
        {
          name: 'Lenovo IdeaPad 1',
          priceRange: 'RM 1500 - RM 2200',
          cpu: 'Ryzen 3 / Intel i3',
          ram: '8GB',
          storage: '256GB / 512GB SSD',
          gpu: 'Integrated',
          reason: 'Simple, low-cost laptop for light daily use.',
        },
      ],
    },
    value: {
      mainPick: 'Best Value Student Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD, integrated graphics',
      expectedBudget: 'RM 2500 - RM 3500',
      simpleExplanation:
        'This is the sweet spot for students. 16GB RAM and SSD storage will make the laptop feel smoother and last longer.',
      beginnerTip:
        'Do not overpay for a gaming GPU if your main use is class, assignments, and browsing.',
      laptops: [
        {
          name: 'Acer Aspire 5',
          priceRange: 'RM 2500 - RM 3300',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Best value for students who want smooth multitasking.',
        },
        {
          name: 'Lenovo IdeaPad Slim 5',
          priceRange: 'RM 2800 - RM 3500',
          cpu: 'Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Balanced choice with portability and good daily performance.',
        },
        {
          name: 'ASUS Vivobook 15',
          priceRange: 'RM 2500 - RM 3400',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good all-rounder for study, assignments, and entertainment.',
        },
      ],
    },
    performance: {
      mainPick: 'Premium Student Productivity Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 7, 16GB RAM, 512GB or 1TB SSD, better display',
      expectedBudget: 'RM 3500 - RM 5000',
      simpleExplanation:
        'This tier is for students who want a better screen, better battery, lighter body, and stronger multitasking.',
      beginnerTip:
        'If you only need basic study use, this tier is nice to have but not necessary.',
      laptops: [
        {
          name: 'ASUS Vivobook 16',
          priceRange: 'RM 3500 - RM 4300',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Large screen and strong productivity performance.',
        },
        {
          name: 'HP Pavilion Plus',
          priceRange: 'RM 3800 - RM 4800',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good for students who want a more premium experience.',
        },
        {
          name: 'Lenovo Yoga Slim',
          priceRange: 'RM 4000 - RM 5000',
          cpu: 'Ryzen 7 / Intel Ultra',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Portable and suitable for long-term university use.',
        },
      ],
    },
    premium: {
      mainPick: 'Premium Lightweight Laptop',
      recommendedSpecs: 'Intel Ultra / Ryzen 7, 16GB or 32GB RAM, 1TB SSD, premium display',
      expectedBudget: 'RM 5000+',
      simpleExplanation:
        'This is for users who want the best portability, battery life, display quality, and long-term comfort.',
      beginnerTip:
        'For normal study, premium laptops are not required. Buy this only if you value build quality and long-term use.',
      laptops: [
        {
          name: 'MacBook Air',
          priceRange: 'RM 5000+',
          cpu: 'Apple Silicon',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Excellent battery life and premium build quality.',
        },
        {
          name: 'ASUS Zenbook',
          priceRange: 'RM 5000+',
          cpu: 'Intel Ultra / Ryzen 7',
          ram: '16GB',
          storage: '1TB SSD',
          gpu: 'Integrated',
          reason: 'Premium Windows laptop with strong portability.',
        },
        {
          name: 'Lenovo Yoga Pro',
          priceRange: 'RM 5000+',
          cpu: 'Intel Ultra / Ryzen 7',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'Integrated / RTX option',
          reason: 'Good for users who want study, design, and premium build in one device.',
        },
      ],
    },
  },

  coding: {
    budget: {
      mainPick: 'Entry Coding Laptop',
      recommendedSpecs: 'Intel i3 / Ryzen 3, 8GB RAM minimum, 512GB SSD preferred',
      expectedBudget: 'RM 1500 - RM 2500',
      simpleExplanation:
        'This can handle basic programming, school projects, and web development, but 8GB RAM may feel limited when many apps are open.',
      beginnerTip:
        'Avoid 4GB RAM laptops. Coding with VS Code, browser tabs, and terminal will feel slow.',
      laptops: [
        {
          name: 'Acer Aspire 3',
          priceRange: 'RM 1700 - RM 2400',
          cpu: 'Intel i3 / Ryzen 3',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good low-cost laptop for beginner coding.',
        },
        {
          name: 'Lenovo IdeaPad 1',
          priceRange: 'RM 1500 - RM 2200',
          cpu: 'Ryzen 3 / Intel i3',
          ram: '8GB',
          storage: '256GB / 512GB SSD',
          gpu: 'Integrated',
          reason: 'Suitable for simple programming and school work.',
        },
        {
          name: 'ASUS Vivobook Go',
          priceRange: 'RM 1600 - RM 2300',
          cpu: 'Ryzen 3 / Intel i3',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Affordable option for HTML, CSS, JavaScript, and Python basics.',
        },
      ],
    },
    value: {
      mainPick: 'Best Value Developer Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 16GB RAM, 512GB SSD',
      expectedBudget: 'RM 2500 - RM 3500',
      simpleExplanation:
        'This is the recommended tier for coding. 16GB RAM makes VS Code, browser tabs, database tools, and terminal much smoother.',
      beginnerTip:
        'A dedicated GPU is not required for normal coding. RAM and SSD matter more.',
      laptops: [
        {
          name: 'Lenovo IdeaPad Slim 5',
          priceRange: 'RM 2800 - RM 3500',
          cpu: 'Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Great balance for web development and multitasking.',
        },
        {
          name: 'Acer Aspire 5',
          priceRange: 'RM 2500 - RM 3300',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good value for students learning programming.',
        },
        {
          name: 'ASUS Vivobook 16',
          priceRange: 'RM 3000 - RM 3500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Larger screen is helpful for coding and documentation.',
        },
      ],
    },
    performance: {
      mainPick: 'Performance Developer Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 7, 16GB or 32GB RAM, 1TB SSD',
      expectedBudget: 'RM 3500 - RM 5000',
      simpleExplanation:
        'This tier is useful for larger projects, Docker, Android Studio, databases, and heavy multitasking.',
      beginnerTip:
        'Do not only look at CPU. If RAM is too low, the laptop can still feel slow.',
      laptops: [
        {
          name: 'ASUS Vivobook 16',
          priceRange: 'RM 3500 - RM 4300',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB / 1TB SSD',
          gpu: 'Integrated',
          reason: 'Strong productivity laptop with a large display.',
        },
        {
          name: 'HP Pavilion Plus',
          priceRange: 'RM 3800 - RM 4800',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good option for coding, study, and multitasking.',
        },
        {
          name: 'Lenovo Yoga Slim 7',
          priceRange: 'RM 4000 - RM 5000',
          cpu: 'Ryzen 7 / Intel Ultra',
          ram: '16GB',
          storage: '1TB SSD',
          gpu: 'Integrated',
          reason: 'Portable and powerful for developer workflow.',
        },
      ],
    },
    premium: {
      mainPick: 'Premium Developer Laptop',
      recommendedSpecs: 'Intel Ultra / Ryzen 7, 32GB RAM preferred, 1TB SSD',
      expectedBudget: 'RM 5000+',
      simpleExplanation:
        'This is for heavy development, Docker, multiple projects, and long-term professional use.',
      beginnerTip:
        'If you are only doing basic school coding, this tier is not necessary.',
      laptops: [
        {
          name: 'MacBook Pro',
          priceRange: 'RM 7000+',
          cpu: 'Apple Silicon',
          ram: '16GB / 32GB',
          storage: '512GB / 1TB SSD',
          gpu: 'Integrated',
          reason: 'Excellent for software development and long battery life.',
        },
        {
          name: 'Lenovo ThinkPad',
          priceRange: 'RM 5000+',
          cpu: 'Intel Ultra / Ryzen 7',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'Integrated',
          reason: 'Reliable keyboard and business-class build.',
        },
        {
          name: 'ASUS Zenbook Pro',
          priceRange: 'RM 6000+',
          cpu: 'Intel Ultra / Ryzen 9',
          ram: '32GB',
          storage: '1TB SSD',
          gpu: 'RTX option',
          reason: 'Good for coding plus creative workloads.',
        },
      ],
    },
  },

  design: {
    budget: {
      mainPick: 'Basic Design Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 8GB or 16GB RAM, 512GB SSD',
      expectedBudget: 'RM 1500 - RM 2500',
      simpleExplanation:
        'This tier can handle Canva, Figma, and simple Photoshop work, but it may struggle with heavier design files.',
      beginnerTip:
        'For design, do not ignore screen quality. A very poor display can affect color judgment.',
      laptops: [
        {
          name: 'ASUS Vivobook Go',
          priceRange: 'RM 1600 - RM 2300',
          cpu: 'Ryzen 3 / Intel i3',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Affordable option for Canva and basic Figma work.',
        },
        {
          name: 'Acer Aspire 3',
          priceRange: 'RM 1700 - RM 2400',
          cpu: 'Intel i3 / Ryzen 3',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good for simple design tasks and student work.',
        },
        {
          name: 'Lenovo IdeaPad 3',
          priceRange: 'RM 1800 - RM 2500',
          cpu: 'Ryzen 3 / Ryzen 5',
          ram: '8GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Budget-friendly laptop for light creative work.',
        },
      ],
    },
    value: {
      mainPick: 'Best Value Design Laptop',
      recommendedSpecs: 'Good display, 16GB RAM, 512GB SSD, Intel i5 or Ryzen 5',
      expectedBudget: 'RM 2500 - RM 3500',
      simpleExplanation:
        'For design work, screen quality and RAM matter more than just the CPU name. Figma and Canva do not need a powerful GPU, but Photoshop benefits from 16GB RAM.',
      beginnerTip:
        'Do not only look at Intel i7 or Ryzen 7. Check the display, RAM, and storage too.',
      laptops: [
        {
          name: 'ASUS Vivobook 16',
          priceRange: 'RM 3000 - RM 3500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Large display and good value for design students.',
        },
        {
          name: 'Lenovo IdeaPad Slim 5',
          priceRange: 'RM 2800 - RM 3500',
          cpu: 'Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Portable and balanced for Figma and Photoshop basics.',
        },
        {
          name: 'HP Pavilion Plus',
          priceRange: 'RM 3300 - RM 3500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good productivity laptop with a better overall experience.',
        },
      ],
    },
    performance: {
      mainPick: 'Creator Design Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 7, 16GB RAM, better display, optional RTX GPU',
      expectedBudget: 'RM 3500 - RM 5000',
      simpleExplanation:
        'This tier is better for Photoshop, Illustrator, larger design files, and smoother multitasking.',
      beginnerTip:
        'Avoid 8GB RAM if you work with heavy Photoshop or multiple design apps at the same time.',
      laptops: [
        {
          name: 'ASUS Vivobook Pro',
          priceRange: 'RM 4000 - RM 5000',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB / 1TB SSD',
          gpu: 'RTX option',
          reason: 'Good creator laptop for design and content work.',
        },
        {
          name: 'Lenovo Yoga Pro',
          priceRange: 'RM 4300 - RM 5000',
          cpu: 'Intel Ultra / Ryzen 7',
          ram: '16GB',
          storage: '1TB SSD',
          gpu: 'Integrated / RTX option',
          reason: 'Premium screen and strong productivity performance.',
        },
        {
          name: 'Acer Swift X',
          priceRange: 'RM 4000 - RM 5000',
          cpu: 'Ryzen 7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX option',
          reason: 'Good for design users who also need GPU support.',
        },
      ],
    },
    premium: {
      mainPick: 'Premium Creator Laptop',
      recommendedSpecs: 'High color accuracy display, 32GB RAM, 1TB SSD, RTX optional',
      expectedBudget: 'RM 5000+',
      simpleExplanation:
        'This is for serious design work, better screen quality, long-term use, and professional creative workflows.',
      beginnerTip:
        'If you only use Canva or Figma lightly, a premium laptop may be more than you need.',
      laptops: [
        {
          name: 'MacBook Pro',
          priceRange: 'RM 7000+',
          cpu: 'Apple Silicon',
          ram: '16GB / 32GB',
          storage: '512GB / 1TB SSD',
          gpu: 'Integrated',
          reason: 'Strong creative laptop with excellent display quality.',
        },
        {
          name: 'ASUS ProArt',
          priceRange: 'RM 6000+',
          cpu: 'Intel i7 / Ryzen 9',
          ram: '32GB',
          storage: '1TB SSD',
          gpu: 'RTX option',
          reason: 'Designed for creators who care about display and performance.',
        },
        {
          name: 'Dell XPS',
          priceRange: 'RM 6000+',
          cpu: 'Intel Ultra / Intel i7',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'Integrated / RTX option',
          reason: 'Premium build and display for professional creative users.',
        },
      ],
    },
  },

  editing: {
    budget: {
      mainPick: 'Basic Editing Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 16GB RAM preferred, 512GB SSD',
      expectedBudget: 'RM 1500 - RM 2500',
      simpleExplanation:
        'This tier is only suitable for simple CapCut or basic 1080p editing. It is not ideal for heavy Premiere Pro or 4K editing.',
      beginnerTip:
        'Avoid 8GB RAM if you plan to edit long videos. Video editing needs more memory.',
      laptops: [
        {
          name: 'Acer Aspire 5',
          priceRange: 'RM 2300 - RM 2500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '8GB / 16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Can handle light editing if configured with enough RAM.',
        },
        {
          name: 'ASUS Vivobook 15',
          priceRange: 'RM 2200 - RM 2500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '8GB / 16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Decent for simple editing and content tasks.',
        },
        {
          name: 'Lenovo IdeaPad 3',
          priceRange: 'RM 2000 - RM 2500',
          cpu: 'Ryzen 5',
          ram: '8GB / 16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Budget choice for light video editing.',
        },
      ],
    },
    value: {
      mainPick: 'Budget Creator Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 16GB RAM, RTX 3050 or RTX 4050 preferred',
      expectedBudget: 'RM 2500 - RM 3500',
      simpleExplanation:
        'This tier is good for basic video editing. A dedicated GPU helps, but in this budget you may need to find promotions.',
      beginnerTip:
        'Do not only look at storage. Editing also needs RAM, CPU, GPU, and cooling.',
      laptops: [
        {
          name: 'Acer Nitro V 15',
          priceRange: 'RM 3200 - RM 3500',
          cpu: 'Intel i5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050',
          reason: 'Good budget choice for editing and gaming.',
        },
        {
          name: 'ASUS Vivobook 16',
          priceRange: 'RM 3000 - RM 3500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'Integrated',
          reason: 'Good for lighter editing and productivity work.',
        },
        {
          name: 'Lenovo LOQ Entry Model',
          priceRange: 'RM 3300 - RM 3500',
          cpu: 'Ryzen 5 / Intel i5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 3050 / RTX 4050',
          reason: 'Good entry gaming laptop that can also support editing.',
        },
      ],
    },
    performance: {
      mainPick: 'Recommended Editing Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 7, 16GB RAM minimum, RTX 4050 or RTX 4060',
      expectedBudget: 'RM 3500 - RM 5000',
      simpleExplanation:
        'This is the recommended tier for video editing. RTX 4050 or RTX 4060 helps with smoother editing and faster export.',
      beginnerTip:
        'Avoid very thin laptops with weak cooling if you edit videos for long hours.',
      laptops: [
        {
          name: 'Lenovo LOQ 15',
          priceRange: 'RM 3800 - RM 5000',
          cpu: 'Ryzen 7 / Intel i7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050 / RTX 4060',
          reason: 'Strong performance value for editing and gaming.',
        },
        {
          name: 'ASUS TUF Gaming A15',
          priceRange: 'RM 4000 - RM 5000',
          cpu: 'Ryzen 7',
          ram: '16GB',
          storage: '512GB / 1TB SSD',
          gpu: 'RTX 4060',
          reason: 'Good cooling and GPU performance for video editing.',
        },
        {
          name: 'Acer Nitro V 15',
          priceRange: 'RM 3500 - RM 4500',
          cpu: 'Intel i5 / i7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050',
          reason: 'Budget-friendly editing laptop with dedicated GPU.',
        },
      ],
    },
    premium: {
      mainPick: 'Premium Editing Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 9, 32GB RAM, RTX 4060 or above, 1TB SSD',
      expectedBudget: 'RM 5000+',
      simpleExplanation:
        'This tier is for 4K editing, Premiere Pro, DaVinci Resolve, and serious content creation.',
      beginnerTip:
        'Do not ignore storage. Video files can fill up your drive very quickly.',
      laptops: [
        {
          name: 'Lenovo Legion',
          priceRange: 'RM 5500+',
          cpu: 'Ryzen 7 / Intel i7',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'RTX 4060 / RTX 4070',
          reason: 'Strong cooling and performance for heavy editing.',
        },
        {
          name: 'ASUS ROG Zephyrus',
          priceRange: 'RM 6000+',
          cpu: 'Ryzen 9 / Intel Ultra',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'RTX 4060 / RTX 4070',
          reason: 'Premium editing and gaming laptop with powerful hardware.',
        },
        {
          name: 'MacBook Pro',
          priceRange: 'RM 7000+',
          cpu: 'Apple Silicon',
          ram: '16GB / 32GB',
          storage: '512GB / 1TB SSD',
          gpu: 'Integrated',
          reason: 'Excellent for content creators who prefer macOS.',
        },
      ],
    },
  },

  gaming: {
    budget: {
      mainPick: 'Entry Gaming Laptop',
      recommendedSpecs: '16GB RAM, RTX 3050 or RTX 4050 if possible',
      expectedBudget: 'RM 1500 - RM 2500',
      simpleExplanation:
        'This budget is only suitable for casual games or older gaming laptops. 3A games will be limited.',
      beginnerTip:
        'Avoid integrated graphics laptops if your goal is to play 3A games.',
      laptops: [
        {
          name: 'Used Gaming Laptop',
          priceRange: 'RM 2000 - RM 2500',
          cpu: 'Intel i5 / Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'GTX / RTX older GPU',
          reason: 'Used models may offer better gaming performance at low budget.',
        },
        {
          name: 'Acer Nitro Older Model',
          priceRange: 'RM 2200 - RM 2500',
          cpu: 'Intel i5',
          ram: '8GB / 16GB',
          storage: '512GB SSD',
          gpu: 'GTX / RTX older GPU',
          reason: 'Possible option if you find a good deal.',
        },
        {
          name: 'Lenovo IdeaPad Gaming Older Model',
          priceRange: 'RM 2300 - RM 2500',
          cpu: 'Ryzen 5',
          ram: '8GB / 16GB',
          storage: '512GB SSD',
          gpu: 'GTX / RTX older GPU',
          reason: 'Better than normal laptops for casual gaming.',
        },
      ],
    },
    value: {
      mainPick: 'Budget Gaming Laptop',
      recommendedSpecs: 'Intel i5 / Ryzen 5, 16GB RAM, RTX 4050',
      expectedBudget: 'RM 2500 - RM 3500',
      simpleExplanation:
        'This is good for Valorant, Minecraft, Roblox, Genshin, and some 3A games at adjusted settings.',
      beginnerTip:
        'Do not only look at Intel i7. For gaming, GPU matters more.',
      laptops: [
        {
          name: 'Acer Nitro V 15',
          priceRange: 'RM 3200 - RM 3500',
          cpu: 'Intel i5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050',
          reason: 'One of the best budget gaming choices.',
        },
        {
          name: 'Lenovo LOQ 15',
          priceRange: 'RM 3300 - RM 3500',
          cpu: 'Ryzen 5 / Intel i5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050',
          reason: 'Good value for gaming and student use.',
        },
        {
          name: 'ASUS TUF Gaming Entry Model',
          priceRange: 'RM 3300 - RM 3500',
          cpu: 'Ryzen 5',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4050',
          reason: 'Solid entry gaming laptop if priced well.',
        },
      ],
    },
    performance: {
      mainPick: '3A Gaming Laptop',
      recommendedSpecs: 'Intel i7 / Ryzen 7, 16GB RAM, RTX 4060, good cooling',
      expectedBudget: 'RM 3500 - RM 5000',
      simpleExplanation:
        'This tier is recommended for 3A games. RTX 4060 is more stable than RTX 4050 for higher settings.',
      beginnerTip:
        'Do not buy a gaming laptop with weak cooling if you play for long sessions.',
      laptops: [
        {
          name: 'Lenovo LOQ 15 RTX 4060',
          priceRange: 'RM 4200 - RM 5000',
          cpu: 'Ryzen 7 / Intel i7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4060',
          reason: 'Strong value for 3A gaming.',
        },
        {
          name: 'ASUS TUF A15',
          priceRange: 'RM 4200 - RM 5000',
          cpu: 'Ryzen 7',
          ram: '16GB',
          storage: '512GB / 1TB SSD',
          gpu: 'RTX 4060',
          reason: 'Good cooling and gaming performance.',
        },
        {
          name: 'Acer Nitro V RTX 4060',
          priceRange: 'RM 4000 - RM 4800',
          cpu: 'Intel i7 / Ryzen 7',
          ram: '16GB',
          storage: '512GB SSD',
          gpu: 'RTX 4060',
          reason: 'Performance-focused gaming laptop at a fair price.',
        },
      ],
    },
    premium: {
      mainPick: 'High Performance Gaming Laptop',
      recommendedSpecs: 'RTX 4070 or above, 16GB or 32GB RAM, high refresh display',
      expectedBudget: 'RM 5000+',
      simpleExplanation:
        'This tier is for users who want higher FPS, better graphics settings, and long-term gaming performance.',
      beginnerTip:
        'Gaming laptops are usually heavier and have shorter battery life than normal laptops.',
      laptops: [
        {
          name: 'Lenovo Legion',
          priceRange: 'RM 5500+',
          cpu: 'Ryzen 7 / Intel i7',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'RTX 4070 option',
          reason: 'Excellent gaming performance and cooling.',
        },
        {
          name: 'ASUS ROG Strix',
          priceRange: 'RM 6000+',
          cpu: 'Ryzen 9 / Intel i9',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'RTX 4070 or above',
          reason: 'High performance gaming laptop for serious gamers.',
        },
        {
          name: 'Acer Predator Helios',
          priceRange: 'RM 6000+',
          cpu: 'Intel i7 / i9',
          ram: '16GB / 32GB',
          storage: '1TB SSD',
          gpu: 'RTX 4070 option',
          reason: 'Powerful option for high-end gaming.',
        },
      ],
    },
  },
}

function App() {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>('study')
  const [selectedBudget, setSelectedBudget] = useState<BudgetTier>('value')
  const [result, setResult] = useState<RecommendationResult>(
    mockRecommendations.study.value
  )
  const [loading, setLoading] = useState(false)

  const selectedUseCaseData = useCases.find((item) => item.id === selectedUseCase)
  const selectedBudgetData = budgets.find((item) => item.id === selectedBudget)

  const glassItems = useCases.map((item) => ({
    icon: <span>{item.icon}</span>,
    color: item.color,
    label: item.label,
    customClass: selectedUseCase === item.id ? 'is-selected' : '',
    onClick: () => setSelectedUseCase(item.id as UseCase),
  }))

  function generateRecommendation() {
    setLoading(true)

    setTimeout(() => {
      const mockResult = mockRecommendations[selectedUseCase][selectedBudget]
      setResult(mockResult)
      setLoading(false)
    }, 600)

    /*
      Backend version later:

      const response = await fetch('http://localhost:8000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useCase: selectedUseCase,
          budget: selectedBudget,
        }),
      })

      const data = await response.json()
      setResult(data)
    */
  }

  return (
    <main className="app">
      <div className="bg-grid"></div>
      <div className="bg-glow bg-glow-one"></div>
      <div className="bg-glow bg-glow-two"></div>
      <div className="bg-glow bg-glow-three"></div>

      <section className="hero">
        <p className="eyebrow">Smart Laptop Advisor</p>
        <h1>LaptopWise</h1>
        <p className="hero-text">
          Choose your purpose and budget. LaptopWise recommends beginner-friendly
          laptop options with clear explanations.
        </p>
      </section>

      <section className="glass-panel icon-panel">
        <div className="section-header">
          <div>
            <p className="section-kicker">Step 1</p>
            <h2>What will you use your laptop for?</h2>
          </div>
          <p className="section-note">
            Select the category that matches your main usage.
          </p>
        </div>

        <div className="icons-wrap">
          <GlassIcons items={glassItems} />
        </div>
      </section>

      <section className="dashboard">
        <div className="glass-panel advisor-card">
          <p className="card-label">Selected Purpose</p>

          <div className="selected-title">
            <span>{selectedUseCaseData?.icon}</span>
            <div>
              <h2>{selectedUseCaseData?.title}</h2>
              <p>{selectedUseCaseData?.subtitle}</p>
            </div>
          </div>

          <p className="description">{selectedUseCaseData?.description}</p>

          <div className="budget-area">
            <p className="card-label">Step 2 · Choose Budget</p>

            <div className="budget-grid">
              {budgets.map((budget) => (
                <button
                  key={budget.id}
                  className={
                    selectedBudget === budget.id
                      ? 'budget-btn active'
                      : 'budget-btn'
                  }
                  onClick={() => setSelectedBudget(budget.id as BudgetTier)}
                >
                  <strong>{budget.label}</strong>
                  <span>{budget.range}</span>
                  <small>{budget.description}</small>
                </button>
              ))}
            </div>
          </div>

          <button
            className="generate-btn"
            type="button"
            onClick={generateRecommendation}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Recommendation'}
          </button>
        </div>

        <div className="glass-panel result-card">
          <div className="result-top">
            <div>
              <p className="card-label">Recommendation</p>
              <h2>{loading ? 'Analyzing your needs...' : result.mainPick}</h2>
            </div>
            <span className="score-badge">Best Match</span>
          </div>

          <div className="info-box">
            <strong>Recommended Specs</strong>
            <p>{loading ? 'Checking suitable specifications...' : result.recommendedSpecs}</p>
          </div>

          <div className="info-box">
            <strong>Expected Budget</strong>
            <p>{loading ? selectedBudgetData?.range : result.expectedBudget}</p>
          </div>

          <div className="info-box explanation">
            <strong>Simple Explanation</strong>
            <p>{loading ? 'Preparing a beginner-friendly explanation...' : result.simpleExplanation}</p>
          </div>

          <div className="warning-box">
            <strong>Beginner Tip</strong>
            <p>{loading ? 'Finding common mistakes to avoid...' : result.beginnerTip}</p>
          </div>
        </div>

        <div className="glass-panel ranking-card">
          <p className="card-label">Laptop Ranking</p>
          <h2>Top Picks</h2>

          <div className="ranking-list">
            {result.laptops.map((laptop, index) => (
              <div className="ranking-item" key={laptop.name}>
                <span>#{index + 1}</span>

                <div className="ranking-content">
                  <strong>{laptop.name}</strong>
                  <p>{laptop.reason}</p>

                  <div className="spec-chips">
                    <em>{laptop.cpu}</em>
                    <em>{laptop.ram}</em>
                    <em>{laptop.gpu}</em>
                  </div>

                  <small>{laptop.priceRange}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="current-budget">
            <span>Selected Budget</span>
            <strong>{selectedBudgetData?.range}</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
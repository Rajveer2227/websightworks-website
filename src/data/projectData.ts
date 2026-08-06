export type ProjectCategoryType = 'website' | 'ecommerce' | 'webapp';

export interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  technology: string;
  filterCategory: ProjectCategoryType;
  shortDesc: string;
  imageUrl: string;
  projectUrl: string;
}

export const projects: ProjectDetails[] = [
  {
    id: 'global-career-crafters',
    title: 'Global Career Crafters',
    category: 'Education Consultancy',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Helping students explore global education through a modern, conversion-focused website.',
    imageUrl: '/images/projects/global-career-crafters.jpeg',
    projectUrl: 'https://globalcareercrafters.com/'
  },
  {
    id: 'taywade-patil-associates',
    title: 'Taywade Patil & Associates',
    category: 'Architecture & Engineering',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Professional corporate website showcasing architectural expertise and completed projects.',
    imageUrl: '/images/projects/taywade-patil-associates.jpeg',
    projectUrl: 'https://taywadepatilassociates.com'
  },
  {
    id: 'house-of-kolhapuri-chappal',
    title: 'House of Kolhapuri Chappal',
    category: 'E-Commerce',
    technology: 'WordPress',
    filterCategory: 'ecommerce',
    shortDesc: 'Custom online store built to showcase and sell authentic Kolhapuri handcrafted footwear.',
    imageUrl: '/images/projects/house-of-kolhapuri-chappal.jpeg',
    projectUrl: 'https://houseofkolhapurichappal.com/'
  },
  {
    id: 'siddhi-sales-corporation',
    title: 'Siddhi Sales Corporation',
    category: 'Industrial Products',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Corporate website designed to showcase industrial lubricants and engineering products.',
    imageUrl: '/images/projects/siddhi-sales-corporation.jpg',
    projectUrl: 'https://siddhisales.co.in/'
  },
  {
    id: 'accurate-sales',
    title: 'Accurate Sales',
    category: 'Industrial Hardware',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Business website highlighting industrial hardware solutions with a modern digital presence.',
    imageUrl: '/images/projects/accurate-sales.png',
    projectUrl: 'https://accuratesales.in/'
  },
  {
    id: 'grovel-precicomp',
    title: 'Grovel Precicomp',
    category: 'Manufacturing',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Corporate website presenting precision machining capabilities and manufacturing expertise.',
    imageUrl: '/images/projects/grovel-precicomp.png',
    projectUrl: 'https://grovelprecicomp.com/'
  },
  {
    id: 'sai-shooting-sports-equipments',
    title: 'Sai Shooting Sports Equipments',
    category: 'Sports Equipment',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Professional website showcasing premium shooting sports equipment and product catalog.',
    imageUrl: '/images/projects/sai-shooting-sports-equipments.png',
    projectUrl: 'https://saishootingsportsequipments.in/'
  },
  {
    id: 'excel-computers',
    title: 'Excel Computers',
    category: 'Education & Training',
    technology: 'WordPress',
    filterCategory: 'website',
    shortDesc: 'Training institute website promoting IT courses, student success, and admissions.',
    imageUrl: '/images/projects/excel-computers.png',
    projectUrl: 'https://excelcomputers.info/'
  }
];

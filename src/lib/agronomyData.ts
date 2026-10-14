import { CropRecommendation, CalendarStage, CalendarTask } from '@/types';

export interface CropMaster {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  durationMonths: string;
  durationDays: number;
  suitableSoils: string[];
  climateRequirements: string;
  optimalTempRange: [number, number]; // in Celsius
  waterRequirement: 'Low' | 'Medium' | 'High';
  marketDemand: 'High' | 'Moderate' | 'Growing';
  imageUrl: string;
  highlights: string[];
  stages: CalendarStage[];
  defaultSchedule: Omit<CalendarTask, 'id' | 'completed'>[];
  risks: string[];
  alternatives: string[];
  costPerHaEstimate: number;
  yieldPerHaEstimate: string;
}

export const CROPS_DATABASE: CropMaster[] = [
  {
    id: 'maize',
    name: 'Maize',
    scientificName: 'Zea mays',
    category: 'Cereal Grain',
    durationMonths: '3-4 months',
    durationDays: 110,
    suitableSoils: ['Loam', 'Sandy Loam', 'Clay Loam', 'Silt'],
    climateRequirements: 'Warm climate with moderate, well-distributed rainfall (500-800 mm).',
    optimalTempRange: [18, 30],
    waterRequirement: 'Medium',
    marketDemand: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    highlights: ['Good for your climate', 'High market demand', '3-4 months duration'],
    stages: [
      { id: 's1', name: 'Land Prep', dayRange: 'Day 1-10', icon: 'Tractor' },
      { id: 's2', name: 'Sowing', dayRange: 'Day 11-18', icon: 'Sprout' },
      { id: 's3', name: 'Vegetative', dayRange: 'Day 19-50', icon: 'Leaf' },
      { id: 's4', name: 'Tasseling & Silking', dayRange: 'Day 51-75', icon: 'Flower2' },
      { id: 's5', name: 'Grain Filling', dayRange: 'Day 76-95', icon: 'Sun' },
      { id: 's6', name: 'Harvest', dayRange: 'Day 96-110', icon: 'Wheat' },
    ],
    defaultSchedule: [
      { activity: 'Deep ploughing & farmyard manure incorporation', date: 'Day 1', details: '10 tonnes well-decomposed compost per hectare', icon: 'Tractor', category: 'Soil Prep' },
      { activity: 'Certified seed sowing with spacing 75cm x 25cm', date: 'Day 12', details: 'Depth 3-5 cm with adequate seedbed moisture', icon: 'Sprout', category: 'Sowing' },
      { activity: 'First weeding and organic mulching', date: 'Day 25', details: 'Manual weeding or shallow hoeing to protect roots', icon: 'Leaf', category: 'Maintenance' },
      { activity: 'Top dressing with organic compost / vermicompost', date: 'Day 45', details: 'Apply around root perimeter before knee-high stage', icon: 'Leaf', category: 'Fertilizer' },
      { activity: 'Fall armyworm monitoring & biological spray', date: 'Day 60', details: 'Inspect whorls, apply Neem oil (Azadirachtin) or Bt if needed', icon: 'ShieldAlert', category: 'Pest Control' },
      { activity: 'Grain maturity check & harvesting', date: 'Day 105', details: 'Harvest when husks dry and black layer forms at kernel base', icon: 'Wheat', category: 'Harvest' }
    ],
    risks: ['Fall Armyworm infestation', 'Stem borers', 'Drought stress during silking'],
    alternatives: ['Sorghum', 'Pearl Millet'],
    costPerHaEstimate: 450,
    yieldPerHaEstimate: '4.5 - 6.5 tonnes/ha'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetable / Solanaceous',
    durationMonths: '2-3 months',
    durationDays: 80,
    suitableSoils: ['Loam', 'Sandy Loam', 'Well-drained Clay Loam'],
    climateRequirements: 'Warm, sunny weather (21-27°C). Sensitive to frost and extreme waterlogging.',
    optimalTempRange: [20, 28],
    waterRequirement: 'Medium',
    marketDemand: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    highlights: ['Suitable for your soil', 'Good profit margin', '2-3 months duration'],
    stages: [
      { id: 's1', name: 'Land Prep', dayRange: 'Day 1-7', icon: 'Tractor' },
      { id: 's2', name: 'Sowing / Transplanting', dayRange: 'Day 8-14', icon: 'Sprout' },
      { id: 's3', name: 'Vegetative', dayRange: 'Day 15-30', icon: 'Leaf' },
      { id: 's4', name: 'Flowering', dayRange: 'Day 31-45', icon: 'Flower2' },
      { id: 's5', name: 'Fruiting', dayRange: 'Day 46-70', icon: 'Apple' },
      { id: 's6', name: 'Harvest', dayRange: 'Day 71-80', icon: 'ShoppingBag' },
    ],
    defaultSchedule: [
      { activity: 'Apply compost & prepare raised beds', date: 'Apr 15', details: '2-3 kg well-aged compost per m²', icon: 'Tractor', category: 'Soil Prep' },
      { activity: 'Transplant healthy seedlings with staking', date: 'Apr 22', details: 'Depth: 1-2 cm, spacing 60cm x 45cm', icon: 'Sprout', category: 'Sowing' },
      { activity: 'First organic fertilizer application', date: 'May 10', details: 'Organic NPK formulation (1 kg/100 m²)', icon: 'Leaf', category: 'Fertilizer' },
      { activity: 'Drip irrigation management', date: 'May 12', details: 'Keep soil moist; avoid wetting foliage directly', icon: 'Droplets', category: 'Irrigation' },
      { activity: 'Pest control & blight preventive spray', date: 'May 20', details: 'Neem oil / garlic spray / Trichoderma bio-agent', icon: 'ShieldAlert', category: 'Pest Control' },
      { activity: 'Staking, pruning suckers, and trellising', date: 'Jun 05', details: 'Improve air circulation and support heavy fruit clusters', icon: 'Scissors', category: 'Maintenance' },
      { activity: 'Harvesting at breaker or pink stage', date: 'Jul 15', details: 'Pick early morning to preserve firmness and post-harvest shelf life', icon: 'ShoppingBag', category: 'Harvest' }
    ],
    risks: ['Early and Late Blight', 'Bacterial wilt', 'Whitefly / Tomato leaf curl virus'],
    alternatives: ['Bell Pepper', 'Eggplant'],
    costPerHaEstimate: 850,
    yieldPerHaEstimate: '25 - 40 tonnes/ha'
  },
  {
    id: 'beans',
    name: 'Beans',
    scientificName: 'Phaseolus vulgaris',
    category: 'Legume / Pulse',
    durationMonths: '2-3 months',
    durationDays: 75,
    suitableSoils: ['Loam', 'Sandy Loam', 'Silt Loam'],
    climateRequirements: 'Moderate temperature (18-24°C). Fixes atmospheric nitrogen symbiotically.',
    optimalTempRange: [18, 25],
    waterRequirement: 'Low',
    marketDemand: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    highlights: ['Fixes nitrogen in soil', 'Low input cost', '2-3 months duration'],
    stages: [
      { id: 's1', name: 'Seedbed Prep', dayRange: 'Day 1-7', icon: 'Tractor' },
      { id: 's2', name: 'Sowing', dayRange: 'Day 8-12', icon: 'Sprout' },
      { id: 's3', name: 'Vegetative Growth', dayRange: 'Day 13-30', icon: 'Leaf' },
      { id: 's4', name: 'Flowering & Pod Set', dayRange: 'Day 31-50', icon: 'Flower2' },
      { id: 's5', name: 'Pod Maturation', dayRange: 'Day 51-65', icon: 'Sun' },
      { id: 's6', name: 'Harvest', dayRange: 'Day 66-75', icon: 'Wheat' },
    ],
    defaultSchedule: [
      { activity: 'Fine tilth bed preparation with Rhizobium inoculant', date: 'Day 1', details: 'Treat seeds with Rhizobium culture to boost biological N-fixation', icon: 'Tractor', category: 'Soil Prep' },
      { activity: 'Direct seeding at 40cm x 10cm spacing', date: 'Day 8', details: 'Plant at 3-4 cm depth with good initial soil moisture', icon: 'Sprout', category: 'Sowing' },
      { activity: 'Light weeding and straw mulching', date: 'Day 20', details: 'Mulch reduces moisture loss and controls weed pressure', icon: 'Leaf', category: 'Maintenance' },
      { activity: 'Preventive aphid and pod borer scout', date: 'Day 35', details: 'Scout flowers; spray wood ash slurry or neem oil for aphids', icon: 'ShieldAlert', category: 'Pest Control' },
      { activity: 'Harvesting green pods or dry beans', date: 'Day 70', details: 'Pick regular snap pods or allow full vine dry-down for dry pulses', icon: 'Wheat', category: 'Harvest' }
    ],
    risks: ['Bean Anthracnose', 'Bean common mosaic virus', 'Aphid clusters'],
    alternatives: ['Cowpea', 'Pigeon Pea', 'Soybean'],
    costPerHaEstimate: 320,
    yieldPerHaEstimate: '1.8 - 2.5 tonnes/ha'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    category: 'Leafy Green',
    durationMonths: '1.5-2 months',
    durationDays: 55,
    suitableSoils: ['Rich Sandy Loam', 'Loam with high organic matter'],
    climateRequirements: 'Cool to mild weather (15-22°C). High temperatures cause early bolting.',
    optimalTempRange: [14, 22],
    waterRequirement: 'High',
    marketDemand: 'Growing',
    imageUrl: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?auto=format&fit=crop&w=600&q=80',
    highlights: ['Short growth cycle', 'High local demand', '45-60 days'],
    stages: [
      { id: 's1', name: 'Nursery / Prep', dayRange: 'Day 1-10', icon: 'Sprout' },
      { id: 's2', name: 'Transplanting', dayRange: 'Day 11-18', icon: 'Leaf' },
      { id: 's3', name: 'Rapid Growth', dayRange: 'Day 19-35', icon: 'Sun' },
      { id: 's4', name: 'Head Formation', dayRange: 'Day 36-48', icon: 'Flower2' },
      { id: 's5', name: 'Harvest', dayRange: 'Day 49-55', icon: 'ShoppingBag' },
    ],
    defaultSchedule: [
      { activity: 'Prepare raised beds enriched with vermicompost', date: 'Day 1', details: 'Mix 30% organic vermicompost for moisture retention', icon: 'Tractor', category: 'Soil Prep' },
      { activity: 'Transplant 3-leaf seedlings with shade cover', date: 'Day 12', details: 'Spacing 25cm x 25cm; protect from intense midday sun', icon: 'Sprout', category: 'Sowing' },
      { activity: 'Consistent micro-sprinkler or drip watering', date: 'Day 20', details: 'Maintain moist root zone without creating water pooling', icon: 'Droplets', category: 'Irrigation' },
      { activity: 'Slugs and caterpillar prevention', date: 'Day 30', details: 'Beer traps for slugs; Bacillus thuringiensis for loopers', icon: 'ShieldAlert', category: 'Pest Control' },
      { activity: 'Morning harvest of crisp heads', date: 'Day 50', details: 'Cut cleanly at base before temperature rises; wash in cool water', icon: 'ShoppingBag', category: 'Harvest' }
    ],
    risks: ['Premature bolting under heat', 'Downy mildew', 'Tip burn from calcium deficiency'],
    alternatives: ['Spinach', 'Swiss Chard', 'Kale'],
    costPerHaEstimate: 500,
    yieldPerHaEstimate: '15 - 25 tonnes/ha'
  }
];

export const ORGANIC_FARMING_BENEFITS = [
  {
    title: 'Better soil structure & long-term fertility',
    description: 'Increases soil organic matter, microbial biomass, and crumb structure, enhancing moisture retention and drought resilience year over year.',
    icon: 'Layers'
  },
  {
    title: 'Support for beneficial organisms & biodiversity',
    description: 'Nurtures pollinator populations, earthworms, mycorrhizal fungi, and predatory insects that establish natural biological pest suppression.',
    icon: 'Bug'
  },
  {
    title: 'Reduced dependence on synthetic agricultural inputs',
    description: 'Eliminates costly chemical fertilizers and synthetic pesticides, lowering farm input expenses and shielding soil from chemical degradation.',
    icon: 'Leaf'
  },
  {
    title: 'Improved soil-cover & water-management practices',
    description: 'Continuous cover cropping and living mulches slash runoff, prevent erosion, and maintain ground moisture up to 40% longer.',
    icon: 'Droplets'
  },
  {
    title: 'Potential product-quality or premium market benefits',
    description: 'Local and export markets often reward clean, chemical-free certified produce with higher prices and loyal consumer demand.',
    icon: 'TrendingUp'
  }
];

export const ORGANIC_TRANSITION_STEPS = [
  {
    step: 1,
    title: 'Understand the soil and existing farming practices',
    description: 'Test soil pH, NPK, organic carbon, and baseline compaction. Catalog past chemical applications to establish the decontamination baseline.',
    category: 'Assessment'
  },
  {
    step: 2,
    title: 'Plan a gradual transition',
    description: 'Convert acreage incrementally (e.g. 20-30% per year) to manage yield adjustments, learn biological controls, and adapt farm labor.',
    category: 'Planning'
  },
  {
    step: 3,
    title: 'Choose suitable seeds and varieties',
    description: 'Select untreated, non-GMO, disease-resistant indigenous or locally adapted open-pollinated varieties proven under low-synthetic regimes.',
    category: 'Planting'
  },
  {
    step: 4,
    title: 'Prepare and use properly matured compost where appropriate',
    description: 'Maintain 30:1 carbon-to-nitrogen ratio, ensure internal pile heat reaches 55-65°C to destroy weed seeds and pathogens, and cure fully before application.',
    category: 'Soil Health'
  },
  {
    step: 5,
    title: 'Practise crop rotation and soil-cover management',
    description: 'Rotate heavy feeders (corn/tomatoes) with legumes (beans/peas) and deep-rooted cover crops to break pest life cycles and maintain living roots.',
    category: 'Agronomy'
  },
  {
    step: 6,
    title: 'Monitor crops for pests and diseases regularly',
    description: 'Conduct weekly systematic field walks, check undersides of leaves, install pheromone or yellow sticky traps, and note threshold levels.',
    category: 'Monitoring'
  },
  {
    step: 7,
    title: 'Use preventive and locally appropriate integrated pest management',
    description: 'Deploy companion planting (marigolds, basil), bio-agents (Trichoderma, Bacillus thuringiensis), and botanical sprays (neem kernel extract, garlic).',
    category: 'Protection'
  },
  {
    step: 8,
    title: 'Manage irrigation efficiently',
    description: 'Use drip lines or subsurface irrigation to target the root zone directly and keep leaf canopies dry, reducing fungal spore germination.',
    category: 'Water'
  },
  {
    step: 9,
    title: 'Record farming activities and results',
    description: 'Keep detailed daily logs of seed sources, compost batches, biological sprays, harvest dates, yields, and input costs for continuous optimization.',
    category: 'Record Keeping'
  },
  {
    step: 10,
    title: 'Understand local certification requirements before selling certified organic produce',
    description: 'Familiarize yourself with accredited standards (e.g., PGS-India, NPOP, USDA Organic, Kenya Organic Standards) and adhere to required 2-3 year conversion periods.',
    category: 'Certification'
  }
];

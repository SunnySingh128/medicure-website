import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import './second.css';

const DietPlan = () => {
  const { condition } = useParams();
  const navigate = useNavigate();
  const mealSliderRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('diet');
  const conditionMap = {
    diabetes: 'Diabetes',
    hypertension: 'Hypertension',
    fever: 'Fever',
    thyroid: 'Thyroid Issues',
    obesity: 'Obesity',
    heartdisease: 'Heart Disease',
    kidneydisease: 'Kidney Disease',
    asthma: 'Asthma',	
  };

  // Meal plans for different conditions
  const mealPlans = {
    diabetes: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Start your day with a high-protein, low-carb breakfast. Options include vegetable omelette with whole grain toast, Greek yogurt with nuts and seeds, or besan chilla with mint chutney.',
        portion: '1 serving (approx 300-350 calories)',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Have a small snack to maintain energy levels. Good options are a handful of almonds (10-12), cucumber slices with hummus, or a small apple with peanut butter.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Focus on balanced nutrition with complex carbs, lean protein, and healthy fats. Try roti (1-2) with dal, vegetable sabzi, and salad; or brown rice with grilled chicken/fish and stir-fried vegetables.',
        portion: '400-500 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Choose a light snack with protein and fiber. Options include sprouts salad, roasted makhana (fox nuts), or a cup of green tea with 2-3 whole grain biscuits.',
        portion: '100-200 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Keep dinner light and low-carb. Good choices are vegetable soup with grilled chicken/fish, paneer bhurji with 1 roti, or moong dal chilla with curd.',
        portion: '300-400 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Eat small, frequent meals to maintain blood sugar levels',
          'Choose low glycemic index foods like whole grains, legumes, and non-starchy vegetables',
          'Include protein with every meal to slow glucose absorption',
          'Stay hydrated with water and herbal teas',
          'Limit processed foods and added sugars',
          'Monitor portion sizes to avoid overeating'
        ],
        isTips: true
      }
    ],
    hypertension: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: ' Oatmeal with Fruits and Nuts, Whole Grain Toast with Avocado. Low-fat Yogurt Parfait.',
        portion: '1 serving (approx 300-350 calories)',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: ' Fresh Fruit, almonds (10-12),  Buttermilk (Chaas), small apple slices',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Brown Rice + Dal + Veggies + Salad, Multigrain Roti + Low-Oil Sabzi + Raita,  Try roti (1-2) with dal, vegetable sabzi, and salad.',
        portion: '400-500 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Roasted Chana + Green Tea, cup of green tea with 2-3 whole grain biscuits.',
        portion: '100-200 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Keep dinner light and low-carb,Multigrain Roti + Light Sabzi + Salad,Khichdi (Moong Dal + Brown Rice) + Curd,Khichdi (Moong Dal + Brown Rice) + Curd',
        portion: '300-400 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Use less than 1 teaspoon salt per day (including cooking).',
          'Include banana, orange, guava, spinach, sweet potato, tomato.',
           'Potassium helps balance the effects of sodium and lowers BP.',
          'Stay hydrated with water and herbal teas',
        
        ],
        isTips: true
      }
    ],
    fever: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Moong Dal Khichdi (Soft & Bland), Dalia (Broken Wheat Porridge). Suji (Rava) Upma,Toast + Boiled Egg,Coconut Water or Herbal Tea (with breakfast or before)',
        portion: '1 serving (approx 300-350 calories)',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Fruit Smoothie (Light),Warm Lemon Water (No Sugar),Fresh Coconut Water',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Soft Rice with Light Moong Dal,Vegetable Soup (Clear Broth),Steamed or Boiled Vegetables (with lemon), Plain Dalia (Broken Wheat Porridge) with Vegetables',
        portion: '400-500 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: ' Fresh Coconut Water,. Herbal Tea (No Caffeine), Fruit Salad (Mild Fruits),A Small Handful of Nuts',
        portion: '100-200 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Vegetable Khichdi, Soft Rice with Light Vegetable Curry,Dalia (Broken Wheat) Porridge with Vegetables,Steamed Fish (If Non-Vegetarian),. Light Veg Soup (Clear Broth), Soft Chapati (Whole Wheat)',
        portion: '300-400 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Aim for 2–2.5 liters of fluid per day to prevent dehydration and help flush out toxins.',
         'Avoid caffeine and alcohol, which can dehydrate the body.',
          'Moong dal khichdi',
          'Dalia (broken wheat porridge)',
           'Steamed vegetables like carrots, pumpkin',
        ],
        isTips: true
      }
    ],
    thyroid: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Start your day with a high-protein, low-carb breakfast. Options include vegetable omelette with whole grain toast, Greek yogurt with nuts and seeds, or besan chilla with mint chutney.',
        portion: '1 serving (approx 300-350 calories)',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Have a small snack to maintain energy levels. Good options are a handful of almonds (10-12), cucumber slices with hummus, or a small apple with peanut butter.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Focus on balanced nutrition with complex carbs, lean protein, and healthy fats. Try roti (1-2) with dal, vegetable sabzi, and salad; or brown rice with grilled chicken/fish and stir-fried vegetables.',
        portion: '400-500 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Choose a light snack with protein and fiber. Options include sprouts salad, roasted makhana (fox nuts), or a cup of green tea with 2-3 whole grain biscuits.',
        portion: '100-200 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Keep dinner light and low-carb. Good choices are vegetable soup with grilled chicken/fish, paneer bhurji with 1 roti, or moong dal chilla with curd.',
        portion: '300-400 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Eat small, frequent meals to maintain blood sugar levels',
          'Choose low glycemic index foods like whole grains, legumes, and non-starchy vegetables',
          'Include protein with every meal to slow glucose absorption',
          'Stay hydrated with water and herbal teas',
          'Limit processed foods and added sugars',
          'Monitor portion sizes to avoid overeating'
        ],
        isTips: true
      }
    ],
    obesity: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'High-protein, high-fiber options: Vegetable omelette with spinach and mushrooms, Greek yogurt with chia seeds and berries, or besan chilla with mint chutney. Include 1 tsp of flaxseeds.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Fiber-rich snacks: Cucumber and carrot sticks with hummus, a handful of roasted chana, or a small apple with cinnamon.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Balanced meal: 1 multigrain roti with dal, lots of vegetable sabzi (less oil), and a big bowl of salad with lemon dressing. Or quinoa with grilled chicken/fish and stir-fried vegetables.',
        portion: '400-450 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Protein-rich options: Sprouts salad, roasted makhana, or green tea with 2-3 whole grain crackers.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Light and early: Vegetable soup with grilled chicken/fish, paneer bhurji with 1 roti, or moong dal chilla with curd. Finish 2-3 hours before bedtime.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Focus on high-fiber foods to feel full longer',
          'Include protein with every meal to maintain muscle mass',
          'Stay hydrated - drink 2-3 liters of water daily',
          'Limit processed foods and added sugars',
          'Practice mindful eating - eat slowly without distractions',
          'Include healthy fats like nuts, seeds, and olive oil in moderation'
        ],
        isTips: true
      }
    ],
    heartdisease: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Heart-healthy options: Oatmeal with walnuts and flaxseeds, vegetable upma with less oil, or poha with peanuts and vegetables.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Fruits and nuts: A handful of almonds (6-8) with an orange or pomegranate seeds.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Balanced meal: 1 roti (multigrain) with dal (less salt), vegetable sabzi (cooked in minimal oil), and a big bowl of salad with olive oil dressing.',
        portion: '400-450 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Healthy options: Green tea with roasted chana or a fruit like guava/pear.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Light meal: Grilled fish with steamed vegetables, khichdi with vegetables, or dal with 1 roti and sabzi.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Limit salt intake to less than 1 tsp per day',
          'Include omega-3 rich foods like flaxseeds, walnuts, and fatty fish',
          'Choose whole grains over refined carbohydrates',
          'Use healthy oils like olive oil in moderation',
          'Avoid processed and fried foods',
          'Include plenty of colorful fruits and vegetables'
        ],
        isTips: true
      }
    ],
    kidneydisease: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Low-potassium options: Idli with coconut chutney, upma with vegetables (avoid tomatoes and spinach), or poha with peanuts.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Safe fruits: Apple or pear slices, or a small portion of pineapple.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Balanced meal: 1 roti with arhar dal (less salt), lauki sabzi, and cucumber salad.',
        portion: '400-450 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Low-phosphorus options: Rice flakes (poha) chivda or roasted makhana.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Light meal: Jeera rice with dal (less salt), or chapati with bottle gourd sabzi.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Limit protein intake as per doctor\'s recommendation',
          'Control potassium intake - avoid bananas, oranges, tomatoes, potatoes',
          'Limit phosphorus - reduce dairy, nuts, and processed foods',
          'Reduce salt intake to control blood pressure',
          'Monitor fluid intake as advised by your doctor',
          'Choose kidney-friendly vegetables like cabbage, cauliflower, onions'
        ],
        isTips: true
      }
    ],
    asthma: [
      {
        id: 1,
        name: 'Breakfast',
        time: '7:00 - 8:00 AM',
        content: 'Anti-inflammatory options: Oatmeal with turmeric and flaxseeds, vegetable idli with sambar (less spicy), or besan chilla with mint chutney.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 2,
        name: 'Mid-Morning Snack',
        time: '10:30 - 11:00 AM',
        content: 'Fruits rich in vitamin C: Guava, papaya, or apple with a handful of walnuts (2-3).',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 3,
        name: 'Lunch',
        time: '12:30 - 1:30 PM',
        content: 'Balanced meal: 1 roti with moong dal, vegetable sabzi (include garlic and turmeric), and salad with lemon dressing.',
        portion: '400-450 calories',
        isTips: false
      },
      {
        id: 4,
        name: 'Evening Snack',
        time: '4:00 - 5:00 PM',
        content: 'Herbal tea (ginger or tulsi) with roasted chana or makhana.',
        portion: '100-150 calories',
        isTips: false
      },
      {
        id: 5,
        name: 'Dinner',
        time: '7:00 - 8:00 PM',
        content: 'Light meal: Khichdi with vegetables (include turmeric), or soup with chapati.',
        portion: '300-350 calories',
        isTips: false
      },
      {
        id: 6,
        name: 'Diet Tips',
        content: [
          'Include anti-inflammatory foods like turmeric, ginger, garlic',
          'Eat omega-3 rich foods (flaxseeds, walnuts) to reduce inflammation',
          'Stay hydrated to keep mucus thin',
          'Avoid known food triggers (if any) like processed foods',
          'Include vitamin C rich fruits and vegetables',
          'Eat smaller meals to avoid pressure on diaphragm'
        ],
        isTips: true
      }
    ]
  };

  // Yoga plans for different conditions
  const yogaPlans = {
    diabetes: {
      description: "Yoga can significantly help manage diabetes by improving insulin sensitivity, reducing stress hormones that affect blood sugar, and aiding weight management.",
      poses: [
        {
          name: "Surya Namaskar (Sun Salutation)",
          benefits: "Improves blood circulation, stimulates pancreas, enhances metabolism",
          steps: "12-step sequence including forward bends and backbends",
          duration: "5-10 rounds"
        },
        {
          name: "Paschimottanasana (Seated Forward Bend)",
          benefits: "Massages abdominal organs including pancreas, improves digestion",
          steps: "Sit with legs straight, inhale and raise arms, exhale and bend forward",
          duration: "30 seconds to 1 minute"
        }
      ],
      tips: [
        "Practice yoga on empty stomach or 2-3 hours after meals",
        "Early morning is ideal time for practice",
        "Maintain regular timing for your practice"
      ]
    },
    hypertension: {
      description: "Yoga can significantly help manage diabetes by improving insulin sensitivity, reducing stress hormones that affect blood sugar, and aiding weight management.",
      poses: [
        {
          name: "Tadasana (Mountain Pose)",
          benefits: "Improves posture, enhances blood flow, and promotes a sense of grounding and stability.",
          steps: "12-step sequence including forward bends and backbends",
          duration: "5-10 rounds"
        },
        {
          name: " Savasana (Corpse Pose)",
          benefits: " Ultimate relaxation pose, reduces stress, and supports healing.",
          steps: "5-steps,In Savasana, lie flat on your back, relax your body, close your eyes, focus on your breath, and stay in this position for 5-10 minutes.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Bhujangasana (Cobra Pose)",
          benefits: "Opens the chest and improves circulation, Relieves mild body aches and promotes respiratory health",
          steps: "5-steps,In Bhujangasana, lie on your stomach, place palms under shoulders, inhale to lift your chest while straightening arms, hold, and then lower back down.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Trikonasana (Triangle Pose)",
          benefits: "Enhances circulation, promotes deep breathing, reduces stress, and helps stretch the body",
          steps: "5-steps,To do Trikonasana, stand with legs apart, extend arms, bend sideways over one leg, touch the foot or floor, and raise the other arm upward.",
          duration: "30 seconds to 1 minute"
        },
        
        
      ],
      tips: [
        "Practice yoga on empty stomach or 2-3 hours after meals",
        "Early morning is ideal time for practice",
        "Maintain regular timing for your practice"
      ]
    },
    fever: {
      description: "ocusing on gentle, restorative poses to help with relaxation, boosting immunity, and aiding circulation without overexertion.",
      poses: [
        {
          name: "Sukhasana (Easy Pose)",
          benefits: "Calms the mind and nervous system, Improves concentration and breathing, enhances metabolism",
          steps: "5-steps, Sit cross-legged, straighten your spine, relax your shoulders, rest your hands on your knees with palms up, and focus on deep, steady breathing.",
          duration: "5-10 minutes"
        },
        {
          name: "Pranayama (Breathing Exercises)",
          benefits: "Balances energy and clears nasal passages,Calms the mind and relieves stress.",
          steps: "6-steps,Pranayama involves sitting comfortably, closing one nostril, inhaling deeply, switching nostrils, and repeating the cycle.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Bhujangasana (Cobra Pose)",
          benefits: "Opens the chest and improves circulation, Relieves mild body aches and promotes respiratory health",
          steps: "5-steps,In Bhujangasana, lie on your stomach, place palms under shoulders, inhale to lift your chest while straightening arms, hold, and then lower back down.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: " Savasana (Corpse Pose)",
          benefits: " Ultimate relaxation pose, reduces stress, and supports healing.",
          steps: "5-steps,In Savasana, lie flat on your back, relax your body, close your eyes, focus on your breath, and stay in this position for 5-10 minutes.",
          duration: "30 seconds to 1 minute"
        }
      ],
      tips: [
        "Practice yoga on empty stomach or 2-3 hours after meals",
        "Early morning is ideal time for practice",
        "Maintain regular timing for your practice"
      ]
    },
    thyroid: {
      description: "Yoga can significantly help manage diabetes by improving insulin sensitivity, reducing stress hormones that affect blood sugar, and aiding weight management.",
      poses: [
        {
          name: "Surya Namaskar (Sun Salutation)",
          benefits: "Surya Namaskar improves flexibility, strengthens muscles, boosts circulation, reduces stress, and promotes overall well-being.",
          steps: "Surya Namaskar involves 12 steps: prayer pose, raised arms, hand to foot, equestrian, plank, eight-limbed, cobra, downward dog, equestrian (other leg), hand to foot, raised arms, and prayer pose.",
          duration: "3-4 minutes"
        },
        {
          name: "Paschimottanasana (Seated Forward Bend)",
          benefits: "Paschimottanasana improves flexibility, digestion, and posture while calming the mind and relieving stress.",
          steps: "4-steps,Sit with legs extended, inhale to lengthen the spine, exhale to bend forward, and hold the feet while keeping the back straight.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Bhujangasana (Cobra Pose)",
          benefits: "Opens the chest and improves circulation, Relieves mild body aches and promotes respiratory health",
          steps: "5-steps,In Bhujangasana, lie on your stomach, place palms under shoulders, inhale to lift your chest while straightening arms, hold, and then lower back down.",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Pranayama (Breathing Exercises)",
          benefits: "Balances energy and clears nasal passages,Calms the mind and relieves stress.",
          steps: "6-steps,Pranayama involves sitting comfortably, closing one nostril, inhaling deeply, switching nostrils, and repeating the cycle.",
          duration: "30 seconds to 1 minute"
        },
      ],
      tips: [
        "Practice yoga on empty stomach or 2-3 hours after meals",
        "Early morning is ideal time for practice",
        "Maintain regular timing for your practice"
      ]
    },
    obesity: {
      description: "Yoga can help with weight management by improving metabolism, reducing stress eating, and toning the body. These poses focus on stimulating the digestive system and burning calories.",
      poses: [
        {
          name: "Surya Namaskar (Sun Salutation)",
          benefits: "Full-body workout that improves metabolism and helps burn calories",
          steps: "12-step sequence including forward bends and backbends. Perform slowly with breath awareness.",
          duration: "5-10 rounds"
        },
        {
          name: "Bhujangasana (Cobra Pose)",
          benefits: "Strengthens abdominal muscles, improves digestion, and tones the body",
          steps: "Lie on stomach, place palms near chest, inhale to lift upper body while keeping pelvis on floor",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Dhanurasana (Bow Pose)",
          benefits: "Massages abdominal organs, improves digestion, and reduces belly fat",
          steps: "Lie on stomach, bend knees to hold ankles, inhale to lift chest and thighs off floor",
          duration: "20-30 seconds"
        },
        {
          name: "Trikonasana (Triangle Pose)",
          benefits: "Stretches and tones the waist, improves digestion, and reduces fat deposits",
          steps: "Stand with legs apart, extend arms, bend sideways to touch foot while other arm reaches up",
          duration: "30 seconds each side"
        }
      ],
      tips: [
        "Practice yoga on empty stomach in the morning",
        "Combine with pranayama like kapalbhati for better results",
        "Maintain consistency for at least 3 months to see results",
        "Combine with dietary changes for effective weight management"
      ]
    },
    heartdisease: {
      description: "Gentle yoga poses can help improve heart health by reducing stress, lowering blood pressure, and improving circulation. These poses are safe for cardiac patients when done carefully.",
      poses: [
        {
          name: "Sukhasana (Easy Pose) with Pranayama",
          benefits: "Calms the mind, reduces stress, and regulates breathing",
          steps: "Sit cross-legged, keep spine straight, practice deep breathing or alternate nostril breathing",
          duration: "5-10 minutes"
        },
        {
          name: "Vajrasana (Thunderbolt Pose)",
          benefits: "Improves digestion and circulation without straining the heart",
          steps: "Kneel down and sit back on heels, keep spine straight, hands on knees",
          duration: "2-5 minutes"
        },
        {
          name: "Setu Bandhasana (Bridge Pose - Supported)",
          benefits: "Gently opens chest, improves circulation to heart, reduces stress",
          steps: "Lie on back, bend knees, lift hips while keeping shoulders on floor (use support if needed)",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Savasana (Corpse Pose) with Chest Elevation",
          benefits: "Deep relaxation that lowers blood pressure and reduces stress hormones",
          steps: "Lie on back with pillow under chest/head, arms by sides, focus on slow breathing",
          duration: "5-10 minutes"
        }
      ],
      tips: [
        "Avoid strenuous poses and inversions",
        "Practice under guidance if you have severe heart condition",
        "Stop immediately if you feel any discomfort",
        "Combine with meditation for stress reduction"
      ]
    },
    kidneydisease: {
      description: "Gentle yoga can support kidney health by improving circulation, reducing stress, and aiding detoxification. These poses are safe for kidney patients when done carefully.",
      poses: [
        {
          name: "Balasana (Child's Pose)",
          benefits: "Gently compresses abdomen to stimulate kidneys, reduces stress",
          steps: "Kneel down, sit back on heels, fold forward with arms extended",
          duration: "1-2 minutes"
        },
        {
          name: "Supta Baddha Konasana (Reclining Butterfly Pose)",
          benefits: "Improves circulation to abdominal organs, promotes relaxation",
          steps: "Lie on back, bring soles of feet together, let knees fall open",
          duration: "2-3 minutes"
        },
        {
          name: "Viparita Karani (Legs-Up-the-Wall Pose)",
          benefits: "Improves circulation, reduces swelling in legs, gentle inversion",
          steps: "Lie on back with legs vertically up against a wall, arms by sides",
          duration: "3-5 minutes"
        },
        {
          name: "Nadi Shodhana Pranayama (Alternate Nostril Breathing)",
          benefits: "Balances body's systems, reduces stress, improves oxygenation",
          steps: "Sit comfortably, use right thumb to close right nostril, inhale left, exhale right, switch",
          duration: "5 minutes"
        }
      ],
      tips: [
        "Avoid strenuous poses that may raise blood pressure",
        "Stay hydrated but follow fluid restrictions if prescribed",
        "Practice gently without straining",
        "Focus on relaxation and breathing exercises"
      ]
    },
    Asthma: {
      description: "Yoga can help manage asthma by improving lung capacity, reducing stress triggers, and strengthening respiratory muscles. These poses focus on opening the chest and improving breathing.",
      poses: [
        {
          name: "Sukhasana (Easy Pose) with Deep Breathing",
          benefits: "Improves lung capacity and teaches proper breathing technique",
          steps: "Sit cross-legged, inhale deeply expanding abdomen, exhale completely",
          duration: "5 minutes"
        },
        {
          name: "Bhujangasana (Cobra Pose)",
          benefits: "Opens chest, improves lung expansion, strengthens respiratory muscles",
          steps: "Lie on stomach, place palms near chest, inhale to lift upper body",
          duration: "30 seconds to 1 minute"
        },
        {
          name: "Ustrasana (Camel Pose - Modified)",
          benefits: "Expands chest fully, improves oxygen intake",
          steps: "Kneel, place hands on lower back, gently arch back without straining",
          duration: "20-30 seconds"
        },
        {
          name: "Anulom Vilom Pranayama (Alternate Nostril Breathing)",
          benefits: "Balances respiratory system, improves lung function, reduces stress",
          steps: "Close right nostril, inhale left, close left, exhale right, inhale right, exhale left",
          duration: "5 minutes"
        }
      ],
      tips: [
        "Practice in a well-ventilated space",
        "Keep inhaler nearby during practice",
        "Avoid practicing during acute asthma attacks",
        "Focus on exhaling completely to empty lungs",
        "Practice regularly for long-term benefits"
      ]
    },
  };

  const meals = mealPlans[condition] || mealPlans.diabetes;
  const yoga = yogaPlans[condition] || yogaPlans.diabetes;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    
    const slider = mealSliderRef.current;
    
    const handleScroll = () => {
      if (!slider) return;
      
      const slides = slider.querySelectorAll('.meal-slide');
      const totalWidth = slider.scrollWidth - slider.clientWidth;
      setProgress((slider.scrollLeft / totalWidth) * 100);

      slides.forEach((slide, index) => {
        const slideLeft = slide.offsetLeft - slider.offsetLeft;
        const slideWidth = slide.offsetWidth;
        
        if (slider.scrollLeft >= slideLeft - slideWidth/2 && 
            slider.scrollLeft < slideLeft + slideWidth/2) {
          setActiveDot(index);
        }
      });
    };

    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => {
        clearTimeout(timer);
        slider.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeTab]);

  const scrollToSlide = (index) => {
    const slider = mealSliderRef.current;
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.meal-slide');
    if (index >= 0 && index < slides.length) {
      const slide = slides[index];
      slider.scrollTo({
        left: slide.offsetLeft - slider.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollNext = () => {
    const nextIndex = activeDot < (activeTab === 'diet' ? meals.length : yoga.poses.length + 1) - 1 
      ? activeDot + 1 
      : 0;
    scrollToSlide(nextIndex);
  };

  const scrollPrev = () => {
    const prevIndex = activeDot > 0 
      ? activeDot - 1 
      : (activeTab === 'diet' ? meals.length : yoga.poses.length + 1) - 1;
    scrollToSlide(prevIndex);
  };

  const handleSavePlan = () => {
    navigate('/dashboard');
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderDietContent = () => (
    <>
      <div className="slider-container" ref={mealSliderRef}>
        {meals.map((meal) => (
          <div 
            key={meal.id}
            className={`meal-slide ${meal.isTips ? 'tips-slide' : ''}`}
          >
            {!meal.isTips && <div className="background-overlay"></div>}
            <h3>{meal.name}</h3>
            {!meal.isTips && <div className="meal-time">{meal.time}</div>}
            <div className="meal-content">
              {meal.isTips ? (
                <ul className="tips-list">
                  {meal.content.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <>
                  <p>{meal.content}</p>
                  <p className="portion-size">Portion: {meal.portion}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-controls">
        <button className="nav-arrow" onClick={scrollPrev}>←</button>
        <div className="navigation-dots">
          {meals.map((_, index) => (
            <div 
              key={index}
              className={`nav-dot ${activeDot === index ? 'active' : ''}`}
              onClick={() => scrollToSlide(index)}
            ></div>
          ))}
        </div>
        <button className="nav-arrow" onClick={scrollNext}>→</button>
      </div>
    </>
  );

  const renderYogaContent = () => (
    <>
      <div className="yoga-description">
        <p>{yoga.description}</p>
      </div>
      
      <div className="slider-container" ref={mealSliderRef}>
        {yoga.poses.map((pose, index) => (
          <div key={index} className="meal-slide yoga-slide">
            <div className="background-overlay"></div>
            <h3>{pose.name}</h3>
            <div className="meal-content">
              <p><strong>Benefits:</strong> {pose.benefits}</p>
              <p><strong>Steps:</strong> {pose.steps}</p>
              <p className="portion-size"><strong>Duration:</strong> {pose.duration}</p>
            </div>
          </div>
        ))}
        
        <div className="meal-slide tips-slide">
          <h3>Yoga Practice Tips</h3>
          <div className="meal-content">
            <ul className="tips-list">
              {yoga.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="navigation-controls">
        <button className="nav-arrow" onClick={scrollPrev}>←</button>
        <div className="navigation-dots">
          {[...yoga.poses, {name: 'Tips'}].map((_, index) => (
            <div 
              key={index}
              className={`nav-dot ${activeDot === index ? 'active' : ''}`}
              onClick={() => scrollToSlide(index)}
            ></div>
          ))}
        </div>
        <button className="nav-arrow" onClick={scrollNext}>→</button>
      </div>
    </>
  );

  return (
    <div className="diet-plan-container">
      {isLoading ? (
        <div className="loading-state">Loading your personalized health plan...</div>
      ) : (
        <>
          <div className="diet-header">
            <button 
              onClick={() => navigate('/firstpage')}
              className="back-button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
            <div className="diet-title">
              <h2>{conditionMap[condition] || 'Custom'} Health Plan</h2>
              <p>Personalized recommendations for your condition</p>
            </div>
            
            <div className="header-right">
              <div className="current-date">{getCurrentDate()}</div>
              <button 
                className="save-button" 
                onClick={handleSavePlan}
              >
            go to dashboard
              </button>
            </div>
          </div>

          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'diet' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('diet');
                setActiveDot(0);
              }}
            >
              Diet Plan
            </button>
            <button
              className={`tab-button ${activeTab === 'yoga' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('yoga');
                setActiveDot(0);
              }}
            >
              Yoga Routine
            </button>
          </div>

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          {activeTab === 'diet' ? renderDietContent() : renderYogaContent()}
        </>
      )}
    </div>
  );
};

export default DietPlan;
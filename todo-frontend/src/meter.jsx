import { useState, useEffect } from "react";
import { Trash2, Search, Activity, AlertCircle, Loader2 } from "lucide-react";

// Cached data to use when API is not available
const cachedFoodDatabase = {
  "apple": { 
    calories: 95, 
    exercises: [
      { name: "Walking", duration: 20, caloriesBurned: 100 },
      { name: "Cycling", duration: 10, caloriesBurned: 95 }
    ],
    healthImpacts: {
      positive: ["Rich in fiber", "Contains antioxidants", "May lower risk of diabetes"],
      negative: ["High in natural sugars"]
    },
    nutrients: {
      protein: 0.5,
      fat: 0.3,
      carbs: 25,
      fiber: 4,
      sugar: 19
    }
  },
  "banana": { 
    calories: 105, 
    exercises: [
      { name: "Jogging", duration: 10, caloriesBurned: 110 },
      { name: "Swimming", duration: 12, caloriesBurned: 105 }
    ],
    healthImpacts: {
      positive: ["Good source of potassium", "Contains vitamin B6", "Supports heart health"],
      negative: ["High in carbs and sugar"]
    },
    nutrients: {
      protein: 1.3,
      fat: 0.4,
      carbs: 27,
      fiber: 3,
      sugar: 14
    }
  },
  "burger": { 
    calories: 550, 
    exercises: [
      { name: "Running", duration: 55, caloriesBurned: 550 },
      { name: "High-intensity interval training", duration: 35, caloriesBurned: 550 }
    ],
    healthImpacts: {
      positive: ["Source of protein"],
      negative: ["High in saturated fat", "May increase cholesterol", "Associated with heart disease risk"]
    },
    nutrients: {
      protein: 25,
      fat: 30,
      carbs: 40,
      fiber: 2,
      sugar: 7
    }
  },
  "pizza": { 
    calories: 285, 
    exercises: [
      { name: "Cycling", duration: 45, caloriesBurned: 290 },
      { name: "Dancing", duration: 50, caloriesBurned: 285 }
    ],
    healthImpacts: {
      positive: ["Contains calcium from cheese"],
      negative: ["High in sodium", "High in refined carbs", "May contribute to weight gain"]
    },
    nutrients: {
      protein: 12,
      fat: 10,
      carbs: 35,
      fiber: 2,
      sugar: 3
    }
  },
  "orange": {
    calories: 62,
    exercises: [
      { name: "Walking", duration: 13, caloriesBurned: 65 },
      { name: "Yoga", duration: 20, caloriesBurned: 60 }
    ],
    healthImpacts: {
      positive: ["High in vitamin C", "Boosts immunity", "Good for skin"],
      negative: ["May cause acid reflux in sensitive individuals"]
    },
    nutrients: {
      protein: 1.2,
      fat: 0.2,
      carbs: 15.4,
      fiber: 3.1,
      sugar: 12
    }
  },
  "grapes": {
    calories: 62,
    exercises: [
      { name: "Stretching", duration: 20, caloriesBurned: 60 },
      { name: "Walking", duration: 13, caloriesBurned: 62 }
    ],
    healthImpacts: {
      positive: ["Rich in antioxidants", "Supports heart health"],
      negative: ["High glycemic index"]
    },
    nutrients: {
      protein: 0.6,
      fat: 0.3,
      carbs: 16,
      fiber: 0.8,
      sugar: 15
    }
  },
  "carrot": {
    calories: 41,
    exercises: [
      { name: "Walking", duration: 9, caloriesBurned: 45 },
      { name: "Stretching", duration: 15, caloriesBurned: 40 }
    ],
    healthImpacts: {
      positive: ["Good for eye health", "Rich in beta-carotene"],
      negative: ["May affect blood sugar if eaten in excess"]
    },
    nutrients: {
      protein: 0.9,
      fat: 0.2,
      carbs: 10,
      fiber: 2.8,
      sugar: 4.7
    }
  },
  "broccoli": {
    calories: 55,
    exercises: [
      { name: "Yoga", duration: 20, caloriesBurned: 55 },
      { name: "Brisk walk", duration: 15, caloriesBurned: 55 }
    ],
    healthImpacts: {
      positive: ["Rich in vitamins C and K", "Supports digestion"],
      negative: ["Can cause gas in some individuals"]
    },
    nutrients: {
      protein: 3.7,
      fat: 0.6,
      carbs: 11.2,
      fiber: 5.1,
      sugar: 2.2
    }
  },
  "almonds": {
    calories: 164,
    exercises: [
      { name: "Jogging", duration: 15, caloriesBurned: 165 },
      { name: "Cycling", duration: 20, caloriesBurned: 160 }
    ],
    healthImpacts: {
      positive: ["High in healthy fats", "Good for heart"],
      negative: ["Calorie-dense, easy to overeat"]
    },
    nutrients: {
      protein: 6,
      fat: 14,
      carbs: 6,
      fiber: 3.5,
      sugar: 1.2
    }
  },
  "oatmeal": {
    calories: 150,
    exercises: [
      { name: "Rowing", duration: 20, caloriesBurned: 150 },
      { name: "Swimming", duration: 15, caloriesBurned: 150 }
    ],
    healthImpacts: {
      positive: ["Supports heart health", "Good for digestion"],
      negative: ["Can spike blood sugar if sweetened"]
    },
    nutrients: {
      protein: 5,
      fat: 2.5,
      carbs: 27,
      fiber: 4,
      sugar: 1
    }
  },
  "avocado": {
    calories: 240,
    exercises: [
      { name: "Running", duration: 24, caloriesBurned: 240 },
      { name: "HIIT", duration: 20, caloriesBurned: 240 }
    ],
    healthImpacts: {
      positive: ["Healthy fats", "Good for skin and brain"],
      negative: ["High in calories"]
    },
    nutrients: {
      protein: 3,
      fat: 22,
      carbs: 12,
      fiber: 10,
      sugar: 0.2
    }
  },
  "eggs": {
    calories: 78,
    exercises: [
      { name: "Brisk walk", duration: 15, caloriesBurned: 80 },
      { name: "Jump rope", duration: 10, caloriesBurned: 80 }
    ],
    healthImpacts: {
      positive: ["High in protein", "Good source of B vitamins"],
      negative: ["Contains cholesterol"]
    },
    nutrients: {
      protein: 6,
      fat: 5,
      carbs: 0.6,
      fiber: 0,
      sugar: 0.6
    }
  },
  "chicken breast": {
    calories: 165,
    exercises: [
      { name: "Jogging", duration: 15, caloriesBurned: 165 },
      { name: "HIIT", duration: 10, caloriesBurned: 165 }
    ],
    healthImpacts: {
      positive: ["Lean protein", "Supports muscle growth"],
      negative: ["May contain sodium if processed"]
    },
    nutrients: {
      protein: 31,
      fat: 3.6,
      carbs: 0,
      fiber: 0,
      sugar: 0
    }
  },
  "tofu": {
    calories: 94,
    exercises: [
      { name: "Yoga", duration: 20, caloriesBurned: 90 },
      { name: "Walking", duration: 18, caloriesBurned: 95 }
    ],
    healthImpacts: {
      positive: ["Plant-based protein", "Contains isoflavones"],
      negative: ["May affect hormones if consumed in excess"]
    },
    nutrients: {
      protein: 10,
      fat: 6,
      carbs: 2,
      fiber: 1,
      sugar: 0.6
    }
  },
  "salmon": {
    calories: 208,
    exercises: [
      { name: "Running", duration: 21, caloriesBurned: 210 },
      { name: "Swimming", duration: 18, caloriesBurned: 208 }
    ],
    healthImpacts: {
      positive: ["Rich in omega-3", "Supports brain function"],
      negative: ["May contain mercury (wild)"]
    },
    nutrients: {
      protein: 20,
      fat: 13,
      carbs: 0,
      fiber: 0,
      sugar: 0
    }
  },
  "sweet potato": {
    calories: 103,
    exercises: [
      { name: "Cycling", duration: 15, caloriesBurned: 105 },
      { name: "Dancing", duration: 20, caloriesBurned: 100 }
    ],
    healthImpacts: {
      positive: ["High in fiber and vitamin A", "Supports vision"],
      negative: ["Moderate glycemic index"]
    },
    nutrients: {
      protein: 2,
      fat: 0.2,
      carbs: 24,
      fiber: 4,
      sugar: 7
    }
  },
  "spinach": {
    calories: 23,
    exercises: [
      { name: "Stretching", duration: 10, caloriesBurned: 25 },
      { name: "Yoga", duration: 15, caloriesBurned: 23 }
    ],
    healthImpacts: {
      positive: ["Rich in iron", "Supports eye health"],
      negative: ["May cause kidney stones (oxalates)"]
    },
    nutrients: {
      protein: 2.9,
      fat: 0.4,
      carbs: 3.6,
      fiber: 2.2,
      sugar: 0.4
    }
  }
};

// Function to search foods from the API
const searchFoodsFromAPI = async (query) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/search/instant?query=${query}`, {
      method: "GET",
      headers: API_HEADERS
    });
    
    if (!response.ok) {
      throw new Error("API request failed");
    }
    
    const data = await response.json();
    return data.common?.slice(0, 5).map(item => ({
      name: item.food_name,
      foodId: item.food_name // Using name as ID for simplicity
    })) || [];
  } catch (error) {
    console.error("Error fetching from API:", error);
    // Fall back to cached data
    return Object.keys(cachedFoodDatabase)
      .filter(food => food.toLowerCase().includes(query.toLowerCase()))
      .map(food => ({ name: food, foodId: food }))
      .slice(0, 5);
  }
};

// Function to get detailed nutrients info
const getNutritionInfo = async (foodName) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/natural/nutrients`, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        query: foodName
      })
    });
    
    if (!response.ok) {
      throw new Error("API request failed");
    }
    
    const data = await response.json();
    
    if (data.foods && data.foods.length > 0) {
      const food = data.foods[0];
      
      // Calculate exercise recommendations based on calories
      const calories = food.nf_calories;
      const exercises = [
        { 
          name: "Walking", 
          duration: Math.round(calories / 5), 
          caloriesBurned: Math.round(calories) 
        },
        { 
          name: calories > 300 ? "Running" : "Jogging", 
          duration: Math.round(calories / 10), 
          caloriesBurned: Math.round(calories) 
        }
      ];
      
      // Determine health impacts based on nutrients
      const healthImpacts = {
        positive: [],
        negative: []
      };
      
      if (food.nf_protein > 10) healthImpacts.positive.push("Good source of protein");
      if (food.nf_dietary_fiber > 3) healthImpacts.positive.push("Good source of fiber");
      if (food.nf_saturated_fat > 5) healthImpacts.negative.push("High in saturated fat");
      if (food.nf_sugars > 10) healthImpacts.negative.push("High in sugar");
      if (food.nf_sodium > 500) healthImpacts.negative.push("High in sodium");
      
      return {
        calories: Math.round(food.nf_calories),
        exercises,
        healthImpacts,
        nutrients: {
          protein: food.nf_protein || 0,
          fat: food.nf_total_fat || 0,
          carbs: food.nf_total_carbohydrate || 0,
          fiber: food.nf_dietary_fiber || 0,
          sugar: food.nf_sugars || 0
        }
      };
    }
    
    throw new Error("No food data found");
  } catch (error) {
    console.error("Error fetching nutrition info:", error);
    // Fall back to cached data or generic data
    return cachedFoodDatabase[foodName.toLowerCase()] || {
      calories: 100,
      exercises: [
        { name: "Walking", duration: 20, caloriesBurned: 100 },
        { name: "Cycling", duration: 15, caloriesBurned: 100 }
      ],
      healthImpacts: {
        positive: ["Nutritional value may vary"],
        negative: ["Nutritional information unavailable"]
      },
      nutrients: {
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
        sugar: 0
      }
    };
  }
};

export default function FoodCalorieMeter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodData, setFoodData] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFood, setIsLoadingFood] = useState(false);
  const [activeTab, setActiveTab] = useState("exercises");

  // Search for foods when query changes
  useEffect(() => {
    const fetchFoods = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const results = await searchFoodsFromAPI(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching foods:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const debounce = setTimeout(() => {
      fetchFoods();
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Add food to the selected list
  const addFood = async (foodItem) => {
    setIsLoadingFood(true);
    try {
      // Check if we already have this food's data
      if (!foodData[foodItem.foodId]) {
        const nutritionInfo = await getNutritionInfo(foodItem.name);
        setFoodData(prev => ({
          ...prev,
          [foodItem.foodId]: {
            name: foodItem.name,
            ...nutritionInfo
          }
        }));
      }
      
      setSelectedFoods(prev => [...prev, foodItem.foodId]);
      setSearchQuery("");
      setShowResults(false);
    } catch (error) {
      console.error("Error adding food:", error);
    } finally {
      setIsLoadingFood(false);
    }
  };

  // Remove food from the selected list
  const removeFood = (index) => {
    const newFoods = [...selectedFoods];
    newFoods.splice(index, 1);
    setSelectedFoods(newFoods);
  };

  // Calculate total calories whenever selected foods change
  useEffect(() => {
    let total = 0;
    selectedFoods.forEach(foodId => {
      if (foodData[foodId]) {
        total += foodData[foodId].calories;
      }
    });
    setTotalCalories(total);
  }, [selectedFoods, foodData]);

  // Get combined exercise recommendations
  const getExerciseRecommendations = () => {
    const exercises = {};
    
    selectedFoods.forEach(foodId => {
      if (foodData[foodId]?.exercises) {
        foodData[foodId].exercises.forEach(exercise => {
          if (!exercises[exercise.name]) {
            exercises[exercise.name] = { duration: 0, caloriesBurned: 0 };
          }
          exercises[exercise.name].duration += exercise.duration;
          exercises[exercise.name].caloriesBurned += exercise.caloriesBurned;
        });
      }
    });
    
    return Object.entries(exercises)
      .sort((a, b) => b[1].caloriesBurned - a[1].caloriesBurned);
  };

  // Get all health impacts
  const getHealthImpacts = () => {
    const impacts = { positive: new Set(), negative: new Set() };
    
    selectedFoods.forEach(foodId => {
      if (foodData[foodId]?.healthImpacts) {
        const { positive, negative } = foodData[foodId].healthImpacts;
        positive.forEach(impact => impacts.positive.add(impact));
        negative.forEach(impact => impacts.negative.add(impact));
      }
    });
    
    return {
      positive: Array.from(impacts.positive),
      negative: Array.from(impacts.negative)
    };
  };

  // Get nutrition summary
  const getNutritionSummary = () => {
    const summary = {
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
      sugar: 0
    };
    
    selectedFoods.forEach(foodId => {
      if (foodData[foodId]?.nutrients) {
        const nutrients = foodData[foodId].nutrients;
        summary.protein += nutrients.protein || 0;
        summary.fat += nutrients.fat || 0;
        summary.carbs += nutrients.carbs || 0;
        summary.fiber += nutrients.fiber || 0;
        summary.sugar += nutrients.sugar || 0;
      }
    });
    
    // Round values
    Object.keys(summary).forEach(key => {
      summary[key] = Math.round(summary[key] * 10) / 10;
    });
    
    return summary;
  };

  // Calculate percentages for the nutrition chart
  const getNutrientPercentages = () => {
    const { protein, fat, carbs } = getNutritionSummary();
    const total = protein + fat + carbs;
    
    if (total === 0) return { protein: 0, fat: 0, carbs: 0 };
    
    return {
      protein: Math.round((protein / total) * 100),
      fat: Math.round((fat / total) * 100),
      carbs: Math.round((carbs / total) * 100)
    };
  };

  return (
    
<div 
  className="min-h-screen p-6 font-sans relative overflow-hidden"
  style={{
    backgroundImage: 'url(https://i.pinimg.com/736x/56/aa/b2/56aab29dbe5958564b676df5c3ef7f42.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  }}
>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Food Calorie Meter</h1>
          <p className="opacity-80">Track nutrition, discover exercise needs, and monitor health impacts</p>
        </div>
        
        {/* Food search and input */}
        <div className="p-6">
          <div className="relative mb-6">
            <div className="flex items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for any food..."
                  className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                />
              </div>
            </div>

            {/* Search results dropdown */}
            {showResults && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg overflow-auto border border-gray-200">
                {isLoading ? (
                  <div className="flex justify-center items-center p-4">
                    <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                    <span className="ml-2 text-gray-600">Searching foods...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((food) => (
                      <li
                        key={food.foodId}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors duration-150"
                        onClick={() => addFood(food)}
                      >
                        <span className="capitalize">{food.name}</span>
                        <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs font-medium">
                          Add
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No foods found. Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>

          {isLoadingFood && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-center">
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
              <span>Loading food data...</span>
            </div>
          )}

          {/* Selected foods list with visual enhancements */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Selected Foods</h2>
            </div>
            <div className="p-4">
              {selectedFoods.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <div className="bg-gray-100 inline-flex rounded-full p-3 mb-3">
                    <Search className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-gray-500 font-medium">No foods selected yet</p>
                  <p className="text-gray-400 text-sm mt-1">Search and add some foods above to get started!</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {selectedFoods.map((foodId, index) => {
                    const food = foodData[foodId];
                    return food ? (
                      <li key={index} className="py-3 px-2 flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors duration-150">
                        <div>
                          <span className="font-medium capitalize">{food.name}</span>
                          <div className="flex items-center mt-1">
                            <span className="text-sm bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
                              {food.calories} calories
                            </span>
                            {food.nutrients && (
                              <span className="text-xs text-gray-500 ml-2">
                                P: {Math.round(food.nutrients.protein)}g • F: {Math.round(food.nutrients.fat)}g • C: {Math.round(food.nutrients.carbs)}g
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFood(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-150"
                          aria-label="Remove food"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              )}
              {selectedFoods.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total Calories</span>
                    <div className="flex items-center">
                      <div className="w-16 h-4 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${Math.min(100, totalCalories / 20)}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-2xl text-blue-700">{totalCalories}</span>
                    </div>
                  </div>
                  
                  {/* Macro nutrients summary */}
                  {selectedFoods.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-700">{getNutritionSummary().protein}g</div>
                        <div className="text-xs text-gray-600">Protein</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded-lg">
                        <div className="font-bold text-red-700">{getNutritionSummary().fat}g</div>
                        <div className="text-xs text-gray-600">Fat</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded-lg">
                        <div className="font-bold text-yellow-700">{getNutritionSummary().carbs}g</div>
                        <div className="text-xs text-gray-600">Carbs</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Nutrition Chart and Detailed Information */}
          {selectedFoods.length > 0 && (
            <div>
              {/* Macro Distribution Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Macronutrient Distribution</h3>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  {Object.entries(getNutrientPercentages()).map(([nutrient, percentage], index) => {
                    const colors = {
                      protein: "bg-blue-500",
                      fat: "bg-red-500",
                      carbs: "bg-yellow-500"
                    };
                    return percentage > 0 ? (
                      <div 
                        key={nutrient}
                        className={`h-full ${colors[nutrient]} float-left`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    ) : null;
                  })}
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-gray-700">Protein {getNutrientPercentages().protein}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span className="text-gray-700">Fat {getNutrientPercentages().fat}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                    <span className="text-gray-700">Carbs {getNutrientPercentages().carbs}%</span>
                  </div>
                </div>
              </div>
              
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-4">
                <nav className="flex space-x-8">
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "exercises"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("exercises")}
                  >
                    Exercise Recommendations
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "health"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("health")}
                  >
                    Health Impacts
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Exercise Recommendations Tab */}
                {activeTab === "exercises" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                      <Activity className="h-5 w-5 mr-2 text-green-600" />
                      Exercise Recommendations
                    </h2>
                    <p className="text-gray-600 mb-4">
                      These exercises can help burn the {totalCalories} calories from your selected foods.
                    </p>
                    <ul className="space-y-3">
                      {getExerciseRecommendations().map(([exercise, data], index) => (
                        <li key={index} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                          <div className="font-medium text-green-800">{exercise}</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-sm text-gray-600">
                              Duration: <span className="font-medium">{data.duration} minutes</span>
                            </div>
                            <div className="text-sm bg-green-200 text-green-800 py-1 px-3 rounded-full">
                              Burns {data.caloriesBurned} calories
                            </div>
                          </div>
                          <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                              style={{ width: `${Math.min(100, (data.caloriesBurned / totalCalories) * 100)}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Health Impacts Tab */}
                {activeTab === "health" && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                      <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                      Health Impacts
                    </h2>
                    <div className="space-y-6">
                      {/* Positive Impacts */}
                      <div>
                        <h3 className="text-lg font-medium text-green-600 mb-3">Potential Benefits</h3>
                        {getHealthImpacts().positive.length > 0 ? (
                          <ul className="space-y-2">
                            {getHealthImpacts().positive.map((impact, index) => (
                              <li key={`pos-${index}`} className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>{impact}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-500">
                            No significant health benefits identified for these foods.
                          </div>
                        )}
                      </div>

                      {/* Negative Impacts */}
                      <div>
                        <h3 className="text-lg font-medium text-red-600 mb-3">Health Concerns</h3>
                        {getHealthImpacts().negative.length > 0 ? (
                          <ul className="space-y-2">
                            {getHealthImpacts().negative.map((impact, index) => (
                              <li key={`neg-${index}`} className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                </div>
                                <span>{impact}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-500">
                            No significant health concerns identified for these foods.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
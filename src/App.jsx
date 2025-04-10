import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const mockChartData = [
  { meal: "Breakfast", calories: 300 },
  { meal: "Lunch", calories: 600 },
  { meal: "Dinner", calories: 700 },
  { meal: "Snacks", calories: 150 },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualEntry, setManualEntry] = useState({ food: "", calories: "" });
  const [mealLog, setMealLog] = useState([]);
  const [detectedFood, setDetectedFood] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    // Example: Use a dummy fetch to simulate food recognition API
    // Replace this with a real API call like Edamam, CalorieMama, etc.
    const fakeApiResponse = {
      food: "Grilled Chicken",
      calories: 400
    };

    // Simulate async detection
    setTimeout(() => {
      setDetectedFood(fakeApiResponse);
      setMealLog([...mealLog, fakeApiResponse]);
    }, 1000);
  };

  const handleManualSubmit = () => {
    setMealLog([...mealLog, manualEntry]);
    setManualEntry({ food: "", calories: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🍽️ Calorie Tracker App</h1>

      {/* Image Upload Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Upload Food Image</h2>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {selectedImage && (
            <img src={selectedImage} alt="Preview" className="mt-4 w-48 rounded-lg" />
          )}
          {detectedFood && (
            <p className="mt-2 text-green-600">
              Detected: {detectedFood.food} - {detectedFood.calories} cal
            </p>
          )}
        </CardContent>
      </Card>

      {/* Manual Entry Section */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">Manual Entry</h2>
          <Input
            placeholder="Food name"
            value={manualEntry.food}
            onChange={(e) => setManualEntry({ ...manualEntry, food: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Calories"
            value={manualEntry.calories}
            onChange={(e) => setManualEntry({ ...manualEntry, calories: e.target.value })}
          />
          <Button onClick={handleManualSubmit}>Add Meal</Button>
        </CardContent>
      </Card>

      {/* Meal Log */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Meal Log</h2>
          <ul className="list-disc list-inside">
            {mealLog.map((meal, idx) => (
              <li key={idx}>
                {meal.food}: {meal.calories} cal
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Daily Calorie Breakdown</h2>
          <BarChart width={400} height={250} data={mockChartData}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#38bdf8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}

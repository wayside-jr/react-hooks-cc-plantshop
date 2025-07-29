import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/plants")
      .then((res) => res.json())
      .then(setPlants)
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((prev) => [...prev, newPlant]);
  }

  function handleDeletePlant(id) {
    setPlants((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditPlant(updatedPlant) {
    setPlants((prev) =>
      prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p))
    );
  }

  // Filtered list based on search
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NewPlantForm onAddPlant={handleAddPlant} />

      
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "10px 0", padding: "8px", width: "50%" }}
      />

      <PlantList
        plants={filteredPlants}
        onDelete={handleDeletePlant}
        onEdit={handleEditPlant}
      />
    </div>
  );
}

export default PlantPage;


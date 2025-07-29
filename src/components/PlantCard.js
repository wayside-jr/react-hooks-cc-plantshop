import React, { useState } from "react";

function PlantCard({ plant, onDelete, onEdit }) {
  const [inStock, setInStock] = useState(() => {
    if (!plant || plant.inStock === undefined) {
      return true;
    }
    return plant.inStock;
  });

  const updateStock = () => {
    setInStock((prev) => !prev);
  };

  const btnDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${plant.name}"?`)) {
      fetch(`http://localhost:4000/plants/${plant.id}`, {
        method: "DELETE"
      })
        .then((res) => {
          if (res.ok) {
            onDelete(plant.id);
          } else {
            console.error("Failed to delete plant");
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  const btnEdit = () => {
    const newName = prompt("Enter new name:", plant.name);
    if (newName && newName !== plant.name) {
      fetch(`http://localhost:4000/plants/${plant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
      })
        .then((res) => res.json())
        .then((updatedPlant) => {
          onEdit(updatedPlant);
        })
        .catch((err) => console.error("Edit error:", err));
    }
  };

  if (!plant) return null;

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button onClick={updateStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={btnEdit}> Edit</button>
      <button onClick={btnDelete}> Delete</button>
    </li>
  );
}

export default PlantCard;


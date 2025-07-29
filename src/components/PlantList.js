import React from "react";
import PlantCard from "./PlantCard";


function PlantList({ plants, onDelete, onEdit }) {
  return (<div>
    <ul className="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
 </div> );
}

export default PlantList;

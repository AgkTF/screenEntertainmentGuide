import React from "react";
import PersonUnit from "../Person-unit/PersonUnit";

const FullCast = ({ fullTeam }) => {
  // Get the unique department
  const uniqueDeps = new Set(fullTeam.crew.map((person) => person.department));
  const uniqueDepsArray = [...uniqueDeps];

  let combined = [];
  for (let i = 0; i < uniqueDepsArray.length; i++) {
    let single = fullTeam.crew.filter(
      (person) => person.department === uniqueDepsArray[i]
    );
    combined.push(single);
  }
  console.log(combined);

  let people = uniqueDepsArray.map((department, index) => {
    return (
      <section className="mb-3" key={department}>
        <h3 className="mb-2 font-bold text-sm sm:text-base">{department}</h3>
        {combined[index].map((person) => (
          <PersonUnit
            key={person.id}
            id={person.id}
            name={person.name}
            character={person.job}
            profile_path={person.profile_path}
            gender={person.gender}
          />
        ))}
      </section>
    );
  });

  return (
    <div className="mt-8 sm:mt-10 sm:grid grid-cols-2">
      <section>
        <h2 className="font-bold text-base sm:text-lg">Cast</h2>
        <div className="mt-4 flex flex-col">
          {fullTeam.cast.map((person) => (
            //TODO: Add check if the photo is not available to replace it with a placeholder image based on gender
            <PersonUnit
              key={person.id}
              id={person.id}
              name={person.name}
              character={person.character}
              profile_path={person.profile_path}
              gender={person.gender}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-base sm:text-lg">Crew</h2>

        <section>
          <div className="mt-4 flex flex-col">{people}</div>
        </section>
      </section>
    </div>
  );
};

export default FullCast;

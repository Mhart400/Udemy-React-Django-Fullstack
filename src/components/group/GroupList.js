import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../../services/group-services";

const GroupList = () => {
  const [groups, setGroups] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setloading(true);
    const getData = async () => {
      await getGroups().then((data) => {
        setloading(false);
        setGroups(data);
      });
    };
    getData();
  }, []);

  if (error) {
    return <h1>Error</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <p
        style={{
          textAlign: "left",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        Groups
      </p>

      {groups &&
        groups.map((group) => {
          return (
            <Link to={`/details/${group.id}`} key={group.id}>
              <p>
                {group.name}: {group.location}
              </p>
            </Link>
          );
        })}
    </div>
  );
};

export default GroupList;

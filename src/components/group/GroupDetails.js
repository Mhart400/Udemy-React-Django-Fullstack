import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchGroup } from "../../hooks/useFetchGroup";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AlarmIcon from "@material-ui/icons/Alarm";
import { makeStyles } from "@material-ui/core/styles";
import User from "../user/User";
import { Button } from "@material-ui/core";
import { joinGroup, leaveGroup } from "../../services/group-services";
import { useAuth } from "../../hooks/useAuth";
import Comments from "../comments/Comments";
import EventList from "../events/EventList";

const useStyles = makeStyles((theme) => ({
  dateTime: {
    fontSize: "1rem",
    marginRight: "3px",
    color: theme.colors.mainAccentColor,
  },
  memberContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  headers:{
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
}));

const GroupDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { authData } = useAuth();
  const [data, loading, error] = useFetchGroup(id);
  const [group, setGroup] = useState(null);
  const [inGroup, setInGroup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    if (data?.members && authData?.user) {
      // "!!" converts the expression to Boolean
      setInGroup(
        !!data.members.find((member) => member.user.id === authData.user.id)
      );

      // check for admin
      setIsAdmin(
        !!data.members.find((member) => member.user.id === authData.user.id)
          ?.admin
      );
    }

    setGroup(data);
  }, [data, authData, group]);

  if (error) return <h4>Error</h4>;

  if (loading) return <h4>Loading...</h4>;

  const joinHere = () => {
    joinGroup({ user: authData.user.id, group: group.id }, authData.token);
  };

  const leaveHere = () => {
    leaveGroup({ user: authData.user.id, group: group.id }, authData.token);
  };


  return (
    <div>
      <Link to="/">Back</Link>
      <p
        style={{
          textAlign: "left",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        {group && group.name}
      </p>
      {group && (
        <>
          <ul>
            <li>Location: {group.location}</li>
            <li>Description: {group.description}</li>
          </ul>
          {isAdmin && <p>!! You are an Admin of this group</p>}
          {!inGroup ? (
            <Button onClick={() => joinHere()}>Join Group</Button>
          ) : (
            <Button onClick={() => leaveHere()}>Leave Group</Button>
          )}
          <br />
          <h4 className={classes.headers}>
            Events:
          </h4>
          
          {/* ***LIST OF EVENTS*** */}
          {group.events && <EventList group={group} />}

          <h4 className={classes.headers}>
            Members:
          </h4>

          {group.events &&
            group.members.map((member) => {
              return (
                <div key={member.id} className={classes.memberContainer}>
                  <User user={member.user} />
                  <p>{member.points} pts</p>
                </div>
              );
            })}
          {group.events.length < 1 && <li>none</li>}
          <Comments group={group} />
        </>
      )}
    </div>
  );
};

export default GroupDetails;

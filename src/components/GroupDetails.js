import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchGroup } from "../hooks/useFetchGroup";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AlarmIcon from "@material-ui/icons/Alarm";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  dateTime: {
    fontSize: '1rem',
    marginRight: '3px',
    color: theme.colors.mainAccentColor,
  },
}))

const GroupDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [data, loading, error] = useFetchGroup(id);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setGroup(data);
  }, [data]);

  if (error) return <h4>Error</h4>;

  if (loading) return <h4>Loading...</h4>;

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
          <br />
          <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
            Events:
          </p>
          <ul>
            {group.events &&
              group.events.map((event) => {
                const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
                const eventTime = DateTime.fromFormat(event.time, format);
                return (
                  <li id={event.id}>
                    <div style={{ fontWeight: "bold" }}>
                      {event.team1} vs. {event.team2}
                    </div>
                    <div className="centerV">
                      <span
                        className="centerV"
                        style={{ padding: "5px 5px 5px 0" }}
                      >
                        <CalendarTodayIcon className={classes.dateTime} />
                        {eventTime.toFormat("DDDD")}
                      </span>
                      <span className="centerV" style={{ padding: "5px" }}>
                        <AlarmIcon  className={classes.dateTime} />
                        {eventTime.toFormat("t")}
                      </span>
                    </div>
                  </li>
                );
              })}
            {group.events.length < 1 && <li>none</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default GroupDetails;

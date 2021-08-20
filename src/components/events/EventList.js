import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AlarmIcon from "@material-ui/icons/Alarm";

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
  headers: {
    fontWeight: "bold",
    textDecoration: "underline",
  },
}));

export default function EventList({ group }) {
  const classes = useStyles();

  return (
    <>
      <ul>
        {group.events &&
          group.events.map((event) => {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            const eventTime = DateTime.fromFormat(event.time, format);
            return (
              <li key={event.id}>
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
                    <AlarmIcon className={classes.dateTime} />
                    {eventTime.toFormat("t")}
                  </span>
                </div>
              </li>
            );
          })}
        {group.events.length < 1 && <li>none</li>}
      </ul>
    </>
  );
}

EventList.propTypes = {
  group: PropTypes.shape({
    events: PropTypes.array,
    comments: PropTypes.array,
    description: PropTypes.string,
    id: PropTypes.number,
    location: PropTypes.string,
    members: PropTypes.array,
    name: PropTypes.string,
  }),
};

EventList.defaultProps = {
  //   testProp: "**PLACEHOLDER - LIST OF EVENTS**",
};

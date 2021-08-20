import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "@material-ui/core";
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  avatar: {
      height: '60px',
      width: '60px',
  },
  container: {
    width: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  username: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      paddingTop: '5px',
  }
}));

const User = ({user}) => {
  const classes = useStyles();

  const { authData, setAuth } = useAuth();


  return (
 
        <div className={classes.container}>
          <Avatar src={"http://localhost:8000" + user.profile.image} alt="user avater" className={classes.avatar} />
          <div className={classes.username} >{user.username}</div>
          
          <br/>
        </div>
  )
}


User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({}).isRequired,
            image: PropTypes.string,

    }).isRequired,

}

export default User;
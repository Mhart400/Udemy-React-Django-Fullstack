import { createTheme } from "@material-ui/core/styles";
import { amber, deepOrange, lightBlue } from "@material-ui/core/colors";


const theme = createTheme({
    palette: {
        primary: amber,
        secondary: lightBlue,
        
    },
    colors: {
        bgColor: '#3e3e3e',
        bgLightColor: '#888',
        mainAccentColor: '#fecc01',
    },
    overrides: {
        MuiButton: {
            root: {
                margin: '2px 4px',
                display: 'block',
            },
        },
    },
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
    },
})



export default theme;

import {createMuiTheme} from '@material-ui/core';

export const THEME = createMuiTheme({
    palette: {
        primary: {
            main: '#C6C6C6'
        },
        secondary: {
            main: '#EA4334'
        }
    }
})

export const labelProps = {
    style: {
        paddingLeft: '10px',
        color: 'grey'
    }
}

export const inputProps = {
    style: {
        paddingLeft: '10px'
    }
}

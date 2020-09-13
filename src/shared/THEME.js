import {createMuiTheme} from '@material-ui/core';

export const THEME = createMuiTheme({
    palette: {
        primary: {
            main: '#3772ff'
        },
        secondary: {
            main: '#EA4334'
        }
    }
})

export const labelProps = {
    style: {
        // paddingLeft: '0px',
        // color: 'grey'
    }
}

export const inputProps = {
    style: {
        // paddingLeft: '0px'
    }
}

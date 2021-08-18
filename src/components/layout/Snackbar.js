import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import { createRef } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CustomSnackbarProvider = (props) => {
    
    const notistackRef = createRef();
    
    const onClickDismiss = key => () => { 
        notistackRef.current.closeSnackbar(key);
        }
        
    return (<SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        TransitionComponent={Slide}
        action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
                <CloseIcon/>
            </IconButton>
        )}
    >
    {props.children}
    </SnackbarProvider>
    )}


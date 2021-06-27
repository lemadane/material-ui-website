/*
 ********************************************************************
 * Licensed Materials - Property of HCL                             *
 *                                                                  *
 * Copyright HCL Technologies Ltd. 2021. All Rights Reserved.       *
 *                                                                  *
 * Note to US Government Users Restricted Rights:                   *
 *                                                                  *
 * Use, duplication or disclosure restricted by GSA ADP Schedule    *
 ********************************************************************
 */

 import React, { useEffect } from 'react';
 import { v4 as uuid } from 'uuid';
 import { useDispatch, useSelector } from 'react-redux';
 import { Box } from '@enchanted-prod/material-ui-core';
 import { SnackbarStatusKey } from '@enchanted-prod/material-ui-core/dist/SnackbarContentStatus';
 import SuccessIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/checkmark--outline';
 import ErrorIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/error';
 import WarningIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/warning';
 import InformationIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/information';
 import NotificationIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/notification';
 import ProgressIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/chart--line';
 import CloseIcon from '@enchanted-prod/material-ui-icons/dist/carbon/es/close';
 import Notistack from '@enchanted-prod/material-ui-core/dist/_incubator/Notistack';
 import { NotistackItemBasePropsType } from '@enchanted-prod/material-ui-core/dist/_incubator/NotistackItem';
 import { IAppState } from '../../redux/store';
 import { closeSnackbar } from '../../redux/actions/Snackbar/snackbarActions';
 
 export const snackBarUuid = {
   snackbarContainer: uuid(),
 };
 
 const Snackbar: React.FC<{}> = () => {
   const dispatch = useDispatch();
 
   const notifications = useSelector((state: IAppState) => { return state.snackbarState.notifications; });
 
   const [items, setItems] = React.useState<NotistackItemBasePropsType[]>(notifications);
 
   const handleRemove = (id: string) => {
     dispatch(closeSnackbar(id));
   };
 
   const getStatusIcon = (statusKey?: SnackbarStatusKey): JSX.Element => {
     switch (statusKey) {
       case 'error':
         return (<ErrorIcon />);
       case 'warning':
         return (<WarningIcon />);
       case 'info':
         return (<InformationIcon />);
       case 'success':
         return (<SuccessIcon />);
       case 'progress':
         return (<ProgressIcon />);
       default:
         return (<NotificationIcon />);
     }
   };
 
   useEffect(() => {
     const newSnackbarItems = notifications.map((notification: NotistackItemBasePropsType) => {
       return {
         ...notification,
         closeIcon: <CloseIcon />,
         icon: getStatusIcon(notification.status),
       };
     });
     setItems(newSnackbarItems);
   }, [notifications]);
 
   return (
     <Box data-testid={snackBarUuid.snackbarContainer}>
       <Notistack items={items} maxStack={5} horizontal="left" vertical="bottom" remove={handleRemove} autoHideDelay={5000} />
     </Box>
   );
 };
 
 export default Snackbar;
 
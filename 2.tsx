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

 import React from 'react';
 import { Provider } from 'react-redux';
 import { act } from 'react-testing-library';
 import { mount, ReactWrapper } from 'enzyme';
 import renderer from 'react-test-renderer';
 import thunk from 'redux-thunk';
 import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
 import NotistackItem from '@enchanted-prod/material-ui-core/dist/_incubator/NotistackItem';
 
 import { SnackbarStatusKey } from '@enchanted-prod/material-ui-core';
 import { IAppState, store } from '../../../../app/redux/store';
 import Snackbar, { snackBarUuid } from '../../../../app/components/Snackbar/Snackbar';
 import * as snackbarActions from '../../../../app/redux/actions/Snackbar/snackbarActions';
 import { configureAdapter } from '../../../setup';
 import { setupIntl } from '../../../utilities/intlLocaleUtil';
 import { SnackBarStatusType } from '../../../../app/redux/actions/Snackbar/snackbarActionsTypes';
 
 const middlewares = [thunk];
 
 const mockStore = configureMockStore(middlewares);
 
 let mocked: MockStoreEnhanced<unknown, {}>;
 
 configureAdapter();
 
 beforeAll(async () => {
   await setupIntl();
 });
 
 const testStore = store.getState() as IAppState;
 
 const storeCopy = { ...testStore };
 
 const getStoreCopy = (status?: SnackbarStatusKey) => {
   storeCopy.snackbarState = {
     ...storeCopy.snackbarState,
     notifications: [{
       id: '1',
       status: status as SnackbarStatusKey,
       message: 'test',
     }],
   };
   return storeCopy;
 };
 
 const snackbarTest = (mockedStore?: MockStoreEnhanced<unknown, {}>) => {
   return (
     <Provider store={mockedStore || store}>
       <Snackbar />
     </Provider>
   );
 };
 
 const loadComponent = (mockedStore?: MockStoreEnhanced<unknown, {}>) => {
   return mount(snackbarTest(mockedStore));
 };
 
 describe('Snackbar', () => {
   let component: ReactWrapper;
 
   beforeEach(() => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.SUCCESS));
     component = loadComponent(mocked);
   });
 
   afterEach(() => {
     component.unmount();
   });
 
   it('should render component without crashing', () => {
     expect(component.exists()).toBe(true);
   });
 
   it('should render component for success notification', () => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.SUCCESS));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should render component for progress notification', () => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.PROGRESS));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should render component for error notification', () => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.ERROR));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should render component for warning notification', () => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.WARNING));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should render component for information notification', () => {
     mocked = mockStore(getStoreCopy(SnackBarStatusType.INFO));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should render component for default notification', () => {
     mocked = mockStore(getStoreCopy(undefined));
     const tree = renderer.create(snackbarTest(mocked)).toJSON();
     expect(tree).toMatchSnapshot();
   });
 
   it('should show snackbars when notification state is populated', () => {
     const snackbarContainer = component.find(`[data-testid="${snackBarUuid.snackbarContainer}"]`);
     expect(snackbarContainer.exists()).toEqual(true);
   });
 
   it('should be able to close snackbar', () => {
     const spyAction = jest.spyOn(snackbarActions, 'closeSnackbar');
     const snackbarContainer = component.find(`[data-testid="${snackBarUuid.snackbarContainer}"]`).last();
     const snackbarItem = snackbarContainer.find(NotistackItem);
     act(() => {
       snackbarItem.props().remove('1');
     });
     expect(spyAction).toBeCalledWith('1');
   });
 });
 
/* eslint-disable */
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Menu from '../Menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

// As we're testing a component that use 'onTouchTap', we
// need to inject the Tap Event Plugin.
injectTapEventPlugin();

describe('Menu Component', () => {
  let component;
  let routerSpy;

  beforeEach(() => {
    routerSpy = sinon.spy();
    const context = {
      router: {
        push: routerSpy,
      },
      muiTheme: getMuiTheme()
    };
    const childContextTypes = {
      muiTheme: React.PropTypes.object
    };

    component = mount(<Menu />,{ context, childContextTypes });
  });

  it('should render without problems', () => {
    expect(component).to.exist;
  });


  it('should change the page when a menu item is clicked', () => {
    const element = component.find('Menu');
    const expectedRoute = '/heroes/unleash';
    element.node.handleMenuClick(expectedRoute);
    expect(routerSpy.getCall(0).args[0]).to.equal(expectedRoute);
  });
});

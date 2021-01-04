import React from 'react';
import { shallow, mount } from 'enzyme';
import SideNav from '../../components/SideNav/';
import {BrowserRouter ,Switch, Route} from'react-router-dom';
import sinon from 'sinon';

const listSideNav = [
  "Dashboard",
  "Maintenance",
  "Users",
  "Accounting",
  "Sales",
  "MMD",
  "R&D",
  "Purchasing",
  "Costing"
]

describe('SideNav shallow test', () => {
  const wrapper = shallow(<SideNav location={{
    pathname: "maintenance"
  }} />);

  it('checks menu items not equal to 0', () => {
    expect(wrapper.children().length).toBeGreaterThan(0)
  })

  it('checks if all SideNav list text are the same.', () => {
    let finalResults = [];

    listSideNav.forEach((nav,i) => {
      const results = wrapper.children().at(i).childAt(0).contains(nav);
      finalResults.push(results);
    })
    
    finalResults.forEach(val => {
      expect(val).toBe(true);
    })
  })
})

describe('SideNav full dom test', () => {
  const wrapper = mount(<SideNav location={{pathname: "maintenance"}} />, {wrappingComponent: BrowserRouter})
  it('checks successful render inside BrowserRouter', () => {
    let finalResults = [];

    listSideNav.forEach((nav,i) => {
      const results = wrapper.childAt(0).find('a').at(i).contains(nav);
      finalResults.push(results);
    })
    
    finalResults.forEach(val => {
      expect(val).toBe(true);
    });
  });

  it('check has right props', () => {
    const menuItems = wrapper.childAt(0).find('MenuItem');
    menuItems.forEach(item => {
      expect(item.find('LinkAnchor').prop('href')).not.toBe('')
      expect(item.find('LinkAnchor').prop('href')).not.toBe(null)
    })
  })
});
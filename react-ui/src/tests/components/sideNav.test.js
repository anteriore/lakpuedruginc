import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../components/SideNav/';

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

describe('SideNav', () => {
  const wrapper = shallow(<SideNav location={{
    pathname: "maintenance"
  }} />);

  it('check menu items not equal to 0', () => {
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
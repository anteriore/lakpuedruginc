import React from 'react';
import {shallow,} from 'enzyme';
import FinishedGoods from '../../../../screens/Maintenance/FinishedGoods';

describe("Finished Goods", () => {
  it('should render without throwing errors', () => {
    const  wrapper = shallow(<FinishedGoods/>);

    console.log(wrapper);
    (true).toBe(true);
  })
})
import React from 'react';
import { Row } from 'antd';
import { useRouteMatch } from 'react-router-dom';

import ModuleCard from '../ModuleCard';

const Modules = (props) => {
  const cardsPerRow = 4;
  const { path } = useRouteMatch();

  const renderModules = () => {
    const moduleCards = [];
    for (let i = 0; i < props.modules.length; i += cardsPerRow) {
      const moduleRow = [];
      for (let j = i; j < i + cardsPerRow; j += 1) {
        if (j < props.modules.length) {
          moduleRow.push(
            <ModuleCard path={path + props.modules[j].path} title={props.modules[j].title} />
          );
        }
      }
      moduleCards.push(<Row gutter={styles.gutter}>{moduleRow}</Row>);
    }

    return moduleCards;
  };

  return <div>{renderModules()}</div>;
};

export default Modules;

const styles = {
  Card: {
    backgroundColor: '#f3f3f3',
    borderColor: '#999999',
  },

  CardIcon: {
    fontSize: '32px',
  },

  span: 5,

  gutter: [16, 16],
};

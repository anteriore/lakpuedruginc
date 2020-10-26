import React, { useState } from 'react';
import { Row } from 'antd';
import { useRouteMatch } from 'react-router-dom';

import ModuleCard from '../ModuleCard';

const Modules = (props) => {
    const [cardsPerRow, setCardsPerRow] = useState(4)
    const { path } = useRouteMatch();

    const renderModules = () => {
        
        const moduleCards = []
        for (var i = 0; i < props.modules.length; i += cardsPerRow){
            var moduleRow = []
            console.log("Row")
            for(var j = i; j < i + cardsPerRow; j++){
                if(j < props.modules.length){
                    moduleRow.push(
                        <ModuleCard path={path + props.modules[j].path} title={props.modules[j].title} />
                    )
                }
            }
            moduleCards.push(
                <Row gutter={styles.gutter}>
                    {moduleRow}
                </Row>
            )
        }

        return moduleCards

    }

    return (
        <div>
            {renderModules()}
        </div>
    )
}

export default Modules

const styles = {
    Card: {
        backgroundColor: "#f3f3f3",
        borderColor: "#999999",
    },

    CardIcon: {
        fontSize:'32px'
    },
    
    span: 5,

    gutter: [16,16],

}
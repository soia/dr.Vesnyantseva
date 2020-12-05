import React from 'react';
import { GetServiceConsumer } from '../../context/get-service-context';

const withGetService = () => Wrapped => props => (
    <GetServiceConsumer>
        {
            getService => (
                <Wrapped
                    {...props}
                    getService={getService}
                />
            )
        }
    </GetServiceConsumer>
);

export default withGetService;

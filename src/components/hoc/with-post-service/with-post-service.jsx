import React from 'react';
import { PostServiceConsumer } from '../../context/post-service-context';

const withPostService = () => Wrapped => props => (
    <PostServiceConsumer>
        {
            postService => (
                <Wrapped
                    {...props}
                    postService={postService}
                />
            )
        }
    </PostServiceConsumer>
);

export default withPostService;

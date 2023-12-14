import React from 'react'
import { Card } from 'react-bootstrap';

const PostDetail = (props) => {
    const { post_detail } = props;
    return (
        <div style={{ paddingTop: '1%', paddingLeft: '20%' }}>
            <Card style={{ width: '80%', backgroundColor: 'skyblue' }}>
                <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5> Post Detail</h5>
                </Card.Header>
                <Card.Body>
                    <Card style={{ marginBlockStart: '6px' }}>
                        <Card.Header><h6>Title :{post_detail.title}</h6></Card.Header>
                        <Card.Body>
                            <div>
                                <span>{post_detail.body}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PostDetail

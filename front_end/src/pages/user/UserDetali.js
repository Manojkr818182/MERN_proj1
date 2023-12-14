import React from 'react';
import styles from './userDetail.module.css';
import { Button, Card } from 'react-bootstrap';

const UserDetali = (props) => {
    const { user_detail, viewPostFun } = props;
    return (
        <div className={styles.container}>
            <Card style={{ width: '80%', backgroundColor: 'skyblue' }}>
                <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <h5> Name : {user_detail?.name}</h5>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={() => viewPostFun(user_detail.id)}>View Post</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card style={{ marginBlockStart: '6px' }}>
                        <Card.Header><h6>User Detail:</h6></Card.Header>
                        <Card.Body>
                            <div>
                                <span>Email: {user_detail?.email}</span>
                            </div>
                            <div>
                                <span>Phone: {user_detail?.phone}</span>
                            </div>
                            <div>
                                <span>Username: {user_detail?.username}</span>
                            </div>
                            <div>
                                <span> Website: <a href={`https://${user_detail?.website}`} target='blank'>{user_detail?.website}</a></span>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card style={{ marginBlockStart: '6px' }}>
                        <Card.Header><h6>Company Detail:</h6></Card.Header>
                        <Card.Body>
                            <div>
                                <span>Name: {user_detail?.company.name}</span>
                            </div>
                            <div>
                                <span>CatchPhrase: {user_detail?.company.catchPhrase}</span>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card style={{ marginBlockStart: '6px' }}>
                        <Card.Header><h6>Address Detail: </h6></Card.Header>
                        <Card.Body>
                            <div>
                                <span>City: {user_detail?.address.city}</span>
                            </div>
                            <div>
                                <span>Street: {user_detail?.address.street}</span>
                            </div>
                            <div>
                                <span>Zipcode: {user_detail?.address.zipcode}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserDetali;

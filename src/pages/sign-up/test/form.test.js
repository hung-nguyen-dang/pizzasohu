import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../form';

test('Snap shot', () => {
    let snap = renderer.create(
        <Form />
    ).toJSON();

    expect(snap).toMatchSnapshot();
})
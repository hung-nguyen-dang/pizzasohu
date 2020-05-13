import React from 'react';
import renderer from 'react-test-renderer';
import Payment from '../payment';

test('Snapshot', () => {
    let snap = renderer.create(
        <Payment />
    ).toJSON();

    expect(snap).toMatchSnapshot();
})
import React from 'react';
import renderer from 'react-test-renderer';
import Popup from '.';

it('Popup snapShot', () => {
    let snap = renderer.create(
        <Popup />
    ).toJSON();

    expect(snap).toMatchSnapshot();
})